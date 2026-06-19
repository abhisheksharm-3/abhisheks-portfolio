"use client";

import { motion } from "framer-motion";
import { ProjectType } from "@/lib/types/components";

/**
 * Horizontal metadata band for a project detail page: role / client / duration
 * as editorial columns, plus the stack. Replaces the old boxed sidebar.
 */
export function ProjectDetailMeta({ project }: { project: ProjectType }) {
  const details = [
    { label: "role", value: project.role },
    { label: "client", value: project.client },
    { label: "duration", value: project.duration },
  ].filter((detail) => detail.value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="border-t border-foreground/8 pt-8"
    >
      {details.length > 0 && (
        <div className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3">
          {details.map((detail) => (
            <div key={detail.label} className="flex flex-col gap-1.5">
              <span className="text-[11px] uppercase tracking-[0.2em] font-light text-primary/35">
                {detail.label}
              </span>
              <span className="text-sm font-light text-foreground/70">
                {detail.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {project.tags.length > 0 && (
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
          <span className="text-[11px] uppercase tracking-[0.2em] font-light text-primary/35">
            stack
          </span>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="border border-foreground/10 px-2.5 py-0.5 text-[11px] font-light text-foreground/50"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
