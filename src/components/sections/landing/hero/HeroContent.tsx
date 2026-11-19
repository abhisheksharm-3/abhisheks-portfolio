import Link from "next/link";
import type React from "react";

/**
 * Eyebrow above the name. The current job, not a vague year count: it is the first
 * thing a recruiter looks for and it was previously buried on the about page.
 */
export const HeroEyebrow: React.FC = () => (
  <p className="mb-8 text-[11px] uppercase tracking-[0.2em] font-light text-primary/60">
    associate forward deployed engineer · wednesday solutions
  </p>
);

/**
 * The dominant name statement that owns the fold.
 */
export const HeroName: React.FC = () => (
  <h1 className="font-serif text-primary leading-[0.92] tracking-tight text-[clamp(3.25rem,13vw,7.5rem)]">
    Abhishek
    <br />
    Sharma
  </h1>
);

/**
 * One-line lede beneath the name.
 */
export const HeroTagline: React.FC = () => (
  <p className="mt-8 max-w-xl text-lg sm:text-xl md:text-2xl font-light leading-snug text-foreground/70">
    analytics, billing, access, and releases for client platforms, from the first call to
    production.
  </p>
);

/**
 * What is actually shipping right now, and the one award someone else handed out.
 * Capped at a reading measure: it is two sentences, not a banner.
 */
export const HeroNow: React.FC = () => (
  <div className="mt-6 max-w-2xl space-y-1.5 text-sm font-light text-foreground/65">
    <p>
      currently the engineer behind{" "}
      <Link
        href="/projects/ai-video-platform"
        transitionTypes={["nav-forward"]}
        className="underline decoration-foreground/30 underline-offset-4 transition-colors duration-200 hover:text-foreground/85 hover:decoration-foreground/60"
      >
        a client&apos;s ai video platform
      </Link>
      , with 170+ paying customers and ~$200k mrr: its analytics, billing, team access, and every
      production release.
    </p>
    <p>winner of the network18 track at google&apos;s gen ai exchange hackathon.</p>
  </div>
);
