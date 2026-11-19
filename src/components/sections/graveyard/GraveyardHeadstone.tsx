import { RiGithubLine } from "@remixicon/react";
import { ExternalLink } from "lucide-react";
import type { DeadProjectType } from "@/data/projects";

const LABEL_CLASS =
  "mb-2 font-mono text-[11px] uppercase leading-loose tracking-[0.2em] text-primary/60";

const LINK_CLASS =
  "flex items-center gap-1.5 text-xs font-light text-foreground/60 transition-colors duration-200 hover:text-foreground";

/**
 * One stopped project as a headstone row: the name, its epitaph, what it was and when it ran,
 * then why it stopped and what i do now, side by side.
 */
export const GraveyardHeadstone = ({ project }: { project: DeadProjectType }) => (
  <article className="grid gap-x-16 gap-y-8 border-t border-foreground/10 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
    <div>
      <h2 className="font-serif text-3xl leading-tight text-foreground sm:text-4xl">
        {project.title}
      </h2>
      <p className="mt-3 font-serif text-lg italic leading-snug text-foreground/70">
        {project.epitaph}
      </p>

      <p className="mt-6 font-mono text-xs leading-relaxed text-foreground/60">
        {project.description}
        <br />
        {project.duration}
      </p>

      {(project.link || project.repo) && (
        <div className="mt-5 flex items-center gap-5">
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
              <ExternalLink className="h-3 w-3" />
              live
            </a>
          )}
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
              <RiGithubLine className="h-3 w-3" />
              code
            </a>
          )}
        </div>
      )}
    </div>

    <div className="grid gap-x-12 gap-y-8 sm:grid-cols-2">
      <div>
        <h3 className={LABEL_CLASS}>why it stopped</h3>
        <p className="text-sm font-light leading-relaxed text-foreground/70">{project.reason}</p>
      </div>
      <div>
        <h3 className={LABEL_CLASS}>what i do now</h3>
        <p className="text-sm font-light leading-relaxed text-foreground/70">{project.lessons}</p>
      </div>
    </div>
  </article>
);
