import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { channels } from "@/lib/data/channels";
import { resolveStreamFor } from "@/lib/streams";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Hls from "hls.js";

function findM3u8InJson(obj: any): string | null {
  if (!obj) return null;
  if (typeof obj === "string") {
    if (obj.includes(".m3u8") || obj.startsWith("http")) return obj;
    return null;
  }
  if (Array.isArray(obj)) {
    for (const item of obj) {
      const found = findM3u8InJson(item);
      if (found) return found;
    }
  } else if (typeof obj === "object") {
    for (const k of Object.keys(obj)) {
      const val = obj[k];
      if (typeof val === "string" && val.includes(".m3u8")) return val;
      const found = findM3u8InJson(val);
      if (found) return found;
    }
  }
  return null;
}

export default function ChannelPage() {
  const { slug } = useParams<{ slug: string }>();
  const channel = channels.find((c) => c.slug === slug);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resolvedUrl, setResolvedUrl] = useState<string | null>(null);

  useEffect(() => {
    let hls: Hls | null = null;
    let mounted = true;

    async function resolveCandidate(candidate: string) {
      try {
        const res = await fetch(candidate, { method: "GET" });
        if (!res.ok) {
          return candidate;
        }

        const contentType = res.headers.get("content-type") || "";
        if (res.url && res.url.includes(".m3u8")) return res.url;

        if (contentType.includes("application/vnd.apple.mpegurl") || contentType.includes("application/x-mpegurl") || contentType.includes("mpegurl")) {
          return res.url || candidate;
        }

        if (contentType.includes("application/json") || contentType.includes("text/json")) {
          const json = await res.json();
          const found = findM3u8InJson(json);
          if (found) return found;
        }

        const text = await res.text();

        // 마스터 플레이리스트에서 실제 스트림 URL 찾기
        if (text.includes("#EXT-X-STREAM-INF")) {
          const lines = text.split(/\r?\n/).map((l) => l.trim());
          for (let i = 0; i < lines.length; i++) {
            if (lines[i].startsWith("#EXT-X-STREAM-INF")) {
              for (let j = i + 1; j < lines.length; j++) {
                const nextLine = lines[j];
                if (!nextLine || nextLine.startsWith("#")) continue;
                try {
                  // 상대 URL을 절대 URL로 변환
                  const streamUrl = new URL(nextLine, res.url).toString();
                  console.log(`마스터 플레이리스트에서 실제 스트림 발견: ${streamUrl}`);
                  return streamUrl;
                } catch {
                  return nextLine;
                }
              }
              break;
            }
          }
        }

        const match = text.match(/https?:\/\/[^^\n'\"]+\.m3u8/);
        if (match) return match[0];

        return candidate;
      } catch (err) {
        console.warn("resolveCandidate failed", err);
        return candidate;
      }
    }

    async function setup() {
      if (!channel) return;
      setError(null);
      setLoading(true);
      setResolvedUrl(null);

      const candidate = channel.streamUrl ?? resolveStreamFor(channel.slug);
      if (!candidate) {
        setLoading(false);
        setError(null);
        return;
      }

      const video = videoRef.current;
      if (!video) {
        setLoading(false);
        setError("플레이어를 초기화할 수 없습니다.");
        return;
      }

      const finalUrl = await resolveCandidate(candidate);
      if (!mounted) return;
      setResolvedUrl(finalUrl);

      try {
        if (Hls.isSupported()) {
          hls = new Hls({ enableWorker: true });
          hls.loadSource(finalUrl);
          hls.attachMedia(video);

          // Prefer levels that contain video (resolution > 0). If audio-only selected, force a video level.
          hls.on(Hls.Events.MANIFEST_PARSED, function (_event, data: any) {
            try {
              const levels = data?.levels || [];
              // choose highest bandwidth level that has width/height > 0
              let chosen = -1;
              for (let i = 0; i < levels.length; i++) {
                const lvl = levels[i];
                if (lvl && (lvl.width || lvl.height)) {
                  if (chosen === -1 || (lvl.bitrate || lvl.bitrate) > (levels[chosen].bitrate || levels[chosen].bitrate)) {
                    chosen = i;
                  }
                }
              }
              if (chosen >= 0) {
                console.info('Manifest parsed: forcing level', chosen, levels[chosen]);
                hls.startLevel = chosen;
                hls.nextLevel = chosen;
                // restart load to apply
                try { hls.startLoad(); } catch (e) { }
              } else {
                console.info('Manifest parsed: no video levels detected, keeping default');
              }
            } catch (e) {
              console.warn('Error in MANIFEST_PARSED handler', e);
            }
          });

          hls.on(Hls.Events.ERROR, async function (event, data) {
            try {
              console.error("HLS error", JSON.stringify(data));
            } catch (e) {
              console.error("HLS error", data);
            }

            const { type, details, fatal, url: errorUrl } = data as any;
            if (fatal) {
              // levelParsingError often means the playlist is non-standard (missing TARGETDURATION).
              // Try client-side repair to fix the playlist.
              if (details === "levelParsingError") {
                const target = (typeof errorUrl === "string" && errorUrl.endsWith(".m3u8")) ? errorUrl : finalUrl;

                // Attempt in-browser repair of the playlist
                try {
                  const res = await fetch(target, { method: "GET" });
                  if (!res.ok) throw new Error("플레이리스트를 가져올 수 없습니다.");
                  const txt = await res.text();

                  // If master, find a variant
                  let variantUrl: string | null = null;
                  if (txt.includes("#EXT-X-STREAM-INF")) {
                    const lines = txt.split(/\r?\n/).map((l) => l.trim());
                    for (let i = 0; i < lines.length; i++) {
                      if (lines[i].startsWith("#EXT-X-STREAM-INF")) {
                        for (let j = i + 1; j < lines.length; j++) {
                          const cand = lines[j];
                          if (!cand) continue;
                          if (!cand.startsWith("#")) {
                            try {
                              variantUrl = new URL(cand, res.url).toString();
                              break;
                            } catch {
                              variantUrl = cand;
                              break;
                            }
                          }
                        }
                        if (variantUrl) break;
                      }
                    }
                  }

                  const playlistToRepairUrl = variantUrl ?? res.url;
                  const vres = await fetch(playlistToRepairUrl, { method: "GET" });
                  if (!vres.ok) throw new Error("변형 플레이리스트를 가져올 수 없습니다.");
                  let vtext = await vres.text();

                  // Ensure EXT-X-TARGETDURATION exists
                  if (!/EXT-X-TARGETDURATION/i.test(vtext)) {
                    const matches = [...vtext.matchAll(/#EXTINF:([0-9]+(?:\.[0-9]+)?)/gi)].map((m) => parseFloat(m[1]));
                    const max = matches.length ? Math.ceil(Math.max(...matches)) : 6;
                    vtext = vtext.replace(/(#EXTM3U\s*)/i, `$1\n#EXT-X-TARGETDURATION:${max}\n`);
                  }

                  // Convert relative segment URLs to absolute
                  const base = vres.url;
                  const fixed = vtext
                    .split(/\r?\n/)
                    .map((line) => {
                      if (!line || line.startsWith("#")) return line;
                      try {
                        if (/^https?:\/\//i.test(line)) return line;
                        return new URL(line, base).toString();
                      } catch {
                        return line;
                      }
                    })
                    .join("\n");

                  // Create blob URL for repaired playlist and load it
                  const blob = new Blob([fixed], { type: "application/vnd.apple.mpegurl" });
                  const blobUrl = URL.createObjectURL(blob);
                  // destroy existing hls and use new blob
                  hls?.destroy();
                  hls = new Hls({ enableWorker: true });
                  hls.loadSource(blobUrl);
                  hls.attachMedia(video);

                  // revoke blob when unload
                  setTimeout(() => URL.revokeObjectURL(blobUrl), 60 * 1000);

                  return;
                } catch (e) {
                  console.error("client repair failed", e);
                }
              }

              switch (data.type) {
                case Hls.ErrorTypes.NETWORK_ERROR:
                  setError("네트워크 오류 발생 — 재시도 중...");
                  try {
                    hls?.startLoad();
                  } catch (e) {
                    console.error(e);
                  }
                  break;
                case Hls.ErrorTypes.MEDIA_ERROR:
                  setError("미디어 재생 오류 — 복구 시도 중...");
                  try {
                    hls?.recoverMediaError();
                  } catch (e) {
                    console.error("recoverMediaError failed", e);
                  }
                  break;
                default:
                  setError("치명적 플레이어 오류 — 기본 플레이어로 시도합니다.");
                  try {
                    hls?.destroy();
                  } catch (e) { }
                  if (video.canPlayType("application/vnd.apple.mpegurl")) {
                    video.src = finalUrl;
                  }
                  break;
              }
            } else {
              setError(`플레이어 경고: ${type} / ${details}`);
            }
          });
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = finalUrl;
        } else {
          setError("이 브라우저는 HLS 재생을 지원하지 않습니다.");
        }
      } catch (err: any) {
        console.error(err);
        setError(err?.message ?? "스트림을 로드할 수 없습니다.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    setup();

    return () => {
      mounted = false;
      if (hls) {
        try {
          hls.destroy();
        } catch (e) { }
      }
      const v = videoRef.current;
      if (v) v.src = "";
    };
  }, [channel]);

  if (!channel) {
    return (
      <main className="container py-12">
        <h1 className="mb-4 text-2xl font-bold">채널을 찾을 수 없어요</h1>
        <p className="text-muted-foreground">주소가 정확한지 확인해 주세요.</p>
        <div className="mt-6">
          <Button asChild>
            <Link to="/">홈으로 돌아가기</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="container py-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">{channel.name}</h1>
          <p className="mt-1 text-muted-foreground">실시간 채널</p>
        </div>
        <Badge className="bg-red-500 text-white hover:bg-red-500">LIVE</Badge>
      </div>

      <div className="aspect-video w-full overflow-hidden rounded-lg border bg-black">
        {loading && (
          <div className="flex h-full w-full items-center justify-center text-white">
            로딩 중...
          </div>
        )}
        {error && (
          <div className="flex h-full w-full items-center justify-center text-white">
            <div className="text-center max-w-md">
              <p className="mb-2">{error}</p>
              <Button asChild variant="outline">
                <Link to="/">다른 채널 보기</Link>
              </Button>
            </div>
          </div>
        )}
        <video
          ref={videoRef}
          className="h-full w-full bg-black"
          controls
          playsInline
          autoPlay
        />
      </div>

      <div className="mt-6 text-sm text-muted-foreground">
        <p>요청 URL: {resolvedUrl ?? channel.streamUrl ?? resolveStreamFor(channel.slug) ?? "없음"}</p>
      </div>
    </main>
  );
}
