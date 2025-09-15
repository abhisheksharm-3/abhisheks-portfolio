"use client";

import { useMemo } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, Variants } from "framer-motion";
import { Project } from "@/lib/types";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

interface ProjectsFiltersProps {
  allTags: string[];
  activeFilter: string;
  setActiveFilter: (tag: string) => void;
  projects: Project[];
  filteredCount: number;
}

export function ProjectsFilters({
  allTags,
  activeFilter,
  setActiveFilter,
  projects = [], // Added default value to prevent crashes
  filteredCount,
}: ProjectsFiltersProps) {
  const tagCounts = useMemo(() => {
    const counts: { [key: string]: number } = { all: projects.length };
    for (const tag of allTags) {
      counts[tag] = projects.filter((project) => project.tags.includes(tag)).length;
    }
    return counts;
  }, [allTags, projects]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-md border border-primary/10 flex items-center justify-center mr-3">
            <div className="w-1 h-1 rounded-full bg-primary/40" />
          </div>
          <span className="text-xs text-primary/60 uppercase tracking-wider font-light">
            Filter & Browse
          </span>
        </div>
        <div className="flex items-center space-x-4 text-xs text-foreground/40">
          <span>{filteredCount} projects shown</span>
          <div className="w-px h-4 bg-primary/10" />
          <span className="font-mono capitalize">{activeFilter}</span>
        </div>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveFilter} value={activeFilter}>
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <TabsList className="flex flex-wrap gap-2 bg-transparent h-auto p-0">
            <motion.div variants={itemVariants}>
              <TabsTrigger value="all" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-primary/30 border border-primary/10 bg-transparent hover:bg-primary/5 rounded-md px-4 py-2 text-xs font-light transition-all duration-300">
                All Projects
                <span className="ml-2 text-[10px] text-foreground/40 bg-primary/5 px-1.5 py-0.5 rounded">{tagCounts.all}</span>
              </TabsTrigger>
            </motion.div>
            {allTags.map((tag) => (
              <motion.div variants={itemVariants} key={tag}>
                <TabsTrigger value={tag} className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-primary/30 border border-primary/10 bg-transparent hover:bg-primary/5 rounded-md px-4 py-2 text-xs font-light transition-all duration-300">
                  {tag}
                  <span className="ml-2 text-[10px] text-foreground/40 bg-primary/5 px-1.5 py-0.5 rounded">{tagCounts[tag] || 0}</span>
                </TabsTrigger>
              </motion.div>
            ))}
          </TabsList>
        </motion.div>
      </Tabs>
    </div>
  );
}