"use client";

import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/**
 * An introductory section for the Graveyard page, explaining its purpose.
 * Rendered as editorial paragraph text — no card chrome.
 * @returns {JSX.Element} The GraveyardIntroCard component.
 */
export const GraveyardIntroCard = () => {
  return (
    <motion.div variants={containerVariants} className="mb-16 max-w-2xl">
      <motion.p
        variants={itemVariants}
        className="text-foreground/60 text-sm sm:text-base font-light leading-relaxed mb-5"
      >
        projects i started and stopped. some hit a technical wall, some lost a dependency, and some
        i stopped working on.
      </motion.p>

      <motion.p
        variants={itemVariants}
        className="text-foreground/60 text-sm sm:text-base font-light leading-relaxed mb-8"
      >
        each one lists why it stopped and what i do differently now.
      </motion.p>

      <motion.div variants={itemVariants} className="h-px bg-primary/10" />

      <motion.p
        variants={itemVariants}
        className="mt-4 text-xs text-foreground/30 font-light leading-relaxed"
      >
        these projects are abandoned and unmaintained. some links may be broken, features may not
        work, and databases may be empty.
      </motion.p>
    </motion.div>
  );
};
