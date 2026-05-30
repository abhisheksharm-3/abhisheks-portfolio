"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Renders a clean editorial "explore more projects" section.
 * No gradient decorators or animated widths — just clear typography and a link.
 */
export function ProjectDetailMoreProjects() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mt-12 pt-8"
    >
      <div className="h-px bg-primary/10 mb-8" />

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
        <div>
          <span className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light block mb-4">
            what&apos;s next
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif italic text-primary leading-tight">
            explore more projects
          </h3>
        </div>

        <div className="flex-shrink-0">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm font-light text-foreground/60 hover:text-foreground border border-foreground/15 hover:border-foreground/30 transition-all duration-200 px-6 py-2.5"
          >
            view all projects
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
