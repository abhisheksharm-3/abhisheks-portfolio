"use client";

import { motion } from "framer-motion";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/data/projects";
import { ProjectDetailHeader } from "@/components/sections/projects/ProjectDetailsHeader";
import { ProjectDetailMeta } from "@/components/sections/projects/ProjectDetailMeta";
import { ProjectDetailImage } from "@/components/sections/projects/ProjectDetailImage";
import { ProjectDetailOverview } from "@/components/sections/projects/ProjectDetailOverview";
import { ProjectDetailMoreProjects } from "@/components/sections/projects/ProjectDetailMoreProjects";
import { ProjectsPageBackground } from "@/components/sections/projects/ProjectsPageBackground";
import { CONTAINER_VARIANTS, ITEM_VARIANTS } from "@/lib/config/page-animations";

/**
 * Renders the detailed view for a single project based on the URL slug.
 * Features an orchestrated entry animation for all page sections.
 * @returns {JSX.Element} The ProjectDetailPage component.
 */
const DetailedProjectPage = () => {
  const params = useParams();
  const project = projects.find((p) => p.slug === params?.slug);

  if (!project) {
    notFound();
  }

  return (
    <AppShell>
      <motion.div
        variants={CONTAINER_VARIANTS}
        initial="hidden"
        animate="visible"
        className="pt-36 pb-16 px-6 sm:px-10 lg:px-24 relative overflow-hidden"
      >
        <ProjectsPageBackground />

        <motion.div variants={ITEM_VARIANTS} className="mb-10">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-xs text-foreground/40 hover:text-foreground/70 transition-colors duration-200"
          >
            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
            back to projects
          </Link>
        </motion.div>

        <motion.div variants={ITEM_VARIANTS} className="mb-10">
          <ProjectDetailHeader project={project} />
        </motion.div>

        <motion.div variants={ITEM_VARIANTS} className="mb-12">
          <ProjectDetailMeta project={project} />
        </motion.div>

        <motion.div variants={ITEM_VARIANTS}>
          <ProjectDetailImage src={project.imageSrc} alt={project.title} />
        </motion.div>

        <motion.div variants={ITEM_VARIANTS}>
          <ProjectDetailOverview project={project} />
        </motion.div>

        <motion.div variants={ITEM_VARIANTS}>
          <ProjectDetailMoreProjects />
        </motion.div>
      </motion.div>
    </AppShell>
  );
};

export default DetailedProjectPage;
