"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, ExternalLink, Code2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { featuredProjects, type Project } from "@/data/project";

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

interface ProjectsProps {
  projects: Project[];
  headline?: string;
  cta?: boolean;
}

export function Projects({ projects, headline = "Selected Projects", cta = true }: ProjectsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Use the projects prop if provided, otherwise use featuredProjects
  const projectsToShow = projects || featuredProjects;

  return (
    <section 
      className="py-36 sm:py-44 relative overflow-hidden"
      ref={sectionRef}
      id="work-section"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Noise texture */}
        <div className="absolute inset-0 z-0 mix-blend-overlay opacity-10">
          <svg className="w-full h-full opacity-20" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
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

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 sm:mb-20 relative z-10"
      >
        <div>
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
        <Link 
          href="/work"
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
      </motion.div>

      {/* Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
        {projectsToShow.map((project, idx) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={idx}
            isInView={isInView}
            isHovered={hoveredIndex === idx}
            onHover={() => setHoveredIndex(idx)}
            onLeave={() => setHoveredIndex(null)}
          />
        ))}
      </div>

      {/* CTA */}
      {cta && (
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
      )}
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
  isInView: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function ProjectCard({ project, index, isInView, isHovered, onHover, onLeave }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: 0.2 + index * 0.18,
        ease: [0.22, 1, 0.36, 1]
      }}
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
        {/* Image container */}
        <div className="relative w-full h-64 overflow-hidden">
          {/* Accent square */}
          <motion.div 
            className="absolute top-4 left-4 z-20 w-7 h-7 rounded-md border border-primary/10 flex items-center justify-center"
            animate={{ rotate: isHovered ? 45 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
          </motion.div>
          
          {/* Image overlay */}
          <motion.div
            className="absolute inset-0 z-10 bg-gradient-to-b from-background/10 via-background/30 to-background/80"
            animate={{ opacity: isHovered ? 0.4 : 0.6 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Project image */}
          <motion.div
            className="h-full w-full"
            animate={{
              scale: isHovered ? 1.05 : 1,
              filter: isHovered ? "brightness(1.1) saturate(1.1)" : "brightness(0.95) saturate(0.95)"
            }}
            transition={{ duration: 0.7 }}
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
          
          {/* Tags */}
          <div className="absolute top-4 right-4 z-20 flex flex-wrap gap-2 justify-end max-w-[70%]">
            {project.tags?.slice(0, 3).map((tag: string) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="px-3 py-1 bg-background/40 border border-primary/10 rounded-md text-xs text-primary/70 backdrop-blur-md font-light tracking-wide"
              >
                {tag}
              </motion.span>
            ))}
            {project.tags?.length > 3 && (
              <motion.span 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="px-3 py-1 bg-background/30 border border-primary/10 rounded-md text-xs text-primary/60 backdrop-blur-sm"
              >
                +{project.tags.length - 3}
              </motion.span>
            )}
          </div>
        </div>
        
        {/* Card content */}
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
              transition={{ duration: 0.5 }}
            >
              {project.title}
            </motion.span>
          </CardTitle>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: isHovered ? "4rem" : "3rem" }}
            transition={{ duration: 0.5 }}
            className="h-[1px] bg-gradient-to-r from-primary/30 to-transparent mt-2"
          />
        </CardHeader>
        
        <CardContent className="pt-4 px-6">
          <motion.p 
            className="text-foreground/60 text-[1em] font-light leading-relaxed"
            animate={{ 
              opacity: isHovered ? 1 : 0.8,
              y: isHovered ? 0 : 5
            }}
            transition={{ duration: 0.5 }}
          >
            {project.description}
          </motion.p>
        </CardContent>
        
        <CardFooter className="px-6 pt-4 pb-6 flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <Code2 className="h-3.5 w-3.5 text-primary/50" />
            <span className="text-xs text-foreground/40">
              {project.role || "Developer"}
            </span>
          </div>
          
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
                    href={project.url || project.github || "#"}
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
                {(project.url || project.github) && (
                  <a
                    href={project.url || project.github}
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
        </CardFooter>
      </Card>
    </motion.div>
  );
}