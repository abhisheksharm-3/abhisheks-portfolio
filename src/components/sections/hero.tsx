"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  
  // Mouse position for parallax
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // Add window dimensions state to avoid direct window access
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    // Only run on client side
    if (typeof window !== "undefined") {
      // Set initial window size
      setWindowSize({ 
        width: window.innerWidth, 
        height: window.innerHeight 
      });
      
      const handleMouseMove = (e: MouseEvent) => {
        // Normalize mouse position to be between -1 and 1
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        setMousePosition({ x, y });
      };
      
      const handleResize = () => {
        setWindowSize({ 
          width: window.innerWidth, 
          height: window.innerHeight 
        });
      };
      
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("resize", handleResize);
      
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);
  
  // Derived motion values
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const smoothY = useSpring(y, { damping: 15, stiffness: 100 });
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  
  // Experience counter
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
  
  const scrollToWork = () => {
    if (typeof window !== "undefined") {
      const workSection = document.getElementById("work-section");
      if (workSection) {
        workSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100vh] w-full overflow-hidden"
    >
      {/* Background design elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute left-1/4 top-0 bottom-0 w-px bg-primary/20"/>
          <div className="absolute left-2/4 top-0 bottom-0 w-px bg-primary/20"/>
          <div className="absolute left-3/4 top-0 bottom-0 w-px bg-primary/20"/>
          <div className="absolute top-1/4 left-0 right-0 h-px bg-primary/20"/>
          <div className="absolute top-2/4 left-0 right-0 h-px bg-primary/20"/>
          <div className="absolute top-3/4 left-0 right-0 h-px bg-primary/20"/>
        </div>
        
        {/* Abstract curved lines */}
        <svg className="absolute left-[5%] top-[25%] w-[30%] text-primary/20" viewBox="0 0 100 100" fill="none">
          <motion.path
            d="M10,50 Q30,20 50,50 T90,50"
            stroke="currentColor"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 1 }}
          />
        </svg>
        
        <svg className="absolute right-[10%] bottom-[15%] w-[40%] rotate-180 text-primary/15" viewBox="0 0 100 100" fill="none">
          <motion.path
            d="M10,50 Q30,20 50,50 T90,50"
            stroke="currentColor"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 1.3 }}
          />
        </svg>
        
        {/* Animated gradient blob */}
        <div className="absolute">
          <motion.div 
            className="absolute w-[40vw] h-[40vw] rounded-full bg-gradient-to-tr from-primary/5 to-transparent blur-[80px]"
            style={{ 
              left: useTransform(
                // Using state instead of direct window access
                () => mousePosition.x * -30 + windowSize.width * 0.75
              ),
              top: useTransform(
                // Using state instead of direct window access
                () => mousePosition.y * -30 + windowSize.height * 0.3
              ),
            }}
            animate={{
              opacity: [0.4, 0.7, 0.4],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </div>
      </div>
      
      {/* Side accent bar with year counter - FIXED CENTERING */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="hidden md:flex flex-col items-center fixed left-8 top-0 bottom-0 w-12 z-10"
      >
        <div className="h-1/3"/>
        <div className="h-1/3 flex flex-col items-center justify-center">
          <div className="h-16 w-[1px] bg-gradient-to-b from-transparent to-primary/30"/>
          <div className="my-4 font-mono text-xl text-primary/80 text-center w-full">
            {expCounter}
            <div className="text-[10px] uppercase tracking-wider text-primary/50 mt-1">
              years exp
            </div>
          </div>
          <div className="h-16 w-[1px] bg-gradient-to-t from-transparent to-primary/30"/>
        </div>
        <div className="h-1/3"/>
      </motion.div>
      
      {/* Main content with proper containers for text */}
      <div className="relative z-10 container mx-auto px-6 min-h-screen flex">
        <motion.div 
          style={{ 
            y: smoothY,
            opacity: opacity,
          }}
          className="flex flex-col md:flex-row items-start justify-center w-full py-20"
        >
          {/* Left column - name and description */}
          <div className="w-full md:w-1/2 flex flex-col mt-0 md:mt-20">
            {/* Name section with simpler positioning */}
            <div className="mb-24 sm:mb-32 md:mb-24">
              {/* First name */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="mb-8"
              >
                <span className="text-6xl pr-12 sm:text-7xl md:text-8xl lg:text-9xl font-serif tracking-tighter bg-gradient-to-r from-primary/90 via-primary to-primary/70 bg-clip-text text-transparent">
                  Abhishek
                </span>
              </motion.div>
              
              {/* Last name */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="ml-[5%] md:ml-[15%]"
              >
                <span className="text-6xl pr-12 sm:text-7xl md:text-8xl lg:text-9xl font-serif italic tracking-tighter bg-gradient-to-r from-primary/70 to-primary/90 bg-clip-text text-transparent">
                  Sharma
                </span>
              </motion.div>
            </div>
            
            {/* Description text - COMPLETELY SIMPLIFIED */}
            <div className="space-y-6 mb-16">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="text-lg sm:text-xl md:text-2xl font-light"
              >
                <span className="bg-gradient-to-r from-primary/90 to-foreground bg-clip-text text-transparent">
                  Building refined digital experiences
                </span>
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="text-lg sm:text-xl md:text-2xl font-light text-foreground/80"
              >
                through thoughtful development
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="text-lg sm:text-xl md:text-2xl font-light text-foreground/80"
              >
                and clean code
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                className="text-sm sm:text-base text-foreground/60 font-light leading-relaxed max-w-lg pt-4"
              >
                I create elegant solutions that balance technical excellence with intuitive 
                user experiences, focusing on what works best for both users and developers.
              </motion.p>
            </div>
          </div>
          
          {/* Right column - skills */}
          <div className="w-full md:w-1/2 md:pl-16 mt-0 md:mt-32">
            {/* Skills with animated lines */}
            <div className="space-y-10 w-full">
              {[
                "Frontend Development", 
                "React & Next.js", 
                "Full Stack", 
                "Performance Optimization"
              ].map((skill, index) => (
                <motion.div 
                  key={skill} 
                  className="group relative"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.7, 
                    delay: 1.6 + index * 0.15,
                  }}
                >
                  {/* Dot indicator */}
                  <div className="flex items-center">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.4, delay: 2.1 + index * 0.15 }}
                      className="w-2 h-2 rounded-full bg-primary/50 mr-4"
                    />
                    
                    <span className="text-lg md:text-xl text-foreground/70 group-hover:text-foreground transition-colors duration-300">
                      {skill}
                    </span>
                  </div>
                  
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 2 + index * 0.15 }}
                    className="absolute -bottom-3 left-6 right-0 h-[1px] bg-primary/20 origin-left"
                  />
                </motion.div>
              ))}
            </div>
            
            {/* Visual accent element */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.5, scale: 1 }}
              transition={{ duration: 1.5, delay: 2.2 }}
              style={{ 
                x: useTransform(() => mousePosition.x * 10),
                y: useTransform(() => mousePosition.y * 10),
              }}
              className="mt-24 ml-auto mr-12"
            >
              <div className="w-24 h-24 border border-primary/20 rounded-full relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-primary/40 rounded-full"/>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary/5 rounded-full"/>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-10 right-10 flex flex-col items-center cursor-pointer z-10"
        onClick={scrollToWork}
      >
        <div className="flex items-center mb-2">
          <span className="mr-2 text-xs tracking-widest uppercase text-foreground/40">Scroll</span>
          <div className="w-8 h-[1px] bg-foreground/30"></div>
        </div>
        <motion.div
          animate={{ 
            y: [0, 5, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            ease: "easeInOut",
          }}
        >
          <ChevronDown size={16} className="text-primary/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}