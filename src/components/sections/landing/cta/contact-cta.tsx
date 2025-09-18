"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Briefcase } from "lucide-react";
import {
  SectionHeader,
  BackgroundIcons,
  CallToActionButtons,
  ContactChannels,
} from "./cta-components";
import { SharedBackground } from "@/components/shared/SharedBackground";

/**
 * Sophisticated floating orbs for ambient decoration
 */
const FloatingOrbs = ({ isInView }: { isInView: boolean }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { 
          opacity: [0, 0.4, 0.2, 0.6, 0.3],
          scale: [0, 1.2, 0.8, 1.4, 1],
          x: [0, 30, -20, 40, -10],
          y: [0, -40, 20, -30, 10]
        } : {}}
        transition={{
          duration: 8,
          delay: i * 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={`absolute w-32 h-32 rounded-full blur-3xl ${
          i === 0 ? 'bg-primary/20 top-1/4 left-1/4' :
          i === 1 ? 'bg-primary/15 top-3/4 right-1/4' :
          'bg-primary/10 bottom-1/4 left-3/4'
        }`}
      />
    ))}
  </div>
);

/**
 * Premium mesh gradient background
 */
const MeshGradient = ({ isHovering }: { isHovering: boolean }) => (
  <motion.div
    animate={{
      opacity: isHovering ? 0.8 : 0.5,
      scale: isHovering ? 1.02 : 1,
    }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="absolute inset-0 opacity-30"
    style={{
      background: `
        radial-gradient(circle at 20% 30%, hsl(var(--primary) / 0.15) 0%, transparent 40%),
        radial-gradient(circle at 80% 20%, hsl(var(--primary) / 0.1) 0%, transparent 35%),
        radial-gradient(circle at 40% 80%, hsl(var(--primary) / 0.08) 0%, transparent 45%),
        radial-gradient(circle at 90% 70%, hsl(var(--primary) / 0.05) 0%, transparent 30%),
        linear-gradient(135deg, transparent 20%, hsl(var(--primary) / 0.03) 40%, transparent 70%)
      `,
    }}
  />
);

/**
 * Enhanced glass morphism with better depth
 */
const SuperiorGlass = ({ isHovering }: { isHovering: boolean }) => (
  <>
    {/* Main glass layer */}
    <motion.div
      animate={{
        opacity: isHovering ? 0.95 : 0.85,
        scale: isHovering ? 1.005 : 1,
      }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="absolute inset-0 bg-background/60 backdrop-blur-2xl rounded-3xl border border-primary/[0.12] shadow-2xl shadow-primary/[0.08]"
    />
    
    {/* Inner glass highlight */}
    <div className="absolute inset-[1px] bg-gradient-to-b from-primary/[0.08] via-transparent to-transparent rounded-[23px] pointer-events-none" />
    
    {/* Edge glow */}
    <motion.div
      animate={{
        opacity: isHovering ? 0.6 : 0.3,
      }}
      transition={{ duration: 0.4 }}
      className="absolute -inset-px bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-3xl blur-sm -z-10"
    />
  </>
);

/**
 * Sophisticated shimmer effect
 */
const ShimmerEffect = ({ isInView }: { isInView: boolean }) => (
  <motion.div
    initial={{ x: '-100%', opacity: 0 }}
    animate={isInView ? { x: '200%', opacity: [0, 1, 0] } : {}}
    transition={{
      duration: 3,
      delay: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 8
    }}
    className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent skew-x-12 pointer-events-none"
  />
);

/**
 * Enhanced corner accent with sophistication
 */
const PremiumCornerAccent = () => (
  <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
    {/* Main accent lines */}
    <div className="absolute top-0 right-0 w-px h-24 bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />
    <div className="absolute top-0 right-0 h-px w-24 bg-gradient-to-l from-primary/40 via-primary/20 to-transparent" />
    
    {/* Decorative elements */}
    <motion.div 
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary/20 blur-md"
    />
    <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary/30" />
    
    {/* Corner gradient */}
    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/10 via-primary/5 to-transparent" />
  </div>
);

/**
 * Enhanced email link with premium styling
 */
const PremiumEmailLink = ({ isInView }: { isInView: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{
      duration: 0.6,
      delay: 1.4,
      ease: "easeOut"
    }}
    className="mt-20 relative"
  >
    <div className="flex items-center justify-center gap-4 flex-wrap">
      <span className="text-foreground/60 font-light tracking-wide">
        Prefer straight to inbox?
      </span>
      <div className="relative group">
        <motion.a
          href="mailto:abhishek@abhisheksan.com"
          className="relative px-4 py-2 text-primary font-medium tracking-wide rounded-xl transition-all duration-300 hover:text-primary/90"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10">abhishek@abhisheksan.com</span>
          
          {/* Hover background */}
          <div className="absolute inset-0 bg-primary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Animated underline */}
          <motion.div
            className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
            initial={{ width: '0%' }}
            whileHover={{ width: '100%' }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-primary/10 rounded-xl blur-lg opacity-0 group-hover:opacity-70 transition-opacity duration-300 -z-10" />
        </motion.a>
      </div>
    </div>
  </motion.div>
);

/**
 * The main component for the Contact Call-to-Action section.
 * Fully polished with premium aesthetics and sophisticated details.
 */
export const ContactCTA = () => {
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.01 });

  return (
    <section
      ref={sectionRef}
      className="py-36 sm:py-44 relative overflow-hidden"
    >
      <SharedBackground isInView={isInView} noiseFilterId="contactCTANoiseFilter" />

      <div className="container mx-auto px-8 relative z-10">
        <SectionHeader isInView={isInView} />

        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ 
            duration: 1,
            delay: 0.3,
            ease: [0.21, 0.47, 0.32, 0.98]
          }}
          className="max-w-6xl mx-auto"
        >
          <div 
            className="relative group perspective-1000"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Enhanced Prism Background */}
            {/* TODO:Fix the performance issues due to this bg */}
            {/* <div className="absolute inset-0 rounded-3xl overflow-hidden opacity-40">
              <Prism 
                animationType="rotate" 
                timeScale={0.2} 
                height={2.5} 
                baseWidth={4} 
                scale={2.5} 
                hueShift={10} 
                colorFrequency={0.6} 
                noise={0.2} 
                glow={0.8}
              />
            </div> */}

            <FloatingOrbs isInView={isInView} />
            <MeshGradient isHovering={isHovering} />

            {/* Main Card Container */}
            <Card className="border-0 bg-transparent shadow-none relative overflow-hidden">
              <SuperiorGlass isHovering={isHovering} />
              <ShimmerEffect isInView={isInView} />
              
              <div className="relative z-30 p-16 sm:p-20 md:p-24 text-center">
                <BackgroundIcons isHovering={isHovering} />

                <div className="relative z-40 max-w-4xl mx-auto">
                  {/* Enhanced Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.8,
                      delay: 0.7,
                      ease: "easeOut"
                    }}
                    className="space-y-8 mb-20"
                  >
                    <motion.p 
                      className="text-foreground/85 text-lg sm:text-xl font-light leading-relaxed tracking-wide max-w-3xl mx-auto"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      I&apos;m open to select projects and exciting{" "}
                      <motion.span 
                        className="relative inline-flex items-center gap-3 px-5 py-2 rounded-2xl bg-primary/8 border border-primary/20 text-primary font-medium backdrop-blur-sm"
                        whileHover={{ 
                          scale: 1.05,
                          backgroundColor: "hsl(var(--primary) / 0.12)",
                          y: -2
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <Briefcase className="h-4 w-4" /> 
                        full-time opportunities
                        
                        {/* Subtle glow */}
                        <div className="absolute inset-0 bg-primary/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                      </motion.span>
                      . If you&apos;ve got an idea to build, a product to scale, or a
                      problem that needs solving — let&apos;s make it happen together.
                    </motion.p>
                  </motion.div>

                  <CallToActionButtons isInView={isInView} />
                  <PremiumEmailLink isInView={isInView} />
                </div>

                <ContactChannels isInView={isInView} />
              </div>
              
              <PremiumCornerAccent />
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
};