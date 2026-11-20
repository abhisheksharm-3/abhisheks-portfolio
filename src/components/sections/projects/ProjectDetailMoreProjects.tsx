import Link from "next/link";
import { ProjectVisual } from "@/components/shared/ProjectVisual";
import { projects } from "@/data/projects";

/**
 * Closes a project page with the next project, as its title and its picture, in projects.ts order, within the same tier
 * (current work or early learning work), wrapping to the first.
 */
export function ProjectDetailMoreProjects({ slug }: { slug: string }) {
  const current = projects.find((project) => project.slug === slug);
  const tier = projects.filter((project) => !!project.isArchived === !!current?.isArchived);
  const next = tier[(tier.findIndex((project) => project.slug === slug) + 1) % tier.length];

  return (
    <div className="mt-12 border-t border-foreground/10 pt-10">
      <Link
        href={`/projects/${next.slug}`}
        transitionTypes={["nav-forward"]}
        className="group grid grid-cols-1 items-center gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]"
      >
        <span>
          <span className="block font-mono text-[11px] text-foreground/60">next</span>
          <span className="mt-2 block font-serif text-3xl leading-tight text-foreground sm:text-4xl">
            {next.title.toLowerCase()}{" "}
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1"
            >
              →
            </span>
          </span>
          <span className="mt-2 block max-w-xl text-sm font-light leading-relaxed text-foreground/60 transition-colors duration-200 group-hover:text-foreground/80">
            {next.description}
          </span>
        </span>
        <ProjectVisual project={next} />
      </Link>
    </div>
  );
}
