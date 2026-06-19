"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Renders a simple editorial call-to-action for viewing projects.
 */
export const AboutPageCTA = () => {
  return (
    <div className="flex flex-col items-center text-center gap-4 py-8">
      <div className="h-px bg-primary/10 w-full max-w-xs mb-4" />
      <p className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light">
        see the work
      </p>
      <Link
        href="/projects"
        className="flex items-center gap-2 text-foreground/60 hover:text-foreground/90 transition-colors duration-200 group font-light text-base"
      >
        <span className="font-serif text-2xl sm:text-3xl text-foreground/80 group-hover:text-foreground transition-colors duration-200">
          view my projects
        </span>
        <ArrowRight className="h-5 w-5 text-primary/40 group-hover:text-primary/70 transform transition-all duration-200 group-hover:translate-x-1" />
      </Link>
    </div>
  );
};
