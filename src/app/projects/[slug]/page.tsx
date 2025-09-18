"use client";

import { motion, Variants } from "framer-motion";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/data/project";
import { ProjectDetailHeader } from "@/components/sections/projects/ProjectDetailsHeader";
import { ProjectDetailSidebar } from "@/components/sections/projects/ProjectDetailsSidebar";
import { ProjectDetailImage } from "@/components/sections/projects/ProjectDetailImage";
import { ProjectDetailOverview } from "@/components/sections/projects/ProjectDetailOverview";
import { ProjectDetailMoreProjects } from "@/components/sections/projects/ProjectDetailMoreProjects";
import { ProjectsPageBackground } from "@/components/sections/projects/ProjectsPageBackground";

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
 * Renders the detailed view for a single project based on the URL slug.
 * Features an orchestrated entry animation for all page sections.
 * @returns {JSX.Element} The ProjectDetailPage component.
 */
const ProjectDetailPage = () => {
  const params = useParams();
  const project = projects.find((p) => p.slug === params?.slug);

  if (!project) {
    notFound();
  }

  return (
    <AppShell>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="pt-36 pb-24 px-6 sm:px-8 lg:px-32 relative overflow-hidden"
      >
        <ProjectsPageBackground />

        <motion.div variants={itemVariants} className="mb-8">
          <Button
            variant="outline"
            size="sm"
            className="group border-primary/10 hover:bg-primary/5"
            asChild
          >
            <Link href="/projects" className="flex items-center">
              <ArrowLeft className="mr-2 h-3 w-3 transition-transform group-hover:-translate-x-1" />
              Back to Projects
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <ProjectDetailHeader
              title={project.title}
              description={project.longDescription || project.description}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <ProjectDetailSidebar project={project} />
          </motion.div>
        </div>

        <motion.div variants={itemVariants}>
          <ProjectDetailImage src={project.imageSrc} alt={project.title} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <ProjectDetailOverview project={project} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <ProjectDetailMoreProjects />
        </motion.div>
      </motion.div>
    </AppShell>
  );
};

export default ProjectDetailPage;
