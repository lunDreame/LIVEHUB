import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Channel } from "@/lib/data/channels";
import { Headphones, Play } from "lucide-react";
import { usePlayer } from "@/context/player";

function hueFromString(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 360;
  return h;
}

export default function ChannelCard({ channel, currentCategory }: { channel: Channel; currentCategory?: string }) {
  const hue = hueFromString(channel.name);
  const initials = channel.name
    .replace(/[^A-Za-z0-9가-힣 ]/g, "")
    .split(" ")
    .map((p) => p.charAt(0))
    .join("")
    .slice(0, 3)
    .toUpperCase();

  const player = usePlayer();
  const isPlaying = player.currentSlug === channel.slug && player.isPlaying;

  return (
    <Link to={`/channel/${channel.slug}`} state={{ fromCategory: currentCategory }} aria-label={`${channel.name} ${channel.category === "radio" ? "청취" : "시청하기"}`}>
      <Card className="group relative overflow-hidden transition hover:shadow-lg">
        <div className="aspect-video w-full">
          <div
            className="flex h-full w-full items-center justify-center bg-gradient-to-br text-2xl font-bold text-white"
            style={{
              backgroundImage: `linear-gradient(135deg, hsl(${hue} 70% 45%) 0%, hsl(${(hue + 40) % 360} 70% 45%) 100%)`,
            }}
          >
            <span className="drop-shadow-lg">{initials}</span>
          </div>
        </div>
        <div className="flex items-center justify-between p-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{channel.name}</p>
            <p className="truncate text-xs text-muted-foreground">{channel.category === "radio" ? "실시간 라디오" : "실시간 방송"}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-red-500 text-white hover:bg-red-500">LIVE</Badge>
            {isPlaying && (
              <span className="inline-flex items-center gap-2 rounded-md bg-green-600/10 px-2 py-1 text-xs text-foreground">
                <Play className="h-3 w-3 text-green-500" />
                재생중
              </span>
            )}
          </div>
        </div>
        <div className="absolute inset-0 hidden items-center justify-center bg-black/30 text-white backdrop-blur-sm group-hover:flex">
          {channel.category === "radio" ? (
            <span className="rounded-md bg-white/20 px-3 py-1 text-sm inline-flex items-center gap-2">
              <Headphones className="h-4 w-4" />
              청취
            </span>
          ) : (
            <span className="rounded-md bg-white/20 px-3 py-1 text-sm">시청하기</span>
          )}
        </div>
      </Card>
    </Link>
  );
}
