import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { projects } from "@/data/projects";

/**
 * Closes a project page with the next project in projects.ts order, within the same tier
 * (current work or early learning work), wrapping to the first.
 */
export function ProjectDetailMoreProjects({ slug }: { slug: string }) {
  const current = projects.find((project) => project.slug === slug);
  const tier = projects.filter((project) => !!project.isArchived === !!current?.isArchived);
  const next = tier[(tier.findIndex((project) => project.slug === slug) + 1) % tier.length];

  return (
    <div className="mt-12 pt-8">
      <div className="h-px bg-primary/10 mb-8" />

      <Link
        href={`/projects/${next.slug}`}
        transitionTypes={["nav-forward"]}
        className="group flex items-center justify-between gap-6"
      >
        <span className="max-w-2xl">
          <span className="block font-serif text-2xl leading-tight text-foreground sm:text-3xl">
            <span className="text-foreground/60">next:</span> {next.title}
          </span>
          <span className="mt-2 block text-sm font-light leading-relaxed text-foreground/60 transition-colors duration-200 group-hover:text-foreground/80">
            {next.description}
          </span>
        </span>
        <ArrowRight className="h-5 w-5 shrink-0 text-foreground/60 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-foreground" />
      </Link>
    </div>
  );
}
