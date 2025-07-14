"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, ExternalLink, Code2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { featuredProjects } from "@/data/project";
import { Project, ProjectCardProps, ProjectsProps } from "@/lib/types";

// Animation configuration constants
const ANIMATION_DELAYS = {
  SECTION_HEADER: 0,
  CARD_BASE: 0.2,
  CARD_STAGGER: 0.18,
  CTA: 1.1,
} as const;

const ANIMATION_DURATIONS = {
  FADE_IN: 0.8,
  HOVER_TRANSITION: 0.5,
  SCALE_TRANSITION: 0.7,
} as const;

// Reusable animated SVG path component for decorative elements
function AnimatedSVGPath({ className, pathData }: { className?: string; pathData?: string }) {
  const defaultPath = "M30,20 Q50,10 70,30 T90,50";
  
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className={className}>
      <motion.path
        d={pathData || defaultPath}
        stroke="currentColor"
        strokeWidth="0.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
    </svg>
  );
}

// Background decorative elements separated for better organization
function BackgroundDecorations({ isInView }: { isInView: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <NoiseTexture />
      <GridOverlay />
      <DecorativePatterns isInView={isInView} />
    </div>
  );
}

// Noise texture overlay for visual depth
function NoiseTexture() {
  return (
    <div className="absolute inset-0 z-0 mix-blend-overlay opacity-10">
      <svg className="w-full h-full opacity-20" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}

// Asymmetrical grid overlay matching hero design
function GridOverlay() {
  const verticalLines = [
    { position: '13%', opacity: 'opacity-30' },
    { position: '28%', opacity: 'opacity-10' },
    { position: '67%', opacity: 'opacity-20' },
    { position: '89%', opacity: 'opacity-15' },
  ];

  const horizontalLines = [
    { position: '22%', opacity: 'opacity-25' },
    { position: '58%', opacity: 'opacity-10' },
    { position: '81%', opacity: 'opacity-20' },
  ];

  return (
    <div className="absolute inset-0 opacity-5">
      {verticalLines.map((line, index) => (
        <div
          key={`v-${index}`}
          className={`absolute top-0 bottom-0 w-[1px] bg-primary/${line.opacity.split('-')[1]}`}
          style={{ left: line.position }}
        />
      ))}
      {horizontalLines.map((line, index) => (
        <div
          key={`h-${index}`}
          className={`absolute left-0 right-0 h-[1px] bg-primary/${line.opacity.split('-')[1]}`}
          style={{ top: line.position }}
        />
      ))}
    </div>
  );
}

// Animated decorative SVG patterns
function DecorativePatterns({ isInView }: { isInView: boolean }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute left-[5%] top-[15%] text-primary/8"
      >
        <AnimatedSVGPath pathData="M10,30 C20,50 40,10 50,40 S80,20 90,40" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute right-[10%] bottom-[20%] rotate-180 text-primary/8"
      >
        <AnimatedSVGPath pathData="M10,50 Q40,20 50,50 T90,30" />
      </motion.div>
    </>
  );
}

// Section header with title and navigation
function SectionHeader({ headline, isInView }: { headline: string; isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1 }}
      className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 sm:mb-20 relative z-10"
    >
      <HeaderContent headline={headline} isInView={isInView} />
      <ViewAllLink isInView={isInView} />
    </motion.div>
  );
}

