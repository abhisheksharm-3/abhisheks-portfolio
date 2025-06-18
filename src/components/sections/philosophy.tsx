"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { SpinningText } from "@/components/magicui/spinning-text";

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
      className="py-20 sm:py-32 relative overflow-hidden"
    >
      {/* Enhanced background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div style={{ y: y1 }} className="absolute top-[15%] left-[8%] w-72 h-72 border border-primary/10 rounded-full opacity-20" />
        <motion.div style={{ y: y2 }} className="absolute bottom-[25%] right-[5%] w-56 h-56 border border-primary/10 rounded-full opacity-15" />
        <motion.div style={{ y: y3 }} className="absolute top-[60%] left-[25%] w-40 h-40 border border-primary/8 rounded-full opacity-10" />
        
        {/* Subtle grid lines */}
        <div className="absolute inset-0 grid grid-cols-4 opacity-5">
          <div className="border-r border-primary/20"></div>
          <div className="border-r border-primary/20"></div>
          <div className="border-r border-primary/20"></div>
          <div></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        {/* Spinning text with improved container */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="relative inline-block mb-10"
        >
          {/* Decorative halo behind spinning text */}
          <div className="absolute -inset-3 bg-primary/5 rounded-full blur-md -z-10"></div>
          
          <SpinningText className="opacity-70 text-sm">code quality • user experience • performance • </SpinningText>
        </motion.div>
        
        {/* Enhanced quote with better typography */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
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
        
        {/* Philosophy attribution with enhanced styling */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="inline-block"
        >
          <p className="text-foreground/50 font-light text-sm tracking-wide border-b border-primary/10 pb-1 px-4">
            My development philosophy
          </p>
        </motion.div>
      </div>
    </section>
  );
}