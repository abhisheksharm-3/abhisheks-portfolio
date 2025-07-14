"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, MessageCircle, Send, Code, ExternalLink, Briefcase } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { AnimatedPathProps } from "@/lib/types";

// Animation timing configuration for consistent experience
const ANIMATION_CONFIG = {
  section: { duration: 1 },
  header: { duration: 0.8, delay: 0.4 },
  content: { duration: 0.8, delay: 0.3 },
  buttons: { duration: 0.5, delay: 0.6 },
  contactInfo: { duration: 0.8, delay: 0.9 },
  channels: { duration: 0.8, delay: 1 },
  channelItem: { duration: 0.5, baseDelay: 1.1, stagger: 0.1 },
  pathAnimation: { duration: 2, delay: 0.5 },
  hoverTransition: { duration: 0.8 }
} as const;

// Grid positioning constants for consistent layout
const GRID_POSITIONS = {
  vertical: ['13%', '28%', '67%', '89%'],
  horizontal: ['22%', '58%', '81%'],
  opacity: [30, 10, 20, 15, 25, 10, 20]
} as const;

// SVG path definitions for decorative elements
const SVG_PATHS = {
  flowing: "M10,30 C20,50 40,10 50,40 S80,20 90,40",
  curved: "M10,50 Q40,20 50,50 T90,30",
  default: "M30,20 Q50,10 70,30 T90,50"
} as const;

// Contact channels configuration
const CONTACT_CHANNELS = [
  { 
    icon: <Mail className="h-4 w-4" />, 
    label: "Email", 
    value: "abhitiku2003@gmail.com",
    href: "mailto:abhitiku2003@gmail.com"
  },
  { 
    icon: <Code className="h-4 w-4" />, 
    label: "GitHub", 
    value: "abhisheksharm-3",
    href: "https://github.com/abhisheksharm-3"
  },
  { 
    icon: <ExternalLink className="h-4 w-4" />, 
    label: "Website", 
    value: "abhisheksharma.tech",
    href: "https://abhisheksharma.tech"
  }
] as const;

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
    <div className="absolute inset-0 z-0 mix-blend-overlay opacity-10">
      <svg className="w-full h-full opacity-20" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <filter id="contactNoiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#contactNoiseFilter)" />
      </svg>
    </div>
  );
}

function AsymmetricalGrid() {
  return (
    <div className="absolute inset-0 opacity-5">
      {/* Vertical grid lines with asymmetric positioning */}
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
      
      {/* Horizontal grid lines for visual rhythm */}
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
      {/* Left decorative path with staggered reveal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute left-[5%] top-[15%] text-primary/8"
      >
        <AnimatedPath pathD={SVG_PATHS.flowing} delay={0.6} />
      </motion.div>
      
      {/* Right decorative path with rotation and delayed animation */}
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
      className="flex flex-col mb-16 sm:mb-20 relative z-10 "
    >
      <div className="flex items-center mb-4">
        {/* Animated section indicator */}
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
          Contact
        </motion.span>
      </div>
      
      {/* Main heading with gradient text effect */}
      <div className="overflow-hidden">
        <motion.h2 
          initial={{ y: 60 }}
          animate={isInView ? { y: 0 } : {}}
          transition={{ duration: ANIMATION_CONFIG.header.duration, delay: ANIMATION_CONFIG.header.delay }}
          className="text-4xl sm:text-5xl md:text-6xl font-serif italic leading-none"
        >
          <span className="bg-gradient-to-r from-primary/80 via-primary/90 to-primary/70 bg-clip-text text-transparent select-none">
            Let&apos;s Collaborate
          </span>
        </motion.h2>
      </div>
      
      {/* Animated accent line */}
      <motion.div 
        initial={{ width: 0, opacity: 0 }}
        animate={isInView ? { width: "5rem", opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.6 }}
        className="h-[1px] bg-gradient-to-r from-primary/40 to-transparent mt-4"
      />
    </motion.div>
  );
}

interface BackgroundIconsProps {
  isHovering: boolean;
}

function BackgroundIcons({ isHovering }: BackgroundIconsProps) {
  return (
    <>
      {/* Mail icon with hover-responsive animation */}
      <motion.div
        animate={{ 
          scale: isHovering ? 1.1 : 1,
          rotate: isHovering ? 5 : 0
        }}
        transition={{ duration: 0.6 }}
        className="absolute top-10 left-10 opacity-10"
      >
        <Mail className="w-24 h-24 text-primary" strokeWidth={1} />
      </motion.div>
      
      {/* Message icon with different hover animation */}
      <motion.div
        animate={{ 
          scale: isHovering ? 1.05 : 1,
          rotate: isHovering ? -3 : 0
        }}
        transition={{ duration: 0.7 }}
        className="absolute bottom-10 right-10 opacity-10"
      >
        <MessageCircle className="w-20 h-20 text-primary" strokeWidth={1} />
      </motion.div>
    </>
  );
}