// Left side of section header with title and decorative elements
function HeaderContent({ headline, isInView }: { headline: string; isInView: boolean }) {
  return (
    <div>
      <SectionBadge isInView={isInView} />
      <div className="overflow-visible mb-4">
        <motion.h2 
          initial={{ y: 60, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-6xl font-serif italic leading-relaxed pb-2"
        >
          <div className="py-1">
            <span className="bg-gradient-to-r from-primary/80 via-primary/90 to-primary/70 bg-clip-text text-transparent select-none">
              {headline}
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
    </div>
  );
}

// Animated section badge indicator
function SectionBadge({ isInView }: { isInView: boolean }) {
  return (
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
        className="text-xs text-primary/60 uppercase tracking-widest font-light"
      >
        My Work
      </motion.span>
    </div>
  );
}

// Navigation link to view all projects
function ViewAllLink({ isInView }: { isInView: boolean }) {
  return (
    <Link 
      href="/projects"
      className="mt-7 sm:mt-0 group flex items-center text-sm text-foreground/60 hover:text-primary transition-colors"
    >
      <motion.span 
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="relative font-medium"
      >
        View all works
        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300"></span>
      </motion.span>
      <motion.div
        initial={{ opacity: 0, x: -5 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </motion.div>
    </Link>
  );
}

// Call-to-action button section
function CTASection({ isInView }: { isInView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: ANIMATION_DELAYS.CTA, duration: 1.2 }}
      className="flex justify-center"
    >
      <Button
        variant="outline"
        size="lg"
        className="group border-primary/10 text-base px-8 py-6 rounded-xl hover:bg-primary/5 transition-colors relative overflow-hidden"
        asChild
      >
        <Link href="/contact" className="flex items-center">
          <motion.span 
            className="font-medium tracking-wide relative z-10"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            Let&apos;s collaborate
          </motion.span>
          <motion.div
            className="ml-3 h-6 w-6 rounded-full border border-primary/20 flex items-center justify-center relative z-10"
            whileHover={{ rotate: 45 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUpRight className="h-3 w-3 text-primary/70" />
          </motion.div>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            initial={{ x: "-100%" }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.5 }}
          />
        </Link>
      </Button>
    </motion.div>
  );
}

// Main projects component
export function Projects({ headline = "Selected Projects", cta = true }: ProjectsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  // Modified to make content visible without scrolling
  const isInView = useInView(sectionRef, { once: true, amount: 0.01 });

  const handleProjectHover = (index: number) => setHoveredIndex(index);
  const handleProjectLeave = () => setHoveredIndex(null);

  return (
    <section 
      className="py-36 sm:py-44 relative overflow-hidden container mx-auto px-6"
      ref={sectionRef}
      id="work-section"
    >
      <BackgroundDecorations isInView={isInView} />
      <SectionHeader headline={headline} isInView={isInView} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20 ">
        {featuredProjects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            isInView={isInView}
            isHovered={hoveredIndex === index}
            onHover={() => handleProjectHover(index)}
            onLeave={handleProjectLeave}
          />
        ))}
      </div>

      {cta && <CTASection isInView={isInView} />}
    </section>
  );
}

// Individual project card component
function ProjectCard({ project, index, isInView, isHovered, onHover, onLeave }: ProjectCardProps) {
  const cardAnimation = {
    initial: { opacity: 0, y: 32 },
    animate: isInView ? { opacity: 1, y: 0 } : {},
    transition: {
      duration: ANIMATION_DURATIONS.FADE_IN,
      delay: ANIMATION_DELAYS.CARD_BASE + index * ANIMATION_DELAYS.CARD_STAGGER,
      ease: [0.22, 1, 0.36, 1]
    }
  };

  return (
    <motion.div
      {...cardAnimation}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      className="relative"
    >
      <Card className={`
        overflow-hidden border-primary/10 backdrop-blur-sm transition-all duration-300 py-0
        ${isHovered ? 'shadow-lg border-primary/20' : 'shadow-md'}
      `}>
        <ProjectImageContainer project={project} isHovered={isHovered} />
        <ProjectContent project={project} isHovered={isHovered} />
      </Card>
    </motion.div>
  );
}

// Project image container with overlay and tags
function ProjectImageContainer({ project, isHovered }: { project: Project; isHovered: boolean }) {
  return (
    <div className="relative w-full h-64 overflow-hidden">
      <ProjectImageAccent isHovered={isHovered} />
      <ProjectImageOverlay isHovered={isHovered} />
      <ProjectImage project={project} isHovered={isHovered} />
      <ProjectTags tags={project.tags} />
    </div>
  );
}

// Decorative accent element on project image
function ProjectImageAccent({ isHovered }: { isHovered: boolean }) {
  return (
    <motion.div 
      className="absolute top-4 left-4 z-20 w-7 h-7 rounded-md border border-primary/10 flex items-center justify-center"
      animate={{ rotate: isHovered ? 45 : 0 }}
      transition={{ duration: ANIMATION_DURATIONS.HOVER_TRANSITION }}
    >
      <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
    </motion.div>
  );
}

// Gradient overlay on project image
function ProjectImageOverlay({ isHovered }: { isHovered: boolean }) {
  return (
    <motion.div
      className="absolute inset-0 z-10 bg-gradient-to-b from-background/10 via-background/30 to-background/80"
      animate={{ opacity: isHovered ? 0.4 : 0.6 }}
      transition={{ duration: ANIMATION_DURATIONS.HOVER_TRANSITION }}
    />
  );
}

// Project image with hover effects
function ProjectImage({ project, isHovered }: { project: Project; isHovered: boolean }) {
  return (
    <motion.div
      className="h-full w-full"
      animate={{
        scale: isHovered ? 1.05 : 1,
        filter: isHovered ? "brightness(1.1) saturate(1.1)" : "brightness(0.95) saturate(0.95)"
      }}
      transition={{ duration: ANIMATION_DURATIONS.SCALE_TRANSITION }}
    >
      <Image
        src={project.imageSrc}
        alt={project.title}
        fill
        className="object-cover transition-all duration-700 will-change-transform"
        sizes="(max-width: 1024px) 100vw, 50vw"
        draggable={false}
      />
    </motion.div>
  );
}

// Project tags display with overflow handling
function ProjectTags({ tags }: { tags?: string[] }) {
  if (!tags?.length) return null;

  const visibleTags = tags.slice(0, 3);
  const remainingCount = tags.length - 3;

  return (
    <div className="absolute top-4 right-4 z-20 flex flex-wrap gap-2 justify-end max-w-[70%]">
      {visibleTags.map((tag, index) => (
        <motion.span
          key={tag}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
          className="px-3 py-1 bg-background/40 border border-primary/10 rounded-md text-xs text-primary/70 backdrop-blur-md font-light tracking-wide"
        >
          {tag}
        </motion.span>
      ))}
      {remainingCount > 0 && (
        <motion.span 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="px-3 py-1 bg-background/30 border border-primary/10 rounded-md text-xs text-primary/60 backdrop-blur-sm"
        >
          +{remainingCount}
        </motion.span>
      )}
    </div>
  );
}

// Project card content including header, description, and footer
function ProjectContent({ project, isHovered }: { project: Project; isHovered: boolean }) {
  return (
    <>
      <ProjectHeader project={project} isHovered={isHovered} />
      <ProjectDescription description={project.description} isHovered={isHovered} />
      <ProjectFooter project={project} isHovered={isHovered} />
    </>
  );
}

// Project card header with metadata and title
function ProjectHeader({ project, isHovered }: { project: Project; isHovered: boolean }) {
  return (
    <CardHeader className="pt-6 pb-0 px-6">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
          <span className="text-xs text-foreground/45 uppercase tracking-wider">Featured</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-foreground/40 font-mono">
          <Calendar className="h-3 w-3" />
          <span>{project.year}</span>
        </div>
      </div>
      <CardTitle className="font-serif italic text-2xl md:text-3xl tracking-tight">
        <motion.span
          className="inline-block"
          animate={{ 
            backgroundImage: isHovered
              ? "linear-gradient(90deg, var(--tw-gradient-from, #b0c4ff), var(--tw-gradient-to, #d1b3ff))"
              : "linear-gradient(90deg, var(--tw-gradient-from, #eaeaea), var(--tw-gradient-to, #dadada))"
          }}
          transition={{ duration: ANIMATION_DURATIONS.HOVER_TRANSITION }}
        >
          {project.title}
        </motion.span>
      </CardTitle>
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: isHovered ? "4rem" : "3rem" }}
        transition={{ duration: ANIMATION_DURATIONS.HOVER_TRANSITION }}
        className="h-[1px] bg-gradient-to-r from-primary/30 to-transparent mt-2"
      />
    </CardHeader>
  );
}

