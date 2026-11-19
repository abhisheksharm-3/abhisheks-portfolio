"use client";

/**
 * The about portrait. When Spotify has a track, a badge says so and a click turns the portrait over
 * to the album cover, while a caption opens underneath with the song, its progress and what plays
 * next: the turn explains where the song came from. Reduced motion swaps the faces instantly.
 * Nothing sits on top of the cover, as Spotify's artwork guidelines require.
 */
import { RiSpotifyFill } from "@remixicon/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { type ReactNode, useState } from "react";
import { SpotifyEmbed } from "@/components/sections/about/SpotifyEmbed";
import { useListening } from "@/hooks/useListening";
import { toListenedWhen } from "@/lib/listened-when";
import type { SpotifyTrackType } from "@/lib/types/spotify";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const FACE_CLASS = "absolute inset-0 overflow-hidden [backface-visibility:hidden]";
const ACTION_CLASS =
  "cursor-pointer font-mono text-[11px] text-foreground/60 transition-colors duration-200 hover:text-foreground";
const DEVICE_LABELS: Record<string, string> = {
  computer: "on my laptop",
  smartphone: "on my phone",
};

/** "3:58" from milliseconds. */
const toClock = (ms: number) => {
  const seconds = Math.round(ms / 1000);
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
};

/**
 * A hairline that fills at the song's own pace from the progress Spotify last reported, so it moves
 * between the 30-second polls. Under reduced motion it holds the reported position.
 */
const ProgressLine = ({ progressMs, durationMs }: { progressMs: number; durationMs: number }) => {
  const isReduced = useReducedMotion();
  const start = Math.min(progressMs / durationMs, 1);
  return (
    <div className="flex items-center gap-3 font-mono text-[11px] text-foreground/60 tabular-nums">
      <div className="relative h-px flex-1 bg-foreground/15">
        <motion.div
          key={`${progressMs}`}
          initial={{ scaleX: start }}
          animate={{ scaleX: isReduced ? start : 1 }}
          transition={{ duration: (durationMs - progressMs) / 1000, ease: "linear" }}
          className="absolute inset-0 origin-left bg-foreground/60"
        />
      </div>
      {toClock(durationMs)}
    </div>
  );
};

const UpNext = ({ tracks }: { tracks: SpotifyTrackType[] }) => (
  <div>
    <p className="mb-2 font-mono text-[11px] text-foreground/60">up next</p>
    <ol className="space-y-2">
      {tracks.map((track) => (
        <li key={track.id}>
          <a
            href={track.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3"
          >
            {track.image && (
              <span className="relative size-8 shrink-0 border border-foreground/10">
                <Image src={track.image} alt="" fill sizes="32px" className="object-cover" />
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

export const PortraitFlip = ({ children }: { children: ReactNode }) => {
  const { data: track } = useListening();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!track) {
    return <div className="relative aspect-square w-full overflow-hidden">{children}</div>;
  }

  const isLive = track.playedAt === null;
  const where = track.device && (DEVICE_LABELS[track.device] ?? `on a ${track.device}`);
  const label = isLive
    ? ["now playing", where].filter(Boolean).join(" · ")
    : `last played · ${toListenedWhen(track.playedAt)}`;

  return (
    <div>
      <div className="relative aspect-square w-full [perspective:1400px]">
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="relative size-full [transform-style:preserve-3d]"
        >
          <button
            type="button"
            inert={isFlipped}
            onClick={() => setIsFlipped(true)}
            aria-label={`${label}: ${track.name} by ${track.artists}. turn the portrait over`}
            className={`${FACE_CLASS} group cursor-pointer text-left`}
          >
            {children}
            <span className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-background/85 py-1 pr-2.5 pl-1.5 font-mono text-[11px] text-foreground/85 transition-colors duration-200 group-hover:bg-background">
              <RiSpotifyFill aria-hidden="true" className="size-[21px]" />
              {label}
            </span>
          </button>

          <button
            type="button"
            inert={!isFlipped}
            onClick={() => setIsFlipped(false)}
            aria-label="turn the portrait back"
            className={`${FACE_CLASS} cursor-pointer border border-foreground/10 [transform:rotateY(180deg)]`}
          >
            {track.image && (
              <Image
                src={track.image}
                alt={`cover art for ${track.name}`}
                fill
                sizes="(min-width: 1024px) 30vw, 90vw"
                className="object-cover"
              />
            )}
          </button>
        </motion.div>
      </div>

      <AnimatePresence initial={false}>
        {isFlipped && (
          <motion.div
            key="caption"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <div className="space-y-4 pt-5">
              <p className="flex items-center gap-1.5 font-mono text-[11px] text-foreground/60">
                <RiSpotifyFill aria-label="Spotify" className="size-[21px]" />
                {label}
              </p>
              <div className="min-w-0">
                <p className="font-serif text-2xl italic leading-tight text-foreground/90">
                  {track.name}
                </p>
                <p className="mt-1 text-sm font-light text-foreground/65">{track.artists}</p>
              </div>
              {isLive && track.progressMs !== null && (
                <ProgressLine progressMs={track.progressMs} durationMs={track.durationMs} />
              )}
              {isPlaying && <SpotifyEmbed id={track.id} title={track.name} />}
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {!isPlaying && (
                  <button type="button" onClick={() => setIsPlaying(true)} className={ACTION_CLASS}>
                    ▶ play here
                  </button>
                )}
                <a
                  href={track.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={ACTION_CLASS}
                >
                  open in Spotify ↗
                </a>
                <button type="button" onClick={() => setIsFlipped(false)} className={ACTION_CLASS}>
                  turn back ↺
                </button>
              </div>
              {track.upNext.length > 0 && <UpNext tracks={track.upNext} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
