"use client";

import { motion, Variants } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Project } from "@/lib/types";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/**
 * Renders a card with a detailed overview of the project.
 * Features a staggered animation for its content.
 * @param {object} props - The component props.
 * @param {Project} props.project - The project data to display.
 * @returns {JSX.Element} The ProjectDetailOverview component.
 */
export function ProjectDetailOverview({ project }: { project: Project }) {
  return (
    <div className="mb-16">
      <Card className="border-primary/10 backdrop-blur-sm overflow-hidden relative">
        <motion.div variants={containerVariants} className="p-8 sm:p-10">
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-serif italic mb-6"
          >
            Project Overview
          </motion.h2>

          <motion.div
            variants={{
              hidden: { width: 0 },
              visible: {
                width: "3rem",
                transition: { duration: 0.8, ease: "easeOut" },
              },
            }}
            className="h-[1px] bg-gradient-to-r from-primary/30 to-transparent mb-6"
          />

          <motion.div
            variants={itemVariants}
            className="prose prose-sm dark:prose-invert max-w-none"
          >
            <p className="text-foreground/70 text-base font-light leading-relaxed">
              {project.longDescription ||
                `${project.description} This project showcases my skills in ${project.tags.join(", ")}. 
                As the ${project.role || "developer"}, I was responsible for the entire development process 
                from concept to deployment.`}
            </p>
            <p className="text-foreground/70 text-base font-light leading-relaxed mt-4">
              The project was completed{" "}
              {project.duration || `in ${project.year}`} and demonstrates my
              ability to deliver high-quality solutions that meet client
              requirements and user needs.
            </p>
          </motion.div>
        </motion.div>

        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-primary/20 to-transparent" />
          <div className="absolute top-0 right-0 h-px w-16 bg-gradient-to-l from-primary/20 to-transparent" />
        </div>
      </Card>
    </div>
  );
}
