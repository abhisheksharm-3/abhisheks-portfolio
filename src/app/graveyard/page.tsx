"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import PageLayout from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Fun quotes about failure and projects
const inspirationalQuotes = [
  "Every dead project is a stepping stone to success.",
  "Failure is just success in progress.",
  "The only real mistake is the one from which we learn nothing.",
  "Success is stumbling from failure to failure with no loss of enthusiasm.",
  "Every abandoned project brings you one step closer to the one that will succeed."
];

// Custom Tombstone icon since it's not in Lucide
function TombstoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M7 22h10" />
      <path d="M10 22v-6.3a.7.7 0 0 1 .7-.7h2.6a.7.7 0 0 1 .7.7V22" />
      <path d="M17 4v18H7V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2Z" />
      <path d="M11 10h2" />
      <path d="M12 6v4" />
    </svg>
  );
}

// Custom Ghost icon since it's not in Lucide
function GhostIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 10h.01" />
      <path d="M15 10h.01" />
      <path d="M12 20h.01" />
      <path d="M14 16h.01" />
      <path d="M10 16h.01" />
      <path d="M18 8c0-4.4-3.6-8-8-8S2 3.6 2 8v12l3-3 2 2 3-3 2 2 3-3 3 3V8Z" />
    </svg>
  );
}

