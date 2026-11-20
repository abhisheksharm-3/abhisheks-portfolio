"use client";

/**
 * The about page's hero and the switch between its two readings, the person and the work. The
 * page opens on the person; #work, or #how-i-work from the home page, opens on the work. The
 * readings crossfade, so the switch reads as the same page turning to its other side.
 */
import { AnimatePresence, motion } from "framer-motion";
import { type ReactNode, useSyncExternalStore } from "react";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { cn } from "@/lib/utils";

const READINGS = [
  { key: "person", label: "the person" },
  { key: "work", label: "the work" },
] as const;

type ReadingType = (typeof READINGS)[number]["key"];

const WORK_HASHES = new Set(["#work", "#how-i-work"]);

const subscribe = (onChange: () => void) => {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
};

const readReading = (): ReadingType => (WORK_HASHES.has(window.location.hash) ? "work" : "person");

/** Prerendering has no URL hash, so the server always renders the person. */
const readServerReading = (): ReadingType => "person";

/** Records the reading in the URL without a history entry, then tells the store it changed. */
const choose = (reading: ReadingType) => {
  window.history.replaceState(null, "", reading === "work" ? "#work" : window.location.pathname);
  window.dispatchEvent(new HashChangeEvent("hashchange"));
};

export const AboutReadings = ({ person, work }: { person: ReactNode; work: ReactNode }) => {
  const reading = useSyncExternalStore(subscribe, readReading, readServerReading);

  return (
    <>
      <AboutHero>
        <fieldset className="flex self-start border border-foreground/15">
          <legend className="sr-only">read this page as</legend>
          {READINGS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              aria-pressed={reading === key}
              onClick={() => choose(key)}
              className={cn(
                "cursor-pointer px-4 py-2 text-sm font-light transition-colors duration-200",
                reading === key
                  ? "bg-foreground text-background"
                  : "text-foreground/65 hover:text-foreground",
              )}
            >
              {label}
            </button>
          ))}
        </fieldset>
      </AboutHero>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={reading}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-20 sm:mt-24"
        >
          {reading === "person" ? person : work}
        </motion.div>
      </AnimatePresence>
    </>
  );
};
