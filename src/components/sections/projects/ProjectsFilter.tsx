"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { PROJECT_CATEGORIES } from "@/data/projects";
import type { ProjectType } from "@/lib/types/components";

interface ProjectsFiltersProps {
  activeFilter: string;
  setActiveFilter: (id: string) => void;
  projects: ProjectType[];
  filteredCount: number;
  isPending?: boolean;
}

export function ProjectsFilters({
  activeFilter,
  setActiveFilter,
  projects = [],
  filteredCount,
  isPending = false,
}: ProjectsFiltersProps) {
  const filters = useMemo(
    () => [
      { id: "all", label: "all projects", count: projects.length },
      ...PROJECT_CATEGORIES.map((category) => ({
        id: category.id as string,
        label: category.label as string,
        count: projects.filter((project) => project.category === category.id).length,
      })),
    ],
    [projects],
  );

  const activeLabel = filters.find((filter) => filter.id === activeFilter)?.label;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light">
          Filter & Browse
        </span>
        <span
          className={`text-xs text-foreground/40 font-light transition-opacity duration-200 ${isPending ? "opacity-40" : "opacity-100"}`}
        >
          {filteredCount} {filteredCount === 1 ? "project" : "projects"}
          {activeFilter !== "all" && (
            <span className="ml-1 text-foreground/30">/ {activeLabel}</span>
          )}
          {isPending && (
            <span className="ml-2 inline-flex gap-0.5 items-center">
              <span className="w-1 h-1 rounded-full bg-foreground/30 animate-pulse" />
              <span
                className="w-1 h-1 rounded-full bg-foreground/30 animate-pulse"
                style={{ animationDelay: "0.15s" }}
              />
              <span
                className="w-1 h-1 rounded-full bg-foreground/30 animate-pulse"
                style={{ animationDelay: "0.3s" }}
              />
            </span>
          )}
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-wrap gap-2"
      >
        {filters.map((filter) => {
          const isActive = activeFilter === filter.id;
          return (
            <button
              key={filter.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveFilter(filter.id)}
              className={`
                px-3 py-1 text-xs font-light transition-all duration-200 border
                ${
                  isActive
                    ? "border-foreground/25 text-foreground"
                    : "border-foreground/8 text-foreground/35 hover:border-foreground/15 hover:text-foreground/55"
                }
              `}
            >
              {filter.label}
              <span
                className={`ml-1.5 text-[10px] ${isActive ? "text-foreground/40" : "text-foreground/20"}`}
              >
                {filter.count}
              </span>
            </button>
          );
        })}
      </motion.div>
    </div>
  );
}
