"use client";

/** On a 404, shows the path that was typed and morphs it into the closest real page, when one is close. */
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { NAVIGATION_ITEMS } from "@/data/navigation";
import { projects } from "@/data/projects";
import { TextMorph } from "./TextMorph";

const KNOWN_PATHS = [
  ...NAVIGATION_ITEMS.map((item) => item.href),
  ...projects.map((project) => `/projects/${project.slug}`),
];

const CORRECTION_DELAY_MS = 700;

/** Levenshtein distance: the fewest single-character edits that turn one string into the other. */
const editDistance = (from: string, to: string) => {
  let previous = Array.from({ length: to.length + 1 }, (_, index) => index);
  for (let i = 1; i <= from.length; i++) {
    const current = [i];
    for (let j = 1; j <= to.length; j++) {
      const substitution = previous[j - 1] + (from[i - 1] === to[j - 1] ? 0 : 1);
      current[j] = Math.min(previous[j] + 1, current[j - 1] + 1, substitution);
    }
    previous = current;
  }
  return previous[to.length];
};

/**
 * The real path this one was most likely meant to be. A typo is at most a third of the path's
 * characters away; anything further is a different page, so there is no suggestion.
 */
const closestPath = (typed: string) => {
  const normalized = typed.toLowerCase().replace(/\/+$/, "") || "/";
  const ranked = KNOWN_PATHS.map((path) => ({
    path,
    distance: editDistance(normalized, path),
  })).sort((a, b) => a.distance - b.distance);
  const best = ranked[0];
  const isTypo =
    best.path !== typed && best.distance <= Math.max(2, Math.floor(normalized.length / 3));
  return isTypo ? best.path : null;
};

const subscribeToNothing = () => () => {};

const readBrowserPath = () => window.location.pathname;

/**
 * The 404 is prerendered once for every missing URL, so the server cannot know the typed path.
 * It renders nothing there, and the browser fills the suggestion in after hydration without a mismatch.
 */
const readNoPath = () => null;

/** `onMedia` sets the line in white for use over a photo or clip. */
export const PathSuggestion = ({ onMedia = false }: { onMedia?: boolean }) => {
  const typed = useSyncExternalStore(subscribeToNothing, readBrowserPath, readNoPath);
  const suggestion = typed ? closestPath(typed) : null;
  const [isCorrected, setIsCorrected] = useState(false);

  useEffect(() => {
    if (!suggestion) return;
    const timer = window.setTimeout(() => setIsCorrected(true), CORRECTION_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [suggestion]);

  if (!typed || !suggestion) return null;

  return (
    <p
      className={`flex flex-wrap items-baseline gap-x-2 font-mono text-sm ${onMedia ? "mt-5 text-white/75" : "mb-10 text-foreground/60"}`}
    >
      <TextMorph>{isCorrected ? "did you mean" : "you typed"}</TextMorph>
      <Link
        href={suggestion}
        className={`underline underline-offset-4 transition-colors duration-200 ${onMedia ? "text-white decoration-white/40 hover:decoration-white" : "text-foreground/85 decoration-foreground/15 hover:decoration-foreground"}`}
      >
        <TextMorph>{isCorrected ? suggestion : typed}</TextMorph>
      </Link>
    </p>
  );
};
