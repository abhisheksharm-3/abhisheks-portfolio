"use client";

import { motion } from "framer-motion";
import { ProjectType } from "@/lib/types/components";

/**
 * Renders the overview text section for a project detail page.
 * Clean editorial typography — no Card wrapper, no corner decorations.
 */
export function ProjectDetailOverview({ project }: { project: ProjectType }) {
  const overview = project.longDescription;
  if (!overview || overview === project.description) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-16"
    >
      <span className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light block mb-5">
        overview
      </span>

      <div className="h-px bg-primary/10 mb-8" />

      <p className="text-foreground/65 text-base font-light leading-relaxed max-w-3xl">
        {overview}
      </p>
    </motion.div>
  );
}
