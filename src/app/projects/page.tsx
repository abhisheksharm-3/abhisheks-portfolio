"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { AppShell } from "@/components/layout/AppShell";
import { projects } from "@/data/project";
import {
  ProjectsHeader,
  ProjectsFilters,
  ProjectsCTA,
  ProjectCard,
  ProjectsPageBackground,
  ProjectAnalytics,
} from "@/components/sections/projects";
import { containerVariants, itemVariants } from "@/lib/config/page-animations";
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
 * @returns {JSX.Element} The ProjectsPage component.
 */
const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.tags.includes(activeFilter));

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  return (
    <AppShell>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        ref={sectionRef}
        animate={isInView ? "visible" : "hidden"}
        className={`${getHalfScreenPageWrapperClasses()} relative overflow-hidden`}
      >
        <ProjectsPageBackground />

        <motion.div variants={itemVariants}>
          <ProjectsHeader />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className={SPACING_STANDARDS.CONTENT.SECTION_SPACING}
        >
          <ProjectAnalytics />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className={SPACING_STANDARDS.CONTENT.SECTION_SPACING}
        >
          <ProjectsFilters
            allTags={allTags}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            projects={projects}
            filteredCount={filteredProjects.length}
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

        <motion.div variants={itemVariants}>
          <ProjectsCTA />
        </motion.div>
      </motion.div>
    </AppShell>
  );
};

export default ProjectsPage;
