"use client";

import { useState } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
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

/**
 * A sorted, unique list of all project tags, generated once at the module level.
 */
const allTags = Array.from(
  new Set(projects.flatMap((project) => project.tags))
).sort();

/**
 * Animation variants for container elements to orchestrate staggering children.
 */
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/**
 * Animation variants for individual items to fade and slide in.
 */
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

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

  return (
    <AppShell>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="pt-36 pb-24 px-6 sm:px-8 lg:px-32 relative overflow-hidden"
      >
        <ProjectsPageBackground />

        <motion.div variants={itemVariants}>
          <ProjectsHeader />
        </motion.div>

        <motion.div variants={itemVariants} className="mb-20">
          <ProjectAnalytics />
        </motion.div>

        <motion.div variants={itemVariants} className="my-20">
          {" "}
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
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
