import Link from "next/link";
import type { ElementType, ReactNode } from "react";

/**
 * A page section: a serif heading with an optional mono note beside it (a source, a
 * count, a range), over its content.
 */
export const ContentBlock = ({
  label,
  note,
  id,
  children,
}: {
  label: string;
  note?: ReactNode;
  id?: string;
  children: ReactNode;
}) => (
  <section id={id} aria-label={label} className="min-w-0 scroll-mt-32">
    <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-primary/10 pb-4">
      <h2 className="font-serif text-3xl text-foreground sm:text-4xl">{label}</h2>
      {note && <div className="font-mono text-[11px] text-foreground/60">{note}</div>}
    </div>
    {children}
  </section>
);

/** One row of an icon list: an icon in a square, a serif title, a mono line under it. */
export interface IconRowType {
  icon: ElementType;
  title: ReactNode;
  sub: ReactNode;
  href?: string;
  aside?: ReactNode;
}

const isExternal = (href: string) => href.startsWith("http");

const RowBody = ({ icon: Icon, title, sub, href, aside }: IconRowType) => (
  <>
    <span className="flex size-12 shrink-0 items-center justify-center border border-foreground/10 text-foreground/70 transition-colors duration-200 group-hover:border-foreground/30 group-hover:text-foreground">
      <Icon aria-hidden className="size-5" />
    </span>
    <span className="min-w-0 flex-1">
      <span className="block font-serif text-xl leading-snug text-foreground/90 transition-colors duration-200 group-hover:text-foreground sm:text-2xl">
        {title}
      </span>
      <span className="mt-0.5 block font-mono text-[11px] text-foreground/60">{sub}</span>
    </span>
    {aside && <span className="shrink-0 font-mono text-[11px] text-foreground/60">{aside}</span>}
    {href && (
      <span
        aria-hidden="true"
        className="shrink-0 text-foreground/60 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      >
        {isExternal(href) ? "↗" : "→"}
      </span>
    )}
  </>
);

/**
 * Hairline rows, each an icon square beside a serif title and a mono line. Rows with an href are
 * links: outside addresses open in a new tab, pages on this site navigate forward.
 */
export const IconRows = ({ rows }: { rows: readonly (IconRowType & { key: string })[] }) => (
  <ul className="divide-y divide-primary/10 border-b border-primary/10">
    {rows.map(({ key, ...row }) => {
      const rowClass = "group flex items-center gap-5 py-4";
      return (
        <li key={key}>
          {row.href && isExternal(row.href) ? (
            <a href={row.href} target="_blank" rel="noopener noreferrer" className={rowClass}>
              <RowBody {...row} />
            </a>
          ) : row.href ? (
            <Link href={row.href} transitionTypes={["nav-forward"]} className={rowClass}>
              <RowBody {...row} />
            </Link>
          ) : (
            <div className={rowClass}>
              <RowBody {...row} />
            </div>
          )}
        </li>
      );
    })}
  </ul>
);
