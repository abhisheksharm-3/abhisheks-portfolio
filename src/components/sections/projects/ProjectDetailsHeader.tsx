import { RiGithubLine } from "@remixicon/react";
import { ExternalLink } from "lucide-react";
import { SharedElement } from "@/components/shared/SharedElement";
import { PROJECT_CATEGORIES } from "@/data/projects";
import { toSince } from "@/lib/project-dates";
import type { ProjectType } from "@/lib/types/components";

/**
 * Header for a project page: its area and dates in mono, the serif title, the description as a
 * serif italic lede, and quiet action links.
 */
export function ProjectDetailHeader({ project }: { project: ProjectType }) {
  const categoryLabel = PROJECT_CATEGORIES.find(
    (category) => category.id === project.category,
  )?.label;
  return (
    <div className="flex flex-col">
      <span className="mb-5 font-mono text-[11px] text-foreground/60">
        {[categoryLabel, toSince(project.duration) || project.year].filter(Boolean).join(" · ")}
      </span>

      <SharedElement name={`project-title-${project.slug}`}>
        <h1 className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-tight text-foreground">
          {project.title}
        </h1>
      </SharedElement>

      <p className="max-w-2xl font-serif text-2xl italic leading-snug text-foreground/70 sm:text-3xl">
        {project.description}
      </p>

      {(project.url || project.github || project.notebook) && (
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
              <RiGithubLine className="h-3.5 w-3.5" />
            </a>
          )}
          {project.notebook && (
            <a
              href={project.notebook}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-light text-foreground/70 transition-colors duration-200 hover:text-foreground"
            >
              training notebook
              <ExternalLink className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
