"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { type ComponentType, useMemo, useState, useTransition } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { ProjectFeature } from "@/components/sections/projects/ProjectFeature";
import { ProjectListRow } from "@/components/sections/projects/ProjectListRow";
import { ProjectsCTA } from "@/components/sections/projects/ProjectsCTA";
import { ProjectsFilters } from "@/components/sections/projects/ProjectsFilter";
import { ProjectsHeader } from "@/components/sections/projects/ProjectsHeader";
import { ProjectsPageBackground } from "@/components/sections/projects/ProjectsPageBackground";
import { SharedElement } from "@/components/shared/SharedElement";
import { archivedProjects, selectedProjects } from "@/data/projects";
import { SPACING_STANDARDS } from "@/lib/config/spacing-standards";
import type { ProjectRowPropsType, ProjectType } from "@/lib/types/components";

const CURRENT_YEAR = selectedProjects[0].year;

/**
 * One tier of the filtered list. Rows fade out and in as the filter changes and the rest of the
 * page reflows around them. Renders nothing when the filter leaves the tier empty.
 */
const ProjectTier = ({
  projects,
  Row,
  className,
}: {
  projects: ProjectType[];
  Row: ComponentType<ProjectRowPropsType>;
  className: string;
}) =>
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
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Row project={project} />
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );

/**
 * Renders the projects page: this year's work as editorial rows, older work as a hairline list,
 * and early learning work as text. Filter changes run in a transition.
 * @returns {JSX.Element} The ProjectsPage component.
 */
const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [isPending, startTransition] = useTransition();

  const filteredProjects = useMemo(
    () =>
      activeFilter === "all"
        ? selectedProjects
        : selectedProjects.filter((project) => project.category === activeFilter),
    [activeFilter],
  );

  const currentProjects = filteredProjects.filter((project) => project.year === CURRENT_YEAR);
  const pastProjects = filteredProjects.filter((project) => project.year !== CURRENT_YEAR);

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

        <ProjectTier projects={currentProjects} Row={ProjectFeature} className="mb-12" />

        <ProjectTier
          projects={pastProjects}
          Row={ProjectListRow}
          className={`border-b border-foreground/8 ${SPACING_STANDARDS.CONTENT.SECTION_SPACING}`}
        />

        {activeFilter === "all" && (
          <section className={SPACING_STANDARDS.CONTENT.SECTION_SPACING}>
            <h2 className="text-[11px] text-primary/60 uppercase tracking-[0.2em] font-light mb-1">
              earlier work
            </h2>
            <p className="text-xs text-foreground/60 font-light mb-6">
              where i learned. kept for the record, not the resume.
            </p>
            <ul className="divide-y divide-foreground/8 border-y border-foreground/8">
              {archivedProjects.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}`}
                    transitionTypes={["nav-forward"]}
                    className="group flex items-baseline justify-between gap-4 py-3 text-sm font-light"
                  >
                    <SharedElement name={`project-title-${project.slug}`}>
                      <span className="text-foreground/70 group-hover:text-foreground transition-colors duration-200">
                        {project.title}
                      </span>
                    </SharedElement>
                    <span className="hidden sm:block flex-1 text-xs text-foreground/60 truncate">
                      {project.description}
                    </span>
                    <span className="text-xs text-foreground/60 tabular-nums">{project.year}</span>
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
