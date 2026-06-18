"use client";

import React from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useExperienceCounter } from "@/hooks/useExperienceCounter";

/**
 * A utility function that smoothly scrolls the window to a given element ID.
 * @param {string} sectionId - The ID of the element to scroll to.
 */
const scrollToSection = (sectionId: string): void => {
  const section = document.getElementById(sectionId);
  section?.scrollIntoView({ behavior: "smooth" });
};

/**
 * Renders a fixed-position counter displaying years of professional experience.
 */
export const ExperienceCounter: React.FC = () => {
  const counterValue = useExperienceCounter(1);
  const { scrollY } = useScroll();
  // Fade out as user scrolls past the hero viewport
  const scrollOpacity = useTransform(scrollY, [0, 400, 800], [1, 1, 0]);

  return (
    // Outer div: scroll-based fade-out via MotionValue
    <motion.div
      style={{ opacity: scrollOpacity }}
      className="hidden xl:flex flex-col items-center fixed left-8 top-0 bottom-0 w-12 z-10 pointer-events-none"
      aria-hidden="true"
    >
      <div className="h-1/3" />
      {/* Inner div: initial fade-in animation, independent of scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="h-1/3 flex flex-col items-center justify-center"
      >
        <div className="h-16 w-[1px] bg-gradient-to-b from-transparent to-primary/20" />
        <div className="my-4 font-mono text-xl text-primary/70 text-center w-full">
          {counterValue}
          <div className="text-[10px] uppercase tracking-wider text-primary/40 mt-1">
            years crafting code
          </div>
        </div>
        <div className="h-16 w-[1px] bg-gradient-to-t from-transparent to-primary/20" />
      </motion.div>
      <div className="h-1/3" />
    </motion.div>
  );
};

/**
 * Renders the developer's name with a staggered reveal animation,
 * optimized for responsiveness across all screen sizes.
 */
export const HeroName: React.FC = () => (
  <div className="relative mb-10 sm:mb-28 md:mb-20">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="relative z-10"
    >
      <div className="overflow-hidden text-center md:text-left">
        <motion.span
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={cn(
            "block text-6xl font-serif tracking-tighter text-primary",
            "sm:max-w-[280px] sm:inline-block sm:text-7xl",
            "md:max-w-none md:pr-8 lg:text-8xl xl:text-9xl",
          )}
        >
          Abhishek
        </motion.span>
      </div>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.4 }}
      className="relative z-10 md:ml-[25%]"
    >
      <div className="overflow-hidden text-center md:text-left">
        <motion.span
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={cn(
            "block text-6xl font-serif italic tracking-tighter text-primary/80",
            "sm:text-7xl md:inline-block md:pr-8 lg:text-8xl xl:text-9xl",
          )}
        >
          Sharma
        </motion.span>
      </div>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 0.1, scale: 1 }}
      transition={{ duration: 1.5, delay: 0.8 }}
      className="absolute -right-10 top-1/2 -translate-y-1/2 w-32 h-32 border border-primary/30 rounded-full hidden md:block"
      aria-hidden="true"
    />
  </div>
);

/**
 * Renders the multi-line description and bio with reveal animations.
 */
export const HeroDescription: React.FC = () => {
  const descriptionLines = [
    { text: "software engineer", gradient: true },
    { text: "ai systems, mobile builds,", gradient: false },
    { text: "side projects past midnight.", gradient: false },
  ];

  return (
    <div className="space-y-5 mb-16 max-w-md">
      {descriptionLines.map((line, index) => (
        <div key={index} className="overflow-hidden">
          <motion.p
            initial={{ y: 40 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 + index * 0.2 }}
            className="text-lg sm:text-xl md:text-2xl font-light"
          >
            <span
              className={cn(
                line.gradient ? "text-primary" : "text-foreground/70",
              )}
            >
              {line.text}
            </span>
          </motion.p>
        </div>
      ))}
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: "4rem" }}
        transition={{ duration: 1, delay: 1.5 }}
        className="h-[1px] bg-gradient-to-r from-primary/40 to-transparent my-6"
      />
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="text-sm sm:text-base text-foreground/50 font-light leading-relaxed max-w-lg"
      >
        started coding in{" "}
        <span className="text-foreground/70">8th grade</span>. forward
        deployed engineer at{" "}
        <a
          href="https://wednesday.is"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/70 underline underline-offset-2 hover:text-primary/80 transition-colors duration-200"
        >
          wednesday.is
        </a>
        : own it from discovery to deployment. i write about the parts
        that don&apos;t show up in the docs.
      </motion.p>
    </div>
  );
};

/**
 * Renders an animated scroll down indicator to prompt user action.
 */
export const ScrollIndicator: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, delay: 2.5 }}
    className="absolute bottom-12 right-12 flex flex-col items-center cursor-pointer z-10"
    onClick={() => scrollToSection("work-section")}
    aria-label="Scroll to projects section"
  >
    <div className="flex items-center mb-2">
      <span className="mr-2 text-xs tracking-widest uppercase text-foreground/30">
        Scroll
      </span>
      <div className="w-8 h-[1px] bg-foreground/20"></div>
    </div>
    <motion.div
      animate={{ y: [0, 5, 0] }}
      transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
    >
      <ChevronDown size={14} className="text-primary/50" />
    </motion.div>
  </motion.div>
);
