import Link from "next/link";
import { ProjectVisual } from "@/components/shared/ProjectVisual";
import { SharedElement } from "@/components/shared/SharedElement";
import { toSince } from "@/lib/project-dates";
import type { ProjectType } from "@/lib/types/components";

/**
 * A project as one picture-first link: its visual, its title beside when it ran, and its one-line
 * description. The title is a shared element, so it carries into the project page.
 */
export const ProjectTile = ({ project }: { project: ProjectType }) => (
  <Link
    href={`/projects/${project.slug}`}
    transitionTypes={["nav-forward"]}
    className="group block"
  >
    <ProjectVisual project={project} />
    <span className="mt-4 flex items-baseline justify-between gap-3">
      <SharedElement name={`project-title-${project.slug}`}>
        <span className="font-serif text-2xl text-foreground/90 transition-colors duration-200 group-hover:text-foreground">
          {project.title.toLowerCase()}
        </span>
      </SharedElement>
      <span className="shrink-0 font-mono text-[11px] text-foreground/60">
        {toSince(project.duration) || project.year}
      </span>
    </span>
    <span className="mt-1.5 block text-sm font-light leading-relaxed text-foreground/65">
      {project.description}
    </span>
  </Link>
);
