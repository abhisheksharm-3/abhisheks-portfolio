"use client";

import { motion, Variants } from "framer-motion";

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
    <motion.div
      variants={containerVariants}
      className="mb-16 max-w-2xl"
    >
      <motion.p
        variants={itemVariants}
        className="text-foreground/60 text-sm sm:text-base font-light leading-relaxed mb-5"
      >
        every dev&apos;s got a trail of dead projects. mine crashed in all kinds
        of ways. some broke on tech, some got boring, some fizzled out when
        i stopped caring.
      </motion.p>

      <motion.p
        variants={itemVariants}
        className="text-foreground/60 text-sm sm:text-base font-light leading-relaxed mb-8"
      >
        none of this was a waste. shipping or not, these projects sharpened me.
        so this is me giving them a grave. not to mourn them, but to mark what
        they taught me before they died.
      </motion.p>

      <motion.div variants={itemVariants} className="h-px bg-primary/10" />

      <motion.p
        variants={itemVariants}
        className="mt-4 text-xs text-foreground/30 font-light leading-relaxed"
      >
        these projects are abandoned and unmaintained. some links may be broken,
        features may not work, and databases may be empty.
      </motion.p>
    </motion.div>
  );
};
