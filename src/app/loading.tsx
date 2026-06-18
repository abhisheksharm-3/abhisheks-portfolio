"use client";

import { motion, useMotionValue } from "framer-motion";
import { AppShell } from "@/components/layout/AppShell";
import { useEffect, useRef } from "react";
import { LoadingBackground } from "@/components/sections/loading/LoadingBackground";

/**
 * Instant loading state for a route segment, powered by Next.js Suspense conventions.
 */
const Loading = () => {
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
        <LoadingBackground mouseX={mouseX} mouseY={mouseY} />

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
