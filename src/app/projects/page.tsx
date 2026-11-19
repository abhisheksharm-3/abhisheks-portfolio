"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { ProjectCard } from "@/components/sections/projects/ProjectCard";
import { ProjectsCTA } from "@/components/sections/projects/ProjectsCTA";
import { ProjectsFilters } from "@/components/sections/projects/ProjectsFilter";
import { ProjectsHeader } from "@/components/sections/projects/ProjectsHeader";
import { ProjectsPageBackground } from "@/components/sections/projects/ProjectsPageBackground";
import { archivedProjects, selectedProjects } from "@/data/projects";
import { SPACING_STANDARDS } from "@/lib/config/spacing-standards";

/**
 * Renders the main projects page, including filtering and animated project cards.
 * Uses React 19's useTransition for smooth filter transitions.
 * @returns {JSX.Element} The ProjectsPage component.
 */
const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [isPending, startTransition] = useTransition();

  // Calculate filtered projects during render (React best practice)
  const filteredProjects = useMemo(
    () =>
      activeFilter === "all"
        ? selectedProjects
        : selectedProjects.filter((project) => project.category === activeFilter),
    [activeFilter],
  );

  // Wrap filter changes in transition for responsive UI
  const handleFilterChange = (filter: string) => {
    startTransition(() => {
      setActiveFilter(filter);
    });
  };

  return (
    <AppShell>
      <div className="pt-36 pb-16 px-6 sm:px-10 lg:px-24 relative overflow-hidden">
        <ProjectsPageBackground />

        <ProjectsHeader />

        <div className={SPACING_STANDARDS.CONTENT.SECTION_SPACING}>
          <ProjectsFilters
            activeFilter={activeFilter}
            setActiveFilter={handleFilterChange}
            projects={selectedProjects}
            filteredCount={filteredProjects.length}
            isPending={isPending}
          />
        </div>

        <motion.div
          layout
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${SPACING_STANDARDS.GRID.GAP_MEDIUM} ${SPACING_STANDARDS.CONTENT.SECTION_SPACING}`}
        >
          <AnimatePresence initial={false}>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard project={project} priority={index === 0} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {activeFilter === "all" && (
          <section className={SPACING_STANDARDS.CONTENT.SECTION_SPACING}>
            <h2 className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light mb-1">
              earlier work
            </h2>
            <p className="text-xs text-foreground/30 font-light mb-6">
              where I learned. Kept for the record, not the résumé.
            </p>
            <ul className="divide-y divide-foreground/8 border-y border-foreground/8">
              {archivedProjects.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group flex items-baseline justify-between gap-4 py-3 text-sm font-light"
                  >
                    <span className="text-foreground/55 group-hover:text-foreground/80 transition-colors duration-200">
                      {project.title}
                    </span>
                    <span className="hidden sm:block flex-1 text-xs text-foreground/25 truncate">
                      {project.description}
                    </span>
                    <span className="text-xs text-foreground/25 tabular-nums">{project.year}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <ProjectsCTA />
      </div>
    </AppShell>
  );
};

export default ProjectsPage;
