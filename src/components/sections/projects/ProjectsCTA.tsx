import { ArrowRight } from "lucide-react";
import Link from "next/link";

/**
 * Closes the projects page by pointing at the other half of the work: the projects that were
 * stopped, each with the reason.
 */
export const ProjectsCTA = () => {
  return (
    <div className="mt-10 pt-6">
      <div className="h-px bg-primary/10 mb-8" />

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
        <h2 className="text-2xl sm:text-3xl font-serif text-primary leading-tight">
          and the ones i stopped, with why.
        </h2>

        <Link
          href="/graveyard"
          transitionTypes={["nav-forward"]}
          className="group inline-flex flex-shrink-0 items-center gap-2 text-sm font-light text-foreground/60 hover:text-foreground border border-foreground/15 hover:border-foreground/30 transition-colors duration-200 px-6 py-2.5"
        >
          things i killed
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};
