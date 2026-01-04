import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Moon, Sun, Tv, Headphones } from "lucide-react";
import { useEffect, useState } from "react";
import { usePlayer } from "@/context/player";
import { channels } from "@/lib/data/channels";

export default function SiteHeader() {
  const { pathname } = useLocation();
  const [dark, setDark] = useState<boolean>(false);
  const player = usePlayer();

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const isDark = root.classList.toggle("dark");
    setDark(isDark);
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch { }
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "dark") {
        document.documentElement.classList.add("dark");
        setDark(true);
      }
    } catch { }
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="group inline-flex items-center gap-2">
          <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-primary to-fuchsia-500 text-white shadow-sm">
            <Tv className="h-5 w-5" />
          </span>
          <div className="flex items-center gap-3">
            <span className="text-lg font-extrabold tracking-tight">라이브허브</span>
            {player.currentSlug && (
              (() => {
                const found = channels.find((c) => c.slug === player.currentSlug);
                const name = found ? found.name : player.currentSlug;
                return (
                  <span className="inline-flex items-center gap-2 rounded-full bg-green-600/10 px-2 py-1 text-xs text-foreground">
                    <Headphones className="h-4 w-4 text-green-500" />
                    <span className="truncate max-w-[10rem]">{name}</span>
                    <span className="ml-1 inline-block h-2 w-2 animate-pulse rounded-full bg-green-500" />
                  </span>
                );
              })()
            )}
          </div>
        </Link>

        <nav className="hidden gap-6 md:flex">
          <Link
            to="/"
            className={cn(
              "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
              pathname === "/" && "text-foreground",
            )}
          >
            홈
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="테마 전환">
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  );
}
