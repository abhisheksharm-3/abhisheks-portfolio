"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { SpinningText } from "@/components/magicui/spinning-text";
import { Card } from "@/components/ui/card";

// Abstract SVG paths for decorative elements
function AbstractPath({ className, pathD }: { className?: string; pathD?: string }) {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className={className}>
      <motion.path
        d={pathD || "M30,20 Q50,10 70,30 T90,50"}
        stroke="currentColor"
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
    </svg>
  );
}

export function Philosophy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
  // Subtle parallax effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section 
      ref={sectionRef}
      className="py-28 sm:py-36 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Noise texture matching hero component */}
        <div className="absolute inset-0 z-0 mix-blend-overlay opacity-10">
          <svg className="w-full h-full opacity-20" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <filter id="philosophyNoiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#philosophyNoiseFilter)" />
          </svg>
        </div>
        
        {/* Asymmetrical grid lines matching hero component */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 bottom-0 w-[1px] bg-primary/30" style={{ left: '13%' }} />
          <div className="absolute top-0 bottom-0 w-[1px] bg-primary/10" style={{ left: '28%' }} />
          <div className="absolute top-0 bottom-0 w-[1px] bg-primary/20" style={{ left: '67%' }} />
          <div className="absolute top-0 bottom-0 w-[1px] bg-primary/15" style={{ left: '89%' }} />
          
          <div className="absolute left-0 right-0 h-[1px] bg-primary/25" style={{ top: '22%' }} />
          <div className="absolute left-0 right-0 h-[1px] bg-primary/10" style={{ top: '58%' }} />
          <div className="absolute left-0 right-0 h-[1px] bg-primary/20" style={{ top: '81%' }} />
        </div>

        {/* Abstract SVG paths */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute left-[5%] top-[15%] text-primary/8"
        >
          <AbstractPath pathD="M10,30 C20,50 40,10 50,40 S80,20 90,40" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute right-[10%] bottom-[20%] rotate-180 text-primary/8"
        >
          <AbstractPath pathD="M10,50 Q40,20 50,50 T90,30" />
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header matching other sections */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="flex flex-col mb-16 sm:mb-20 relative z-10"
        >
          <div className="flex items-center mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-7 h-7 rounded-md border border-primary/10 flex items-center justify-center mr-3"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
            </motion.div>
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xs text-primary/60 uppercase tracking-wider font-light"
            >
              Philosophy
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.h2 
              initial={{ y: 60 }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl sm:text-5xl md:text-6xl font-serif italic leading-none"
            >
              <span className="bg-gradient-to-r from-primary/80 via-primary/90 to-primary/70 bg-clip-text text-transparent select-none">
                Development Approach
              </span>
            </motion.h2>
          </div>
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={isInView ? { width: "5rem", opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
            className="h-[1px] bg-gradient-to-r from-primary/40 to-transparent mt-4"
          />
        </motion.div>

        {/* Main content card */}
        <Card className="border-primary/10 backdrop-blur-sm overflow-hidden py-0 mb-12 relative max-w-4xl mx-auto">
          <div className="p-8 sm:p-10">
            {/* Spinning text with improved container */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1 }}
              className="relative inline-block mb-10"
            >
              <SpinningText className="opacity-70 text-sm">clean code • user experience • performance • accessibility • </SpinningText>
            </motion.div>
            
            {/* Enhanced quote with better typography */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <blockquote className="text-2xl sm:text-3xl md:text-4xl font-serif italic leading-relaxed mb-10 px-4">
                <span className="bg-gradient-to-r from-foreground/90 via-foreground/80 to-foreground/70 bg-clip-text text-transparent">
                  &quot;Good code is as much about the user experience as it is about technical excellence.&quot;
                </span>
              </blockquote>
            </motion.div>
            
            {/* Improved decorative divider */}
            <div className="flex items-center justify-center mb-8">
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: 60 } : {}}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"
              ></motion.div>
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="w-2 h-2 rounded-full border border-primary/30 mx-2"
              ></motion.div>
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: 60 } : {}}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="h-[1px] bg-gradient-to-l from-transparent via-primary/40 to-transparent"
              ></motion.div>
            </div>
            
            {/* Philosophy description */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.7 }}
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
          </div>
          
          {/* Decorative corner element */}
          <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
            <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-primary/20 to-transparent" />
            <div className="absolute top-0 right-0 h-px w-16 bg-gradient-to-l from-primary/20 to-transparent" />
          </div>
        </Card>
      </div>
    </section>
  );
}