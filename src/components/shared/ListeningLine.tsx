"use client";

import { RiSpotifyFill } from "@remixicon/react";
import Image from "next/image";
import type { ReactNode } from "react";
import { useListening } from "@/hooks/useListening";
import { toDeviceLabel, toListenedWhen } from "@/lib/listened-when";

/**
 * One line of what's playing: the album cover, a mono label, and the track as Spotify names it,
 * linking back to Spotify with its icon. `prefix` goes before the label, such as a place and time.
 * Renders nothing until Spotify answers, so the line never shows an empty state.
 */
export const ListeningLine = ({ prefix }: { prefix?: ReactNode }) => {
  const { data: track } = useListening();
  if (!track) return null;

  const label = track.playedAt
    ? `last played · ${toListenedWhen(track.playedAt)}`
    : `now playing${track.device ? ` · ${toDeviceLabel(track.device)}` : ""}`;

  return (
    <a
      href={track.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 border-t border-foreground/10 pt-4 animate-in fade-in duration-300 motion-reduce:animate-none"
    >
      {track.image && (
        <Image
          src={track.image}
          alt=""
          width={48}
          height={48}
          className="size-12 shrink-0 border border-foreground/10"
        />
      )}
      <span className="flex min-w-0 flex-col gap-1">
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-foreground/60">
          <RiSpotifyFill aria-label="Spotify" className="size-3.5 shrink-0" />
          {prefix}
          {label}
        </span>
        <span className="truncate text-sm text-foreground/85 transition-colors duration-200 group-hover:text-foreground">
          {track.name} · {track.artists}
        </span>
      </span>
    </a>
  );
};
