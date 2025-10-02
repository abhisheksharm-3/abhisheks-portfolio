"use client";

import { motion, Variants } from "framer-motion";
import { Card } from "@/components/ui/card";
import { RiGhostFill } from "@remixicon/react";
import { AlertCircle } from "lucide-react";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/**
 * An introductory card for the Graveyard page, explaining its purpose.
 * Features a multi-level staggered animation for its content.
 * @returns {JSX.Element} The GraveyardIntroCard component.
 */
export const GraveyardIntroCard = () => {
  return (
    <div className="mb-16">
      <Card className="border-primary/10 backdrop-blur-sm overflow-hidden py-0 relative">
        <motion.div variants={containerVariants} className="p-8 sm:p-10">
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
            {/* Left Column */}
            <motion.div
              variants={containerVariants}
              className="w-full sm:w-1/3"
            >
              <motion.div
                variants={itemVariants}
                className="w-16 h-16 rounded-md border border-primary/10 flex items-center justify-center mb-8"
              >
                <RiGhostFill
                  className="h-8 w-8 text-primary/70"
                  strokeWidth={1.25}
                />
              </motion.div>
              <motion.h3
                variants={itemVariants}
                className="text-2xl sm:text-3xl font-serif italic mb-6"
              >
                The Graveyard
              </motion.h3>
              <motion.div
                variants={{
                  hidden: { width: 0 },
                  visible: {
                    width: "3rem",
                    transition: { duration: 0.8, ease: "easeOut" },
                  },
                }}
                className="h-[1px] bg-gradient-to-r from-primary/30 to-transparent mb-6"
              />
            </motion.div>

            {/* Right Column */}
            <motion.div
              variants={containerVariants}
              className="w-full sm:w-2/3"
            >
              <motion.p
                variants={itemVariants}
                className="text-foreground/60 text-sm sm:text-base font-light leading-relaxed mb-6"
              >
                every dev’s got a trail of dead projects. mine crashed in all
                kinds of ways — some broke on tech, some got boring, some just
                fizzled out when i stopped caring.
              </motion.p>
              <motion.p
                variants={itemVariants}
                className="text-foreground/60 text-sm sm:text-base font-light leading-relaxed mb-6"
              >
                none of this was a waste. shipping or not, these projects
                sharpened me. so this is me giving them a grave — not to mourn
                them, but to mark what they taught me before they died.
              </motion.p>

              {/* Disclaimer */}
              <motion.div
                variants={itemVariants}
                className="bg-amber-500/5 border border-amber-500/20 rounded-md p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-5 h-5 mt-0.5 rounded-full bg-amber-500/20 flex-shrink-0">
                    <AlertCircle className="w-3 h-3 text-amber-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium text-amber-600 dark:text-amber-400 mb-1">
                      Fair Warning
                    </p>
                    <p className="text-xs text-amber-600/80 dark:text-amber-400/80 font-light leading-relaxed">
                      These projects are abandoned and unmaintained. Some links
                      may be broken, features may not work, and databases may be
                      empty.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden opacity-60">
          <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-primary/20 to-transparent" />
          <div className="absolute top-0 right-0 h-px w-16 bg-gradient-to-l from-primary/20 to-transparent" />
        </div>
      </Card>
    </div>
  );
};
