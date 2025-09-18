"use client";

import { useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { AbstractPath } from "@/components/shared/AbstractPath";
import { RiGhostFill } from "@remixicon/react";

// --- CONFIG & VARIANTS ---

const gridLinesConfig = {
  vertical: [
    { left: "13%", class: "bg-primary/30" },
    { left: "28%", class: "bg-primary/10" },
    { left: "67%", class: "bg-primary/20" },
    { left: "89%", class: "bg-primary/15" },
  ],
  horizontal: [
    { top: "22%", class: "bg-primary/25" },
    { top: "58%", class: "bg-primary/10" },
    { top: "81%", class: "bg-primary/20" },
  ],
};

const pathContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.5 },
  },
};

// --- SUB-COMPONENTS ---

const FloatingGhost = () => {
  const randomValues = useMemo(() => ({
    size: `${30 + Math.random() * 40}px`,
    initialX: `${Math.random() * 100}%`,
    initialY: `${Math.random() * 100}%`,
    animateX1: `${Math.random() * 100}%`,
    animateX2: `${Math.random() * 100}%`,
    animateY1: `${Math.random() * 100}%`,
    animateY2: `${Math.random() * 100}%`,
    duration: 15 + Math.random() * 10,
  }), []);

  return (
    <motion.div
      className="absolute"
      initial={{ x: randomValues.initialX, y: randomValues.initialY, opacity: 0 }}
      animate={{
        x: [randomValues.animateX1, randomValues.animateX2],
        y: [randomValues.animateY1, randomValues.animateY2],
        opacity: [0, 0.05, 0, 0.05, 0],
      }}
      transition={{
        duration: randomValues.duration,
        repeat: Infinity,
        repeatType: "mirror",
      }}
    >
      <RiGhostFill className="text-white/10" style={{ width: randomValues.size, height: randomValues.size }} />
    </motion.div>
  );
};

/**
 * Renders the animated background for the Graveyard page.
 * @returns {JSX.Element} The GraveyardBackground component.
 */
export const GraveyardBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none -z-10">
      {/* Noise Texture */}
      <div className="absolute inset-0 mix-blend-overlay opacity-10">
        <svg className="w-full h-full opacity-20" viewBox="0 0 200 200">
          <filter id="graveyardNoiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#graveyardNoiseFilter)" />
        </svg>
      </div>

      {/* Grid Lines */}
      <div className="absolute inset-0 opacity-5">
        {gridLinesConfig.vertical.map((line, i) => (
          <div key={`v-${i}`} className={`absolute top-0 bottom-0 w-[1px] ${line.class}`} style={{ left: line.left }} />
        ))}
        {gridLinesConfig.horizontal.map((line, i) => (
          <div key={`h-${i}`} className={`absolute left-0 right-0 h-[1px] ${line.class}`} style={{ top: line.top }} />
        ))}
      </div>

      {/* Abstract Paths */}
      <motion.div
        variants={pathContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="absolute left-[5%] top-[15%] text-primary/8">
          <AbstractPath pathD="M10,30 C20,50 40,10 50,40 S80,20 90,40" />
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="absolute right-[10%] bottom-[20%] rotate-180 text-primary/8">
          <AbstractPath pathD="M10,50 Q40,20 50,50 T90,30" />
        </motion.div>
      </motion.div>

      {/* Floating Ghosts */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => <FloatingGhost key={i} />)}
      </div>
    </div>
  );
}