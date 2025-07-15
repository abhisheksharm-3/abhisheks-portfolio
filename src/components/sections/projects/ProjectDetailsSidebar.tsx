import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { Project } from "@/lib/types";

export function ProjectDetailSidebar({
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
      transition={{ duration: 0.8, delay: 0.5 }}
      className="lg:col-span-1"
    >
      <Card className="border-primary/10 backdrop-blur-sm overflow-hidden relative">
        <div className="p-6 sm:p-8">
          <h3 className="text-xl font-medium mb-4">Project Details</h3>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "3rem" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-[1px] bg-gradient-to-r from-primary/30 to-transparent mb-6"
          />
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="w-24 text-sm text-foreground/50">Year:</span>
              <span className="text-sm">{project.year}</span>
            </div>
            {project.role && (
              <div className="flex items-center">
                <span className="w-24 text-sm text-foreground/50">Role:</span>
                <span className="text-sm">{project.role}</span>
              </div>
            )}
            {project.client && (
              <div className="flex items-center">
                <span className="w-24 text-sm text-foreground/50">Client:</span>
                <span className="text-sm">{project.client}</span>
              </div>
            )}
            {project.duration && (
              <div className="flex items-center">
                <span className="w-24 text-sm text-foreground/50">Duration:</span>
                <span className="text-sm">{project.duration}</span>
              </div>
            )}
            <div className="flex items-center pt-2">
              <span className="w-24 text-sm text-foreground/50">Technologies:</span>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-primary/5 border border-primary/10 rounded-md text-xs text-primary/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-8">
            {project.url && (
              <Button
                variant="default"
                size="sm"
                className="group bg-primary hover:bg-primary/90 text-primary-foreground"
                asChild
              >
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                  Visit Website
                  <ExternalLink className="ml-2 h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Button>
            )}
            {project.github && (
              <Button
                variant="outline"
                size="sm"
                className="group border-primary/10 hover:bg-primary/5 hover:border-primary/20"
                asChild
              >
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center">
                  View Source
                  <Github className="ml-2 h-3 w-3 text-primary/70" />
                </a>
              </Button>
            )}
          </div>
        </div>
        {/* Decorative corner element */}
        <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-px h-12 bg-gradient-to-b from-primary/20 to-transparent" />
          <div className="absolute top-0 right-0 h-px w-12 bg-gradient-to-l from-primary/20 to-transparent" />
        </div>
      </Card>
    </motion.div>
  );
}