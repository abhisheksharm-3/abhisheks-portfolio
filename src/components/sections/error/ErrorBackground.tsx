"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

interface MouseParallaxPropsType {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

/**
 * Renders an SVG-based fractal noise layer for a textured background effect.
 */
const NoiseBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
    <div className="absolute inset-0 z-0 mix-blend-overlay">
      <svg
        className="w-full h-full opacity-20"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="error-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#error-noise)" />
      </svg>
    </div>
  </div>
);

/**
 * Renders a grid of vertical and horizontal lines with a 'destructive' theme.
 */
const AsymmetricalGrid = () => {
  const verticalLines = [
    { left: "18%", opacity: "bg-destructive/30" },
    { left: "35%", opacity: "bg-destructive/10" },
    { left: "72%", opacity: "bg-destructive/20" },
    { left: "88%", opacity: "bg-destructive/15" },
  ];
  const horizontalLines = [
    { top: "20%", opacity: "bg-destructive/25" },
    { top: "52%", opacity: "bg-destructive/10" },
    { top: "78%", opacity: "bg-destructive/20" },
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
 * Renders decorative, animated SVG paths with a 'destructive' theme.
 */
const AnimatedPaths = () => (
  <>
    <motion.svg
      className="absolute left-[8%] top-[38%] w-[28%] text-destructive/8"
      viewBox="0 0 100 100"
      fill="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 0.7 }}
    >
      <motion.path
        d="M15,35 C25,55 45,15 55,45 S80,25 90,45"
        stroke="currentColor"
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 1.1 }}
      />
    </motion.svg>
    <motion.svg
      className="absolute right-[15%] top-[28%] w-[22%] text-destructive/6"
      viewBox="0 0 100 100"
      fill="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 0.9 }}
    >
      <motion.path
        d="M12,42 Q42,12 52,42 T82,22"
        stroke="currentColor"
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 1.4 }}
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
  const accent1X = useTransform(mouseX, (val) => val * 0.06);
  const accent1Y = useTransform(mouseY, (val) => val * 0.06);

  return (
    <>
      <motion.div
        className="absolute -left-[12%] top-[18%] w-[42vw] h-[42vw] rounded-full bg-gradient-to-br from-destructive/5 via-destructive/2 to-transparent blur-[120px]"
        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.4, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute right-[12%] bottom-[22%] w-[28vw] h-[28vw] rounded-full bg-gradient-to-tl from-destructive/4 via-destructive/2 to-transparent blur-[80px]"
        style={{ x: lightX, y: lightY }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute top-[22%] right-[18%] w-24 h-24 border-l border-t border-destructive/20 rounded-tl-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 1.5, delay: 1.1 }}
        style={{ x: accent1X, y: accent1Y }}
      />
    </>
  );
};

/**
 * Renders a decorative corner element that reacts to mouse movement.
 */
const AsymmetricalDecoration = ({ mouseX, mouseY }: MouseParallaxPropsType) => {
  const x = useTransform(mouseX, (val) => val * 0.04);
  const y = useTransform(mouseY, (val) => val * 0.04);

  return (
    <motion.div
      className="absolute top-[12%] right-[22%] hidden md:block"
      style={{ x, y }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.7 }}
        className="relative"
      >
        <div className="w-22 h-22 border-r border-t border-destructive/15 rounded-tr-3xl" />
        <div className="absolute -bottom-3 -left-3 w-5 h-5 border border-destructive/30 rounded-full" />
      </motion.div>
    </motion.div>
  );
};

/**
 * Composes the themed, mouse-reactive background layers for the error page.
 */
export const ErrorBackground = ({ mouseX, mouseY }: MouseParallaxPropsType) => (
  <>
    <NoiseBackground />
    <AsymmetricalGrid />
    <AbstractShapes mouseX={mouseX} mouseY={mouseY} />
    <AnimatedPaths />
    <AsymmetricalDecoration mouseX={mouseX} mouseY={mouseY} />
  </>
);
