"use client";

/**
 * The live Spotify card: the album cover beside the song, where it's playing and
 * what's queued next, or the last song and when it played. Nothing sits on the cover, and names
 * keep Spotify's casing, as its guidelines require. Hidden while loading or when Spotify fails.
 */
import { RiSpotifyFill } from "@remixicon/react";
import Image from "next/image";
import { type ReactNode, useState } from "react";
import { LIST_HEADING_CLASS } from "@/components/sections/about/ListeningPanel";
import { SpotifyEmbed } from "@/components/sections/about/SpotifyEmbed";
import { useListening } from "@/hooks/useListening";
import { toDeviceLabel, toListenedWhen } from "@/lib/listened-when";
import type { SpotifyTrackType } from "@/lib/types/spotify";

const ACTION_CLASS =
  "cursor-pointer font-mono text-[11px] text-foreground/60 transition-colors duration-200 hover:text-foreground";
const UpNext = ({ tracks }: { tracks: SpotifyTrackType[] }) => (
  <div>
    <h3 className={`${LIST_HEADING_CLASS} mb-4`}>up next</h3>
    <ol className="space-y-2.5">
      {tracks.map((track) => (
        <li key={track.id}>
          <a
            href={track.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3"
          >
            {track.image && (
              <span className="relative size-10 shrink-0 border border-foreground/10">
                <Image src={track.image} alt="" fill sizes="40px" className="object-cover" />
              </span>
            )}
            <span className="min-w-0 truncate text-sm font-light text-foreground/65 transition-colors duration-200 group-hover:text-foreground">
              {track.name} · {track.artists}
            </span>
          </a>
        </li>
      ))}
    </ol>
  </div>
);

/**
 * The listening section's top half: the cover, song and controls in one column, and beside them
 * what's queued next plus whatever the page passes in (the liked list and the heatmap). Without a
 * live track the aside still renders on its own.
 */
export const NowPlaying = ({ aside }: { aside: ReactNode }) => {
  const { data: track } = useListening();
  const [isPlaying, setIsPlaying] = useState(false);

  if (!track) {
    return <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">{aside}</div>;
  }

  const isLive = track.playedAt === null;
  const where = track.device && toDeviceLabel(track.device);
  const label = isLive
    ? ["now playing", where].filter(Boolean).join(" · ")
    : `last played · ${toListenedWhen(track.playedAt)}`;

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
      <div className="flex min-w-0 flex-col gap-5">
        {track.image && (
          <a
            href={track.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative block aspect-square w-full max-w-md border border-foreground/10"
          >
            <Image
              src={track.image}
              alt={`cover art for ${track.name}`}
              fill
              sizes="(min-width: 1024px) 35vw, 90vw"
              className="object-cover"
            />
          </a>
        )}
        <p className="flex items-center gap-1.5 font-mono text-[11px] text-foreground/60">
          <RiSpotifyFill aria-label="Spotify" className="size-[21px]" />
          {label}
        </p>
        <div>
          <p className="font-serif text-3xl leading-tight text-foreground/90">{track.name}</p>
          <p className="mt-1.5 font-light text-foreground/65">{track.artists}</p>
        </div>
        {isPlaying ? (
          <SpotifyEmbed id={track.id} title={track.name} />
        ) : (
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <button type="button" onClick={() => setIsPlaying(true)} className={ACTION_CLASS}>
              ▶ play here
            </button>
            <a href={track.url} target="_blank" rel="noopener noreferrer" className={ACTION_CLASS}>
              open in Spotify ↗
            </a>
          </div>
        )}
      </div>
      <div className="flex min-w-0 flex-col gap-12">
        {track.upNext.length > 0 && <UpNext tracks={track.upNext} />}
        {aside}
      </div>
    </div>
  );
};
