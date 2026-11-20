"use client";

/** The site footer, written as the close of a letter: thanks, a signature, what's new lately, and a p.s. */
import { RiSpotifyFill } from "@remixicon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { CONTACT_INFO } from "@/data/contact";
import { projects } from "@/data/projects";
import { useListening } from "@/hooks/useListening";
import { toListenedWhen } from "@/lib/listened-when";
import type { FooterLatelyRowPropsType } from "@/lib/types/components";
import { FooterDateline } from "./FooterDateline";
import { FooterSignature } from "./FooterSignature";
import { useLatestPost } from "./LatestPostContext";

const SHORT_DATE = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
});

/** "2026-09-28" becomes "28 sep". */
const toShortDate = (isoDate: string) => {
  const parts = SHORT_DATE.formatToParts(new Date(isoDate));
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((entry) => entry.type === type)?.value ?? "";
  return `${part("day")} ${part("month")}`.toLowerCase();
};

/** "september 2026" becomes "sep 2026", matching the short dates beside it. */
const toShortMonth = (duration: string) => {
  const [month = "", year = ""] = duration.toLowerCase().split(" ");
  return `${month.slice(0, 3)} ${year}`.trim();
};

const LABEL_CLASS = "text-[11px] uppercase tracking-[0.2em] font-light text-primary/60";
const ROW_DATE_CLASS = "shrink-0 pt-0.5 font-mono text-[11px] text-foreground/60";
const ROW_LINK_CLASS =
  "min-w-0 text-foreground/85 transition-colors duration-200 hover:text-foreground after:inline-block after:pl-1 after:opacity-0 after:-translate-x-1 after:translate-y-0.5 after:transition-[opacity,transform] after:duration-200 after:content-['↗'] hover:after:translate-x-0 hover:after:translate-y-0 hover:after:opacity-60";

/** The first finished project in the curated order of projects.ts. */
const lastShipped = projects.find((project) => !project.isBuilding);

const deployMessage = process.env.NEXT_PUBLIC_DEPLOY_MESSAGE;

const scrollToTop = () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
};
const buildDate = process.env.NEXT_PUBLIC_BUILD_DATE;

const READING_PATHS = ["/writing", "/projects/", "/graveyard"];

const SIGN_OFF_CLASS =
  "font-serif text-[clamp(30px,4.4vw,44px)] italic leading-[1.1] tracking-[-0.02em] text-foreground/90";

const GENERIC_SIGN_OFF = <p className={SIGN_OFF_CLASS}>thanks for stopping by.</p>;

/** "thanks for reading." where there is something to read, a plainer line everywhere else. */
const SignOff = () => {
  const pathname = usePathname();
  const isReadingPage = READING_PATHS.some((path) => pathname.startsWith(path));
  return isReadingPage ? <p className={SIGN_OFF_CLASS}>thanks for reading.</p> : GENERIC_SIGN_OFF;
};

/**
 * The current or last Spotify track. Track and artist names keep Spotify's casing and link back to
 * Spotify with its icon, as Spotify's design guidelines require. Hidden while loading or on error.
 */
