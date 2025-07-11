"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";

// Custom hook for mouse tracking
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return mousePosition;
};

// Animated Noise Background
const NoiseBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
    <div className="absolute inset-0 z-0 mix-blend-overlay">
      <svg className="w-full h-full opacity-20" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  </div>
);

// Asymmetrical Grid Lines
const AsymmetricalGrid = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 opacity-5">
      {/* Vertical lines with varying opacity and thickness */}
      <div className="absolute top-0 bottom-0 w-[1px] bg-primary/30" style={{ left: '13%' }} />
      <div className="absolute top-0 bottom-0 w-[1px] bg-primary/10" style={{ left: '28%' }} />
      <div className="absolute top-0 bottom-0 w-[1px] bg-primary/20" style={{ left: '67%' }} />
      <div className="absolute top-0 bottom-0 w-[1px] bg-primary/15" style={{ left: '89%' }} />
      
      {/* Horizontal lines with varying opacity and thickness */}
      <div className="absolute left-0 right-0 h-[1px] bg-primary/25" style={{ top: '22%' }} />
      <div className="absolute left-0 right-0 h-[1px] bg-primary/10" style={{ top: '58%' }} />
      <div className="absolute left-0 right-0 h-[1px] bg-primary/20" style={{ top: '81%' }} />
    </div>
  </div>
);

// Abstract Shapes Component
const AbstractShapes = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => (
  <>
    {/* Large gradient blob */}
    <motion.div
      className="absolute -left-[10%] top-[15%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-br from-primary/5 via-primary/2 to-transparent blur-[120px]"
      animate={{
        scale: [1, 1.05, 1],
        opacity: [0.3, 0.4, 0.3],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    />
    
    {/* Smaller interactive blob */}
    <motion.div
      className="absolute right-[10%] bottom-[20%] w-[25vw] h-[25vw] rounded-full bg-gradient-to-tl from-primary/4 via-primary/2 to-transparent blur-[80px]"
      style={{
        x: useTransform(() => mousePosition.x * -15),
        y: useTransform(() => mousePosition.y * -15),
      }}
      animate={{
        scale: [1, 1.08, 1],
        opacity: [0.2, 0.3, 0.2],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    />
    
    {/* Abstract geometric shapes */}
    <motion.div 
      className="absolute top-[25%] right-[15%] w-32 h-32 border-l border-t border-primary/20 rounded-tl-3xl"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.6, scale: 1 }}
      transition={{ duration: 1.5, delay: 1 }}
      style={{
        x: useTransform(() => mousePosition.x * 5),
        y: useTransform(() => mousePosition.y * 5),
      }}
    />
    
    <motion.div 
      className="absolute bottom-[20%] left-[20%] w-20 h-20 border-r border-b border-primary/15 rounded-br-2xl"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.4, scale: 1 }}
      transition={{ duration: 1.5, delay: 1.2 }}
      style={{
        x: useTransform(() => mousePosition.x * 8),
        y: useTransform(() => mousePosition.y * 8),
      }}
    />
  </>
);

// Animated SVG Paths
const AnimatedPaths = () => (
  <>
    <motion.svg
      className="absolute left-[5%] top-[40%] w-[30%] text-primary/10"
      viewBox="0 0 100 100"
      fill="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 0.5 }}
    >
      <motion.path
        d="M10,30 C20,50 40,10 50,40 S80,20 90,40"
        stroke="currentColor"
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 1 }}
      />
    </motion.svg>
    
    <motion.svg
      className="absolute right-[10%] top-[30%] w-[25%] text-primary/8"
      viewBox="0 0 100 100"
      fill="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 0.8 }}
    >
      <motion.path
        d="M10,50 Q40,20 50,50 T90,30"
        stroke="currentColor"
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 1.3 }}
      />
    </motion.svg>
  </>
);

// Experience Counter Component
const ExperienceCounter = () => {
  const [expCounter, setExpCounter] = useState("00");

  useEffect(() => {
    const timer = setTimeout(() => {
      let count = 0;
      const interval = setInterval(() => {
        count++;
        setExpCounter(count.toString().padStart(2, '0'));
        if (count >= 1) clearInterval(interval);
      }, 300);
      
      return () => clearInterval(interval);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 1 }}
      className="hidden md:flex flex-col items-center fixed left-8 top-0 bottom-0 w-12 z-10"
    >
      <div className="h-1/3"/>
      <div className="h-1/3 flex flex-col items-center justify-center">
        <div className="h-16 w-[1px] bg-gradient-to-b from-transparent to-primary/20"/>
        <div className="my-4 font-mono text-xl text-primary/70 text-center w-full">
          {expCounter}
          <div className="text-[10px] uppercase tracking-wider text-primary/40 mt-1">
            years exp
          </div>
        </div>
        <div className="h-16 w-[1px] bg-gradient-to-t from-transparent to-primary/20"/>
      </div>
      <div className="h-1/3"/>
    </motion.div>
  );
};

// Skill Item Component with unique design
const SkillItem = ({ skill, index }: { skill: string; index: number }) => (
  <motion.div
    className="group relative"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.7, delay: 1.6 + index * 0.15 }}
  >
    <div className="flex items-center gap-4">
      {/* Animated skill indicator */}
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
      
      {/* Skill text with animated underline */}
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
      
      {/* Skill progress indicator */}
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

