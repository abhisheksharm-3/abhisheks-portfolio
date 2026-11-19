import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SharedElement } from "@/components/shared/SharedElement";
import type { ProjectRowPropsType } from "@/lib/types/components";

/**
 * A past project as a hairline list row: title, description, role, year, and a details link
 * stretched over the whole row so the row is one target.
 */
export const ProjectListRow = ({ project }: ProjectRowPropsType) => (
  <div className="group relative grid gap-x-8 gap-y-2 border-t border-foreground/8 py-6 sm:grid-cols-[13rem_minmax(0,1fr)_12rem] sm:items-baseline">
    <SharedElement name={`project-title-${project.slug}`}>
      <h3 className="font-serif text-xl text-foreground/85 transition-colors duration-200 group-hover:text-foreground">
        {project.title}
      </h3>
    </SharedElement>

    <p className="max-w-xl text-sm font-light leading-relaxed text-foreground/60">
      {project.description}
    </p>

    <div className="flex items-baseline justify-between gap-x-6 gap-y-1 font-mono text-xs text-foreground/60 sm:flex-col sm:items-end">
      <span className="sm:text-right">
        {project.role && `${project.role}, `}
        {project.year}
      </span>
      <Link
        href={`/projects/${project.slug}`}
        transitionTypes={["nav-forward"]}
        className="group/link inline-flex items-center gap-1 font-sans font-light transition-colors duration-200 after:absolute after:inset-0 group-hover:text-foreground"
      >
        details
        <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
      </Link>
    </div>
  </div>
);
