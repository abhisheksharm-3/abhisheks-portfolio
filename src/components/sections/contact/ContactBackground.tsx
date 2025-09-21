"use client";

import { motion, Variants } from "framer-motion";
import { AbstractPath } from "../../shared/AbstractPath";

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

/**
 * Renders the animated background elements for the Contact page,
 * including a noise texture, grid, and decorative SVG paths.
 * @returns {JSX.Element} The ContactBackground component.
 */
export const ContactBackground = () => {
  return (
    <div className="absolute inset-0 pointer-events-none -z-10">
      {/* Noise Texture */}
      <div className="absolute inset-0 mix-blend-overlay opacity-10">
        <svg className="w-full h-full opacity-20" viewBox="0 0 200 200">
          <filter id="contactPageNoiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect
            width="100%"
            height="100%"
            filter="url(#contactPageNoiseFilter)"
          />
        </svg>
      </div>

      {/* Asymmetrical Grid Lines */}
      <div className="absolute inset-0 opacity-5">
        {gridLinesConfig.vertical.map((line, i) => (
          <div
            key={`v-${i}`}
            className={`absolute top-0 bottom-0 w-[1px] ${line.class}`}
            style={{ left: line.left }}
          />
        ))}
        {gridLinesConfig.horizontal.map((line, i) => (
          <div
            key={`h-${i}`}
            className={`absolute left-0 right-0 h-[1px] ${line.class}`}
            style={{ top: line.top }}
          />
        ))}
      </div>

      {/* Abstract SVG Paths */}
      <motion.div
        variants={pathContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          className="absolute left-[5%] top-[15%] text-primary/8"
        >
          <AbstractPath pathD="M10,30 C20,50 40,10 50,40 S80,20 90,40" />
        </motion.div>
        <motion.div
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
          className="absolute right-[10%] bottom-[20%] rotate-180 text-primary/8"
        >
          <AbstractPath pathD="M10,50 Q40,20 50,50 T90,30" />
        </motion.div>
      </motion.div>
    </div>
  );
};
