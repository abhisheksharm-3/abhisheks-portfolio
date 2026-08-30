import type { TocEntry } from "@/lib/content/loader";

/**
 * In-page navigation for posts that run two to four thousand words. Plain anchors,
 * so it works without JavaScript and gives answer engines linkable sections.
 *
 * The rail sticks beside the article on wide screens; below that it falls back to
 * a block above the body, where there is no room for a column.
 */
export const PostToc = ({
  entries,
  variant = "inline",
}: {
  entries: TocEntry[];
  variant?: "inline" | "rail";
}) => {
  if (entries.length < 3) return null;

  const isRail = variant === "rail";

  return (
    <nav
      aria-label="On this page"
      className={isRail ? "" : "mb-14 border-y border-foreground/8 py-6 xl:hidden"}
    >
      <p className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light mb-4">
        on this page
      </p>
      <ol className={isRail ? "space-y-3" : "space-y-2.5"}>
        {entries.map((entry, index) => (
          <li className="flex gap-3" key={entry.id}>
            <span className="text-[10px] font-mono text-primary/25 pt-1 tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <a
              className={`font-light text-foreground/45 hover:text-foreground/85 transition-colors duration-200 ${
                isRail ? "text-[13px] leading-snug" : "text-sm"
              }`}
              href={`#${entry.id}`}
            >
              {entry.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};