const ListeningRow = () => {
  const { data: track } = useListening();
  if (!track) return null;

  return (
    <LatelyRow verb={track.playedAt ? "played" : "listening"} when={toListenedWhen(track.playedAt)}>
      <a
        href={track.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex min-w-0 items-start gap-2 ${ROW_LINK_CLASS}`}
      >
        <RiSpotifyFill aria-label="Spotify" className="size-[21px] shrink-0 text-foreground/60" />
        <span className="min-w-0 pt-0.5">
          {track.name} · {track.artists}
        </span>
      </a>
    </LatelyRow>
  );
};

const LatelyRow = ({ verb, children, when }: FooterLatelyRowPropsType) => (
  <>
    <dt className="border-b border-foreground/10 py-3 pr-6 font-mono text-[11px] text-foreground/60">
      {verb}
    </dt>
    <dd className="flex min-w-0 justify-between gap-4 border-b border-foreground/10 py-2.5 text-sm">
      {children}
      {when && <span className={ROW_DATE_CLASS}>{when}</span>}
    </dd>
  </>
);

const Lately = () => {
  const latestPost = useLatestPost();

  return (
    <div className="flex min-w-0 flex-col gap-3.5">
      <span className={LABEL_CLASS}>lately</span>
      <dl className="grid grid-cols-[auto_1fr] border-t border-foreground/10">
        {latestPost && (
          <LatelyRow verb="wrote" when={toShortDate(latestPost.date)}>
            <Link
              href={`/writing/${latestPost.slug}`}
              transitionTypes={["nav-forward"]}
              className={ROW_LINK_CLASS}
            >
              {latestPost.title}
            </Link>
          </LatelyRow>
        )}
        {lastShipped && (
          <LatelyRow
            verb="shipped"
            when={lastShipped.duration && toShortMonth(lastShipped.duration)}
          >
            <Link
              href={`/projects/${lastShipped.slug}`}
              transitionTypes={["nav-forward"]}
              className={ROW_LINK_CLASS}
            >
              {lastShipped.title.toLowerCase()}
            </Link>
          </LatelyRow>
        )}
        <ListeningRow />
        {deployMessage && (
          <LatelyRow verb="deployed" when={buildDate && toShortDate(buildDate)}>
            <span className="min-w-0 text-foreground/85">{deployMessage.toLowerCase()}</span>
          </LatelyRow>
        )}
      </dl>
    </div>
  );
};

const Postscript = () => (
  <div className="flex min-w-0 flex-col gap-3.5 text-sm text-foreground/60">
    <span className={LABEL_CLASS}>p.s.</span>
    <p className="border-t border-foreground/10 pt-3">
      the fastest way to reach me is{" "}
      <a
        href={`mailto:${CONTACT_INFO.email}`}
        className="text-foreground/85 underline decoration-foreground/15 underline-offset-4 transition-colors duration-200 hover:decoration-foreground"
      >
        {CONTACT_INFO.email}
      </a>
      .
    </p>
    <div className="flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-xs">
      <a
        href={CONTACT_INFO.github.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground/60 transition-colors duration-200 hover:text-foreground"
      >
        github ↗
      </a>
      <Link
        href="/writing"
        className="text-foreground/60 transition-colors duration-200 hover:text-foreground"
      >
        writing
      </Link>
      <Link
        href="/resume"
        className="text-foreground/60 transition-colors duration-200 hover:text-foreground"
      >
        resume
      </Link>
    </div>
  </div>
);

export const Footer = () => (
  <footer className="relative z-10 border-t border-primary/10">
    <div className="mx-auto max-w-[2000px] px-6 pt-20 pb-7 sm:px-8 sm:pt-24 lg:px-24 2xl:px-40">
      <div className="grid grid-cols-1 gap-14 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-16 lg:gap-24">
        <div className="flex min-w-0 flex-col">
          <Suspense fallback={GENERIC_SIGN_OFF}>
            <SignOff />
          </Suspense>
          <p className="mt-5 ml-0.5 font-serif text-xl italic text-foreground/60">yours,</p>

          <div className="relative mt-2 md:mt-auto md:pt-2">
            <FooterSignature />
            <div className="relative -mt-3.5 h-px bg-foreground/10">
              <span
                aria-hidden="true"
                className="absolute bottom-1.5 left-0 font-mono text-[13px] text-foreground/40"
              >
                ×
              </span>
            </div>
            <FooterDateline />
          </div>
        </div>

        <div className="flex min-w-0 flex-col justify-between gap-12 md:pt-2.5">
          <Lately />
          <Postscript />
        </div>
      </div>

      <div className="mt-18 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-foreground/10 pt-5 font-mono text-[11px] tracking-[0.02em] text-foreground/60">
        <span>© {process.env.NEXT_PUBLIC_BUILD_YEAR} abhishek sharma</span>
        <span className="order-3 w-full md:order-none md:w-auto">
          set in basteleur, space grotesk &amp; geist mono ·{" "}
          <a
            href="https://old.abhisheksan.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200 hover:text-foreground"
          >
            the old portfolio ↗
          </a>
        </span>
        <span>
          <span className="mr-5">18.52° n, 73.86° e</span>
          <button
            type="button"
            onClick={scrollToTop}
            className="group cursor-pointer transition-colors duration-200 hover:text-foreground"
          >
            back to the top{" "}
            <span className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5">
              ↑
            </span>
          </button>
        </span>
      </div>
    </div>
  </footer>
);
