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
        <filter id="notfound-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#notfound-noise)" />
      </svg>
    </div>
  </div>
);

/**
 * Renders a grid of vertical and horizontal lines with a 'destructive' theme.
 */
const AsymmetricalGrid = () => {
  const verticalLines = [
    { left: "15%", opacity: "bg-destructive/30" },
    { left: "32%", opacity: "bg-destructive/10" },
    { left: "68%", opacity: "bg-destructive/20" },
    { left: "85%", opacity: "bg-destructive/15" },
  ];
  const horizontalLines = [
    { top: "25%", opacity: "bg-destructive/25" },
    { top: "55%", opacity: "bg-destructive/10" },
    { top: "75%", opacity: "bg-destructive/20" },
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
 * Renders abstract shapes and gradients that react to mouse movement.
 */
const AbstractShapes = ({ mouseX, mouseY }: MouseParallaxPropsType) => {
  const lightX = useTransform(mouseX, (val) => val * -0.1);
  const lightY = useTransform(mouseY, (val) => val * -0.1);

  return (
    <>
      <motion.div
        className="absolute -left-[15%] top-[20%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-br from-destructive/5 via-destructive/2 to-transparent blur-[120px]"
        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.4, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div
        className="absolute right-[15%] bottom-[25%] w-[30vw] h-[30vw] rounded-full bg-gradient-to-tl from-destructive/4 via-destructive/2 to-transparent blur-[80px]"
        style={{ x: lightX, y: lightY }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
      />
    </>
  );
};

/**
 * Composes the themed, mouse-reactive background layers for the 404 page.
 */
export const NotFoundBackground = ({ mouseX, mouseY }: MouseParallaxPropsType) => (
  <>
    <NoiseBackground />
    <AsymmetricalGrid />
    <AbstractShapes mouseX={mouseX} mouseY={mouseY} />
  </>
);
