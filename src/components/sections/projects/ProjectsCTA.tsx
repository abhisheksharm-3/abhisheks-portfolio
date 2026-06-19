"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/**
 * ProjectsCTA - Editorial call-to-action for the projects section.
 * Clean, no card chrome or decorative gradients.
 */
export const ProjectsCTA = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mt-10 pt-6"
    >
      <div className="h-px bg-primary/10 mb-8" />

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
        <div>
          <span className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light block mb-4">
            work together
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif text-primary leading-tight">
            have a project in mind?
          </h3>
          <p className="text-foreground/50 text-sm font-light leading-relaxed mt-3 max-w-md">
            i&apos;m open to new projects, creative ideas, and interesting
            problems. if you have something in mind, just reach out.
          </p>
        </div>

        <div className="flex-shrink-0">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 text-sm font-light text-foreground/60 hover:text-foreground border border-foreground/15 hover:border-foreground/30 transition-all duration-200 px-6 py-2.5"
          >
            Get in touch
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
