import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { channels } from "@/lib/data/channels";
import { resolveStreamFor } from "@/lib/streams";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Hls from "hls.js";
import { usePlayer } from "@/context/player";

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
  const mediaRef = useRef<HTMLMediaElement | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resolvedUrl, setResolvedUrl] = useState<string | null>(null);
  const [showUrl, setShowUrl] = useState(false);
  const [isYouTube, setIsYouTube] = useState(false);
  const player = usePlayer();

  // YouTube URL 감지 함수
  function isYouTubeUrl(url: string): boolean {
    if (!url) return false;
    return url.includes("youtube.com/embed") || url.includes("youtu.be");
  }

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
      setIsYouTube(false);

      const candidate = channel.streamUrl ?? resolveStreamFor(channel.slug);
      if (!candidate) {
        setLoading(false);
        setError(null);
        return;
      }

      // YouTube URL인 경우 iframe으로 처리
      if (isYouTubeUrl(candidate)) {
        if (!mounted) return;
        // YouTube iframe에 최고 품질 파라미터 추가
        let youtubeUrl = candidate;
        if (!youtubeUrl.includes('vq=')) {
          const separator = youtubeUrl.includes('?') ? '&' : '?';
          youtubeUrl += `${separator}vq=hd1080`;
        }
        setResolvedUrl(youtubeUrl);
        setIsYouTube(true);
        setLoading(false);
        // YouTube 재생 시작 시 플레이어 상태 업데이트
        if (channel) player.play(channel.slug);
        return;
      }

      const media = mediaRef.current;
      if (!media) {
        setLoading(false);
        setError("플레이어를 초기화할 수 없습니다.");
        return;
      }

      const finalUrl = await resolveCandidate(candidate);
      if (!mounted) return;
      setResolvedUrl(finalUrl);

      try {
        if (Hls.isSupported()) {
          hls = new Hls({
            enableWorker: true,
            startLevel: -1, // 초기 레벨을 자동으로 설정한 후 최고 품질로 전환
          });
          hls.loadSource(finalUrl);
          hls.attachMedia(media as HTMLMediaElement);

          // attach media event listeners to report play/pause to global player state
          try {
            const el = media as HTMLMediaElement;
            const onPlaying = () => { if (channel) player.play(channel.slug); };
            const onPause = () => { player.pause(); };
            const onEnded = () => { player.stop(); };
            el.addEventListener("playing", onPlaying);
            el.addEventListener("pause", onPause);
            el.addEventListener("ended", onEnded);
            // cleanup later
            const cleanupEvents = () => {
              try { el.removeEventListener("playing", onPlaying); } catch { }
              try { el.removeEventListener("pause", onPause); } catch { }
              try { el.removeEventListener("ended", onEnded); } catch { }
            };
            // store cleanup on hls instance for later teardown
            (hls as any)._cleanupEvents = cleanupEvents;
          } catch (e) {
            console.warn("failed to attach media events", e);
          }

          // Prefer levels that contain video (resolution > 0). If audio-only selected, keep default behavior.
          hls.on(Hls.Events.MANIFEST_PARSED, function (_event, data: any) {
            try {
              const levels = data?.levels || [];
              // choose highest bandwidth level that has width/height > 0
              let chosen = -1;
              let maxBitrate = 0;
              for (let i = 0; i < levels.length; i++) {
                const lvl = levels[i];
                if (lvl && (lvl.width || lvl.height)) {
                  const bitrate = lvl.bitrate || 0;
                  if (chosen === -1 || bitrate > maxBitrate) {
                    chosen = i;
                    maxBitrate = bitrate;
                  }
                }
              }
              if (chosen >= 0) {
                console.info('Manifest parsed: forcing highest quality level', chosen, levels[chosen]);
                // 최고 품질로 고정 (currentLevel 설정 시 자동으로 수동 모드로 전환됨)
                hls.currentLevel = chosen;
                hls.loadLevel = chosen;
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
              // First try client-side repair; if that fails, surface an error (no server proxy available).
              if (details === "levelParsingError") {
                const target = (typeof errorUrl === "string" && errorUrl.endsWith(".m3u8")) ? errorUrl : finalUrl;

                // Attempt in-browser repair of the playlist. Try each variant if master is present.
                try {
                  const res = await fetch(target, { method: "GET" });
                  if (!res.ok) throw new Error("플레이리스트를 가져올 수 없습니다.");
                  const txt = await res.text();

                  // Collect candidate media playlists: if master, list variants; otherwise use the playlist itself
                  const candidates: string[] = [];
                  if (txt.includes("#EXT-X-STREAM-INF")) {
                    const lines = txt.split(/\r?\n/).map((l) => l.trim());
                    for (let i = 0; i < lines.length; i++) {
                      if (lines[i].startsWith("#EXT-X-STREAM-INF")) {
                        for (let j = i + 1; j < lines.length; j++) {
                          const cand = lines[j];
                          if (!cand) continue;
                          if (!cand.startsWith("#")) {
                            try {
                              candidates.push(new URL(cand, res.url).toString());
                            } catch {
                              candidates.push(cand);
                            }
                            break;
                          }
                        }
                      }
                    }
                  } else {
                    candidates.push(res.url);
                  }

                  // Try each candidate variant until one can be repaired and loaded
                  let repairedBlobUrl: string | null = null;
                  for (const candUrl of candidates) {
                    try {
                      const vres = await fetch(candUrl, { method: "GET" });
                      if (!vres.ok) continue;
                      let vtext = await vres.text();

                      // If this looks like a master accidentally, skip
                      if (vtext.includes("#EXT-X-STREAM-INF")) continue;

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

                      const blob = new Blob([fixed], { type: "application/vnd.apple.mpegurl" });
                      repairedBlobUrl = URL.createObjectURL(blob);

                      // load repaired playlist
                      hls?.destroy();
                      hls = new Hls({
                        enableWorker: true,
                        startLevel: -1,
                      });
                      hls.loadSource(repairedBlobUrl);
                      hls.attachMedia(media as HTMLMediaElement);

                      // 복구된 플레이리스트에도 최고 품질 설정 적용
                      hls.on(Hls.Events.MANIFEST_PARSED, function (_event, data: any) {
                        try {
                          const levels = data?.levels || [];
                          let chosen = -1;
                          let maxBitrate = 0;
                          for (let i = 0; i < levels.length; i++) {
                            const lvl = levels[i];
                            if (lvl && (lvl.width || lvl.height)) {
                              const bitrate = lvl.bitrate || 0;
                              if (chosen === -1 || bitrate > maxBitrate) {
                                chosen = i;
                                maxBitrate = bitrate;
                              }
                            }
                          }
                          if (chosen >= 0) {
                            hls.currentLevel = chosen;
                            hls.loadLevel = chosen;
                          }
                        } catch (e) {
                          console.warn('Error in repaired MANIFEST_PARSED handler', e);
                        }
                      });

                      // reflect in UI
                      setResolvedUrl(repairedBlobUrl);
                      setError(null);

                      // schedule revoke after a minute
                      setTimeout(() => URL.revokeObjectURL(repairedBlobUrl as string), 60 * 1000);

                      break;
                    } catch (err) {
                      console.warn("variant repair failed", candUrl, err);
                      continue;
                    }
                  }

                  if (repairedBlobUrl) return;
                } catch (e) {
                  console.error("client repair failed", e);
                }

                // Client repair failed — surface error to user
                setError("플레이리스트 파싱 문제 — 복구에 실패했습니다.");
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
                  if (media.canPlayType("application/vnd.apple.mpegurl")) {
                    (media as HTMLMediaElement).src = finalUrl;
                  }
                  break;
              }
            } else {
              //setError(`플레이어 경고: ${type} / ${details}`);
            }
          });
        } else if (media.canPlayType("application/vnd.apple.mpegurl")) {
          // native HLS support (attach events for player context)
          try {
            const el = media as HTMLMediaElement;
            const onPlaying = () => { if (channel) player.play(channel.slug); };
            const onPause = () => { player.pause(); };
            const onEnded = () => { player.stop(); };
            el.addEventListener("playing", onPlaying);
            el.addEventListener("pause", onPause);
            el.addEventListener("ended", onEnded);
            (el as any)._playerCleanup = () => {
              try { el.removeEventListener("playing", onPlaying); } catch { }
              try { el.removeEventListener("pause", onPause); } catch { }
              try { el.removeEventListener("ended", onEnded); } catch { }
            };
          } catch (e) {
            console.warn("failed to attach native media events", e);
          }
          (media as HTMLMediaElement).src = finalUrl;
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
          // call any stored cleanup events
          try { (hls as any)._cleanupEvents?.(); } catch { }
          hls.destroy();
        } catch (e) { }
      }
      const v = mediaRef.current;
      if (v) {
        try { (v as any)._playerCleanup?.(); } catch { }
        v.src = "";
      }
    };
  }, [channel]);

  if (!channel) {
    return (
      <main className="container py-12">
        <h1 className="mb-4 text-2xl font-bold">채널을 찾을 수 없어요</h1>
        <p className="text-muted-foreground">주소가 정확한지 확인해 주세요.</p>
        <div className="mt-6">
          <Button onClick={() => navigate(-1)}>홈으로 돌아가기</Button>
        </div>
      </main>
    );
  }

  return (
    <main className="container py-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">{channel.name}</h1>
          <div className="mt-1 flex items-center gap-2">
            <p className="text-muted-foreground">{channel.category === "radio" ? "실시간 라디오" : "실시간 채널"}</p>
            {channel.category === "radio" && player.currentSlug === channel.slug && player.isPlaying && (
              <span className="rounded-full bg-green-600/10 px-2 py-0.5 text-xs text-green-500">청취 중</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-red-500 text-white hover:bg-red-500">LIVE</Badge>
        </div>
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
              <Button variant="outline" onClick={() => navigate(-1)}>
                다른 채널 보기
              </Button>
            </div>
          </div>
        )}
        {isYouTube && resolvedUrl ? (
          <iframe
            src={resolvedUrl}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={channel.name}
          />
        ) : channel.category === "radio" ? (
          <audio
            ref={mediaRef as any}
            className="h-full w-full bg-black"
            controls
            autoPlay
          />
        ) : (
          <video
            ref={mediaRef as any}
            className="h-full w-full bg-black"
            controls
            playsInline
            autoPlay
          />
        )}
      </div>

      <div className="mt-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-3">
          <button className="text-xs underline" onClick={() => setShowUrl((s) => !s)}>{showUrl ? "요청 URL 숨기기" : "요청 URL 표시"}</button>
        </div>
        {showUrl && (
          <p className="mt-2 break-all">{resolvedUrl ?? channel.streamUrl ?? resolveStreamFor(channel.slug) ?? "없음"}</p>
        )}
      </div>
    </main>
  );
}
