"use client";

import { EXPERTISE } from "@/data/skills-expertise";
import { motion } from "framer-motion";
import {
  STAGGER_CONTAINER_VARIANTS,
  STAGGER_ITEM_VARIANTS,
} from "@/lib/config/page-animations";

/**
 * Renders technical skills as a clean typographic grid, animated on entry.
 */
export const SkillsSection = () => {
  return (
    <div>
      <p className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light mb-4">
        technical skills
      </p>
      <h3 className="text-2xl font-serif italic text-foreground mb-8">
        What I work with
      </h3>
      <div className="h-px bg-primary/10 mb-10" />

      <motion.div
        variants={STAGGER_CONTAINER_VARIANTS}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8"
      >
        {EXPERTISE.map((category) => (
          <motion.div variants={STAGGER_ITEM_VARIANTS} key={category.title}>
            <div className="flex items-center gap-2 mb-3">
              <category.icon className="h-3.5 w-3.5 text-primary/35" strokeWidth={1.5} />
              <p className="text-[11px] text-primary/35 uppercase tracking-[0.15em] font-light">
                {category.title}
              </p>
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1.5">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="text-sm text-foreground/60 font-light"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
