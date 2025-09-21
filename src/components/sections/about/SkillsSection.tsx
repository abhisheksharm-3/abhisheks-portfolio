"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Expertise } from "@/data/skills";
import { motion, Variants } from "framer-motion";

/**
 * Variants for the grid container to stagger the animation of each skill card.
 */
const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

/**
 * Variants for individual items (like the skill cards) to fade and slide in.
 */
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/**
 * Renders a grid of technical skill cards, animated on entry.
 * @returns {JSX.Element} The SkillsSection component.
 */
export const SkillsSection = () => {
  return (
    <div>
      <div className="mb-10 relative">
        <h3 className="text-2xl font-serif italic mb-6">Technical Skills</h3>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "3rem" }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-[1px] bg-gradient-to-r from-primary/30 to-transparent mb-8"
        />
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none hidden md:block">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <circle
              cx="70"
              cy="30"
              r="20"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
            <circle
              cx="70"
              cy="30"
              r="10"
              stroke="currentColor"
              strokeWidth="1"
            />
            <circle
              cx="70"
              cy="30"
              r="5"
              stroke="currentColor"
              strokeWidth="1"
              fill="currentColor"
              fillOpacity="0.1"
            />
          </svg>
        </div>
      </div>

      <motion.div
        variants={gridContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {Expertise.map((category) => (
          <motion.div variants={itemVariants} key={category.title}>
            <Card className="border-primary/10 backdrop-blur-sm hover:border-primary/20 transition-all duration-300 group relative overflow-hidden h-full">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-md border border-primary/10 flex items-center justify-center mr-3 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300">
                    <div className="text-primary/70 scale-90">
                      {category.icon}
                    </div>
                  </div>
                  <h4 className="text-base font-medium group-hover:text-primary/90 transition-colors duration-300">
                    {category.title}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-primary/5 border border-primary/10 rounded-full text-xs text-foreground/70 group-hover:border-primary/20 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="absolute bottom-0 right-0 w-12 h-12 overflow-hidden opacity-20 pointer-events-none">
                  <div className="absolute bottom-0 right-0 w-px h-12 bg-gradient-to-t from-primary/20 to-transparent" />
                  <div className="absolute bottom-0 right-0 h-px w-12 bg-gradient-to-l from-primary/20 to-transparent" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
