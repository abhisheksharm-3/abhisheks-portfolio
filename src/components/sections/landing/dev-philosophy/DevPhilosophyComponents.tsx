"use client";

import { motion } from "framer-motion";
import type { InViewPropsType } from "@/lib/types/components";

const PRINCIPLES = [
  {
    number: "01",
    title: "ship first, refine always",
    body: "working software beats perfect software. i'd rather have something live and iterating than polished and stuck in planning.",
  },
  {
    number: "02",
    title: "simplicity is the hard part",
    body: "any dev can add complexity. removing it takes real thought. i aim for code someone else can read at 2am without a guide.",
  },
  {
    number: "03",
    title: "pragmatism over dogma",
    body: "i don't marry frameworks or patterns. the right tool is whatever solves the problem cleanly, even if that means plain old sql.",
  },
  {
    number: "04",
    title: "own the whole stack",
    body: "jumping between frontend, backend, mobile, and infra keeps me useful. silos slow things down; full-stack awareness speeds them up.",
  },
] as const;

/**
 * Renders the central blockquote for the philosophy section.
 */
export const PhilosophyQuote = ({ isInView }: InViewPropsType) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
    className="flex flex-col lg:flex-row gap-10 lg:gap-20"
  >
    <div className="lg:w-1/2">
      <blockquote className="text-2xl sm:text-3xl font-serif italic text-foreground leading-snug mb-6">
        i don&apos;t worship perfect code. i care about code that ships, scales,
        and actually makes life easier.
      </blockquote>
      <p className="text-sm font-light text-foreground/55 italic">
        clever code feeds your ego. simple code lets you sleep at night.
      </p>
    </div>

    <div className="lg:w-1/2 lg:pt-2">
      <p className="text-foreground/60 text-base font-light leading-relaxed">
        building for me is about{" "}
        <span className="text-foreground font-medium">clarity and momentum</span>
        . i like making stuff that&apos;s lightweight, scales when it needs to,
        and actually solves problems. could be an{" "}
        <span className="text-foreground/80">ai agent</span> digging through
        messy pdfs, or a minimal{" "}
        <span className="text-foreground/80">android app</span> that just gets
        out of your way. my approach:{" "}
        <span className="font-medium italic">
          start scrappy, ship fast, keep tweaking
        </span>
        .
      </p>
    </div>
  </motion.div>
);

/**
 * Renders the philosophy principles as a clean numbered list.
 */
export const PhilosophyPrinciples = ({ isInView }: InViewPropsType) => (
  <div>
    <div className="flex items-center gap-4 mb-8">
      <span className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light">
        principles i build by
      </span>
      <div className="h-px bg-primary/10 flex-1" />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
      {PRINCIPLES.map((principle, index) => (
        <motion.div
          key={principle.number}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.5 + index * 0.1,
          }}
          className="group"
        >
          <div
            className={`py-7 ${index % 2 === 0 ? "sm:pr-10 sm:border-r border-primary/10" : "sm:pl-10"} ${index < 2 ? "border-b border-primary/10" : ""}`}
          >
            <div className="flex items-baseline gap-3 mb-3">
              <span className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light tabular-nums">
                {principle.number}
              </span>
              <h4 className="text-base font-light text-foreground group-hover:text-primary/80 transition-colors duration-300">
                {principle.title}
              </h4>
            </div>
            <p className="text-foreground/55 text-sm font-light leading-relaxed pl-7">
              {principle.body}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);
