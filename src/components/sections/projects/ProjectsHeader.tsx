"use client";

import { motion, Variants } from "framer-motion";
import { getHeaderClasses, SPACING_STANDARDS } from "@/lib/config/spacing-standards";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: SPACING_STANDARDS.ANIMATION.STAGGER_DELAY,
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
 * ProjectsHeader - Main header component for the Projects page
 * Features staggered animation sequence with gradient text and decorative elements.
 * Displays page title, description, and animated accent line.
 *
 * @returns JSX.Element representing the projects page header
 */
export const ProjectsHeader = () => {
  return (
    <motion.div
      variants={containerVariants}
      className={getHeaderClasses()}
    >
      <motion.div variants={itemVariants} className={`flex items-center ${SPACING_STANDARDS.HEADER.TITLE_MARGIN_BOTTOM}`}>
        <div className="w-7 h-7 rounded-md border border-primary/10 flex items-center justify-center mr-3">
          <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
        </div>
        <span className="text-xs text-primary/60 uppercase tracking-wider font-light">
          Project Archive
        </span>
      </motion.div>

      <div className={`overflow-visible ${SPACING_STANDARDS.HEADER.TITLE_MARGIN_BOTTOM}`}>
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl font-serif italic leading-relaxed pb-2"
        >
          <div className="py-1">
            <span className="bg-gradient-to-r from-primary/80 via-primary/90 to-primary/70 bg-clip-text text-transparent select-none">
              Complete Portfolio
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
        className={`h-[1px] bg-gradient-to-r from-primary/40 to-transparent ${SPACING_STANDARDS.HEADER.ACCENT_LINE_MARGIN}`}
      />

      <motion.p
        variants={itemVariants}
        className={`text-foreground/60 max-w-2xl text-sm sm:text-base font-light leading-relaxed ${SPACING_STANDARDS.HEADER.SUBTITLE_MARGIN_TOP}`}
      >
        Browse my comprehensive collection of projects spanning web development,
        mobile applications, and design work. Each project represents a journey
        of learning, experimentation, and craftsmanship.
      </motion.p>
    </motion.div>
  );
};
