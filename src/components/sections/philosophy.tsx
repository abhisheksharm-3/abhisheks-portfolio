"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SpinningText } from "@/components/magicui/spinning-text";
import { Card } from "@/components/ui/card";
import { AnimatedPathProps } from "@/lib/types";

// Animation configurations for consistent timing across components
const ANIMATION_CONFIG = {
  section: { duration: 1 },
  header: { duration: 0.8, delay: 0.4 },
  quote: { duration: 0.8, delay: 0.2 },
  decorative: { duration: 0.7, delay: 0.5 },
  description: { duration: 0.7, delay: 0.7 },
  pathAnimation: { duration: 2, delay: 0.5 }
} as const;

// Grid line positions for consistent asymmetrical layout
const GRID_POSITIONS = {
  vertical: ['13%', '28%', '67%', '89%'],
  horizontal: ['22%', '58%', '81%'],
  opacity: [30, 10, 20, 15, 25, 10, 20]
} as const;

// Predefined SVG paths for decorative elements
const SVG_PATHS = {
  flowing: "M10,30 C20,50 40,10 50,40 S80,20 90,40",
  curved: "M10,50 Q40,20 50,50 T90,30",
  default: "M30,20 Q50,10 70,30 T90,50"
} as const;

function AnimatedPath({ className, pathD = SVG_PATHS.default, delay = 0 }: AnimatedPathProps) {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className={className}>
      <motion.path
        d={pathD}
        stroke="currentColor"
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: ANIMATION_CONFIG.pathAnimation.duration, delay }}
      />
    </svg>
  );
}

function NoiseTexture() {
  return (
    <div className="absolute w-screen z-0 mix-blend-overlay opacity-10">
      <svg className="w-full h-full opacity-20" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <filter id="philosophyNoiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#philosophyNoiseFilter)" />
      </svg>
    </div>
  );
}

function AsymmetricalGrid() {
  return (
    <div className="absolute inset-0 opacity-5">
      {/* Vertical grid lines with varying opacity for visual hierarchy */}
      {GRID_POSITIONS.vertical.map((position, index) => (
        <div 
          key={`vertical-${index}`}
          className="absolute top-0 bottom-0 w-[1px] bg-primary/30" 
          style={{ 
            left: position,
            opacity: GRID_POSITIONS.opacity[index] / 100
          }} 
        />
      ))}
      
      {/* Horizontal grid lines positioned asymmetrically */}
      {GRID_POSITIONS.horizontal.map((position, index) => (
        <div 
          key={`horizontal-${index}`}
          className="absolute left-0 right-0 h-[1px] bg-primary/25" 
          style={{ 
            top: position,
            opacity: GRID_POSITIONS.opacity[index + 4] / 100
          }} 
        />
      ))}
    </div>
  );
}

interface DecorativePathsProps {
  isInView: boolean;
}

function DecorativePaths({ isInView }: DecorativePathsProps) {
  return (
    <>
      {/* Left decorative path with staggered animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute left-[5%] top-[15%] text-primary/8"
      >
        <AnimatedPath pathD={SVG_PATHS.flowing} delay={0.6} />
      </motion.div>
      
      {/* Right decorative path with different timing and rotation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute right-[10%] bottom-[20%] rotate-180 text-primary/8"
      >
        <AnimatedPath pathD={SVG_PATHS.curved} delay={0.8} />
      </motion.div>
    </>
  );
}

interface SectionHeaderProps {
  isInView: boolean;
}

function SectionHeader({ isInView }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: ANIMATION_CONFIG.section.duration }}
      className="flex flex-col mb-16 sm:mb-20 relative z-10"
    >
      <div className="flex items-center mb-4">
        {/* Animated section indicator dot */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-7 h-7 rounded-md border border-primary/10 flex items-center justify-center mr-3"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
        </motion.div>
        
        {/* Section label with slide-in animation */}
        <motion.span 
          initial={{ opacity: 0, x: -10 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-xs text-primary/60 uppercase tracking-wider font-light"
        >
          Philosophy
        </motion.span>
      </div>
      
      {/* Main heading with reveal animation */}
      <div className="overflow-hidden">
        <motion.h2 
          initial={{ y: 60 }}
          animate={isInView ? { y: 0 } : {}}
          transition={{ duration: ANIMATION_CONFIG.header.duration, delay: ANIMATION_CONFIG.header.delay }}
          className="text-4xl sm:text-5xl md:text-6xl font-serif italic leading-none"
        >
          <span className="bg-gradient-to-r from-primary/80 via-primary/90 to-primary/70 bg-clip-text text-transparent select-none">
            Development Approach
          </span>
        </motion.h2>
      </div>
      
      {/* Animated underline accent */}
      <motion.div 
        initial={{ width: 0, opacity: 0 }}
        animate={isInView ? { width: "5rem", opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.6 }}
        className="h-[1px] bg-gradient-to-r from-primary/40 to-transparent mt-4"
      />
    </motion.div>
  );
}

interface QuoteBlockProps {
  isInView: boolean;
}

function QuoteBlock({ isInView }: QuoteBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: ANIMATION_CONFIG.quote.duration, delay: ANIMATION_CONFIG.quote.delay }}
      className="text-center"
    >
      <blockquote className="text-2xl sm:text-3xl md:text-4xl font-serif italic leading-relaxed mb-10 px-4">
        <span className="bg-gradient-to-r from-foreground/90 via-foreground/80 to-foreground/70 bg-clip-text text-transparent">
          &quot;Good code is as much about the user experience as it is about technical excellence.&quot;
        </span>
      </blockquote>
    </motion.div>
  );
}

