"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PageLayout from "@/components/layout/page-layout";
import AbstractPath from "@/components/shared/AbstractPath";
import BioCard from "@/components/sections/about/BioCard";
import ContactCard from "@/components/sections/about/ContactCard";
import ExperienceEducationSection from "@/components/sections/about/ExperienceEducationSection";
import SkillsSection from "@/components/sections/about/SkillsSection";
import InterestsSection from "@/components/sections/about/InterestsSection";
export default function AboutPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.01 });

  return (
    <PageLayout activePage="About">
      <div className="pt-24 px-6 sm:px-8 lg:px-32">
        <section 
          ref={sectionRef}
          className="py-36 sm:py-44 relative overflow-hidden"
        >
          {/* Background elements */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Noise texture */}
            <div className="absolute inset-0 z-0 mix-blend-overlay opacity-10">
              <svg className="w-full h-full opacity-20" viewBox="0 0 200 200">
                <filter id="noiseFilter">
                  <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
              </svg>
            </div>
            {/* Asymmetrical grid lines */}
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
          {/* Section header */}
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
                About Me
              </motion.span>
            </div>
            <div className="overflow-visible mb-4">
              <motion.h2 
                initial={{ y: 60, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-4xl sm:text-5xl md:text-6xl font-serif italic leading-relaxed pb-2"
              >
                <div className="py-1">
                  <span className="bg-gradient-to-r from-primary/80 via-primary/90 to-primary/70 bg-clip-text text-transparent select-none">
                    Abhishek Sharma
                  </span>
                </div>
              </motion.h2>
            </div>
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={isInView ? { width: "5rem", opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.6 }}
              className="h-[1px] bg-gradient-to-r from-primary/40 to-transparent mt-4"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-foreground/60 max-w-2xl text-sm sm:text-base font-light leading-relaxed mt-6"
            >
              CS Graduate & Tech Enthusiast with a passion for building impactful digital solutions. 
              I transform ideas into elegant, functional applications that solve real problems. 
              Currently exploring the exciting intersection of mobile development and AI while 
              pursuing my degree in Computer Science (CGPA: 8.31).
            </motion.p>
          </motion.div>
          {/* Bio & Contact Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="md:col-span-2"
            >
              <BioCard />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <ContactCard />
            </motion.div>
          </div>
          {/* Experience & Education */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mb-20"
          >
            <ExperienceEducationSection />
          </motion.div>
          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-20"
          >
            <SkillsSection isInView={isInView} />
          </motion.div>
          {/* Personal Interests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mb-20"
          >
            <InterestsSection isInView={isInView} />
          </motion.div>
          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.1, duration: 1.2 }}
            className="flex justify-center"
          >
            <Button
              variant="outline"
              size="lg"
              className="group border-primary/10 text-base px-8 py-6 rounded-xl hover:bg-primary/5 transition-colors relative overflow-hidden"
              asChild
            >
              <Link href="/projects" className="flex items-center">
                <motion.span 
                  className="font-medium tracking-wide relative z-10"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  View my projects
                </motion.span>
                <motion.div
                  className="ml-3 h-6 w-6 rounded-full border border-primary/20 flex items-center justify-center relative z-10 group-hover:border-primary/40 transition-colors duration-300"
                  whileHover={{ rotate: 45 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="h-3 w-3 text-primary/70 group-hover:text-primary/90 transition-colors duration-300" />
                </motion.div>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.5 }}
                />
                {/* Subtle decorative elements */}
                <div className="absolute -bottom-2 -left-2 w-8 h-8 opacity-10 pointer-events-none">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 opacity-10 pointer-events-none">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
                  </svg>
                </div>
              </Link>
            </Button>
          </motion.div>
        </section>
      </div>
    </PageLayout>
  );
}