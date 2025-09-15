"use client";

import { motion, Variants } from "framer-motion";
import { TombstoneIcon } from "./icons";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/**
 * Renders the main header for the Graveyard page.
 * This component is designed to be part of a larger staggered animation sequence.
 * @param {object} props - The component props.
 * @param {string} props.quote - The inspirational quote to display.
 * @returns {JSX.Element} The GraveyardSectionHeader component.
 */
export function GraveyardSectionHeader({ quote }: { quote: string }) {
  return (
    <motion.div
      variants={containerVariants}
      className="flex flex-col mb-16 sm:mb-20 relative z-10"
    >
      <motion.div variants={itemVariants} className="flex items-center mb-4">
        <div className="w-7 h-7 rounded-md border border-red-500/10 flex items-center justify-center mr-3">
          <TombstoneIcon className="w-3 h-3 text-red-500/40" />
        </div>
        <span className="text-xs text-red-500/60 uppercase tracking-wider font-light">
          R.I.P
        </span>
      </motion.div>

      <div className="overflow-visible mb-4">
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl font-serif italic leading-relaxed pb-2"
        >
          <div className="py-1">
            <span className="bg-gradient-to-r from-red-500/80 via-red-500/90 to-red-500/70 bg-clip-text text-transparent select-none">
              The Project Graveyard
            </span>
          </div>
        </motion.h1>
      </div>

      <motion.div
        variants={{
          hidden: { width: 0, opacity: 0 },
          visible: {
            width: "5rem",
            opacity: 1,
            transition: { duration: 1, ease: "easeOut" },
          },
        }}
        className="h-[1px] bg-gradient-to-r from-red-500/40 to-transparent mt-4"
      />

      <motion.p
        variants={itemVariants}
        className="text-foreground/60 max-w-2xl text-sm sm:text-base font-light leading-relaxed mt-6"
      >
        Welcome to the final resting place of projects that never made it to production. 
        They may be gone, but the lessons they taught live on.
      </motion.p>

      <motion.div variants={itemVariants} className="mt-4 max-w-2xl">
        <blockquote className="italic text-sm text-amber-500/80">
          &quot;{quote}&quot;
        </blockquote>
      </motion.div>
    </motion.div>
  );
}