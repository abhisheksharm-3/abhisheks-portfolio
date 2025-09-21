"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Construction, Sparkles } from "lucide-react";
import Link from "next/link";

/**
 * Props for AbstractPath component
 */
interface AbstractPathProps {
  className?: string;
  pathD?: string;
}

/**
 * AbstractPath - Decorative animated SVG path component
 * Renders an animated SVG path with motion effects for visual enhancement.
 *
 * @param className - Optional CSS classes for styling
 * @param pathD - SVG path data string (defaults to a curve if not provided)
 * @returns JSX.Element representing an animated SVG path
 */
const AbstractPath = ({ className, pathD }: AbstractPathProps) => {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      className={className}
    >
      <motion.path
        d={pathD || "M30,20 Q50,10 70,30 T90,50"}
        stroke="currentColor"
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
    </svg>
  );
};

/**
 * Props for ComingSoon component
 */
interface ComingSoonProps {
  title: string;
  description?: string;
}

/**
 * ComingSoon - Under construction page component
 * Displays a centered card with construction theme, animated elements, and navigation.
 * Features background noise texture, grid lines, and decorative SVG paths.
 *
 * @param title - Main heading text to display
 * @param description - Optional description text (defaults to standard message)
 * @returns JSX.Element representing the coming soon page section
 */
export const ComingSoon = ({ title, description }: ComingSoonProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section
      ref={sectionRef}
      className="py-28 sm:py-36 min-h-[80vh] flex items-center justify-center relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Noise texture */}
        <div className="absolute inset-0 z-0 mix-blend-overlay opacity-10">
          <svg
            className="w-full h-full opacity-20"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <filter id="comingSoonNoiseFilter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.65"
                numOctaves="3"
                stitchTiles="stitch"
              />
            </filter>
            <rect
              width="100%"
              height="100%"
              filter="url(#comingSoonNoiseFilter)"
            />
          </svg>
        </div>

        {/* Grid lines */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute top-0 bottom-0 w-[1px] bg-primary/30"
            style={{ left: "13%" }}
          />
          <div
            className="absolute top-0 bottom-0 w-[1px] bg-primary/10"
            style={{ left: "28%" }}
          />
          <div
            className="absolute top-0 bottom-0 w-[1px] bg-primary/20"
            style={{ left: "67%" }}
          />
          <div
            className="absolute top-0 bottom-0 w-[1px] bg-primary/15"
            style={{ left: "89%" }}
          />

          <div
            className="absolute left-0 right-0 h-[1px] bg-primary/25"
            style={{ top: "22%" }}
          />
          <div
            className="absolute left-0 right-0 h-[1px] bg-primary/10"
            style={{ top: "58%" }}
          />
          <div
            className="absolute left-0 right-0 h-[1px] bg-primary/20"
            style={{ top: "81%" }}
          />
        </div>

        {/* Decorative SVG paths */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute left-[5%] top-[15%] text-primary/8"
        >
          <AbstractPath pathD="M10,30 C20,50 40,10 50,40 S80,20 90,40" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute right-[10%] bottom-[20%] rotate-180 text-primary/8"
        >
          <AbstractPath pathD="M10,50 Q40,20 50,50 T90,30" />
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <Card className="border-primary/10 backdrop-blur-sm overflow-hidden py-0 mb-12 relative max-w-2xl mx-auto">
          <div className="p-8 sm:p-10 md:p-16 text-center relative">
            {/* Background glow effect */}
            <motion.div
              animate={{
                opacity: [0.05, 0.1, 0.05],
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-2xl blur-2xl -z-10"
            />

            {/* Main content */}
            <div className="relative z-10">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1, rotate: [0, 5, 0, -5, 0] } : {}}
                transition={{
                  scale: { duration: 0.5 },
                  rotate: {
                    duration: 2,
                    delay: 0.5,
                    repeat: Infinity,
                    repeatDelay: 5,
                  },
                }}
                className="mx-auto mb-8 w-16 h-16 rounded-full bg-primary/5 border border-primary/20 flex items-center justify-center"
              >
                <Construction className="h-8 w-8 text-primary/70" />
              </motion.div>

              {/* Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif italic mb-6">
                  <span className="bg-gradient-to-r from-primary/80 via-primary/90 to-primary/70 bg-clip-text text-transparent">
                    {title}
                  </span>
                </h1>
              </motion.div>

              {/* Divider */}
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: "8rem" } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto mb-6"
              />

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-foreground/60 text-sm sm:text-base font-light leading-relaxed mb-10"
              >
                {description ||
                  "This page is currently under construction. Check back soon for updates."}
              </motion.p>

              {/* Coming Soon Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-10"
              >
                <Sparkles className="h-3 w-3 text-primary/70" />
                <span className="text-xs text-primary/70 uppercase tracking-wider">
                  Coming Soon
                </span>
              </motion.div>

              {/* Back button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary/10 bg-primary/5 hover:bg-primary/10 group"
                  asChild
                >
                  <Link href="/">
                    <ArrowLeft className="mr-2 h-3 w-3 transition-transform group-hover:-translate-x-1" />
                    Back to Home
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Decorative corner element */}
          <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
            <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-primary/20 to-transparent" />
            <div className="absolute top-0 right-0 h-px w-16 bg-gradient-to-l from-primary/20 to-transparent" />
          </div>
        </Card>
      </div>
    </section>
  );
};
