"use client";

import React from "react";
import { motion, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useExperienceCounter } from "@/hooks/useExperienceCounter";
import { SkillItemProps, MousePosition } from "@/lib/types";
import { ANIMATION_CONFIG, SKILLS } from "@/data/hero";

/**
 * A utility function to scroll to a specific section of the page.
 * @param {string} sectionId - The ID of the element to scroll to.
 */
const scrollToSection = (sectionId: string): void => {
  const section = document.getElementById(sectionId);
  section?.scrollIntoView({ behavior: ANIMATION_CONFIG.SCROLL_BEHAVIOR });
};

/**
 * A fixed-position counter displaying years of experience.
 */
export const ExperienceCounter: React.FC = () => {
  const counterValue = useExperienceCounter(1); // Explicitly set target count

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 1 }}
      className="hidden md:flex flex-col items-center fixed left-8 top-0 bottom-0 w-12 z-10"
    >
      <div className="h-1/3" />
      <div className="h-1/3 flex flex-col items-center justify-center">
        <div className="h-16 w-[1px] bg-gradient-to-b from-transparent to-primary/20" />
        <div className="my-4 font-mono text-xl text-primary/70 text-center w-full">
          {counterValue}
          <div className="text-[10px] uppercase tracking-wider text-primary/40 mt-1">
            years crafting code
          </div>
        </div>
        <div className="h-16 w-[1px] bg-gradient-to-t from-transparent to-primary/20" />
      </div>
      <div className="h-1/3" />
    </motion.div>
  );
};

/**
 * Displays a single skill with multiple reveal and hover animations.
 * @param {SkillItemProps} props - The component props.
 */
export const SkillItem: React.FC<SkillItemProps> = ({ skill, index }) => (
  <motion.div
    className="group relative"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.7, delay: 1.6 + index * 0.15 }}
  >
    <div className="flex items-center gap-4">
      <motion.div
        className="relative flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 2.1 + index * 0.15 }}
      >
        <div className="w-7 h-7 rounded-md border border-primary/10 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
        </div>
        <motion.div
          className="absolute inset-0 border border-primary/20 rounded-md opacity-0 group-hover:opacity-100"
          initial={{ scale: 0.8 }}
          whileHover={{ scale: 1.2 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
      <div className="relative">
        <span className="text-lg md:text-xl text-foreground/60 group-hover:text-foreground transition-colors duration-300">
          {skill}
        </span>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 2 + index * 0.15 }}
          className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gradient-to-r from-primary/30 to-transparent origin-left"
        />
      </div>
      <motion.div
        className="ml-auto hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2.5 + index * 0.15 }}
      >
        <div className="relative w-16 h-[3px] bg-primary/5 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-primary/20"
            initial={{ width: 0 }}
            animate={{ width: `${75 + index * 5}%` }}
            transition={{ duration: 1, delay: 2.7 + index * 0.15 }}
          />
        </div>
      </motion.div>
    </div>
  </motion.div>
);

/**
 * An animated scroll-down indicator that scrolls to a specified section on click.
 */
export const ScrollIndicator: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, delay: 2.5 }}
    className="absolute bottom-12 right-12 flex flex-col items-center cursor-pointer z-10"
    onClick={() => scrollToSection("projects")} // Updated ID to be more semantic
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

/**
 * Renders the main name "Abhishek Sharma" with staggered text reveal animations.
 */
export const HeroName: React.FC = () => (
  <div className="mb-20 sm:mb-28 md:mb-20 relative">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="relative z-10"
    >
      <div className="overflow-hidden">
        <motion.span
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="inline-block text-6xl pr-12 sm:text-7xl md:text-8xl lg:text-9xl font-serif tracking-tighter bg-gradient-to-r from-primary/80 via-primary/90 to-primary/70 bg-clip-text text-transparent"
        >
          Abhishek
        </motion.span>
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.4 }}
      className="ml-[15%] md:ml-[25%] relative z-10"
    >
      <div className="overflow-hidden">
        <motion.span
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="inline-block text-6xl pr-12 sm:text-7xl md:text-8xl lg:text-9xl font-serif italic tracking-tighter bg-gradient-to-r from-primary/70 to-primary/80 bg-clip-text text-transparent"
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
    />
  </div>
);

/**
 * Renders the descriptive text below the main name with reveal animations.
 */
export const HeroDescription: React.FC = () => {
  const descriptionLines = [
    { text: "Full-stack developer", gradient: true },
    { text: "who loves building side products", gradient: false },
    { text: "and chasing ideas past midnight", gradient: false },
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
              className={
                line.gradient
                  ? "bg-gradient-to-r from-primary/90 to-foreground bg-clip-text text-transparent"
                  : "text-foreground/70"
              }
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
        CS & Engineering graduate who started coding in{" "}
        <span className="text-foreground/70">8th grade</span>. I’ve built
        everything from{" "}
        <span className="text-primary/80">AI-powered scheduling apps </span>
        to <span className="text-primary/80">minimalist mobile tools</span>. I
        enjoy making things that feel smooth, intentional, and a little bit
        clever.
      </motion.p>
    </div>
  );
};

/**
 * The right-hand section of the hero, displaying the list of skills.
 * @param {object} props - The component props.
 * @param {MousePosition} props.mousePosition - Normalized mouse coordinates for parallax effects.
 */
export const SkillsSection: React.FC<{ mousePosition: MousePosition }> = ({
  mousePosition,
}) => (
  <div className="w-full md:w-1/2 md:pl-20 mt-0 md:mt-36 relative">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.2 }}
      transition={{ duration: 1, delay: 1.5 }}
      className="absolute -left-10 top-0 w-[1px] h-32 bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden md:block"
    />

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }}
      className="mb-10 flex items-center"
    >
      <span className="text-sm uppercase tracking-wider text-foreground/40 font-light">
        What I do best
      </span>

      <div className="ml-4 h-[1px] w-12 bg-primary/20"></div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.6 }}
      className="relative border-l border-primary/5 pl-6 py-2"
    >
      <div className="space-y-8 w-full">
        {SKILLS.map((skill, index) => (
          <SkillItem key={skill} skill={skill} index={index} />
        ))}
      </div>
      <div className="absolute left-0 top-0 w-1.5 h-1.5 rounded-full bg-primary/20 -translate-x-[3px]"></div>
      <div className="absolute left-0 bottom-0 w-1.js h-1.5 rounded-full bg-primary/20 -translate-x-[3px]"></div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, delay: 2.2 }}
      style={{
        x: useTransform(
          () =>
            mousePosition.x * ANIMATION_CONFIG.MOUSE_PARALLAX_MULTIPLIER.LARGE
        ),
        y: useTransform(
          () =>
            mousePosition.y * ANIMATION_CONFIG.MOUSE_PARALLAX_MULTIPLIER.LARGE
        ),
      }}
      className="mt-16 ml-auto mr-16 relative"
    >
      <div className="w-20 h-20 border border-primary/10 rounded-full relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-primary/20 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-primary/5 rounded-full" />
      </div>
      <motion.div
        className="absolute -bottom-4 -left-4 w-8 h-8 border border-primary/20 rounded-sm"
        animate={{ rotate: 45 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
      />
    </motion.div>
  </div>
);
