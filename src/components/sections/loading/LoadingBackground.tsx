"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

interface MouseParallaxPropsType {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

/**
 * Renders an SVG-based fractal noise layer for a textured background.
 */
const NoiseBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
    <div className="absolute inset-0 z-0 mix-blend-overlay">
      <svg
        className="w-full h-full opacity-20"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="loading-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#loading-noise)" />
      </svg>
    </div>
  </div>
);

/**
 * Renders a grid of vertical and horizontal lines with the primary theme color.
 */
const AsymmetricalGrid = () => {
  const verticalLines = [
    { left: "13%", opacity: "bg-primary/30" },
    { left: "28%", opacity: "bg-primary/10" },
    { left: "67%", opacity: "bg-primary/20" },
    { left: "89%", opacity: "bg-primary/15" },
  ];
  const horizontalLines = [
    { top: "22%", opacity: "bg-primary/25" },
    { top: "58%", opacity: "bg-primary/10" },
    { top: "81%", opacity: "bg-primary/20" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
      {verticalLines.map((line, index) => (
        <div
          key={`v-${index}`}
          className={`absolute top-0 bottom-0 w-[1px] ${line.opacity}`}
          style={{ left: line.left }}
        />
      ))}
      {horizontalLines.map((line, index) => (
        <div
          key={`h-${index}`}
          className={`absolute left-0 right-0 h-[1px] ${line.opacity}`}
          style={{ top: line.top }}
        />
      ))}
    </div>
  );
};

/**
 * Renders decorative, animated SVG paths with the primary theme color.
 */
const AnimatedPaths = () => (
  <>
    <motion.svg
      className="absolute left-[5%] top-[40%] w-[30%] text-primary/10"
      viewBox="0 0 100 100"
      fill="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 0.5 }}
    >
      <motion.path
        d="M10,30 C20,50 40,10 50,40 S80,20 90,40"
        stroke="currentColor"
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 1 }}
      />
    </motion.svg>
    <motion.svg
      className="absolute right-[10%] top-[30%] w-[25%] text-primary/8"
      viewBox="0 0 100 100"
      fill="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 0.8 }}
    >
      <motion.path
        d="M10,50 Q40,20 50,50 T90,30"
        stroke="currentColor"
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 1.3 }}
      />
    </motion.svg>
  </>
);

/**
 * Renders abstract shapes and gradients that react to mouse movement.
 */
const AbstractShapes = ({ mouseX, mouseY }: MouseParallaxPropsType) => {
  const lightX = useTransform(mouseX, (val) => val * -0.1);
  const lightY = useTransform(mouseY, (val) => val * -0.1);

  return (
    <>
      <motion.div
        className="absolute -left-[10%] top-[15%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-primary/5 via-primary/2 to-transparent blur-[120px]"
        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.4, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute right-[10%] bottom-[20%] w-[25vw] h-[25vw] rounded-full bg-gradient-to-tl from-primary/4 via-primary/2 to-transparent blur-[80px]"
        style={{ x: lightX, y: lightY }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />
    </>
  );
};

/**
 * Composes the themed, mouse-reactive background layers for the loading screen.
 */
export const LoadingBackground = ({ mouseX, mouseY }: MouseParallaxPropsType) => (
  <>
    <NoiseBackground />
    <AsymmetricalGrid />
    <AbstractShapes mouseX={mouseX} mouseY={mouseY} />
    <AnimatedPaths />
  </>
);
