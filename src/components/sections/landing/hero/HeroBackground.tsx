"use client";

import { motion, useTransform, MotionValue } from "framer-motion";

// This would typically be in a shared config file
const ANIMATION_CONFIG = {
  MOUSE_PARALLAX_MULTIPLIER: {
    XLARGE: 0.1,
    LARGE: 0.08,
    MEDIUM: 0.06,
    SMALL: 0.04,
  },
};

/**
 * Renders a subtle SVG noise filter as a background layer.
 */
export const NoiseBackground: React.FC = () => (
  <div
    className="absolute inset-0 overflow-hidden pointer-events-none opacity-20"
    aria-hidden="true"
  >
    <div className="absolute inset-0 z-0 mix-blend-overlay">
      <svg
        className="w-full h-full opacity-20"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  </div>
);

/**
 * Renders a faint, asymmetrical grid of decorative lines.
 */
export const AsymmetricalGrid: React.FC = () => {
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
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none opacity-5"
      aria-hidden="true"
    >
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
 * Renders decorative SVG paths that animate as if being drawn on screen.
 */
export const AnimatedPaths: React.FC = () => (
  <>
    <motion.svg
      className="absolute left-[5%] top-[40%] w-[30%] text-primary/10"
      viewBox="0 0 100 100"
      fill="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 0.5 }}
      aria-hidden="true"
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
      aria-hidden="true"
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
 * Renders various abstract shapes and gradients that have a mouse-interactive parallax effect.
 * @param {MouseMotionValues} props - The mouse position motion values.
 */
export const AbstractShapes: React.FC<{
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}> = ({ mouseX, mouseY }) => {
  const lightX = useTransform(
    mouseX,
    (val) => val * -ANIMATION_CONFIG.MOUSE_PARALLAX_MULTIPLIER.XLARGE,
  );
  const lightY = useTransform(
    mouseY,
    (val) => val * -ANIMATION_CONFIG.MOUSE_PARALLAX_MULTIPLIER.XLARGE,
  );
  const accent1X = useTransform(
    mouseX,
    (val) => val * ANIMATION_CONFIG.MOUSE_PARALLAX_MULTIPLIER.MEDIUM,
  );
  const accent1Y = useTransform(
    mouseY,
    (val) => val * ANIMATION_CONFIG.MOUSE_PARALLAX_MULTIPLIER.MEDIUM,
  );
  const accent2X = useTransform(
    mouseX,
    (val) => val * ANIMATION_CONFIG.MOUSE_PARALLAX_MULTIPLIER.LARGE,
  );
  const accent2Y = useTransform(
    mouseY,
    (val) => val * ANIMATION_CONFIG.MOUSE_PARALLAX_MULTIPLIER.LARGE,
  );

  return (
    <div className="absolute inset-0" aria-hidden="true">
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
      <motion.div
        className="absolute top-[25%] right-[15%] w-32 h-32 border-l border-t border-primary/20 rounded-tl-3xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
        style={{ x: accent1X, y: accent1Y }}
      />
      <motion.div
        className="absolute bottom-[20%] left-[20%] w-20 h-20 border-r border-b border-primary/15 rounded-br-2xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 1.5, delay: 1.2 }}
        style={{ x: accent2X, y: accent2Y }}
      />
    </div>
  );
};

/**
 * Renders an asymmetrical decorative shape with a subtle mouse parallax effect.
 * @param {MouseMotionValues} props - The mouse position motion values.
 */
export const AsymmetricalDecoration: React.FC<{
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}> = ({ mouseX, mouseY }) => {
  const x = useTransform(
    mouseX,
    (val) => val * ANIMATION_CONFIG.MOUSE_PARALLAX_MULTIPLIER.SMALL,
  );
  const y = useTransform(
    mouseY,
    (val) => val * ANIMATION_CONFIG.MOUSE_PARALLAX_MULTIPLIER.SMALL,
  );

  return (
    <motion.div
      className="absolute top-[10%] right-[20%] hidden md:block"
      style={{ x, y }}
      aria-hidden="true"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="relative"
      >
        <div className="w-24 h-24 border-r border-t border-primary/15 rounded-tr-3xl" />
        <div className="absolute -bottom-3 -left-3 w-6 h-6 border border-primary/30 rounded-full" />
      </motion.div>
    </motion.div>
  );
};
