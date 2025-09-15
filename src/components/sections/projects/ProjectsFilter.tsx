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
    <div className="space-y-8">
      {/* Filter Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-6 h-6 rounded-md border border-primary/10 flex items-center justify-center mr-3"
          >
            <div className="w-1 h-1 rounded-full bg-primary/40" />
          </motion.div>
          <span className="text-xs text-primary/60 uppercase tracking-wider font-light">
            Filter & Browse
          </span>
        </div>
        <div className="flex items-center space-x-4 text-xs text-foreground/40">
          <span>{filteredProjects.length} projects</span>
          <div className="w-px h-4 bg-primary/10" />
          <span className="font-mono">{activeFilter === "all" ? "All" : activeFilter}</span>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveFilter}>
        <TabsList className="flex flex-wrap gap-2 bg-transparent h-auto p-0 mb-8">
          <TabsTrigger 
            value="all" 
            className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-primary/30 border border-primary/10 bg-transparent hover:bg-primary/5 rounded-md px-4 py-2 text-xs font-light transition-all duration-300"
          >
            All Projects
            <span className="ml-2 text-[10px] text-foreground/40 bg-primary/5 px-1.5 py-0.5 rounded">
              {filteredProjects.length}
            </span>
          </TabsTrigger>
          {allTags.map(tag => {
            const tagCount = filteredProjects.filter(project => project.tags.includes(tag)).length;
            return (
              <TabsTrigger 
                key={tag}
                value={tag}
                className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-primary/30 border border-primary/10 bg-transparent hover:bg-primary/5 rounded-md px-4 py-2 text-xs font-light transition-all duration-300"
              >
                {tag}
                <span className="ml-2 text-[10px] text-foreground/40 bg-primary/5 px-1.5 py-0.5 rounded">
                  {activeFilter === tag ? filteredProjects.length : tagCount}
                </span>
              </TabsTrigger>
            );
          })}
        </TabsList>
        
        <TabsContent value={activeFilter} className="mt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProjects.map((project, index) => (
                    <ProjectCard 
                      key={project.slug} 
                      project={project} 
                      delay={index * 0.1}
                    />
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="col-span-full py-16 text-center"
                >
                  <div className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center mx-auto mb-4">
                    <div className="w-4 h-4 rounded-full bg-primary/20" />
                  </div>
                  <p className="text-foreground/50 font-light mb-2">No projects found</p>
                  <p className="text-xs text-foreground/30">Try selecting a different filter</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </TabsContent>
      </Tabs>
    </div>
  );
}