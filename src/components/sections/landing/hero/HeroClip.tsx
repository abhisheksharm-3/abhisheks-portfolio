"use client";

import { useEffect, useState } from "react";
import { LoopVideo } from "@/components/shared/LoopVideo";
import { HERO_CLIPS } from "@/data/site-media";

const STORAGE_KEY = "hero-clip";

/** The index after the one this browser saw last; the first clip when storage is empty or blocked. */
const readNextIndex = () => {
  try {
    const last = Number.parseInt(window.localStorage.getItem(STORAGE_KEY) ?? "", 10);
    const next = Number.isNaN(last) ? 0 : (last + 1) % HERO_CLIPS.length;
    window.localStorage.setItem(STORAGE_KEY, String(next));
    return next;
  } catch {
    return 0;
  }
};

/**
 * The clip chosen for this page load. Kept outside the component so a second run of the effect
 * (React's development double-invoke, or returning to home without a reload) reuses it instead of
 * advancing again.
 */
let chosenIndex: number | null = null;

const pickIndex = () => {
  chosenIndex ??= readNextIndex();
  return chosenIndex;
};

/**
 * The home hero's clip, a different one on each visit. The page is prerendered once for everyone,
 * so the choice is made in the browser after mount; the frame holds its 4:5 shape meanwhile and
 * the chosen clip fades in, so nothing swaps in front of the reader.
 */
export const HeroClip = () => {
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    setIndex(pickIndex());
  }, []);

  const clip = index === null ? null : HERO_CLIPS[index];

  return (
    <figure className="w-full max-w-sm md:ml-auto md:max-w-md">
      <div className="relative aspect-[4/5] overflow-hidden border border-foreground/10 bg-foreground/[0.04]">
        {clip && (
          <div className="absolute inset-0 animate-in fade-in duration-500 motion-reduce:animate-none">
            <LoopVideo key={clip.video} video={clip.video} poster={clip.src} alt={clip.alt} />
          </div>
        )}
      </div>
      <figcaption className="mt-2 min-h-[1lh] font-mono text-[11px] text-foreground/60">
        {clip?.caption}
      </figcaption>
    </figure>
  );
};
