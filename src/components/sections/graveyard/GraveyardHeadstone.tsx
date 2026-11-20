import { RiGithubLine } from "@remixicon/react";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import type { DeadProjectType } from "@/data/projects";

const LABEL_CLASS = "font-mono text-[11px] text-foreground/60";

const LINK_CLASS =
  "flex items-center gap-1.5 text-xs font-light text-foreground/60 transition-colors duration-200 hover:text-foreground";

/**
 * What a stopped project looks like today, in grey, with its colour fading back in on hover. A
 * project that never launched gets a type panel instead.
 */
const Gravestone = ({ project }: { project: DeadProjectType }) => {
  if (!project.imageSrc) {
    return (
      <div className="flex aspect-[16/10] items-center justify-center border border-foreground/10 bg-foreground/[0.03]">
        <span className="font-serif text-2xl text-foreground/60">never launched</span>
      </div>
    );
  }
  const image = (className: string) => (
    <Image
      src={project.imageSrc ?? ""}
      alt={`${project.title} as it looks today`}
      fill
      sizes="(min-width: 1024px) 38vw, 90vw"
      className={`object-cover object-top ${className}`}
    />
  );
  return (
    <div className="group/stone relative aspect-[16/10] overflow-hidden border border-foreground/10">
      {image("grayscale")}
      {image(
        "opacity-0 transition-opacity duration-300 ease-out group-hover/stone:opacity-100 motion-reduce:transition-none",
      )}
    </div>
  );
};

/**
 * One stopped project as a headstone row: its screenshot today beside the name, its epitaph, when
 * it ran, and why it stopped and what i'd do now.
 */
export const GraveyardHeadstone = ({ project }: { project: DeadProjectType }) => (
  <article className="grid items-center gap-x-12 gap-y-8 border-t border-foreground/10 py-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
    <Gravestone project={project} />

    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h2 className="font-serif text-3xl leading-tight text-foreground sm:text-4xl">
          {project.title}
        </h2>
        <span className="font-mono text-[11px] text-foreground/60">
          {project.description} · {project.duration}
        </span>
      </div>
      <p className="mt-3 font-serif text-xl italic leading-snug text-foreground/70 sm:text-2xl">
        {project.epitaph}
      </p>

      <dl className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-[8.5rem_minmax(0,1fr)]">
        <dt className={LABEL_CLASS}>why it stopped</dt>
        <dd className="text-sm font-light leading-relaxed text-foreground/75">{project.reason}</dd>
        <dt className={LABEL_CLASS}>what i&apos;d do now</dt>
        <dd className="text-sm font-light leading-relaxed text-foreground/75">{project.lessons}</dd>
      </dl>

      {(project.link || project.repo) && (
        <div className="mt-6 flex items-center gap-5">
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
  </article>
);
