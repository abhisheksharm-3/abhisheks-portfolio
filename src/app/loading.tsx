"use client";

import { motion, useMotionValue, useTransform, MotionValue } from "framer-motion";
import { AppShell } from "@/components/layout/AppShell";
import { useEffect, useRef } from "react";

// --- Themed Background Components ---

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
const AbstractShapes: React.FC<{ mouseX: MotionValue<number>; mouseY: MotionValue<number> }> = ({ mouseX, mouseY }) => {
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


// --- Main Loading Component ---

/**
 * A client-side component that displays a loading UI.
 * This serves as the instant loading state for a route segment,
 * powered by Next.js File Conventions and React Suspense.
 */
const Loading = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { current: el } = containerRef;
      if (!el) return;
      const { clientX, clientY, currentTarget } = e;
      const { left, top, width, height } = (currentTarget as HTMLElement).getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <AppShell showBackground={false}>
      <div
        ref={containerRef}
        className="relative min-h-screen overflow-hidden"
      >
        <NoiseBackground />
        <AsymmetricalGrid />
        <AbstractShapes mouseX={mouseX} mouseY={mouseY} />
        <AnimatedPaths />

        <div className="relative z-10 min-h-screen flex items-center justify-center text-center px-6">
          <div className="flex flex-col items-center">
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="relative w-32 h-32">
                <motion.div
                  className="w-full h-full border-2 border-primary/20 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-4 border-2 border-transparent border-t-primary border-r-primary/50 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-8 border border-primary/40 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-3 h-3 bg-primary rounded-full"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
              </div>
            </motion.div>

            <div className="overflow-hidden mb-4">
              <motion.h2
                initial={{ y: 40 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-primary/90 to-primary/70 bg-clip-text text-transparent"
              >
                Loading
              </motion.h2>
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="text-muted-foreground"
            >
              Please wait while your experience is prepared...
            </motion.p>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default Loading;