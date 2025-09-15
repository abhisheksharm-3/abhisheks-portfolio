"use client";

import { useState, useMemo } from "react";
import { motion, Variants } from "framer-motion";
import PageLayout from "@/components/layout/page-layout";
import { projects } from "@/data/project";
import AbstractPath from "@/components/shared/AbstractPath";
import ProjectsHeader from "@/components/sections/projects/ProjectsHeader";
import { ProjectsFilters } from "@/components/sections/projects/ProjectsFilter";
import ProjectsCTA from "@/components/sections/projects/ProjectsCTA";
import { ProjectStatsOverview } from "@/components/sections/projects/ProjectStatsOverview";
import { ProjectInsights } from "@/components/sections/projects/ProjectInsights";
import { ProjectCard } from "@/components/sections/projects/ProjectCard";

const allTags = Array.from(
  new Set(projects.flatMap((project) => project.tags))
).sort();

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const ProjectsPageBackground = () => (
  <div className="absolute inset-0 pointer-events-none -z-10">
    <div className="absolute inset-0 mix-blend-overlay opacity-10">
      <svg className="w-full h-full opacity-20" viewBox="0 0 200 200">
        <filter id="projectsNoiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#projectsNoiseFilter)" />
      </svg>
    </div>
    <AbstractPath
      className="absolute left-[5%] top-[15%] text-primary/8"
      pathD="M10,30 C20,50 40,10 50,40 S80,20 90,40"
    />
    <AbstractPath
      className="absolute right-[10%] bottom-[20%] rotate-180 text-primary/8"
      pathD="M10,50 Q40,20 50,50 T90,30"
    />
  </div>
);

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((project) => project.tags.includes(activeFilter));
  }, [activeFilter]);

  return (
    <PageLayout>
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
        <motion.div variants={itemVariants}>
          <ProjectStatsOverview />
        </motion.div>

        <motion.div variants={itemVariants} className="my-20">
          <ProjectsFilters
            allTags={allTags}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            projects={projects} // This line is crucial for passing the data
            filteredCount={filteredProjects.length}
          />
        </motion.div>

        <motion.div
          key={activeFilter}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {filteredProjects.map((project) => (
            <motion.div variants={itemVariants} key={project.title}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants}>
          <ProjectInsights />
        </motion.div>
        <motion.div variants={itemVariants}>
          <ProjectsCTA />
        </motion.div>
      </motion.div>
    </PageLayout>
  );
}
