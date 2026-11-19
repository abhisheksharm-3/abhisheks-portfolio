import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { GraveyardBackground } from "@/components/sections/graveyard/GraveyardBackground";
import { GraveyardHeadstone } from "@/components/sections/graveyard/GraveyardHeadstone";
import { GraveyardSectionHeader } from "@/components/sections/graveyard/GraveyardSectionHeader";
import { deadProjects } from "@/data/projects";

/**
 * Renders the Graveyard page: each abandoned project as a headstone row with the reason it
 * stopped and what changed in how i work.
 * @returns {JSX.Element} The GraveyardPage component.
 */
const GraveyardPage = () => {
  return (
    <AppShell>
      <div className="pt-36 pb-16 px-6 sm:px-10 lg:px-24 relative overflow-hidden">
        <GraveyardBackground />

        <GraveyardSectionHeader />

        <div className="mb-8">
          {deadProjects.map((project) => (
            <GraveyardHeadstone key={project.title} project={project} />
          ))}
        </div>

        <div className="mt-8">
          <div className="h-px bg-primary/10 mb-8" />
          <p className="text-[11px] text-primary/60 uppercase tracking-[0.2em] font-light mb-5">
            prefer the living
          </p>
          <Link
            href="/projects"
            transitionTypes={["nav-back"]}
            className="group inline-flex items-center gap-2 text-sm font-light text-foreground/60 hover:text-foreground border border-foreground/15 hover:border-foreground/30 transition-colors duration-200 px-6 py-2.5"
          >
            escape the graveyard
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </AppShell>
  );
};

export default GraveyardPage;
