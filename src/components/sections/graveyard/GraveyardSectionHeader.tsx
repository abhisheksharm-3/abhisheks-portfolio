"use client";

import { motion, Variants } from "framer-motion";

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
export const GraveyardSectionHeader = ({ quote }: { quote: string }) => {
  return (
    <motion.div
      variants={containerVariants}
      className="flex flex-col mb-10 sm:mb-12 relative z-10"
    >
      <motion.span
        variants={itemVariants}
        className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light mb-4"
      >
        R.I.P
      </motion.span>

      <motion.h1
        variants={itemVariants}
        className="text-4xl sm:text-5xl md:text-6xl font-serif italic leading-tight text-foreground mb-6"
      >
        the project graveyard
      </motion.h1>

      <motion.div
        variants={itemVariants}
        className="h-px bg-primary/10 w-full"
      />

      <motion.p
        variants={itemVariants}
        className="text-foreground/55 max-w-2xl text-sm sm:text-base font-light leading-relaxed mt-6"
      >
        here lies the stuff i never shipped. some broke on bad decisions, some
        got boring, some i just abandoned. every one of them cost me time and
        taught me something.
      </motion.p>

      <motion.p
        variants={itemVariants}
        className="mt-5 max-w-2xl text-xs text-foreground/30 italic font-light leading-relaxed"
      >
        &ldquo;{quote}&rdquo;
      </motion.p>
    </motion.div>
  );
};
