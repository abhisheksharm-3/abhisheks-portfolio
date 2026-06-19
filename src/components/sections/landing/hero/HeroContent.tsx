"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useExperienceCounter } from "@/hooks/useExperienceCounter";
import { HERO_SKILLS } from "@/data/skills-expertise";

/**
 * Smoothly scrolls the window to a given element ID.
 */
const scrollToSection = (sectionId: string): void => {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
};

/**
 * Eyebrow above the name: "about · NN yrs crafting code", with the year count
 * animating up on load.
 */
export const HeroEyebrow: React.FC = () => {
  const years = useExperienceCounter(1);
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="mb-8 text-[11px] uppercase tracking-[0.2em] font-light text-primary/35"
    >
      about · {years} yrs crafting code
    </motion.p>
  );
};

/**
 * The dominant name statement that owns the fold.
 */
export const HeroName: React.FC = () => (
  <motion.h1
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    className="font-serif text-primary leading-[0.92] tracking-tight text-[clamp(3.25rem,13vw,7.5rem)]"
  >
    Abhishek
    <br />
    Sharma
  </motion.h1>
);

/**
 * One-line lede beneath the name.
 */
export const HeroTagline: React.FC = () => (
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className="mt-8 max-w-xl text-lg sm:text-xl md:text-2xl font-light leading-snug text-foreground/65"
  >
    software engineer: ai systems, mobile builds, side projects past midnight.
  </motion.p>
);

/**
 * "what i do best" — a single quiet horizontal strip of focus areas.
 */
export const HeroSkillsStrip: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
    className="mt-8"
  >
    <div className="mb-4 flex items-center gap-4">
      <span className="text-[11px] uppercase tracking-[0.2em] font-light text-primary/35">
        what i do best
      </span>
      <span className="h-px flex-1 bg-primary/10" />
    </div>
    <ul className="flex flex-wrap gap-x-10 gap-y-3 text-lg sm:text-xl font-light text-foreground/75">
      {HERO_SKILLS.map((skill) => (
        <li
          key={skill}
          className="transition-colors duration-200 hover:text-foreground"
        >
          {skill}
        </li>
      ))}
    </ul>
  </motion.div>
);

/**
 * Bottom-right scroll affordance, keyboard-accessible.
 */
export const ScrollIndicator: React.FC = () => (
  <motion.button
    type="button"
    onClick={() => scrollToSection("work-section")}
    aria-label="scroll to projects"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, delay: 1.4 }}
    className="absolute bottom-10 right-6 z-10 flex items-center gap-2 sm:right-12"
  >
    <span className="text-[10px] uppercase tracking-[0.2em] font-light text-foreground/30">
      scroll
    </span>
    <span className="h-px w-8 bg-foreground/20" />
    <motion.span
      animate={{ y: [0, 4, 0] }}
      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
    >
      <ChevronDown size={14} className="text-primary/50" />
    </motion.span>
  </motion.button>
);
