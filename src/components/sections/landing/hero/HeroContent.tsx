"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { HERO_SKILLS } from "@/data/skills-expertise";

/**
 * Smoothly scrolls the window to a given element ID.
 */
const scrollToSection = (sectionId: string): void => {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
};

/**
 * Eyebrow above the name. The current job, not a vague year count: it is the first
 * thing a recruiter looks for and it was previously buried on the about page.
 */
export const HeroEyebrow: React.FC = () => (
  <p className="mb-8 text-[11px] uppercase tracking-[0.2em] font-light text-primary/35">
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
  <p className="mt-8 max-w-xl text-lg sm:text-xl md:text-2xl font-light leading-snug text-foreground/65">
    analytics, billing, access, and releases for client platforms, from the first call to
    production.
  </p>
);

/**
 * What is actually shipping right now, and the one award someone else handed out.
 * Both existed only in EXPERIENCE_DATA, below the fold on /about.
 */
export const HeroNow: React.FC = () => (
  <div className="mt-6 space-y-1.5 text-sm font-light text-foreground/45">
    <p>
      currently the engineer behind{" "}
      <Link
        href="/projects/ai-video-platform"
        className="underline decoration-foreground/20 underline-offset-4 transition-colors duration-200 hover:text-foreground/70 hover:decoration-foreground/45"
      >
        a client&apos;s ai video platform
      </Link>
      , with 170+ paying customers and ~$200k mrr: its analytics, billing, team access, and every
      production release.
    </p>
    <p className="text-foreground/35">
      winner of the network18 track at google&apos;s gen ai exchange hackathon.
    </p>
  </div>
);

/**
 * "what i do best" — a single quiet horizontal strip of focus areas.
 */
export const HeroSkillsStrip: React.FC = () => (
  <div className="mt-8">
    <div className="mb-4 flex items-center gap-4">
      <span className="text-[11px] uppercase tracking-[0.2em] font-light text-primary/35">
        what i do best
      </span>
      <span className="h-px flex-1 bg-primary/10" />
    </div>
    <ul className="flex flex-wrap gap-x-10 gap-y-3 text-lg sm:text-xl font-light text-foreground/75">
      {HERO_SKILLS.map((skill) => (
        <li key={skill} className="transition-colors duration-200 hover:text-foreground">
          {skill}
        </li>
      ))}
    </ul>
  </div>
);

/**
 * Bottom-right scroll affordance, keyboard-accessible.
 */
export const ScrollIndicator: React.FC = () => (
  <button
    type="button"
    onClick={() => scrollToSection("work-section")}
    aria-label="scroll to projects"
    className="absolute bottom-10 right-6 z-10 flex items-center gap-2 sm:right-12"
  >
    <span className="text-[10px] uppercase tracking-[0.2em] font-light text-foreground/35">
      scroll
    </span>
    <span className="h-px w-8 bg-primary/10" />
    <motion.span
      animate={{ y: [0, 4, 0] }}
      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
    >
      <ChevronDown size={14} className="text-primary/50" />
    </motion.span>
  </button>
);
