"use client";

import { motion, Variants } from "framer-motion";
import { Card } from "@/components/ui/card";
import { RiGhostFill } from "@remixicon/react";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

/**
 * An introductory card for the Graveyard page, explaining its purpose.
 * Features a multi-level staggered animation for its content.
 * @returns {JSX.Element} The GraveyardIntroCard component.
 */
export const GraveyardIntroCard = () => {
  return (
    <div className="mb-16">
      <Card className="border-red-500/10 backdrop-blur-sm overflow-hidden py-0 relative">
        <motion.div
          variants={containerVariants}
          className="p-8 sm:p-10"
        >
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
            {/* Left Column */}
            <motion.div variants={containerVariants} className="w-full sm:w-1/3">
              <motion.div variants={itemVariants} className="w-16 h-16 rounded-md border border-red-500/10 flex items-center justify-center mb-8">
                <RiGhostFill className="h-8 w-8 text-amber-500/70" strokeWidth={1.25} />
              </motion.div>
              <motion.h3 variants={itemVariants} className="text-2xl sm:text-3xl font-serif italic mb-6">
                Digital Afterlife
              </motion.h3>
              <motion.div
                variants={{
                  hidden: { width: 0 },
                  visible: { width: "3rem", transition: { duration: 0.8, ease: "easeOut" } },
                }}
                className="h-[1px] bg-gradient-to-r from-red-500/30 to-transparent mb-6"
              />
            </motion.div>
            
            {/* Right Column */}
            <motion.div variants={containerVariants} className="w-full sm:w-2/3">
              <motion.p variants={itemVariants} className="text-foreground/60 text-sm sm:text-base font-light leading-relaxed mb-6">
                Like every dev, I’ve got my fair share of projects that never made it out alive.
                Some broke under tech challenges, some lost relevance, and some just ran out of steam.
              </motion.p>
              <motion.p variants={itemVariants} className="text-foreground/60 text-sm sm:text-base font-light leading-relaxed">
                Still, none of them were wasted. Each one left me with lessons, skills, or insights
                that shaped the projects I shipped later. So here’s to the ones that didn’t make it —
                they paved the way for everything that did.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>

        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
          <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-red-500/20 to-transparent" />
          <div className="absolute top-0 right-0 h-px w-16 bg-gradient-to-l from-red-500/20 to-transparent" />
        </div>
      </Card>
    </div>
  );
}
