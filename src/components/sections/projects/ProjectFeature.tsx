import { RiGithubLine } from "@remixicon/react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { SharedElement } from "@/components/shared/SharedElement";
import type { ProjectRowPropsType } from "@/lib/types/components";
import { MarginNotes } from "./MarginNotes";

const ACTION_CLASS =
  "flex items-center gap-1.5 text-sm font-light text-foreground/60 transition-colors duration-200 hover:text-foreground";

/**
 * A current project as a full-width editorial row: serif title, the whole description, role and
 * duration in mono, the links, and the project's first margin note on the right.
 */
export const ProjectFeature = ({ project }: ProjectRowPropsType) => {
  const [note] = project.notes ?? [];

  return (
    <article className="grid gap-x-16 gap-y-8 border-t border-foreground/10 py-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
      <div>
        <SharedElement name={`project-title-${project.slug}`}>
          <h2 className="font-serif text-4xl leading-tight text-foreground sm:text-5xl">
            {project.title}
          </h2>
        </SharedElement>

        <p className="mt-5 max-w-xl text-base font-light leading-relaxed text-foreground/70">
          {project.description}
        </p>

        <dl className="mt-6 grid max-w-xl grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 font-mono text-xs leading-relaxed text-foreground/60">
          {project.role && (
            <>
              <dt className="text-primary/60">role</dt>
              <dd>{project.role}</dd>
            </>
          )}
          {project.duration && (
            <>
              <dt className="text-primary/60">time</dt>
              <dd>{project.duration}</dd>
            </>
          )}
        </dl>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={ACTION_CLASS}
            >
              <ExternalLink className="h-3.5 w-3.5" />
              live
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={ACTION_CLASS}
            >
              <RiGithubLine className="h-3.5 w-3.5" />
              code
            </a>
          )}
          <Link
            href={`/projects/${project.slug}`}
            transitionTypes={["nav-forward"]}
            className={`${ACTION_CLASS} group/link`}
          >
            details
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
          </Link>
        </div>
      </div>

      {note && (
        <div className="lg:pt-3">
          <MarginNotes notes={[note]} />
        </div>
      )}
    </article>
  );
};
