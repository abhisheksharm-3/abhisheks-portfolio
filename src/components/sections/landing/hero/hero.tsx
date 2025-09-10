"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";

import {
  NoiseBackground,
  AsymmetricalGrid,
  AbstractShapes,
  AnimatedPaths,
  AsymmetricalDecoration,
} from "./hero-background";

import {
  ExperienceCounter,
  HeroName,
  HeroDescription,
  SkillsSection,
  ScrollIndicator,
} from "./hero-content";

/**
 * The main Hero section for the homepage.
 *
 * This component orchestrates various background, content, and UI elements to create
 * a dynamic and interactive hero section with mouse-based parallax and scroll-based animations.
 * @returns {JSX.Element} The rendered Hero component.
 */
export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // --- Performant Mouse Tracking ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } =
        containerRef.current.getBoundingClientRect();
      // Calculate mouse position relative to the center of the hero section
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      mouseX.set(x);
      mouseY.set(y);
    };
    // Use the containerRef for the event listener for better performance
    const currentRef = containerRef.current;
    currentRef?.addEventListener("mousemove", handleMouseMove);
    return () => currentRef?.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // --- Scroll-based Animations (Unchanged) ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const smoothY = useSpring(y, { damping: 15, stiffness: 100 });
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100vh] w-full overflow-hidden"
    >
      {/* Layer 1: Background Elements now receive performant MotionValues */}
      <NoiseBackground />
      <AsymmetricalGrid />
      <AbstractShapes mouseX={mouseX} mouseY={mouseY} />
      <AnimatedPaths />
      <AsymmetricalDecoration mouseX={mouseX} mouseY={mouseY} />

      {/* Layer 2: Fixed UI Elements */}
      <ExperienceCounter />

      {/* Layer 3: Main Content with Parallax Scroll */}
      <div className="relative z-10 container mx-auto px-6 min-h-screen flex">
        <motion.div
          style={{ y: smoothY, opacity }}
          className="flex flex-col md:flex-row items-start justify-center w-full py-20"
        >
          <div className="w-full md:w-1/2 flex flex-col mt-0 md:mt-16">
            <HeroName />
            <HeroDescription />
          </div>
          <SkillsSection mouseX={mouseX} mouseY={mouseY} />
        </motion.div>
      </div>

      {/* Layer 4: Navigation Helper */}
      <ScrollIndicator />
    </section>
  );
};
