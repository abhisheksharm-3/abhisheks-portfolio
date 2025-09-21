"use client";

import { motion, Variants } from "framer-motion";

/**
 * Defines variants for the container to orchestrate staggered animations for its children.
 */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

/**
 * Defines variants for child elements to fade and slide in from below.
 */
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/**
 * Displays the main header for the 'About' page, including name and introduction.
 * This component is designed to be part of a larger staggered animation sequence.
 * @returns {JSX.Element} The About page header.
 */
export const AboutPageHeader = () => {
  return (
    <motion.div
      variants={containerVariants}
      className="flex flex-col mb-16 sm:mb-20 relative z-10"
    >
      <motion.div variants={itemVariants} className="flex items-center mb-4">
        <div className="w-7 h-7 rounded-md border border-primary/10 flex items-center justify-center mr-3">
          <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
        </div>
        <span className="text-xs text-primary/60 uppercase tracking-wider font-light">
          About Me
        </span>
      </motion.div>

      <div className="overflow-visible mb-4">
        <motion.h2
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl font-serif italic leading-relaxed pb-2"
        >
          <div className="py-1">
            <span className="bg-gradient-to-r from-primary/80 via-primary/90 to-primary/70 bg-clip-text text-transparent select-none">
              Abhishek Sharma
            </span>
          </div>
        </motion.h2>
      </div>

      <motion.div
        variants={{
          hidden: { width: 0, opacity: 0 },
          visible: {
            width: "5rem",
            opacity: 1,
            transition: { duration: 1, ease: "easeOut" },
          },
        }}
        className="h-[1px] bg-gradient-to-r from-primary/40 to-transparent mt-4"
      />

      <motion.p
        variants={itemVariants}
        className="text-foreground/60 max-w-2xl text-sm sm:text-base font-light leading-relaxed mt-6"
      >
        CS Graduate and software developer passionate about building scalable,
        user-focused applications. My work spans full-stack web, mobile
        development, and AI integrations—with a growing focus on RAG systems and
        intelligent agents.
      </motion.p>
    </motion.div>
  );
};
