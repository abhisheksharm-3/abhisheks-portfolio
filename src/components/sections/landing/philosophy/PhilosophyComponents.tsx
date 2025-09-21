"use client";

import { motion } from "framer-motion";
import { PHILOSOPHY_ANIMATION_CONFIG } from "@/lib/config/philosophy";

/**
 * Renders the central blockquote for the section.
 * @param {{ isInView: boolean }} props - Controls when the animation should trigger.
 */
export const QuoteBlock = ({ isInView }: { isInView: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{
      duration: PHILOSOPHY_ANIMATION_CONFIG.quote.duration,
      delay: PHILOSOPHY_ANIMATION_CONFIG.quote.delay,
    }}
    className="text-center relative"
  >
    {/* Decorative quote marks */}
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
        animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute -top-4 -left-4 sm:-top-6 sm:-left-8 text-6xl sm:text-8xl text-primary/20 font-serif leading-none select-none"
      >
        &ldquo;
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: 15 }}
        animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-8 text-6xl sm:text-8xl text-primary/20 font-serif leading-none select-none"
      >
        &rdquo;
      </motion.div>
      
      {/* Enhanced blockquote */}
      <blockquote className="relative z-10 text-2xl sm:text-3xl lg:text-4xl font-serif italic leading-relaxed mb-8 px-4 sm:px-8">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="
            bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80 
            bg-clip-text text-transparent
            hover:from-primary/90 hover:via-foreground hover:to-primary/90
            transition-all duration-1000 cursor-default
          "
        >
          i don&apos;t worship perfect code. i care about code that ships,
          scales, and actually makes life easier.
        </motion.span>
      </blockquote>
    </div>
    
    {/* Enhanced tagline */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent rounded-lg" />
      <p className="relative text-sm font-light text-foreground/60 italic px-6 py-2">
        <span className="border-l-2 border-primary/30 pl-3">
          clever code feeds your ego — simple code lets you sleep at night.
        </span>
      </p>
    </motion.div>
  </motion.div>
);

/**
 * Renders an animated decorative divider with lines and a central dot.
 * @param {{ isInView: boolean }} props - Controls when the animation should trigger.
 */
