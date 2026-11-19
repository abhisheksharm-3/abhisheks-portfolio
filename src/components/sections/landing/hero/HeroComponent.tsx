"use client";

import { useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  AbstractShapes,
  AnimatedPaths,
  AsymmetricalDecoration,
  AsymmetricalGrid,
  NoiseBackground,
} from "./HeroBackground";
import { HeroEyebrow, HeroName, HeroNow, HeroTagline } from "./HeroContent";

/**
 * The homepage hero: a single name-dominant editorial column over the decorative
 * background, sized to its content and aligned to the page grid the sections below use.
 *
 * Mouse parallax drives the background depth. The old scroll fade is gone: with a
 * content-sized hero it would hide the name while it was still on screen.
 */
export const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

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

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden pb-8 sm:pb-12">
      <NoiseBackground />
      <AsymmetricalGrid />
      <AbstractShapes mouseX={mouseX} mouseY={mouseY} />
      <AnimatedPaths />
      <AsymmetricalDecoration mouseX={mouseX} mouseY={mouseY} />

      <div className="relative z-10 flex flex-col pt-4 md:pt-12">
        <HeroEyebrow />
        <HeroName />
        <HeroTagline />
        <HeroNow />
      </div>
    </section>
  );
};
