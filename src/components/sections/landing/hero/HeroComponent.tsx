"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  AbstractShapes,
  AnimatedPaths,
  AsymmetricalDecoration,
  AsymmetricalGrid,
  NoiseBackground,
} from "./HeroBackground";
import {
  ExperienceCounter,
  HeroDescription,
  HeroName,
  ScrollIndicator,
  SkillsSection,
} from "./HeroContent";

/**
 * The main hero section for the homepage.
 *
 * This component orchestrates a complex visual experience by combining:
 * 1.  **Mouse Parallax**: Tracks mouse movement for a 3D depth effect.
 * 2.  **Scroll Animation**: Fades out and moves content up on scroll.
 * 3.  **Content Layout**: Structures the hero's name, description, and skills.
 *
 * @returns {JSX.Element} The fully rendered and interactive hero section.
 */
export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Set up a performant mouse move listener to track mouse position
  // relative to the center of the hero section.
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

  // Track scroll progress relative to the hero section.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Create spring-smoothed animations based on scroll progress.
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const smoothY = useSpring(y, { damping: 15, stiffness: 100 });
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100vh] w-full overflow-hidden"
    >
      <NoiseBackground />
      <AsymmetricalGrid />
      <AbstractShapes mouseX={mouseX} mouseY={mouseY} />
      <AnimatedPaths />
      <AsymmetricalDecoration mouseX={mouseX} mouseY={mouseY} />

      <ExperienceCounter />

      <div className="relative z-10 mx-auto min-h-screen w-full max-w-7xl px-6 flex">
        <motion.div
          style={{ y: smoothY, opacity }}
          className="flex w-full flex-col items-start justify-center py-20 md:flex-row"
        >
          <div className="flex w-full flex-col md:mt-16 md:w-1/2">
            <HeroName />
            <HeroDescription />
          </div>
          <SkillsSection mouseX={mouseX} mouseY={mouseY} />
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
};