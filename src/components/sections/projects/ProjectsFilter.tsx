"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { ProjectType } from "@/lib/types/components";

interface ProjectsFiltersProps {
  allTags: string[];
  activeFilter: string;
  setActiveFilter: (tag: string) => void;
  projects: ProjectType[];
  filteredCount: number;
  isPending?: boolean;
}

export function ProjectsFilters({
  allTags,
  activeFilter,
  setActiveFilter,
  projects = [],
  filteredCount,
  isPending = false,
}: ProjectsFiltersProps) {
  const tagCounts = useMemo(() => {
    const counts: { [key: string]: number } = { all: projects.length };
    for (const tag of allTags) {
      counts[tag] = projects.filter((project) =>
        project.tags.includes(tag),
      ).length;
    }
    return counts;
  }, [allTags, projects]);

  const allFilters = ["all", ...allTags];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light">
          Filter & Browse
        </span>
        <span className={`text-xs text-foreground/40 font-light transition-opacity duration-200 ${isPending ? "opacity-40" : "opacity-100"}`}>
          {filteredCount} {filteredCount === 1 ? "project" : "projects"}
          {activeFilter !== "all" && (
            <span className="ml-1 text-foreground/30">/ {activeFilter}</span>
          )}
          {isPending && (
            <span className="ml-2 inline-flex gap-0.5 items-center">
              <span className="w-1 h-1 rounded-full bg-foreground/30 animate-pulse" />
              <span className="w-1 h-1 rounded-full bg-foreground/30 animate-pulse" style={{ animationDelay: "0.15s" }} />
              <span className="w-1 h-1 rounded-full bg-foreground/30 animate-pulse" style={{ animationDelay: "0.3s" }} />
            </span>
          )}
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-wrap gap-2"
      >
        {allFilters.map((tag) => {
          const isActive = activeFilter === tag;
          return (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`
                px-3 py-1 text-xs font-light transition-all duration-200 border
                ${isActive
                  ? "border-foreground/25 text-foreground"
                  : "border-foreground/8 text-foreground/35 hover:border-foreground/15 hover:text-foreground/55"
                }
              `}
            >
              {tag === "all" ? "All Projects" : tag}
              <span className={`ml-1.5 text-[10px] ${isActive ? "text-foreground/40" : "text-foreground/20"}`}>
                {tagCounts[tag] ?? 0}
              </span>
            </button>
          );
        })}
      </motion.div>
    </div>
  );
}