interface DecorativeDividerProps {
  isInView: boolean;
}

function DecorativeDivider({ isInView }: DecorativeDividerProps) {
  return (
    <div className="flex items-center justify-center mb-8">
      {/* Left line with expanding animation */}
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: 60 } : {}}
        transition={{ duration: ANIMATION_CONFIG.decorative.duration, delay: ANIMATION_CONFIG.decorative.delay }}
        className="h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"
      />
      
      {/* Central dot with scale animation */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.8 }}
        className="w-2 h-2 rounded-full border border-primary/30 mx-2"
      />
      
      {/* Right line with expanding animation */}
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: 60 } : {}}
        transition={{ duration: ANIMATION_CONFIG.decorative.duration, delay: ANIMATION_CONFIG.decorative.delay }}
        className="h-[1px] bg-gradient-to-l from-transparent via-primary/40 to-transparent"
      />
    </div>
  );
}

interface PhilosophyDescriptionProps {
  isInView: boolean;
}

function PhilosophyDescription({ isInView }: PhilosophyDescriptionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: ANIMATION_CONFIG.description.duration, delay: ANIMATION_CONFIG.description.delay }}
      className="text-center max-w-2xl mx-auto"
    >
      <p className="text-foreground/60 text-sm sm:text-base font-light leading-relaxed mb-6">
        I believe in creating software that not only functions flawlessly but also provides an intuitive and enjoyable user experience. 
        My approach combines technical expertise with a deep understanding of user needs.
      </p>
      <p className="text-foreground/50 font-light text-sm tracking-wide border-b border-primary/10 pb-1 px-4 inline-block">
        My development philosophy
      </p>
    </motion.div>
  );
}

function CardCornerAccent() {
  return (
    <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
      <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-primary/20 to-transparent" />
      <div className="absolute top-0 right-0 h-px w-16 bg-gradient-to-l from-primary/20 to-transparent" />
    </div>
  );
}

export function Philosophy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section 
      ref={sectionRef}
      className="py-28 sm:py-36 relative overflow-hidden"
    >
      {/* Background decorative elements layer */}
      <div className="absolute inset-0 pointer-events-none">
        <NoiseTexture />
        <AsymmetricalGrid />
        <DecorativePaths isInView={isInView} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader isInView={isInView} />

        {/* Main content card with enhanced styling */}
        <Card className="border-primary/10 backdrop-blur-sm overflow-hidden py-0 mb-12 relative max-w-4xl mx-auto">
          <div className="p-8 sm:p-10">
            {/* Spinning text indicator for key concepts */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1 }}
              className="relative inline-block mb-10"
            >
              <SpinningText className="opacity-70 text-sm">
                clean code • user experience • performance • accessibility • 
              </SpinningText>
            </motion.div>
            
            <QuoteBlock isInView={isInView} />
            <DecorativeDivider isInView={isInView} />
            <PhilosophyDescription isInView={isInView} />
          </div>
          
          <CardCornerAccent />
        </Card>
      </div>
    </section>
  );
}