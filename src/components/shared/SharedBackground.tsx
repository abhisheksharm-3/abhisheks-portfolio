"use client";

import { motion } from "framer-motion";
import { AnimatedPathProps } from "@/lib/types";
import {
  SHARED_GRID_CONFIG,
  SHARED_SVG_PATHS,
} from "@/lib/config/landing-background";

/** Renders and animates an SVG path. */
const AnimatedPath = ({
  className,
  pathD = SHARED_SVG_PATHS.default,
  delay = 0,
}: AnimatedPathProps) => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    fill="none"
    className={className}
  >
    <motion.path
      d={pathD}
      stroke="currentColor"
      strokeWidth="0.5"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, delay }}
    />
  </svg>
);

/** Renders a subtle SVG noise texture with a unique filter ID. */
const NoiseTexture = ({ filterId }: { filterId: string }) => (
  <div className="absolute inset-0 z-0 mix-blend-overlay opacity-10">
    <svg
      className="w-full h-full opacity-20"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id={filterId}>
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="3"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter={`url(#${filterId})`} />
    </svg>
  </div>
);

/** Renders the asymmetrical grid overlay. */
const AsymmetricalGrid = () => (
  <div className="absolute inset-0 opacity-5">
    {SHARED_GRID_CONFIG.vertical.map((line, index) => (
      <div
        key={`v-${index}`}
        className={`absolute top-0 bottom-0 w-[1px] ${line.className}`}
        style={{ left: line.left }}
      />
    ))}
    {SHARED_GRID_CONFIG.horizontal.map((line, index) => (
      <div
        key={`h-${index}`}
        className={`absolute left-0 right-0 h-[1px] ${line.className}`}
        style={{ top: line.top }}
      />
    ))}
  </div>
);

/** Renders animated decorative SVG paths. */
const DecorativePaths = ({ isInView }: { isInView: boolean }) => (
  <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1, delay: 0.6 }}
      className="absolute left-[5%] top-[15%] text-primary/8"
    >
      <AnimatedPath pathD={SHARED_SVG_PATHS.flowing} delay={0.6} />
    </motion.div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1, delay: 0.8 }}
      className="absolute right-[10%] bottom-[20%] rotate-180 text-primary/8"
    >
      <AnimatedPath pathD={SHARED_SVG_PATHS.curved} delay={0.8} />
    </motion.div>
  </>
);

/**
 * A shared, reusable component for rendering the standard background elements.
 * @param {{ isInView: boolean; noiseFilterId: string }} props - Props to control animation and ensure unique filter IDs.
 */
export const SharedBackground = ({
  isInView,
  noiseFilterId,
}: {
  isInView: boolean;
  noiseFilterId: string;
}) => (
  <div className="absolute inset-0 -mx-6 sm:-mx-8 lg:-mx-32 pointer-events-none">
    <NoiseTexture filterId={noiseFilterId} />
    <AsymmetricalGrid />
    <DecorativePaths isInView={isInView} />
  </div>
);
