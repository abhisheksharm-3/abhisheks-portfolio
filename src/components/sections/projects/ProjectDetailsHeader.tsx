"use client";

import { motion } from "framer-motion";

interface ProjectDetailHeaderProps {
  title: string;
  description: string;
}

/**
 * Renders the header for a project detail page.
 * Strong editorial title with solid color — no gradient text, no card chrome.
 */
export function ProjectDetailHeader({
  title,
  description,
}: ProjectDetailHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-4"
    >
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-tight text-primary mb-6">
        {title}
      </h1>

      <div className="h-px bg-primary/10 mb-6" />

      <p className="text-foreground/60 max-w-2xl text-base sm:text-lg font-light leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
