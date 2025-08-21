"use client";

import { motion } from 'framer-motion';

/**
 * A reusable animated SVG path for decorative elements.
 * @param {{ className?: string; pathData?: string }} props - Component props.
 */
const AnimatedSVGPath = ({ className, pathData }: { className?: string; pathData?: string }) => {
  const defaultPath = "M30,20 Q50,10 70,30 T90,50";
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className={className}>
      <motion.path
        d={pathData || defaultPath}
        stroke="currentColor"
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
    </svg>
  );
};

/**
 * Renders a subtle SVG noise texture for visual depth.
 */
const NoiseTexture = () => (
  <div className="absolute inset-0 z-0 mix-blend-overlay opacity-10">
    <svg className="w-full h-full opacity-20" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <filter id="projectsNoiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#projectsNoiseFilter)" />
    </svg>
  </div>
);

/**
 * Renders an asymmetrical grid overlay, matching the design of other sections.
 */
const GridOverlay = () => {
  const verticalLines = [
    { left: '13%', className: 'bg-primary/30' },
    { left: '28%', className: 'bg-primary/10' },
    { left: '67%', className: 'bg-primary/20' },
    { left: '89%', className: 'bg-primary/15' },
  ];
  const horizontalLines = [
    { top: '22%', className: 'bg-primary/25' },
    { top: '58%', className: 'bg-primary/10' },
    { top: '81%', className: 'bg-primary/20' },
  ];

  return (
    <div className="absolute inset-0 opacity-5">
      {verticalLines.map((line, index) => (
        <div key={`v-${index}`} className={`absolute top-0 bottom-0 w-[1px] ${line.className}`} style={{ left: line.left }} />
      ))}
      {horizontalLines.map((line, index) => (
        <div key={`h-${index}`} className={`absolute left-0 right-0 h-[1px] ${line.className}`} style={{ top: line.top }} />
      ))}
    </div>
  );
};

/**
 * Renders animated decorative SVG patterns that appear when in view.
 * @param {{ isInView: boolean }} props - Component props.
 */
const DecorativePatterns = ({ isInView }: { isInView: boolean }) => (
  <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1, delay: 0.6 }}
      className="absolute left-[5%] top-[15%] text-primary/8"
    >
      <AnimatedSVGPath pathData="M10,30 C20,50 40,10 50,40 S80,20 90,40" />
    </motion.div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1, delay: 0.8 }}
      className="absolute right-[10%] bottom-[20%] rotate-180 text-primary/8"
    >
      <AnimatedSVGPath pathData="M10,50 Q40,20 50,50 T90,30" />
    </motion.div>
  </>
);

/**
 * A container component for all background decorative elements.
 * @param {{ isInView: boolean }} props - Component props.
 */
export const BackgroundDecorations = ({ isInView }: { isInView: boolean }) => (
  <div className="absolute inset-0 pointer-events-none">
    <NoiseTexture />
    <GridOverlay />
    <DecorativePatterns isInView={isInView} />
  </div>
);