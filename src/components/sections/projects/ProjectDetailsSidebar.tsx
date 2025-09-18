"use client";

import { motion, Variants } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { Project } from "@/lib/types";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -15 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

/**
 * Renders a sidebar card with key details about a project.
 * Features a granular, staggered animation for all content.
 * @param {object} props - The component props.
 * @param {Project} props.project - The project data to display.
 * @returns {JSX.Element} The ProjectDetailSidebar component.
 */
export function ProjectDetailSidebar({ project }: { project: Project }) {
  const projectDetails = [
    { label: "Year", value: project.year },
    { label: "Role", value: project.role },
    { label: "Client", value: project.client },
    { label: "Duration", value: project.duration },
  ].filter(detail => detail.value); // Filter out details that are not provided

  return (
    <Card className="border-primary/10 backdrop-blur-sm overflow-hidden relative h-full">
      <motion.div
        variants={containerVariants}
        className="p-6 sm:p-8"
      >
        <motion.h3 variants={itemVariants} className="text-xl font-medium mb-4">Project Details</motion.h3>
        <motion.div
          variants={{
            hidden: { width: 0 },
            visible: { width: "3rem", transition: { duration: 0.8, ease: "easeOut" } },
          }}
          className="h-[1px] bg-gradient-to-r from-primary/30 to-transparent mb-6"
        />

        <motion.div variants={containerVariants} className="space-y-4">
          {projectDetails.map(detail => (
            <motion.div variants={itemVariants} className="flex items-center" key={detail.label}>
              <span className="w-24 text-sm text-foreground/50 flex-shrink-0">{detail.label}:</span>
              <span className="text-sm">{detail.value}</span>
            </motion.div>
          ))}
          <motion.div variants={itemVariants} className="flex items-start pt-2">
            <span className="w-24 text-sm text-foreground/50 flex-shrink-0">Technologies:</span>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag: string) => (
                <span key={tag} className="px-2 py-1 bg-primary/5 border border-primary/10 rounded-md text-xs text-primary/70">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={containerVariants} className="flex items-center gap-4 mt-8">
          {project.url && (
            <motion.div variants={itemVariants} className="flex-1">
              <Button variant="default" size="sm" className="group w-full bg-primary hover:bg-primary/90 text-primary-foreground" asChild>
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                  Visit Website
                  <ExternalLink className="ml-2 h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Button>
            </motion.div>
          )}
          {project.github && (
            <motion.div variants={itemVariants} className="flex-1">
              <Button variant="outline" size="sm" className="group w-full border-primary/10 hover:bg-primary/5 hover:border-primary/20" asChild>
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                  View Source
                  <Github className="ml-2 h-3 w-3 text-primary/70" />
                </a>
              </Button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-px h-12 bg-gradient-to-b from-primary/20 to-transparent" />
        <div className="absolute top-0 right-0 h-px w-12 bg-gradient-to-l from-primary/20 to-transparent" />
      </div>
    </Card>
  );
}