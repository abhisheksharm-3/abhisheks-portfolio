"use client";

/**
 * The about page's Spotify data: most played tracks as covers that play in Spotify's player when
 * chosen, most played artists, the newest liked songs, and the hours the last 50 plays happened.
 * Names keep Spotify's casing.
 */
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { type ReactNode, useState } from "react";
import { SpotifyEmbed } from "@/components/sections/about/SpotifyEmbed";
import type { SpotifyItemType, SpotifyTopType, SpotifyTrackType } from "@/lib/types/spotify";
import { cn } from "@/lib/utils";

const LABEL_CLASS = "text-[11px] uppercase tracking-[0.2em] font-light text-primary/60";
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const TRACK_RANGES = [
  { key: "tracksMonth", label: "this month" },
  { key: "tracksHalfYear", label: "6 months" },
  { key: "tracksYear", label: "this year" },
] as const;

const ARTIST_RANGES = [
  { key: "artistsMonth", label: "this month" },
  { key: "artistsYear", label: "this year" },
] as const;

const SHORT_DATE = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short" });

/** A section label with a row of range buttons beside it. */
const RangeHeader = <KeyType extends string>({
  title,
  ranges,
  value,
  onChange,
}: {
  title: string;
  ranges: readonly { key: KeyType; label: string }[];
  value: KeyType;
  onChange: (key: KeyType) => void;
}) => (
  <div className="mb-5 flex flex-wrap items-baseline gap-x-6 gap-y-2">
    <p className={LABEL_CLASS}>{title}</p>
    <div className="flex gap-4 font-mono text-[11px]">
      {ranges.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          aria-pressed={value === key}
          onClick={() => onChange(key)}
          className={cn(
            "cursor-pointer underline-offset-4 transition-colors duration-200",
            value === key
              ? "text-foreground underline decoration-foreground/30"
              : "text-foreground/60 hover:text-foreground/85",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  </div>
);

/** Crossfades its children when the key changes, so a range switch reads as the same list updating. */
const Swap = ({ swapKey, children }: { swapKey: string; children: ReactNode }) => (
  <AnimatePresence mode="wait" initial={false}>
    <motion.div
      key={swapKey}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

const CoverRow = ({
  tracks,
  playingId,
  onPlay,
}: {
  tracks: SpotifyTrackType[];
  playingId: string | null;
  onPlay: (id: string | null) => void;
}) => (
  <ol className="-mx-6 flex snap-x gap-4 overflow-x-auto px-6 pb-2 sm:mx-0 sm:grid sm:grid-cols-5 sm:overflow-visible sm:px-0">
    {tracks.map((track) => {
      const isPlaying = track.id === playingId;
      return (
        <li key={track.id} className="w-36 shrink-0 snap-start sm:w-auto">
          <button
            type="button"
            aria-pressed={isPlaying}
            onClick={() => onPlay(isPlaying ? null : track.id)}
            className="group w-full cursor-pointer text-left"
          >
            <span
              className={cn(
                "relative block aspect-square overflow-hidden border transition-colors duration-200",
                isPlaying
                  ? "border-foreground/60"
                  : "border-foreground/10 group-hover:border-foreground/30",
              )}
            >
              {track.image && (
                <Image
                  src={track.image}
                  alt={`cover art for ${track.name}`}
                  fill
                  sizes="(min-width: 640px) 18vw, 144px"
                  className="object-cover"
                />
              )}
            </span>
            <span className="mt-2.5 block truncate text-sm text-foreground/85">{track.name}</span>
            <span className="block truncate text-xs font-light text-foreground/60">
              {isPlaying ? "■ playing below" : track.artists}
            </span>
          </button>
        </li>
      );
    })}
  </ol>
);

const ArtistRow = ({ artists }: { artists: SpotifyItemType[] }) => (
  <ol className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-5">
    {artists.map((artist, index) => (
      <li key={artist.id}>
        <a
          href={artist.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3"
        >
          {artist.image && (
            <span className="relative size-12 shrink-0 overflow-hidden rounded-full border border-foreground/10">
              <Image src={artist.image} alt="" fill sizes="48px" className="object-cover" />
            </span>
          )}
          <span className="min-w-0">
            <span className="block font-mono text-[11px] text-foreground/60">0{index + 1}</span>
            <span className="block truncate text-sm text-foreground/85 transition-colors duration-200 group-hover:text-foreground">
              {artist.name}
            </span>
          </span>
        </a>
      </li>
    ))}
  </ol>
);

const LikedList = ({ liked }: { liked: SpotifyTopType["liked"] }) => (
  <ol className="divide-y divide-primary/10 border-y border-primary/10">
    {liked.map((track) => (
      <li key={track.id}>
        <a
          href={track.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 py-3"
        >
          {track.image && (
            <span className="relative size-10 shrink-0 border border-foreground/10">
              <Image src={track.image} alt="" fill sizes="40px" className="object-cover" />
            </span>
          )}
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm text-foreground/85 transition-colors duration-200 group-hover:text-foreground">
              {track.name}
            </span>
            <span className="block truncate text-xs font-light text-foreground/60">
              {track.artists}
            </span>
          </span>
          <span className="shrink-0 font-mono text-[11px] text-foreground/60">
            {SHORT_DATE.format(new Date(track.addedAt)).toLowerCase()}
          </span>
        </a>
      </li>
    ))}
  </ol>
);

const HOURS = Array.from({ length: 24 }, (_, hour) => hour);
const HOUR_TICKS = [0, 6, 12, 18];

/** One column per hour of the day in Pune time, darker for more of the last 50 plays. */
const HourStrip = ({ counts }: { counts: number[] }) => {
  const peak = Math.max(...counts, 1);
  const busiest = counts.indexOf(peak);
  return (
    <div>
      <div
        role="img"
        aria-label={`last 50 plays by hour, most around ${busiest}:00`}
        className="grid h-16 grid-cols-24 items-end gap-0.5"
      >
        {HOURS.map((hour) => (
          <span
            key={hour}
            title={`${hour}:00 · ${counts[hour]} plays`}
            style={{ height: `${Math.max((counts[hour] / peak) * 100, 4)}%` }}
            className={counts[hour] ? "bg-foreground/50" : "bg-foreground/8"}
          />
        ))}
      </div>
      <div className="mt-2 grid grid-cols-4 font-mono text-[11px] text-foreground/60">
        {HOUR_TICKS.map((hour) => (
          <span key={hour}>{String(hour).padStart(2, "0")}:00</span>
        ))}
      </div>
    </div>
  );
};

type TrackRangeType = (typeof TRACK_RANGES)[number]["key"];
type ArtistRangeType = (typeof ARTIST_RANGES)[number]["key"];

export const ListeningPanel = ({ top }: { top: SpotifyTopType }) => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [trackRange, setTrackRange] = useState<TrackRangeType>("tracksMonth");
  const [artistRange, setArtistRange] = useState<ArtistRangeType>("artistsMonth");
  const playing = top[trackRange].find((track) => track.id === playingId);
  const hasPlays = top.hourCounts.some(Boolean);

  return (
    <div className="space-y-14">
      <div>
        <RangeHeader
          title="on repeat"
          ranges={TRACK_RANGES}
          value={trackRange}
          onChange={setTrackRange}
        />
        <Swap swapKey={trackRange}>
          <CoverRow tracks={top[trackRange]} playingId={playingId} onPlay={setPlayingId} />
        </Swap>
        <AnimatePresence initial={false}>
          {playing && (
            <motion.div
              key="player"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              className="overflow-hidden"
            >
              <div className="max-w-2xl pt-6">
                <SpotifyEmbed key={playing.id} id={playing.id} title={playing.name} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div>
        <RangeHeader
          title="most played artists"
          ranges={ARTIST_RANGES}
          value={artistRange}
          onChange={setArtistRange}
        />
        <Swap swapKey={artistRange}>
          <ArtistRow artists={top[artistRange]} />
        </Swap>
      </div>

      {(top.liked.length > 0 || hasPlays) && (
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-16">
          {top.liked.length > 0 && (
            <div>
              <p className={`${LABEL_CLASS} mb-5`}>just liked</p>
              <LikedList liked={top.liked} />
            </div>
          )}
          {hasPlays && (
            <div>
              <p className={`${LABEL_CLASS} mb-5`}>when i listen · last 50 plays, ist</p>
              <HourStrip counts={top.hourCounts} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
