import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Project } from "@/lib/types";

export function ProjectDetailOverview({
  project,
  isInView,
}: {
  project: Project;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.7 }}
      className="mb-16"
    >
      <Card className="border-primary/10 backdrop-blur-sm overflow-hidden relative">
        <div className="p-8 sm:p-10">
          <h2 className="text-2xl font-serif italic mb-6">Project Overview</h2>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "3rem" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-[1px] bg-gradient-to-r from-primary/30 to-transparent mb-6"
          />
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p className="text-foreground/70 text-base font-light leading-relaxed">
              {project.longDescription ||
                `${project.description} This project showcases my skills in ${project.tags.join(", ")}. 
                As the ${project.role || "developer"}, I was responsible for the entire development process 
                from concept to deployment.`
              }
            </p>
            <p className="text-foreground/70 text-base font-light leading-relaxed mt-4">
              The project was completed {project.duration || `in ${project.year}`} and demonstrates my ability to 
              deliver high-quality solutions that meet client requirements and user needs.
            </p>
          </div>
        </div>
        {/* Decorative corner element */}
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-primary/20 to-transparent" />
          <div className="absolute top-0 right-0 h-px w-16 bg-gradient-to-l from-primary/20 to-transparent" />
        </div>
      </Card>
    </motion.div>
  );
}