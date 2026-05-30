"use client";

import { motion } from "framer-motion";

/**
 * ProjectsHeader - Main header component for the Projects page.
 * Editorial feel with large display heading, no gradient text, no decorative chrome.
 */
export const ProjectsHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="flex flex-col mb-10 sm:mb-12 relative z-10"
    >
      <span className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light mb-5">
        project archive
      </span>

      <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif italic leading-tight text-primary mb-6">
        things i&apos;ve built
      </h1>

      <div className="h-px bg-primary/10 w-full mb-6" />

      <p className="text-foreground/55 max-w-2xl text-sm sm:text-base font-light leading-relaxed">
        web apps, android apps, ai tools. some for fun, some for clients, one
        that won a hackathon. filter by tech or just scroll.
      </p>
    </motion.div>
  );
};