// Resurrection Meter Component
function ResurrectionMeter({ potential = 0 }: { potential: number }) {
  const color = potential > 50 
    ? "text-green-500" 
    : potential > 25 
      ? "text-amber-500" 
      : "text-red-500";
  
  return (
    <div className="flex flex-col items-start">
      <div className="flex items-center justify-between w-full mb-1">
        <span className="text-xs font-light text-foreground/60">Resurrection Potential</span>
        <span className={`text-xs font-medium ${color}`}>{potential}%</span>
      </div>
      <div className="w-full h-1.5 bg-primary/5 rounded-full overflow-hidden">
        <motion.div 
          className={`h-full ${color}/70`}
          initial={{ width: 0 }}
          animate={{ width: `${potential}%` }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
    </div>
  );
}

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

// Sample data for dead projects
const deadProjects = [
  {
    title: "WebList",
    description: "Useful web tools all in one place - curated & community submitted.",
    reason: "Lack of time and proper planning",
    lessons: "Always acquire domain name first and scope out enough time even for small projects.",
    progress: "35%",
    technologies: ["Next.js", "Appwrite", "TailwindCSS"],
    year: "2025",
    duration: "2 months",
    imageSrc: "/images/graveyard/weblist.png",
    epitaph: "WebList: Died before it could list itself. Jan 2025 - Feb 2025"
  },
  {
    title: "Aventra",
    description: "An AI Powered Trip Planning Platform.",
    reason: "Underestimated complexity and time required",
    lessons: "Ensure the project scope is well defined and manageable within the available time.",
    progress: "60%",
    technologies: ["Next.js", "Appwrite", "FastAPI", "TailwindCSS"],
    year: "2025",
    duration: "2 months",
    imageSrc: "/images/graveyard/aventra.png",
    epitaph: "Aventra: Planned its own final trip. April 2025 - May 2025",
    resurrectionPotential: 60
  }
];

// Fun cause of death messages
const causeOfDeath = [
  "Died of scope creep",
  "Suffocated under technical debt",
  "Fatal API deprecation",
  "Starved of resources",
  "Crushed by competing priorities",
  "Expired due to market changes",
  "Victim of budget cuts"
];

// Project card component
function GraveyardProjectCard({ project, index }: { project: Record<string, any>; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });
  
  // Randomly select a cause of death
  const randomCause = causeOfDeath[Math.floor(Math.random() * causeOfDeath.length)];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: 0.1 + index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-full"
    >
      <Card 
        className={`
          h-full overflow-hidden border-primary/10 backdrop-blur-sm transition-all duration-300 py-0
          ${isHovered ? 'shadow-lg border-primary/20' : 'shadow-md'}
        `}
      >
        {/* Header with tombstone icon */}
        <div className="p-6 pb-0 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md border border-red-500/20 bg-red-500/5">
              <TombstoneIcon className="h-4 w-4 text-red-500/70" strokeWidth={1.5} />
            </div>
            <span className="text-xs text-red-500/70 font-light">Abandoned at {project.progress}</span>
          </div>
          <span className="text-xs text-primary/60 px-2 py-1 border border-primary/10 rounded-md">
            {project.year}
          </span>
        </div>
        
        {/* Image container */}
        <div className="relative w-full h-48 overflow-hidden mt-6">
          <motion.div
            className="w-full h-full"
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src={project.imageSrc}
              alt={project.title}
              fill
              className="object-cover opacity-40 grayscale"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800/40 backdrop-blur-[2px]">
              {isHovered ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center"
                >
                  <GhostIcon className="h-12 w-12 text-white/50 mb-2" strokeWidth={1.5} />
                  <span className="text-white/70 text-xs font-light italic">Boo! I&apos;m still here!</span>
                </motion.div>
              ) : (
                <TombstoneIcon className="h-12 w-12 text-gray-400/50" strokeWidth={1.5} />
              )}
            </div>
          </motion.div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70" />
          
          {/* Tags */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech: string) => (
              <span
                key={tech}
                className="px-2 py-1 bg-black/40 backdrop-blur-sm text-white/90 rounded-md text-xs"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 bg-black/40 backdrop-blur-sm text-white/90 rounded-md text-xs">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-medium mb-2">{project.title}</h3>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "3rem" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-[1px] bg-gradient-to-r from-red-500/30 to-transparent mb-3"
          />
          
          <p className="text-foreground/60 text-sm font-light leading-relaxed mb-4">
            {project.description}
          </p>
          
          {/* Epitaph */}
          <div className="mb-4 p-3 bg-red-500/5 border border-red-500/10 rounded-md">
            <p className="text-center text-xs italic text-foreground/60">
              &quot;{project.epitaph}&quot;
            </p>
          </div>
          
          {/* Project details */}
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-red-500/80 mb-1">Cause of death:</h4>
              <p className="text-foreground/60 text-xs font-light leading-relaxed">
                {randomCause}. {project.reason}
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-amber-500/80 mb-1">Lessons learned:</h4>
              <p className="text-foreground/60 text-xs font-light leading-relaxed">
                {project.lessons}
              </p>
            </div>
            
            {project.resurrectionPotential !== undefined && (
              <div className="pt-2">
                <ResurrectionMeter potential={project.resurrectionPotential} />
              </div>
            )}
            
            <div className="flex items-center text-xs text-foreground/50 pt-2">
              <Calendar className="h-3 w-3 mr-2 text-foreground/30" />
              <span>Lived for {project.duration}</span>
            </div>
          </div>
        </div>
        
        {/* Decorative corner element */}
        <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-px h-12 bg-gradient-to-b from-red-500/20 to-transparent" />
          <div className="absolute top-0 right-0 h-px w-12 bg-gradient-to-l from-red-500/20 to-transparent" />
        </div>
      </Card>
    </motion.div>
  );
}

