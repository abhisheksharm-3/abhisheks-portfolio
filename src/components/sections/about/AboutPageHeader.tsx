"use client";

import { motion } from "framer-motion";
import {
  STAGGER_CONTAINER_VARIANTS,
  STAGGER_ITEM_VARIANTS,
} from "@/lib/config/page-animations";

/**
 * Displays the main header for the 'About' page, including name and introduction.
 */
export const AboutPageHeader = () => {
  return (
    <motion.div
      variants={STAGGER_CONTAINER_VARIANTS}
      initial="hidden"
      animate="visible"
      className="flex flex-col mb-10 sm:mb-12 relative z-10"
    >
      <motion.p
        variants={STAGGER_ITEM_VARIANTS}
        className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light mb-4"
      >
        about me
      </motion.p>

      <motion.h1
        variants={STAGGER_ITEM_VARIANTS}
        className="text-4xl sm:text-5xl md:text-6xl font-serif italic leading-tight text-foreground mb-6"
      >
        Abhishek Sharma
      </motion.h1>

      <motion.div
        variants={STAGGER_ITEM_VARIANTS}
        className="h-px bg-primary/10 w-full mb-6"
      />

      <motion.p
        variants={STAGGER_ITEM_VARIANTS}
        className="text-foreground/55 max-w-2xl text-sm sm:text-base font-light leading-relaxed"
      >
        software engineer at wednesday. i build ai pipelines, android apps, and
        web platforms. i care about shipping things that actually work, not
        just things that look good in a PR description.
      </motion.p>
    </motion.div>
  );
};
