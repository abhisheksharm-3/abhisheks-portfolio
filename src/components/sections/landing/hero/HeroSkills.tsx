"use client";

import React from "react";
import { motion, useTransform, MotionValue } from "framer-motion";
import { SkillItemPropsType } from "@/lib/types/components";
import { HERO_ANIMATIONS as ANIMATION_CONFIG } from "@/data/animations";
import { HERO_SKILLS as SKILLS } from "@/data/skills-expertise";

interface MouseParallaxPropsType {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

/**
 * Displays an individual skill item with multi-part reveal animations.
 */
export const SkillItem: React.FC<SkillItemPropsType> = ({ skill, index }) => (
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
          aria-hidden="true"
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
    </div>
  </motion.div>
);

/**
 * Renders the skills list, including a title and decorative elements
 * that react to mouse movement for a parallax effect.
 */
export const SkillsSection = ({ mouseX, mouseY }: MouseParallaxPropsType) => {
  const x = useTransform(
    mouseX,
    (val) => val * ANIMATION_CONFIG.MOUSE_PARALLAX_MULTIPLIER.LARGE,
  );
  const y = useTransform(
    mouseY,
    (val) => val * ANIMATION_CONFIG.MOUSE_PARALLAX_MULTIPLIER.LARGE,
  );

  return (
    <div className="w-full md:pl-20 mt-0 md:mt-36 relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute -left-10 top-0 w-[1px] h-32 bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden md:block"
        aria-hidden="true"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="mb-10 flex items-center"
      >
        <span className="text-[11px] uppercase tracking-[0.2em] text-primary/35 font-light">
          what i do best
        </span>
        <div className="ml-4 h-[1px] w-12 bg-primary/20"></div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="relative pl-6 py-2"
      >
        <div className="space-y-8 w-full">
          {SKILLS.map((skill, index) => (
            <SkillItem key={skill} skill={skill} index={index} />
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 2.2 }}
        style={{ x, y }}
        className="mt-16 ml-auto mr-16 relative"
        aria-hidden="true"
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
};
