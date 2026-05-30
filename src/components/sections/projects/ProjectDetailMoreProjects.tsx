"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
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
          <Button
            size="lg"
            className="group border border-primary/20 bg-transparent hover:bg-primary/5 text-foreground/70 hover:text-foreground px-7"
            asChild
          >
            <Link href="/projects" className="flex items-center gap-2">
              view all projects
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
