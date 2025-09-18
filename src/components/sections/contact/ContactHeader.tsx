"use client";

import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/**
 * Renders the main header for the Contact page.
 * This component is designed to be part of a larger staggered animation sequence.
 * @returns {JSX.Element} The ContactHeader component.
 */
export const ContactHeader = () => {
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
          Get in Touch
        </span>
      </motion.div>

      <div className="overflow-visible mb-4">
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl font-serif italic leading-relaxed pb-2"
        >
          <div className="py-1">
            <span className="bg-gradient-to-r from-primary/80 via-primary/90 to-primary/70 bg-clip-text text-transparent select-none">
              Let&apos;s Connect
            </span>
          </div>
        </motion.h1>
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
        I&apos;m available for freelance projects, collaborations, and full-time opportunities. 
        Feel free to reach out through the form below or schedule a meeting directly.
      </motion.p>
    </motion.div>
  );
};