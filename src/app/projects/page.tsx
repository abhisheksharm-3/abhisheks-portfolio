"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { ProjectsCTA } from "@/components/sections/projects/ProjectsCTA";
import { ProjectsFilters } from "@/components/sections/projects/ProjectsFilter";
import { ProjectsPageBackground } from "@/components/sections/projects/ProjectsPageBackground";
import { ContentBlock } from "@/components/shared/ContentBlock";
import { PageHeader } from "@/components/shared/PageHeader";
import { ProjectTile } from "@/components/shared/ProjectTile";
import { ProjectVisual } from "@/components/shared/ProjectVisual";
import { archivedProjects, selectedProjects } from "@/data/projects";
import { SITE_MEDIA } from "@/data/site-media";
import type { ProjectType } from "@/lib/types/components";

const FADE = { duration: 0.35, ease: [0.22, 1, 0.36, 1] } as const;

/**
 * A grid of project tiles for one tier. Tiles fade as the filter adds or removes them and the
 * rest reflow into place. Renders nothing when the filter leaves the tier empty.
 */
const TileGrid = ({ projects, className }: { projects: ProjectType[]; className: string }) =>
  projects.length > 0 && (
    <motion.ul layout className={className}>
      <AnimatePresence initial={false}>
        {projects.map((project) => (
          <motion.li
            key={project.slug}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={FADE}
          >
            <ProjectTile project={project} />
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );

/**
 * The projects page: the header beside the photo from the night credify won, the area filter,
 * what's running now and what shipped as picture-first tiles, then earlier work as small
 * thumbnails. Filter changes run in a transition.
 */
const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [isPending, startTransition] = useTransition();
  const { gurugramNight } = SITE_MEDIA;

  const filteredProjects = useMemo(
    () =>
      activeFilter === "all"
        ? selectedProjects
        : selectedProjects.filter((project) => project.category === activeFilter),
    [activeFilter],
  );
  const running = filteredProjects.filter((project) => project.isBuilding);
  const shipped = filteredProjects.filter((project) => !project.isBuilding);

  return (
    <AppShell>
      <div className="relative overflow-hidden px-6 pt-36 pb-16 sm:px-10 lg:px-24">
        <ProjectsPageBackground />

        <div className="relative z-10 grid grid-cols-1 items-end gap-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:gap-12">
          <PageHeader
            eyebrow="project archive"
            title="things i've built"
            intro="client work, web apps, android apps and ai tools since 2023, newest first. the ones i stopped are on the graveyard."
            className="mb-0 sm:mb-0"
          />
          <figure className="flex flex-col gap-2">
            <div className="relative aspect-[4/3] overflow-hidden border border-foreground/10">
              <Image
                src={gurugramNight.src}
                alt={gurugramNight.alt}
                fill
                priority
                sizes="(min-width: 768px) 40vw, 90vw"
                className="object-cover"
              />
            </div>
            <figcaption className="font-mono text-[11px] text-foreground/60">
              {gurugramNight.caption}
            </figcaption>
          </figure>
        </div>

        <div className="relative z-10 mt-14 mb-12">
          <ProjectsFilters
            activeFilter={activeFilter}
            setActiveFilter={(filter) => startTransition(() => setActiveFilter(filter))}
            projects={selectedProjects}
            filteredCount={filteredProjects.length}
            isPending={isPending}
          />
        </div>

        <div className="relative z-10 space-y-20 sm:space-y-24">
          {running.length > 0 && (
            <ContentBlock label="running now">
              <TileGrid
                projects={running}
                className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
              />
            </ContentBlock>
          )}

          {shipped.length > 0 && (
            <ContentBlock label="shipped">
              <TileGrid
                projects={shipped}
                className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
              />
            </ContentBlock>
          )}

          {activeFilter === "all" && (
            <ContentBlock label="earlier work" note="where i learned, kept for the record">
              <ul className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-4 lg:grid-cols-6">
                {archivedProjects.map((project) => (
                  <li key={project.slug}>
                    <Link
                      href={`/projects/${project.slug}`}
                      transitionTypes={["nav-forward"]}
                      className="group block"
                    >
                      <ProjectVisual project={project} />
                      <span className="mt-2 flex items-baseline justify-between gap-2 font-mono text-[11px] text-foreground/60 transition-colors duration-200 group-hover:text-foreground">
                        <span className="truncate">{project.title.toLowerCase()}</span>
                        <span className="shrink-0">{project.year}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </ContentBlock>
          )}
        </div>

        <ProjectsCTA />
      </div>
    </AppShell>
  );
};

export default ProjectsPage;
