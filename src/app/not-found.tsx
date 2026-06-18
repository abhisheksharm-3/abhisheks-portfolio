"use client";

import { motion, useMotionValue } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import { ArrowLeft, Home, Search } from "lucide-react";
import { NotFoundBackground } from "@/components/sections/not-found/NotFoundBackground";

/**
 * Custom 404 page for routes that do not exist, with helpful navigation options.
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
        <NotFoundBackground mouseX={mouseX} mouseY={mouseY} />

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
