"use client";

import { motion, useMotionValue } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/layout/AppShell";
import { useEffect, useRef } from "react";
import { AlertTriangle, RefreshCw, Home, Bug } from "lucide-react";
import Link from "next/link";
import { ErrorBackground } from "@/components/sections/error/ErrorBackground";

interface ErrorPropsType {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Client-side global error boundary that catches and displays runtime errors.
 */
const Error = ({ error, reset }: ErrorPropsType) => {
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
        <ErrorBackground mouseX={mouseX} mouseY={mouseY} />

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
