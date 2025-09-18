"use client";

import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

interface ProjectDetailHeaderProps {
  title: string;
  description: string;
}

/**
 * Renders the header for a project detail page, including title and description.
 * This component is designed to be part of a larger staggered animation sequence.
 * @returns {JSX.Element} The ProjectDetailHeader component.
 */
export function ProjectDetailHeader({ title, description }: ProjectDetailHeaderProps) {
  return (
    <motion.div variants={containerVariants} className="overflow-visible mb-4">
      <motion.h1
        variants={itemVariants}
        className="text-4xl sm:text-5xl md:text-6xl font-serif italic leading-relaxed pb-2"
      >
        <div className="py-1">
          <span className="bg-gradient-to-r from-primary/80 via-primary/90 to-primary/70 bg-clip-text text-transparent select-none">
            {title}
          </span>
        </div>
      </motion.h1>

      <motion.div
        variants={{
          hidden: { width: 0, opacity: 0 },
          visible: {
            width: "5rem",
            opacity: 1,
            transition: { duration: 1, ease: "easeOut" },
          },
        }}
        className="h-[1px] bg-gradient-to-r from-primary/40 to-transparent mt-4 mb-6"
      />

      <motion.p
        variants={itemVariants}
        className="text-foreground/70 max-w-2xl text-base sm:text-lg font-light leading-relaxed"
      >
        {description}
      </motion.p>
    </motion.div>
  );
}