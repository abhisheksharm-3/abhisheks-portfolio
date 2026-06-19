"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { ProjectType } from "@/lib/types/components";

/**
 * Renders a minimal metadata sidebar for a project detail page.
 * No Card wrapper, no side-stripe borders — just clean data rows.
 */
export function ProjectDetailSidebar({ project }: { project: ProjectType }) {
  const projectDetails = [
    { label: "Year", value: project.year },
    { label: "Role", value: project.role },
    { label: "Client", value: project.client },
    { label: "Duration", value: project.duration },
  ].filter((detail) => detail.value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      className="h-full"
    >
      <span className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light block mb-5">
        Project Details
      </span>

      <div className="h-px bg-primary/10 mb-6" />

      <div className="space-y-4 mb-8">
        {projectDetails.map((detail) => (
          <div key={detail.label} className="flex items-start gap-4">
            <span className="w-20 text-[11px] text-primary/35 uppercase tracking-[0.15em] font-light flex-shrink-0 pt-0.5">
              {detail.label}
            </span>
            <span className="text-sm text-foreground/70 font-light">{detail.value}</span>
          </div>
        ))}

        {project.tags.length > 0 && (
          <div className="flex items-start gap-4">
            <span className="w-20 text-[11px] text-primary/35 uppercase tracking-[0.15em] font-light flex-shrink-0 pt-0.5">
              Stack
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 border border-foreground/10 text-[11px] text-foreground/50 font-light"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="h-px bg-primary/10 mb-6" />

      <div className="flex flex-col gap-2">
        {project.url && (
          <Button
            variant="outline"
            size="sm"
            className="group w-full rounded-none border-foreground/15 hover:border-foreground/30 justify-between"
            asChild
          >
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              Visit Website
              <ExternalLink className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </Button>
        )}
        {project.github && (
          <Button
            variant="outline"
            size="sm"
            className="group w-full rounded-none border-foreground/8 hover:border-foreground/20 justify-between"
            asChild
          >
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              View Source
              <Github className="h-3.5 w-3.5" />
            </a>
          </Button>
        )}
      </div>
    </motion.div>
  );
}
