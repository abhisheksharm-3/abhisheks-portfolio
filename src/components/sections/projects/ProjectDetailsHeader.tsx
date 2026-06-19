"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { ProjectType } from "@/lib/types/components";

/**
 * Editorial header for a project detail page: eyebrow, serif title, divider,
 * lede, and quiet action links. Mirrors the shared PageHeader rhythm used
 * across the rest of the site.
 */
export function ProjectDetailHeader({ project }: { project: ProjectType }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col"
    >
      <span className="mb-5 text-[11px] uppercase tracking-[0.2em] font-light text-primary/35">
        project · {project.year}
      </span>

      <h1 className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-tight text-foreground">
        {project.title}
      </h1>

      <div className="mb-6 h-px w-full bg-primary/10" />

      <p className="max-w-2xl text-sm sm:text-base font-light leading-relaxed text-foreground/55">
        {project.description}
      </p>

      {(project.url || project.github) && (
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-light text-foreground/70 transition-colors duration-200 hover:text-foreground"
            >
              visit website
              <ExternalLink className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-light text-foreground/70 transition-colors duration-200 hover:text-foreground"
            >
              view source
              <Github className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
}
