"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

/**
 * Renders a simple editorial call-to-action for viewing projects.
 */
export const AboutPageCTA = () => {
  return (
    <div className="flex flex-col items-center text-center gap-4 py-8">
      <div className="h-px bg-primary/10 w-full max-w-xs mb-4" />
      <Link
        href="/projects"
        transitionTypes={["nav-forward"]}
        className="flex items-center gap-2 text-foreground/65 hover:text-foreground/90 transition-colors duration-200 group font-light text-base"
      >
        <span className="font-serif text-2xl sm:text-3xl text-foreground/80 group-hover:text-foreground transition-colors duration-200">
          view my projects
        </span>
        <ArrowRight
          aria-hidden="true"
          className="h-5 w-5 text-primary/60 group-hover:text-primary/80 transform transition-[color,transform] duration-200 group-hover:translate-x-1"
        />
      </Link>
    </div>
  );
};
