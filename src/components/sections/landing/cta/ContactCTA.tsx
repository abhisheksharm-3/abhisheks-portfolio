// src/components/sections/landing/cta/ContactCTA.tsx

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Send, ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import { SOCIAL_LINKS } from "@/data/contact";
import { SharedBackground } from "@/components/shared/SharedBackground";
import { SectionHeader } from "@/components/shared/SectionHeader";
import {
  getSectionClasses,
  SPACING_STANDARDS,
} from "@/lib/config/spacing-standards";

/**
 * Renders the primary and secondary call-to-action buttons for the section.
 * @param {{ isInView: boolean }} props - Controls when the animation should trigger.
 */
const CTAButtons = ({ isInView }: { isInView: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, delay: 0.8 }}
    className={`flex flex-col sm:flex-row items-center justify-center ${SPACING_STANDARDS.GRID.GAP_MEDIUM} ${SPACING_STANDARDS.CONTENT.SECTION_SPACING}`}
  >
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Button
        size="lg"
        className={cn(
          "group relative bg-primary hover:bg-primary/90 text-primary-foreground",
          "px-8 py-4 rounded-lg shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30",
          "transition-all duration-300 w-full sm:w-auto",
        )}
        asChild
      >
        <Link href="/contact">
          <span className="relative z-10">let’s build together</span>
          <Send className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </Link>
      </Button>
    </motion.div>

    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Button
        variant="outline"
        size="lg"
        className={cn(
          "group border-primary/20 hover:bg-primary/5 hover:border-primary/30",
          "px-8 py-4 rounded-lg transition-all duration-300 w-full sm:w-auto",
        )}
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
 * Renders the direct email and social media contact options.
 * @param {{ isInView: boolean }} props - Controls when the animation should trigger.
 */
const DirectContact = ({ isInView }: { isInView: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.6, delay: 0.9 }}
    className="relative max-w-4xl mx-auto text-center"
  >
    <div
      className={`flex items-center justify-center ${SPACING_STANDARDS.CONTENT.PARAGRAPH_SPACING}`}
    >
      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent w-24" />
      <span className="px-4 text-xs text-foreground/50 uppercase tracking-wider">
        or
      </span>
      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent w-24" />
    </div>

    <div className={`text-center ${SPACING_STANDARDS.CONTENT.SECTION_SPACING}`}>
      <motion.p
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1 }}
        className={`text-foreground/60 text-sm ${SPACING_STANDARDS.CONTENT.SMALL_SPACING}`}
      >
        just email me directly:
      </motion.p>

      <motion.a
        href="mailto:abhishek@abhisheksan.com"
        className={cn(
          "group inline-flex items-center gap-3 px-6 py-3",
          "rounded-lg border border-primary/10 hover:border-primary/20",
          "bg-background/50 hover:bg-primary/5 backdrop-blur-sm",
          "transition-all duration-300 text-foreground hover:text-primary",
        )}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.1 }}
      >
        <Mail className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
        <span className="font-mono text-sm sm:text-base">
          abhishek@abhisheksan.com
        </span>
      </motion.a>
    </div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 1.2 }}
      className={`flex flex-wrap items-center justify-center ${SPACING_STANDARDS.GRID.GAP_MEDIUM}`}
    >
      {SOCIAL_LINKS.map((link, index) => (
        <motion.a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "group flex items-center gap-2 px-4 py-2 text-sm",
            "rounded-lg border border-primary/10 hover:border-primary/20",
            "bg-background/30 hover:bg-primary/5 backdrop-blur-sm",
            "transition-all duration-300 text-foreground/70 hover:text-primary",
          )}
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 1.3 + index * 0.1 }}
        >
          <span className="group-hover:scale-110 transition-transform duration-200">
            <link.icon className="h-4 w-4" />
          </span>
          <span className="font-light">{link.label}</span>
        </motion.a>
      ))}
    </motion.div>
  </motion.div>
);

/**
 * The main component for the Contact Call-to-Action section.
 */
export const ContactCTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.01 });

  return (
    <section ref={sectionRef} className={getSectionClasses()}>
      <SharedBackground
        isInView={isInView}
        noiseFilterId="contactCTANoiseFilter"
      />

      <div
        className={`container mx-auto ${SPACING_STANDARDS.PAGE.CONTAINER_PADDING} relative z-10`}
      >
        <SectionHeader subtitle="reach out" isInView={isInView}>
          <span className="font-serif italic bg-gradient-to-r from-primary/80 via-primary/90 to-primary/70 bg-clip-text text-transparent select-none pr-4">
            let&apos;s make cool stuff
          </span>
        </SectionHeader>

        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className={`text-center ${SPACING_STANDARDS.CONTENT.SECTION_SPACING}`}
          >
            <p className="text-foreground/70 text-lg max-w-3xl mx-auto leading-relaxed">
              i&apos;m down for fun projects and cool full-time gigs. got an
              idea, a product to push, or a messy problem? let&apos;s jam and
              make it real.
            </p>
          </motion.div>

          <CTAButtons isInView={isInView} />

          <DirectContact isInView={isInView} />
        </div>
      </div>
    </section>
  );
};
