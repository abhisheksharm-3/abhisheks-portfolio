"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  MotionValue,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/layout/AppShell";
import { useEffect, useRef } from "react";
import { AlertTriangle, RefreshCw, Home, Bug } from "lucide-react";
import Link from "next/link";

// --- Themed Background Components ---

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
const AbstractShapes: React.FC<{
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}> = ({ mouseX, mouseY }) => {
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
const AsymmetricalDecoration: React.FC<{
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}> = ({ mouseX, mouseY }) => {
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

// --- Main Error Component ---

/**
 * A client-side component that catches and displays errors.
 * This serves as a global error boundary for the application.
 *
 * @param {ErrorProps} props The component props.
 * @param {Error} props.error The error that was thrown.
 * @param {Function} props.reset A function to re-render the component tree.
 */
const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    console.error("Error boundary caught:", error);
  }, [error]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { current: el } = containerRef;
      if (!el) return;

      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
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
      <div ref={containerRef} className="relative min-h-screen overflow-hidden">
        <NoiseBackground />
        <AsymmetricalGrid />
        <AbstractShapes mouseX={mouseX} mouseY={mouseY} />
        <AnimatedPaths />
        <AsymmetricalDecoration mouseX={mouseX} mouseY={mouseY} />

        <div className="relative z-10 min-h-screen flex items-center justify-center text-center px-6">
          <div className="w-full max-w-2xl">
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="relative inline-flex items-center justify-center w-32 h-32 bg-destructive/5 rounded-full border border-destructive/10">
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    boxShadow: [
                      "0 0 0 0px rgba(239, 68, 68, 0.1)",
                      "0 0 0 20px rgba(239, 68, 68, 0)",
                    ],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <AlertTriangle className="w-16 h-16 text-destructive/80" />
              </div>
            </motion.div>

            <div className="overflow-hidden mb-4">
              <motion.h1
                initial={{ y: 40 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-destructive/90 to-destructive/70 bg-clip-text text-transparent pb-4"
              >
                Something went wrong
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed mb-8"
            >
              Looks like something broke. You can try refreshing, or reach out
              if it keeps happening.
            </motion.p>

            <motion.details
              className="text-left bg-muted/30 rounded-lg p-4 border border-destructive/10 max-w-md mx-auto mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <summary className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 text-sm">
                <Bug className="w-4 h-4" />
                Error Details
              </summary>
              <div className="mt-3 space-y-2">
                <p className="text-sm font-mono text-destructive break-all">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="text-xs text-muted-foreground">
                    Error ID:{" "}
                    <code className="bg-background px-1 rounded text-xs">
                      {error.digest}
                    </code>
                  </p>
                )}
              </div>
            </motion.details>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              <Button
                onClick={reset}
                size="lg"
                className="w-full sm:w-auto group cursor-pointer"
              >
                <RefreshCw className="mr-2 h-4 w-4 transition-transform group-hover:rotate-180" />
                Try again
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto group"
              >
                <Link href="/">
                  <Home className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                  Go home
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default Error;
