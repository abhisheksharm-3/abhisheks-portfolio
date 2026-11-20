"use client";

import { useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import { ListeningLine } from "@/components/shared/ListeningLine";
import { LoopVideo } from "@/components/shared/LoopVideo";
import { SITE_MEDIA } from "@/data/site-media";
import {
  AbstractShapes,
  AnimatedPaths,
  AsymmetricalDecoration,
  AsymmetricalGrid,
  NoiseBackground,
} from "./HeroBackground";
import { HeroEyebrow, HeroName, HeroTagline } from "./HeroContent";

/**
 * The homepage hero: the name, the line under it and what's playing, beside a silent clip from
 * the deccan queen's window, over the decorative background.
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

      <div className="relative z-10 grid grid-cols-1 items-end gap-10 pt-4 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:gap-12 md:pt-12 lg:gap-16">
        <div className="flex flex-col">
          <HeroEyebrow />
          <HeroName />
          <HeroTagline />
          <div className="mt-8 max-w-md">
            <ListeningLine />
          </div>
        </div>
        <figure className="w-full max-w-sm md:ml-auto md:max-w-md">
          <div className="relative aspect-[4/5] overflow-hidden border border-foreground/10">
            <LoopVideo
              video={SITE_MEDIA.homeHero.video}
              poster={SITE_MEDIA.homeHero.src}
              alt={SITE_MEDIA.homeHero.alt}
            />
          </div>
          <figcaption className="mt-2 font-mono text-[11px] text-foreground/60">
            {SITE_MEDIA.homeHero.caption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
};
