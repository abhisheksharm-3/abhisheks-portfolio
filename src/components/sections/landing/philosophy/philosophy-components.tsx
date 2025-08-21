"use client";

import React from "react";
import { motion } from "framer-motion";
import { PHILOSOPHY_ANIMATION_CONFIG } from "@/lib/config/philosophy";

/**
 * Renders the main header for the Philosophy section with animated elements.
 * @param {{ isInView: boolean }} props - Component props.
 */
export const SectionHeader = ({ isInView }: { isInView: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: PHILOSOPHY_ANIMATION_CONFIG.section.duration }}
    className="flex flex-col mb-16 sm:mb-20 relative z-10"
  >
    <div className="flex items-center mb-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-7 h-7 rounded-md border border-primary/10 flex items-center justify-center mr-3"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
      </motion.div>
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-xs text-primary/60 uppercase tracking-wider font-light"
      >
        Philosophy
      </motion.span>
    </div>
    <div className="overflow-hidden">
      <motion.h2
        initial={{ y: 60 }}
        animate={isInView ? { y: 0 } : {}}
        transition={{
          duration: PHILOSOPHY_ANIMATION_CONFIG.header.duration,
          delay: PHILOSOPHY_ANIMATION_CONFIG.header.delay,
        }}
        className="text-4xl sm:text-5xl md:text-6xl font-serif italic leading-none"
      >
        <span className="bg-gradient-to-r from-primary/80 via-primary/90 to-primary/70 bg-clip-text text-transparent select-none">
          Development Approach
        </span>
      </motion.h2>
    </div>
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={isInView ? { width: "5rem", opacity: 1 } : {}}
      transition={{ duration: 1, delay: 0.6 }}
      className="h-[1px] bg-gradient-to-r from-primary/40 to-transparent mt-4"
    />
  </motion.div>
);

/**
 * Renders the central blockquote for the section.
 * @param {{ isInView: boolean }} props - Component props.
 */
export const QuoteBlock = ({ isInView }: { isInView: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{
      duration: PHILOSOPHY_ANIMATION_CONFIG.quote.duration,
      delay: PHILOSOPHY_ANIMATION_CONFIG.quote.delay,
    }}
    className="text-center"
  >
    <blockquote className="text-2xl sm:text-3xl md:text-4xl font-serif italic leading-relaxed mb-6 px-4">
      <span className="bg-gradient-to-r from-foreground/90 via-foreground/80 to-foreground/70 bg-clip-text text-transparent">
        &quot;I care less about perfect code, and more about code that ships,
        scales, and makes life easier.&quot;
      </span>
    </blockquote>
    <p className="text-sm font-light text-foreground/50 italic">
      Clever code makes you feel smart — simple code makes you sleep better.
    </p>
  </motion.div>
);

/**
 * Renders an animated decorative divider with lines and a central dot.
 * @param {{ isInView: boolean }} props - Component props.
 */
export const DecorativeDivider = ({ isInView }: { isInView: boolean }) => (
  <div className="flex items-center justify-center mb-8">
    <motion.div
      initial={{ width: 0 }}
      animate={isInView ? { width: 60 } : {}}
      transition={{
        duration: PHILOSOPHY_ANIMATION_CONFIG.decorative.duration,
        delay: PHILOSOPHY_ANIMATION_CONFIG.decorative.delay,
      }}
      className="h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"
    />
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.4, delay: 0.8 }}
      className="w-2 h-2 rounded-full border border-primary/30 mx-2"
    />
    <motion.div
      initial={{ width: 0 }}
      animate={isInView ? { width: 60 } : {}}
      transition={{
        duration: PHILOSOPHY_ANIMATION_CONFIG.decorative.duration,
        delay: PHILOSOPHY_ANIMATION_CONFIG.decorative.delay,
      }}
      className="h-[1px] bg-gradient-to-l from-transparent via-primary/40 to-transparent"
    />
  </div>
);

/**
 * Renders the main descriptive paragraph for the philosophy section.
 * @param {{ isInView: boolean }} props - Component props.
 */
export const PhilosophyDescription = ({ isInView }: { isInView: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{
      duration: PHILOSOPHY_ANIMATION_CONFIG.description.duration,
      delay: PHILOSOPHY_ANIMATION_CONFIG.description.delay,
    }}
    className="text-center max-w-2xl mx-auto"
  >
    <p className="text-foreground/60 text-sm sm:text-base font-light leading-relaxed mb-6">
      For me, development is about clarity and momentum. I like building things
      that are lightweight, scalable, and actually useful — whether it’s an AI
      agent that finds answers in messy PDFs, or a simple Android app that keeps
      tasks distraction-free. My process is: start small, ship fast, refine
      continuously.
    </p>
    <p className="text-foreground/50 font-light text-sm tracking-wide border-b border-primary/10 pb-1 px-4 inline-block">
      My development philosophy
    </p>
  </motion.div>
);

/**
 * Renders a decorative accent for the top-right corner of a card.
 */
export const CardCornerAccent = () => (
  <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
    <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-primary/20 to-transparent" />
    <div className="absolute top-0 right-0 h-px w-16 bg-gradient-to-l from-primary/20 to-transparent" />
  </div>
);
