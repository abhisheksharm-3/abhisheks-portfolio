"use client";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Project } from "@/data/project";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface ProjectsProps {
  projects: Project[];
}

export function Projects({ projects }: ProjectsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  return (
    <section className="py-24 sm:py-32 relative" ref={sectionRef}>
      {/* Section decoration */}
      <div className="absolute left-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />
      
      {/* Section header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 sm:mb-20"
      >
        <div>
          <div className="flex items-center mb-4">
            <div className="w-10 h-[1px] bg-primary/30 mr-3"></div>
            <span className="text-xs text-primary/70 uppercase tracking-wider font-light">My Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic leading-tight">
            <span className="bg-gradient-to-br from-foreground to-foreground/80 bg-clip-text text-transparent">
              Selected Projects
            </span>
          </h2>
        </div>
        
        <Link 
          href="/work" 
          className="mt-6 sm:mt-0 group flex items-center text-sm text-foreground/60 hover:text-primary transition-colors duration-300"
        >
          <span className="relative">
            View all works
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300"></span>
          </span>
          <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </motion.div>
      
      {/* Projects grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-16">
        {projects.map((project, index) => (
          <ProjectCard 
            key={index} 
            project={project} 
            index={index} 
            isInView={isInView}
            isHovered={hoveredIndex === index}
            onHover={() => setHoveredIndex(index)}
            onLeave={() => setHoveredIndex(null)}
          />
        ))}
      </div>
      
      {/* Bottom CTA */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8, duration: 1 }}
        className="flex justify-center"
      >
        <Button 
          variant="outline" 
          size="lg"
          className="group border-primary/20 text-sm hover:bg-primary/5"
          asChild
        >
          <Link href="/contact">
            <span>Interested in working together?</span>
            <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        </Button>
      </motion.div>
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
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.2 + index * 0.15 }}
      className={cn(
        "group relative rounded-2xl overflow-hidden border transition-all duration-500",
        isHovered 
          ? "border-primary/30 shadow-lg shadow-primary/5" 
          : "border-primary/5 bg-card/10 backdrop-blur-sm"
      )}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
    >
      {/* Project image with overlay */}
      <div className="relative h-72 overflow-hidden">
        {project.imageSrc ? (
          <>
            <motion.div 
              className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-background/95"
              animate={{
                opacity: isHovered ? 0.7 : 0.9
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="h-full w-full"
              animate={{
                scale: isHovered ? 1.05 : 1
              }}
              transition={{ duration: 0.6 }}
            >
              <Image 
                src={project.imageSrc} 
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/95 z-10"></div>
            <div className="h-full w-full bg-gradient-to-br from-primary/5 via-primary/10 to-background/80"></div>
          </>
        )}
        
        {/* Floating tags */}
        <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2 max-w-[80%]">
          {project.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag} 
              className="px-3 py-1 bg-background/70 backdrop-blur-sm border border-primary/10 rounded-full text-xs text-primary/80"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-3 py-1 bg-background/70 backdrop-blur-sm border border-primary/10 rounded-full text-xs text-primary/80">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>
      
      {/* Content area */}
      <div className="p-7 sm:p-8">
        <div className="flex justify-between items-start mb-3">
          <motion.h3 
            className="text-xl sm:text-2xl font-serif italic relative inline-block"
            animate={{
              backgroundImage: isHovered 
                ? "linear-gradient(to right, rgba(var(--primary-rgb), 0.9), rgba(var(--primary-rgb), 0.7))" 
                : "linear-gradient(to right, rgba(var(--foreground-rgb), 0.9), rgba(var(--foreground-rgb), 0.7))"
            }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            {project.title}
          </motion.h3>
          
          <span className="text-xs font-mono text-primary/60">{project.year}</span>
        </div>
        
        <p className="text-foreground/60 text-sm font-light leading-relaxed mb-8">
          {project.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className={cn(
              "w-1.5 h-1.5 rounded-full mr-2", 
              isHovered ? "bg-primary" : "bg-primary/50"
            )}></span>
            <span className="text-xs text-foreground/50">Featured Work</span>
          </div>
          
          <AnimatePresence>
            {isHovered ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-xs text-primary px-4 py-2 h-auto"
                  asChild
                >
                  <Link href={`/work/${project.slug || '#'}`} className="flex items-center">
                    View project details
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {project.url && (
                  <a 
                    href={project.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-foreground/40 hover:text-primary transition-colors flex items-center"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" /> 
                    Visit site
                  </a>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Hover corner accent */}
      <motion.div 
        className="absolute top-0 right-0 w-12 h-12 pointer-events-none"
        animate={{
          opacity: isHovered ? 1 : 0
        }}
      >
        <div className="absolute top-0 right-0 w-px h-12 bg-gradient-to-b from-primary/40 to-transparent" />
        <div className="absolute top-0 right-0 h-px w-12 bg-gradient-to-l from-primary/40 to-transparent" />
      </motion.div>
    </motion.div>
  );
}