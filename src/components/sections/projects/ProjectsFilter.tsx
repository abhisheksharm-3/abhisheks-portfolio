import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import { Project } from "@/lib/types";

export function ProjectsFilters({
  allTags,
  activeFilter,
  setActiveFilter,
  filteredProjects,
}: {
  allTags: string[];
  activeFilter: string;
  setActiveFilter: (tag: string) => void;
  filteredProjects: Project[];
}) {
  return (
    <Tabs defaultValue="all" className="w-full" onValueChange={setActiveFilter}>
      <TabsList className="flex flex-wrap gap-2 bg-transparent h-auto p-0">
        <TabsTrigger 
          value="all" 
          className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-primary/30 border border-primary/10 bg-transparent hover:bg-primary/5 rounded-md px-4 py-1.5 text-xs"
        >
          All Projects
        </TabsTrigger>
        {allTags.map(tag => (
          <TabsTrigger 
            key={tag}
            value={tag}
            className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-primary/30 border border-primary/10 bg-transparent hover:bg-primary/5 rounded-md px-4 py-1.5 text-xs"
          >
            {tag}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent value={activeFilter} className="mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <ProjectCard 
                  key={project.slug} 
                  project={project} 
                  delay={index * 0.1}
                />
              ))
            ) : (
              <div className="col-span-full py-12 text-center">
                <p className="text-foreground/50 font-light">No projects found with this filter.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </TabsContent>
    </Tabs>
  );
}