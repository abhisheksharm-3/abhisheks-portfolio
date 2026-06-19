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
  HeroEyebrow,
  HeroName,
  HeroSkillsStrip,
  HeroTagline,
  ScrollIndicator,
} from "./HeroContent";

/**
 * The homepage hero: a single name-dominant editorial column over the
 * interactive constellation background.
 *
 * 1.  **Mouse Parallax**: tracks mouse movement to drive the background depth.
 * 2.  **Scroll Animation**: fades and lifts the content as the user scrolls past.
 * 3.  **Content**: eyebrow, name, lede, and a quiet "what i do best" strip.
 */
export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Track mouse position relative to the hero's center for the background parallax.
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { current: el } = containerRef;
      if (!el) return;

      const { left, top, width, height } = el.getBoundingClientRect();
      mouseX.set(e.clientX - (left + width / 2));
      mouseY.set(e.clientY - (top + height / 2));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Fade and lift the content as the hero scrolls out of view.
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
      <NoiseBackground />
      <AsymmetricalGrid />
      <AbstractShapes mouseX={mouseX} mouseY={mouseY} />
      <AnimatedPaths />
      <AsymmetricalDecoration mouseX={mouseX} mouseY={mouseY} />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-start px-6 pb-14 pt-28 md:pt-40">
        <motion.div style={{ y: smoothY, opacity }} className="flex flex-col">
          <HeroEyebrow />
          <HeroName />
          <HeroTagline />
          <HeroSkillsStrip />
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  );
};
