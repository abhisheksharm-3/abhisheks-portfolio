"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Send, ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import { socialLinks } from "@/data/contact";
import { SharedBackground } from "@/components/shared/SharedBackground";

/**
 * Standard section header matching other landing page sections
 */
const SectionHeader = ({ isInView }: { isInView: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 1 }}
    className="flex flex-col mb-16 sm:mb-20 relative z-10"
  >
    <div className="flex items-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
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
        reach out
      </motion.span>
    </div>
    <div className="overflow-visible">
      <motion.h2
        initial={{ y: 60, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-4xl sm:text-5xl md:text-6xl font-serif italic leading-relaxed"
      >
          <span className="bg-gradient-to-r from-primary/80 via-primary/90 to-primary/70 bg-clip-text text-transparent select-none pr-4">
            let&apos;s make cool stuff
          </span>
      </motion.h2>
    </div>
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={isInView ? { width: "5rem", opacity: 1 } : {}}
      transition={{ duration: 1, delay: 0.6 }}
      className="h-[1px] bg-gradient-to-r from-primary/40 to-transparent"
    />
  </motion.div>
);

/**
 * Enhanced CTA buttons with better mobile design
 */
const CTAButtons = ({ isInView }: { isInView: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, delay: 0.8 }}
    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
  >
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        size="lg"
        className="
          group relative bg-primary hover:bg-primary/90 
          text-primary-foreground px-8 py-4 rounded-lg
          shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30
          transition-all duration-300 w-full sm:w-auto
        "
        asChild
      >
        <Link href="/contact">
          <span className="relative z-10">let’s build together</span>
          <Send className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      </Button>
    </motion.div>
    
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        variant="outline"
        size="lg"
        className="
          group border-primary/20 hover:bg-primary/5 hover:border-primary/30 
          px-8 py-4 rounded-lg transition-all duration-300 w-full sm:w-auto
        "
        asChild
      >
        <Link href="/projects">
          things i’ve made
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </Button>
    </motion.div>
  </motion.div>
);

/**
 * Direct contact section with improved mobile layout
 */
const DirectContact = ({ isInView }: { isInView: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, delay: 0.9 }}
    className="relative max-w-4xl mx-auto text-center"
  >
    {/* Subtle divider */}
    <div className="flex items-center justify-center mb-8">
      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent w-24" />
      <span className="px-4 text-xs text-foreground/50 uppercase tracking-wider">or</span>
      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent w-24" />
    </div>

    {/* Direct email contact */}
    <div className="text-center mb-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1 }}
        className="text-foreground/60 text-sm mb-3"
      >
        just email me directly:
      </motion.div>
      
      <motion.a
        href="mailto:abhishek@abhisheksan.com"
        className="
          group inline-flex items-center gap-3 px-6 py-3 
          rounded-lg border border-primary/10 hover:border-primary/20
          bg-background/50 hover:bg-primary/5 backdrop-blur-sm
          transition-all duration-300 text-foreground hover:text-primary
        "
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.1 }}
      >
        <Mail className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
        <span className="font-mono text-sm sm:text-base">abhishek@abhisheksan.com</span>
      </motion.a>
    </div>

    {/* Social links with improved mobile layout */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 1.2 }}
      className="flex flex-wrap items-center justify-center gap-4"
    >
      {socialLinks.map((link, index) => (
        <motion.a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="
            group flex items-center gap-2 px-4 py-2 
            rounded-lg border border-primary/10 hover:border-primary/20
            bg-background/30 hover:bg-primary/5 backdrop-blur-sm
            transition-all duration-300 text-foreground/70 hover:text-primary
            text-sm
          "
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 1.3 + index * 0.1 }}
        >
          <span className="group-hover:scale-110 transition-transform duration-200">
            {link.icon}
          </span>
          <span className="font-light">{link.label}</span>
        </motion.a>
      ))}
    </motion.div>
  </motion.div>
);

/**
 * The main Contact CTA component with standard landing page format
 */
export const ContactCTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.01 });

  return (
    <section
      ref={sectionRef}
      className="py-36 sm:py-44 relative overflow-hidden"
    >
      <SharedBackground isInView={isInView} noiseFilterId="contactCTANoiseFilter" />
      
      <div className="container mx-auto px-6 sm:px-8 lg:px-16 relative z-10">
        <SectionHeader isInView={isInView} />
        
        <div className="max-w-6xl mx-auto">
          {/* Content description comes first */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center mb-12"
          >
            <p className="text-foreground/70 text-lg max-w-3xl mx-auto leading-relaxed">
              i&apos;m down for fun projects and cool full-time gigs. got an idea, a product to push, or a messy problem? let&apos;s jam and make it real.
            </p>
          </motion.div>

          {/* Then the CTA buttons */}
          <CTAButtons isInView={isInView} />
          
          {/* Finally the direct contact options */}
          <DirectContact isInView={isInView} />
        </div>
      </div>
    </section>
  );
};