export default function GraveyardPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [randomQuote, setRandomQuote] = useState("");
  
  // Select a random quote
  const getRandomQuote = () => {
    return inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];
  };

  return (
    <PageLayout activePage="Graveyard">
      <div ref={sectionRef} className="pt-36 pb-24 px-6 sm:px-8 lg:px-32 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Noise texture */}
          <div className="absolute inset-0 z-0 mix-blend-overlay opacity-10">
            <svg className="w-full h-full opacity-20" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <filter id="graveyardNoiseFilter">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#graveyardNoiseFilter)" />
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
          
          {/* Floating ghosts */}
          <div className="absolute inset-0 overflow-hidden">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ 
                  x: `${Math.random() * 100}%`, 
                  y: `${Math.random() * 100}%`,
                  opacity: 0 
                }}
                animate={{ 
                  x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                  y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                  opacity: [0, 0.1, 0, 0.1, 0]
                }}
                transition={{ 
                  duration: 15 + Math.random() * 10,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <GhostIcon 
                  className="text-white/10" 
                  style={{ 
                    width: `${30 + Math.random() * 40}px`,
                    height: `${30 + Math.random() * 40}px`,
                  }} 
                />
              </motion.div>
            ))}
          </div>
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
              className="w-7 h-7 rounded-md border border-red-500/10 flex items-center justify-center mr-3"
            >
              <TombstoneIcon className="w-3 h-3 text-red-500/40" />
            </motion.div>
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xs text-red-500/60 uppercase tracking-wider font-light"
            >
              R.I.P
            </motion.span>
          </div>
          <div className="overflow-visible mb-4">
            <motion.h1 
              initial={{ y: 60, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl sm:text-5xl md:text-6xl font-serif italic leading-relaxed pb-2"
            >
              <div className="py-1">
                <span className="bg-gradient-to-r from-red-500/80 via-red-500/90 to-red-500/70 bg-clip-text text-transparent select-none">
                  The Project Graveyard
                </span>
              </div>
            </motion.h1>
          </div>
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={isInView ? { width: "5rem", opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
            className="h-[1px] bg-gradient-to-r from-red-500/40 to-transparent mt-4"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-foreground/60 max-w-2xl text-sm sm:text-base font-light leading-relaxed mt-6"
          >
            Welcome to the final resting place of projects that never made it to production. 
            They may be gone, but the lessons they taught live on.
          </motion.p>
          
          {/* Random inspirational quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-4 max-w-2xl"
          >
            <blockquote className="italic text-sm text-amber-500/80">
              "{getRandomQuote()}"
            </blockquote>
          </motion.div>
        </motion.div>

        {/* Introduction Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-16"
        >
          <Card className="border-red-500/10 backdrop-blur-sm overflow-hidden py-0 relative">
            <div className="p-8 sm:p-10">
              <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
                <div className="w-full sm:w-1/3">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="w-16 h-16 rounded-md border border-red-500/10 flex items-center justify-center mb-8"
                  >
                    <GhostIcon className="h-8 w-8 text-amber-500/70" strokeWidth={1.25} />
                  </motion.div>
                  
                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-2xl sm:text-3xl font-serif italic mb-6"
                  >
                    Digital Afterlife
                  </motion.h3>
                  
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "3rem" } : {}}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="h-[1px] bg-gradient-to-r from-red-500/30 to-transparent mb-6"
                  />
                </div>
                
                <div className="w-full sm:w-2/3">
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-foreground/60 text-sm sm:text-base font-light leading-relaxed mb-6"
                  >
                    Every developer has a collection of projects that never saw the light of day. 
                    Some were killed by technical challenges, others by shifting priorities, and a few 
                    simply ran out of runway.
                  </motion.p>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="text-foreground/60 text-sm sm:text-base font-light leading-relaxed"
                  >
                    But even in death, these projects have value. Each tombstone represents a lesson learned, 
                    a skill gained, or an insight that informed future work. So pour one out for the fallen 
                    projects — they died so that others might live.
                  </motion.p>
                </div>
              </div>
            </div>
            
            {/* Decorative corner element */}
            <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
              <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-red-500/20 to-transparent" />
              <div className="absolute top-0 right-0 h-px w-16 bg-gradient-to-l from-red-500/20 to-transparent" />
            </div>
          </Card>
        </motion.div>

        {/* Graveyard Projects Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {deadProjects.map((project, index) => (
            <GraveyardProjectCard 
              key={project.title} 
              project={project} 
              index={index} 
            />
          ))}
        </motion.div>

        {/* CTA - Back to Live Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-serif italic mb-4">Prefer the land of the living?</h3>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "8rem" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto mb-8"
          />
          
          <Button 
            size="lg"
            className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8"
            asChild
          >
            <Link href="/projects" className="flex items-center">
              Escape the Graveyard
              <motion.div
                className="ml-2 flex items-center justify-center"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </Link>
          </Button>
        </motion.div>
      </div>
    </PageLayout>
  );
} 