"use client";

import { useRef, useState, useTransition, useMemo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { AppShell } from "@/components/layout/AppShell";
import { projects } from "@/data/project";
import {
  ProjectsHeader,
  ProjectsFilters,
  ProjectsCTA,
  ProjectCard,
  ProjectsPageBackground,
} from "@/components/sections/projects";
import { CONTAINER_VARIANTS, ITEM_VARIANTS } from "@/lib/config/page-animations";
import {
  getHalfScreenPageWrapperClasses,
  SPACING_STANDARDS,
} from "@/lib/config/spacing-standards";

/**
 * A sorted, unique list of all project tags, generated once at the module level.
 */
const allTags = Array.from(
  new Set(projects.flatMap((project) => project.tags)),
).sort();

/**
 * Renders the main projects page, including filtering and animated project cards.
 * Uses React 19's useTransition for smooth filter transitions.
 * @returns {JSX.Element} The ProjectsPage component.
 */
const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [isPending, startTransition] = useTransition();

  // Calculate filtered projects during render (React best practice)
  const filteredProjects = useMemo(() =>
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.tags.includes(activeFilter)),
    [activeFilter]
  );

  // Wrap filter changes in transition for responsive UI
  const handleFilterChange = (filter: string) => {
    startTransition(() => {
      setActiveFilter(filter);
    });
  };

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.01, margin: "100px 0px 0px 0px" });
  return (
    <AppShell>
      <motion.div
        variants={CONTAINER_VARIANTS}
        initial="hidden"
        ref={sectionRef}
        animate={isInView ? "visible" : "hidden"}
        className={`${getHalfScreenPageWrapperClasses()} relative overflow-hidden`}
      >
        <ProjectsPageBackground />

        <motion.div variants={ITEM_VARIANTS}>
          <ProjectsHeader />
        </motion.div>

        <motion.div
          variants={ITEM_VARIANTS}
          className={SPACING_STANDARDS.CONTENT.SECTION_SPACING}
        >
          <ProjectsFilters
            allTags={allTags}
            activeFilter={activeFilter}
            setActiveFilter={handleFilterChange}
            projects={projects}
            filteredCount={filteredProjects.length}
            isPending={isPending}
          />
        </motion.div>

        <motion.div
          layout
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${SPACING_STANDARDS.GRID.GAP_MEDIUM} ${SPACING_STANDARDS.CONTENT.SECTION_SPACING}`}
        >
          <AnimatePresence initial={false}>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div variants={ITEM_VARIANTS}>
          <ProjectsCTA />
        </motion.div>
      </motion.div>
    </AppShell>
  );
};

export default ProjectsPage;