interface CallToActionButtonsProps {
  isInView: boolean;
}

function CallToActionButtons({ isInView }: CallToActionButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
      {/* Primary CTA button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: ANIMATION_CONFIG.buttons.duration, delay: ANIMATION_CONFIG.buttons.delay }}
      >
        <Button 
          size="lg"
          className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 shadow-sm shadow-primary/20"
          asChild
        >
          <Link href="/contact">
            Start a conversation
            <Send className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </Button>
      </motion.div>
      
      {/* Secondary CTA button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: ANIMATION_CONFIG.buttons.duration, delay: ANIMATION_CONFIG.buttons.delay + 0.1 }}
      >
        <Button 
          variant="outline"
          size="lg"
          className="group border-primary/20 hover:bg-primary/5 hover:border-primary/30 px-8 py-6"
          asChild
        >
          <Link href="/projects">
            View my work
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Button>
      </motion.div>
    </div>
  );
}

interface ContactChannelsProps {
  isInView: boolean;
}

function ContactChannels({ isInView }: ContactChannelsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: ANIMATION_CONFIG.channels.duration, delay: ANIMATION_CONFIG.channels.delay }}
      className="mt-16 pt-8 border-t border-primary/10 flex flex-wrap justify-center gap-6"
    >
      {CONTACT_CHANNELS.map((channel, index) => (
        <motion.a
          key={channel.label}
          href={channel.href}
          target={channel.href.startsWith('http') ? '_blank' : undefined}
          rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: ANIMATION_CONFIG.channelItem.duration, 
            delay: ANIMATION_CONFIG.channelItem.baseDelay + index * ANIMATION_CONFIG.channelItem.stagger 
          }}
          className="flex items-center gap-2 text-foreground/60 text-xs hover:text-foreground/80 transition-colors duration-300"
        >
          <div className="p-1.5 rounded-md border border-primary/10 bg-primary/5">
            {channel.icon}
          </div>
          <div>
            <span className="text-foreground/40 block mb-0.5">{channel.label}</span>
            <span className="text-foreground/80">{channel.value}</span>
          </div>
        </motion.a>
      ))}
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

export function ContactCTA() {
  const [isHovering, setIsHovering] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  // Modified to make content visible without scrolling
  const isInView = useInView(sectionRef, { once: true, amount: 0.01 });

  return (
    <section 
      ref={sectionRef} 
      className="py-28 sm:py-36 relative overflow-hidden"
    >
      {/* Layered background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <NoiseTexture />
        <AsymmetricalGrid />
        <DecorativePaths isInView={isInView} />
      </div>

      <div className="container mx-auto px-8 relative z-10">
        <SectionHeader isInView={isInView} />

        {/* Interactive main content card */}
        <Card 
          className="border-primary/10 backdrop-blur-sm overflow-hidden py-0 mb-12 relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="p-8 sm:p-10 md:p-16 text-center relative">
            {/* Dynamic background glow that responds to hover */}
            <motion.div
              animate={{
                opacity: isHovering ? 0.15 : 0.05,
                scale: isHovering ? 1.05 : 1,
              }}
              transition={{ duration: ANIMATION_CONFIG.hoverTransition.duration }}
              className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-2xl blur-2xl -z-10"
            />

            <BackgroundIcons isHovering={isHovering} />

            {/* Main content area */}
            <div className="relative z-10">
              {/* Availability and collaboration message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: ANIMATION_CONFIG.content.duration, delay: ANIMATION_CONFIG.content.delay }}
                className="space-y-4 max-w-xl mx-auto mb-12"
              >
                <p className="text-foreground/70 text-sm sm:text-base font-light leading-relaxed">
                  I&apos;m currently available for select projects and{" "}
                  <span className="text-primary/80 font-medium inline-flex items-center gap-1">
                    <Briefcase className="h-4 w-4" />
                    full-time opportunities
                  </span>
                  . If you have a technical challenge that needs solving or a digital product that needs building, I&apos;d love to discuss how we can work together.
                </p>
              </motion.div>
              
              <CallToActionButtons isInView={isInView} />
              
              {/* Direct contact information */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: ANIMATION_CONFIG.contactInfo.duration, delay: ANIMATION_CONFIG.contactInfo.delay }}
                className="mt-12 text-sm text-foreground/50 font-light"
              >
                Or reach me directly at{" "}
                <a 
                  href="mailto:abhitiku2003@gmail.com" 
                  className="text-primary/70 hover:text-primary transition-colors duration-300 underline underline-offset-4 decoration-primary/30"
                >
                  abhitiku2003@gmail.com
                </a>
              </motion.div>
            </div>

            <ContactChannels isInView={isInView} />
          </div>
          
          <CardCornerAccent />
        </Card>
      </div>
    </section>
  );
}