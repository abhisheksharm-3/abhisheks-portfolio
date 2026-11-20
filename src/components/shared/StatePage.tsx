import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { LoopVideo } from "@/components/shared/LoopVideo";
import type { PhotoType } from "@/lib/types/components";

/**
 * The shared shell for 404, error, and loading. These are pages a visitor lands on
 * unexpectedly, so they follow the same editorial language as every other page:
 * eyebrow, lowercase serif title, hairline, quiet body. With `media`, the eyebrow and title sit
 * over a silent clip that runs the full width, and the body and links follow under it.
 */
export const StatePage = ({
  eyebrow,
  title,
  body,
  children,
  media,
  overlay,
  as: Heading = "h1",
}: {
  eyebrow: string;
  title: string;
  as?: "h1" | "p";
  body?: ReactNode;
  children?: ReactNode;
  media?: PhotoType;
  /** Shown over the clip under the title, such as the 404's path correction. */
  overlay?: ReactNode;
}) => (
  <AppShell>
    <div className="min-h-[70vh] flex items-center pt-36 pb-20 px-6 sm:px-10 lg:px-24">
      {media?.video ? (
        <div className="relative z-10 w-full">
          <figure className="relative aspect-[4/5] overflow-hidden border border-foreground/10 sm:aspect-video xl:aspect-[2/1]">
            <LoopVideo video={media.video} poster={media.src} alt={media.alt} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
              <p className="mb-4 font-mono text-[11px] text-white/75">
                {eyebrow} · {media.caption}
              </p>
              <Heading className="max-w-3xl text-4xl sm:text-5xl md:text-6xl font-serif leading-[1.05] text-balance text-white">
                {title}
              </Heading>
              {overlay}
            </figcaption>
          </figure>
          {(body || children) && (
            <div className="mt-10 max-w-xl">
              {body && (
                <p className="text-foreground/65 text-sm sm:text-base font-light leading-relaxed">
                  {body}
                </p>
              )}
              {children && <div className="mt-8">{children}</div>}
            </div>
          )}
        </div>
      ) : (
        <div className="relative z-10 w-full max-w-xl">
          <p className="text-[11px] text-primary/60 uppercase tracking-[0.2em] font-light mb-5">
            {eyebrow}
          </p>

          <div>
            <Heading className="text-4xl sm:text-5xl md:text-6xl font-serif leading-tight text-balance text-foreground mb-6">
              {title}
            </Heading>
          </div>

          <div className="h-px bg-primary/10 w-full mb-6" />

          {body && (
            <p className="text-foreground/65 text-sm sm:text-base font-light leading-relaxed">
              {body}
            </p>
          )}

          {children && <div className="mt-10">{children}</div>}
        </div>
      )}
    </div>
  </AppShell>
);

/** A text link in the site's voice, used instead of filled buttons on state pages. */
export const StateLink = ({
  href,
  onClick,
  children,
}: {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
}) => {
  const className =
    "group inline-flex items-center gap-2 text-sm font-light text-foreground/60 hover:text-foreground/85 transition-colors duration-200";

  if (onClick) {
    return (
      <button className={className} onClick={onClick} type="button">
        {children}
        <span className="text-foreground/40 group-hover:text-foreground/60 transition-colors duration-200">
          →
        </span>
      </button>
    );
  }

  return (
    <a className={className} href={href}>
      {children}
      <span className="text-foreground/40 group-hover:text-foreground/60 transition-colors duration-200">
        →
      </span>
    </a>
  );
};
