"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  MotionValue,
} from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { ArrowLeft, Home, Search } from "lucide-react";

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
const AbstractShapes: React.FC<{
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}> = ({ mouseX, mouseY }) => {
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

// --- Main 404 Not Found Component ---

/**
 * A custom 404 page to handle requests for routes that do not exist.
 * It provides users with clear messaging and helpful navigation options.
 */
const NotFound = () => {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

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

        <div className="relative z-10 min-h-screen flex items-center justify-center text-center px-6">
          <div className="w-full max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative mb-8"
            >
              <div className="overflow-hidden">
                <motion.span
                  initial={{ y: 100 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="block select-none text-8xl font-mono font-bold sm:text-9xl lg:text-[10rem] bg-gradient-to-r from-destructive/60 via-destructive/80 to-destructive/60 bg-clip-text text-transparent"
                >
                  404
                </motion.span>
              </div>
            </motion.div>

            <div className="overflow-hidden mb-4">
              <motion.h2
                initial={{ y: 40 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-3xl font-semibold sm:text-4xl lg:text-5xl bg-gradient-to-r from-foreground/90 to-foreground/70 bg-clip-text text-transparent font-serif"
              >
                Page Not Found
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="mb-8 text-lg leading-relaxed text-muted-foreground max-w-md mx-auto"
            >
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved. Let&apos;s get you back on track.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <Button
                onClick={() => router.back()}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto group cursor-pointer"
              >
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Go back
              </Button>
              <Button asChild size="lg" className="w-full sm:w-auto group">
                <Link href="/">
                  <Home className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                  Home
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="w-full sm:w-auto group"
              >
                <Link href="/projects">
                  <Search className="mr-2 h-4 w-4 transition-transform group-hover:rotate-12" />
                  Browse projects
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default NotFound;