// Scroll Indicator Component
const ScrollIndicator = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, delay: 2.5 }}
    className="absolute bottom-12 right-12 flex flex-col items-center cursor-pointer z-10"
    onClick={() => {
      const workSection = document.getElementById("work-section");
      workSection?.scrollIntoView({ behavior: "smooth" });
    }}
  >
    <div className="flex items-center mb-2">
      <span className="mr-2 text-xs tracking-widest uppercase text-foreground/30">Scroll</span>
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

// Asymmetrical Decorative Element
const AsymmetricalDecoration = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => (
  <motion.div 
    className="absolute top-[10%] right-[20%] hidden md:block"
    style={{
      x: useTransform(() => mousePosition.x * 3),
      y: useTransform(() => mousePosition.y * 3),
    }}
  >
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.5 }}
      className="relative"
    >
      <div className="w-24 h-24 border-r border-t border-primary/15 rounded-tr-3xl" />
      <div className="absolute -bottom-3 -left-3 w-6 h-6 border border-primary/30 rounded-full" />
    </motion.div>
  </motion.div>
);

// Main Hero Component
export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMousePosition();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const smoothY = useSpring(y, { damping: 15, stiffness: 100 });
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  const skills = [
    "Frontend Development",
    "React & Next.js",
    "Full Stack",
    "Mobile Development",
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100vh] w-full overflow-hidden"
    >
      {/* Background Elements */}
      <NoiseBackground />
      <AsymmetricalGrid />
      <AbstractShapes mousePosition={mousePosition} />
      <AnimatedPaths />
      <AsymmetricalDecoration mousePosition={mousePosition} />
      
      {/* Experience Counter */}
      <ExperienceCounter />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 min-h-screen flex">
        <motion.div
          style={{ y: smoothY, opacity }}
          className="flex flex-col md:flex-row items-start justify-center w-full py-20"
        >
          {/* Left Column - Name and Description */}
          <div className="w-full md:w-1/2 flex flex-col mt-0 md:mt-16">
            {/* Name section with staggered reveal */}
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
              
              {/* Decorative element behind name */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.8 }}
                className="absolute -right-10 top-1/2 -translate-y-1/2 w-32 h-32 border border-primary/30 rounded-full hidden md:block"
              />
            </div>
            
            {/* Description text with staggered reveal */}
            <div className="space-y-5 mb-16 max-w-md">
              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: 40 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                  className="text-lg sm:text-xl md:text-2xl font-light"
                >
                  <span className="bg-gradient-to-r from-primary/90 to-foreground bg-clip-text text-transparent">
                    Software Developer
                  </span>
                </motion.p>
              </div>
              
              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: 40 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="text-lg sm:text-xl md:text-2xl font-light text-foreground/70"
                >
                  specializing in full stack
                </motion.p>
              </div>
              
              <div className="overflow-hidden">
                <motion.p
                  initial={{ y: 40 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                  className="text-lg sm:text-xl md:text-2xl font-light text-foreground/70"
                >
                  web & mobile development
                </motion.p>
              </div>
              
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
                Computer Science & Engineering graduate with expertise in modern web and mobile technologies.
                Passionate about creating elegant, performant solutions with clean code.
              </motion.p>
            </div>
          </div>
          
          {/* Right Column - Skills with unique layout */}
          <div className="w-full md:w-1/2 md:pl-20 mt-0 md:mt-36 relative">
            {/* Decorative element */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="absolute -left-10 top-0 w-[1px] h-32 bg-gradient-to-b from-transparent via-primary/30 to-transparent hidden md:block"
            />
            
            {/* Skills heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="mb-10 flex items-center"
            >
              <span className="text-sm uppercase tracking-wider text-foreground/40 font-light">Expertise</span>
              <div className="ml-4 h-[1px] w-12 bg-primary/20"></div>
            </motion.div>
            
            {/* Skills container with decorative border */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="relative border-l border-primary/5 pl-6 py-2"
            >
              <div className="space-y-8 w-full">
                {skills.map((skill, index) => (
                  <SkillItem key={skill} skill={skill} index={index} />
                ))}
              </div>
              
              {/* Decorative dots along the border */}
              <div className="absolute left-0 top-0 w-1.5 h-1.5 rounded-full bg-primary/20 -translate-x-[3px]"></div>
              <div className="absolute left-0 bottom-0 w-1.5 h-1.5 rounded-full bg-primary/20 -translate-x-[3px]"></div>
            </motion.div>
            
            {/* Visual accent element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, delay: 2.2 }}
              style={{
                x: useTransform(() => mousePosition.x * 8),
                y: useTransform(() => mousePosition.y * 8),
              }}
              className="mt-16 ml-auto mr-16 relative"
            >
              <div className="w-20 h-20 border border-primary/10 rounded-full relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-primary/20 rounded-full"/>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-primary/5 rounded-full"/>
              </div>
              <motion.div 
                className="absolute -bottom-4 -left-4 w-8 h-8 border border-primary/20 rounded-sm"
                animate={{ rotate: 45 }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
}