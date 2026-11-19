"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import type { TocEntry } from "@/lib/content/loader";

const LINK_BASE = "font-light transition-colors duration-200";

const ACTIVE_LINE = 0.3;

/**
 * The id of the section the reader is in: the last heading at or above a line a
 * third of the way down the viewport. IntersectionObserver only says when a
 * heading crosses the upper band, so each callback re-reads every heading's
 * position, which also settles the right entry after an anchor jump or a reload.
 */
function useActiveSection(entries: TocEntry[]) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const headings = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((heading): heading is HTMLElement => heading !== null);

    const observer = new IntersectionObserver(
      () => {
        const line = window.innerHeight * ACTIVE_LINE;
        const passed = headings.filter((heading) => heading.getBoundingClientRect().top <= line);
        setActiveId(passed.at(-1)?.id ?? null);
      },
      { rootMargin: "-10% 0px -70% 0px" },
    );

    for (const heading of headings) observer.observe(heading);

    return () => observer.disconnect();
  }, [entries]);

  return activeId;
}

const TocNumber = ({ index, active }: { index: number; active?: boolean }) => (
  <span
    className={`pt-1 font-mono text-[10px] tabular-nums transition-colors duration-200 ${
      active ? "text-primary/90" : "text-primary/60"
    }`}
  >
    {String(index + 1).padStart(2, "0")}
  </span>
);

const RailToc = ({ entries }: { entries: TocEntry[] }) => {
  const activeId = useActiveSection(entries);

  return (
    <nav aria-label="On this page">
      <p className="mb-4 text-[11px] font-light uppercase tracking-[0.2em] text-primary/60">
        on this page
      </p>
      <ol className="space-y-3">
        {entries.map((entry, index) => {
          const active = entry.id === activeId;
          return (
            <li className="flex gap-3" key={entry.id}>
              <TocNumber active={active} index={index} />
              <a
                aria-current={active ? "location" : undefined}
                className={`${LINK_BASE} text-[13px] leading-snug ${
                  active ? "text-foreground/90" : "text-foreground/60 hover:text-foreground/85"
                }`}
                href={`#${entry.id}`}
              >
                {entry.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

const InlineToc = ({ entries }: { entries: TocEntry[] }) => (
  <details className="group mb-8 xl:hidden">
    <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between text-sm font-light text-foreground/60 transition-colors duration-200 hover:text-foreground/85 focus-visible:outline-1 focus-visible:outline-foreground/40 [&::-webkit-details-marker]:hidden">
      <span>on this page · {entries.length} sections</span>
      <ChevronDown
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-200 group-open:rotate-180"
      />
    </summary>
    <nav aria-label="On this page" className="border-b border-foreground/8 pt-2 pb-6">
      <ol className="space-y-2.5">
        {entries.map((entry, index) => (
          <li className="flex gap-3" key={entry.id}>
            <TocNumber index={index} />
            <a
              className={`${LINK_BASE} text-sm text-foreground/60 hover:text-foreground/85`}
              href={`#${entry.id}`}
            >
              {entry.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  </details>
);

/**
 * In-page navigation for posts that run two to four thousand words. Plain anchors,
 * so it works without JavaScript and gives answer engines linkable sections.
 *
 * The rail sticks beside the article on wide screens and marks the section in
 * view. Below that it is a closed disclosure above the body, so the first
 * paragraph is on screen on arrival.
 */
export const PostToc = ({
  entries,
  variant = "inline",
}: {
  entries: TocEntry[];
  variant?: "inline" | "rail";
}) => {
  if (entries.length < 3) return null;

  return variant === "rail" ? <RailToc entries={entries} /> : <InlineToc entries={entries} />;
};
