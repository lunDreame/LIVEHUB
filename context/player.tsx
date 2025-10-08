import React, { createContext, useContext, useState, ReactNode } from "react";

type PlayerState = {
  currentSlug: string | null;
  isPlaying: boolean;
  play: (slug: string) => void;
  pause: () => void;
  stop: () => void;
};

const PlayerContext = createContext<PlayerState>({
  currentSlug: null,
  isPlaying: false,
  play: () => {},
  pause: () => {},
  stop: () => {},
});

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentSlug, setCurrentSlug] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function play(slug: string) {
    setCurrentSlug(slug);
    setIsPlaying(true);
  }
  function pause() {
    setIsPlaying(false);
  }
  function stop() {
    setIsPlaying(false);
    setCurrentSlug(null);
  }

  return (
    <PlayerContext.Provider value={{ currentSlug, isPlaying, play, pause, stop }}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}
