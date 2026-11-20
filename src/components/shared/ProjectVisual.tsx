import Image from "next/image";
import type { ProjectType } from "@/lib/types/components";

const PANEL_CLASS = "relative block aspect-[4/3] overflow-hidden border border-foreground/10";

/**
 * A project's picture: its phone screens side by side when it has them, else its screenshot, else a
 * panel with its install command or its client line, so every tile in the row has a face. Client
 * work, which has no screenshots to show, gets a type panel over slowly drifting light.
 */
export const ProjectVisual = ({ project }: { project: ProjectType }) => {
  if (project.caseFile) {
    return (
      <span
        className={`${PANEL_CLASS} flex flex-col justify-between bg-foreground/[0.04] p-5 sm:p-6`}
      >
        <span aria-hidden="true" className="drift-light" />
        <span className="relative font-mono text-[11px] text-foreground/60">client work</span>
        <span className="relative font-serif text-2xl leading-tight text-foreground sm:text-3xl">
          an {project.title.toLowerCase()}, for a us client
        </span>
        <span className="relative font-mono text-[11px] text-foreground/60">
          billing · checkout · analytics · releases
        </span>
      </span>
    );
  }
  if (project.screens?.length) {
    return (
      <span
        className={`${PANEL_CLASS} flex items-end justify-center gap-2 bg-foreground/[0.04] px-4 pt-5`}
      >
        {project.screens.slice(0, 3).map((screen) => (
          <span key={screen.src} className="relative h-full w-1/3">
            <Image
              src={screen.src}
              alt={screen.alt}
              fill
              sizes="12vw"
              className="object-contain object-bottom"
            />
          </span>
        ))}
      </span>
    );
  }
  if (project.imageSrc) {
    return (
      <span className={PANEL_CLASS}>
        <Image
          src={project.imageSrc}
          alt={`${project.title} screenshot`}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 90vw"
          className="object-cover object-left-top"
        />
      </span>
    );
  }
  return (
    <span className={`${PANEL_CLASS} flex flex-col justify-end gap-3 bg-foreground/[0.04] p-5`}>
      <span className="font-serif text-3xl leading-tight text-foreground/90">
        {project.title.toLowerCase()}
      </span>
      <span className="font-mono text-[11px] text-foreground/60">
        {project.installCommand ? `> ${project.installCommand}` : project.client}
      </span>
    </span>
  );
};