// Project description with hover animation
function ProjectDescription({ description, isHovered }: { description: string; isHovered: boolean }) {
  return (
    <CardContent className="pt-4 px-6">
      <motion.p 
        className="text-foreground/60 text-[1em] font-light leading-relaxed"
        animate={{ 
          opacity: isHovered ? 1 : 0.8,
          y: isHovered ? 0 : 5
        }}
        transition={{ duration: ANIMATION_DURATIONS.HOVER_TRANSITION }}
      >
        {description}
      </motion.p>
    </CardContent>
  );
}

// Project footer with role and action buttons
function ProjectFooter({ project, isHovered }: { project: Project; isHovered: boolean }) {
  return (
    <CardFooter className="px-6 pt-4 pb-6 flex justify-between items-center">
      <div className="flex items-center gap-1.5">
        <Code2 className="h-3.5 w-3.5 text-primary/50" />
        <span className="text-xs text-foreground/40">
          {project.role || "Developer"}
        </span>
      </div>
      <ProjectActions project={project} isHovered={isHovered} />
    </CardFooter>
  );
}

// Project action buttons that appear on hover
function ProjectActions({ project, isHovered }: { project: Project; isHovered: boolean }) {
  const projectUrl = project.url || project.github;
  
  return (
    <AnimatePresence>
      {isHovered ? (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.3 }}
        >
          <Button
            variant="outline"
            size="sm"
            className="text-xs text-primary/80 px-4 py-2 h-auto border border-primary/10 rounded-md hover:bg-primary/5"
            asChild
          >
            <Link
              href={projectUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
              aria-label={`View project: ${project.title}`}
            >
              View project <ArrowRight className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {projectUrl && (
            <a
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-foreground/40 hover:text-primary/70 transition-colors flex items-center"
              aria-label={`Visit site: ${project.title}`}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Visit site
            </a>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}