export const DecorativeDivider = ({ isInView }: { isInView: boolean }) => (
  <div className="flex items-center justify-center my-12 relative">
    {/* Left line with enhanced gradient */}
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={isInView ? { width: 80, opacity: 1 } : {}}
      transition={{
        duration: PHILOSOPHY_ANIMATION_CONFIG.decorative.duration,
        delay: PHILOSOPHY_ANIMATION_CONFIG.decorative.delay,
        ease: "easeOut"
      }}
      className="h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-primary/40 relative"
    >
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-primary/20 blur-sm" />
    </motion.div>
    
    {/* Enhanced central element */}
    <motion.div
      initial={{ scale: 0, opacity: 0, rotate: 180 }}
      animate={isInView ? { scale: 1, opacity: 1, rotate: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
      className="relative mx-6"
    >
      {/* Outer ring with pulse */}
      <motion.div
        animate={isInView ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 2, delay: 1.5, repeat: Infinity, repeatDelay: 3 }}
        className="w-4 h-4 rounded-full border border-primary/40 bg-background/80 backdrop-blur-sm relative"
      >
        {/* Inner dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
        </div>
        
        {/* Subtle glow */}
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-md opacity-50" />
      </motion.div>
      
      {/* Decorative rays */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[0, 45, 90, 135].map((rotation, index) => (
          <motion.div
            key={rotation}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
            className="absolute w-6 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"
            style={{ transform: `rotate(${rotation}deg)` }}
          />
        ))}
      </div>
    </motion.div>
    
    {/* Right line with enhanced gradient */}
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={isInView ? { width: 80, opacity: 1 } : {}}
      transition={{
        duration: PHILOSOPHY_ANIMATION_CONFIG.decorative.duration,
        delay: PHILOSOPHY_ANIMATION_CONFIG.decorative.delay,
        ease: "easeOut"
      }}
      className="h-[1px] bg-gradient-to-l from-transparent via-primary/60 to-primary/40 relative"
    >
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-primary/30 to-primary/20 blur-sm" />
    </motion.div>
  </div>
);

/**
 * Renders the main descriptive paragraph for the philosophy section.
 * @param {{ isInView: boolean }} props - Controls when the animation should trigger.
 */
export const PhilosophyDescription = ({ isInView }: { isInView: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{
      duration: PHILOSOPHY_ANIMATION_CONFIG.description.duration,
      delay: PHILOSOPHY_ANIMATION_CONFIG.description.delay,
    }}
    className="text-center max-w-3xl mx-auto"
  >
    {/* Enhanced main description */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: 1 }}
      className="relative mb-8"
    >
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/3 to-transparent rounded-xl -mx-4" />
      
      <p className="
        relative text-foreground/70 text-base sm:text-lg font-light leading-relaxed 
        px-4 py-6 sm:px-6 lg:px-8
      ">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="inline-block"
        >
          building for me is about{" "}
          <span className="text-primary/80 font-medium">clarity and momentum</span>.
        </motion.span>
        {" "}
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="inline-block"
        >
          i like making stuff that&apos;s lightweight, scales when it needs to, and actually solves a problem —
        </motion.span>
        {" "}
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="inline-block"
        >
          could be an{" "}
          <span className="text-primary/70 font-medium">ai agent</span> digging through messy pdfs, 
          or a no-frills{" "}
          <span className="text-primary/70 font-medium">android app</span> that just gets out of your way.
        </motion.span>
        {" "}
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.7 }}
          className="inline-block"
        >
          my approach:{" "}
          <span className="text-foreground/90 font-medium italic">start scrappy, ship fast, keep tweaking</span>.
        </motion.span>
      </p>
    </motion.div>
    
    {/* Enhanced footer tag */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 1.9 }}
      className="relative inline-block"
    >
      {/* Decorative container */}
      <div className="relative group cursor-default">
        {/* Background with hover effect */}
        <div className="
          absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 
          rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300
        " />
        
        {/* Border accent */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-[1px] bg-primary/30" />
        
        {/* Text content */}
        <p className="
          relative text-foreground/60 font-light text-sm tracking-wide 
          px-6 py-3 transition-colors duration-300 group-hover:text-primary/70
        ">
          how i think about dev
        </p>
        
        {/* Side decorations */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 w-1 h-1 rounded-full bg-primary/40 opacity-60" />
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 w-1 h-1 rounded-full bg-primary/40 opacity-60" />
      </div>
    </motion.div>
  </motion.div>
);

/**
 * Renders enhanced decorative accents for card corners.
 */
export const CardCornerAccent = () => (
  <>
    {/* Top-right corner accent */}
    <div
      className="absolute top-0 right-0 w-20 h-20 overflow-hidden group"
      aria-hidden="true"
    >
      {/* Primary lines */}
      <div className="absolute top-0 right-0 w-px h-20 bg-gradient-to-b from-primary/30 via-primary/20 to-transparent transition-all duration-300 group-hover:from-primary/50" />
      <div className="absolute top-0 right-0 h-px w-20 bg-gradient-to-l from-primary/30 via-primary/20 to-transparent transition-all duration-300 group-hover:from-primary/50" />
      
      {/* Subtle inner lines */}
      <div className="absolute top-2 right-0 w-px h-12 bg-gradient-to-b from-primary/10 to-transparent" />
      <div className="absolute top-0 right-2 h-px w-12 bg-gradient-to-l from-primary/10 to-transparent" />
      
      {/* Corner dot */}
      <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-primary/40" />
    </div>
    
    {/* Bottom-left corner accent */}
    <div
      className="absolute bottom-0 left-0 w-20 h-20 overflow-hidden group opacity-60"
      aria-hidden="true"
    >
      {/* Primary lines */}
      <div className="absolute bottom-0 left-0 w-px h-20 bg-gradient-to-t from-primary/20 via-primary/15 to-transparent transition-all duration-300 group-hover:from-primary/30" />
      <div className="absolute bottom-0 left-0 h-px w-20 bg-gradient-to-r from-primary/20 via-primary/15 to-transparent transition-all duration-300 group-hover:from-primary/30" />
      
      {/* Subtle inner lines */}
      <div className="absolute bottom-2 left-0 w-px h-12 bg-gradient-to-t from-primary/8 to-transparent" />
      <div className="absolute bottom-0 left-2 h-px w-12 bg-gradient-to-r from-primary/8 to-transparent" />
      
      {/* Corner dot */}
      <div className="absolute bottom-1 left-1 w-1 h-1 rounded-full bg-primary/30" />
    </div>
  </>
);
