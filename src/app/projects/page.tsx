"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import PageLayout from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, ExternalLink, Github, Calendar, Code2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { projects, featuredProjects } from "@/data/project";

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

// Extract all unique tags from projects
const allTags = Array.from(
  new Set(projects.flatMap(project => project.tags))
).sort();

// Project card component
function ProjectCard({ project, index, delay = 0 }: { project: any; index: number; delay?: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: 0.1 + delay,
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
        {/* Image container */}
        <div className="relative w-full h-48 overflow-hidden">
          <motion.div
            className="w-full h-full"
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src={project.imageSrc}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70" />
          
          {/* Tags */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-black/40 backdrop-blur-sm text-white/90 rounded-md text-xs"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-2 py-1 bg-black/40 backdrop-blur-sm text-white/90 rounded-md text-xs">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-medium">{project.title}</h3>
            <span className="text-xs text-primary/60 px-2 py-1 border border-primary/10 rounded-md">
              {project.year}
            </span>
          </div>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "3rem" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-[1px] bg-gradient-to-r from-primary/30 to-transparent mb-3"
          />
          
          <p className="text-foreground/60 text-sm font-light leading-relaxed mb-6">
            {project.description}
          </p>
          
          {/* Project details */}
          <div className="space-y-2 mb-6">
            {project.role && (
              <div className="flex items-center text-xs text-foreground/50">
                <span className="w-16 font-light">Role:</span>
                <span className="text-foreground/80">{project.role}</span>
              </div>
            )}
            
            {project.client && (
              <div className="flex items-center text-xs text-foreground/50">
                <span className="w-16 font-light">Client:</span>
                <span className="text-foreground/80">{project.client}</span>
              </div>
            )}
            
            {project.duration && (
              <div className="flex items-center text-xs text-foreground/50">
                <span className="w-16 font-light">Duration:</span>
                <span className="text-foreground/80">{project.duration}</span>
              </div>
            )}
          </div>
          
          {/* Links */}
          <div className="flex items-center gap-3 mt-auto pt-2">
            {project.url && (
              <Button
                variant="outline"
                size="sm"
                className="group border-primary/10 hover:bg-primary/5 hover:border-primary/20"
                asChild
              >
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <span className="text-xs">Visit site</span>
                  <ExternalLink className="ml-1 h-3 w-3 text-primary/70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Button>
            )}
            
            {project.github && (
              <Button
                variant="outline"
                size="sm"
                className="group border-primary/10 hover:bg-primary/5 hover:border-primary/20"
                asChild
              >
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center">
                  <span className="text-xs">View code</span>
                  <Github className="ml-1 h-3 w-3 text-primary/70" />
                </a>
              </Button>
            )}
            
            <Button
              variant="outline"
              size="sm"
              className="group border-primary/10 hover:bg-primary/5 hover:border-primary/20 ml-auto"
              asChild
            >
              <Link href={`/projects/${project.slug}`} className="flex items-center">
                <span className="text-xs">Details</span>
                <ArrowUpRight className="ml-1 h-3 w-3 text-primary/70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Decorative corner element */}
        <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-px h-12 bg-gradient-to-b from-primary/20 to-transparent" />
          <div className="absolute top-0 right-0 h-px w-12 bg-gradient-to-l from-primary/20 to-transparent" />
        </div>
      </Card>
    </motion.div>
  );
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Filter projects based on active tag
  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter(project => project.tags.includes(activeFilter))
      );
    }
  }, [activeFilter]);

  return (
    <PageLayout activePage="Projects">
      <div ref={sectionRef} className="pt-36 pb-24 px-6 sm:px-8 lg:px-32 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Noise texture */}
          <div className="absolute inset-0 z-0 mix-blend-overlay opacity-10">
            <svg className="w-full h-full opacity-20" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <filter id="projectsNoiseFilter">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#projectsNoiseFilter)" />
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
              Project Archive
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
                <span className="bg-gradient-to-r from-primary/80 via-primary/90 to-primary/70 bg-clip-text text-transparent select-none">
                  Complete Portfolio
                </span>
              </div>
            </motion.h1>
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
            Browse my comprehensive collection of projects spanning web development, mobile applications, 
            and design work. Use the filters below to explore by technology or focus area.
          </motion.p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-12"
        >
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveFilter}>
            <TabsList className="flex flex-wrap gap-2 bg-transparent h-auto p-0">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-primary/30 border border-primary/10 bg-transparent hover:bg-primary/5 rounded-md px-4 py-1.5 text-xs"
              >
                All Projects
              </TabsTrigger>
              {allTags.map(tag => (
                <TabsTrigger 
                  key={tag}
                  value={tag}
                  className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-primary/30 border border-primary/10 bg-transparent hover:bg-primary/5 rounded-md px-4 py-1.5 text-xs"
                >
                  {tag}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value={activeFilter} className="mt-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFilter}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredProjects.length > 0 ? (
                    filteredProjects.map((project, index) => (
                      <ProjectCard 
                        key={project.slug} 
                        project={project} 
                        index={index}
                        delay={index * 0.1}
                      />
                    ))
                  ) : (
                    <div className="col-span-full py-12 text-center">
                      <p className="text-foreground/50 font-light">No projects found with this filter.</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          </Tabs>
        </motion.div>
        
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-24 text-center"
        >
          <Card className="border-primary/10 backdrop-blur-sm overflow-hidden py-0 mb-12 relative max-w-3xl mx-auto">
            <div className="p-8 sm:p-10 relative">
              {/* Background glow effect */}
              <motion.div
                animate={{
                  opacity: [0.05, 0.1, 0.05],
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-2xl blur-2xl -z-10"
              />

              <h3 className="text-2xl sm:text-3xl font-serif italic mb-4">Have a project in mind?</h3>
              
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "8rem" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto mb-6"
              />
              
              <p className="text-foreground/60 text-sm sm:text-base font-light leading-relaxed mb-8 max-w-xl mx-auto">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
              
              <Button 
                size="lg"
                className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8"
                asChild
              >
                <Link href="/contact" className="flex items-center">
                  Get in touch
                  <motion.div
                    className="ml-2 flex items-center justify-center"
                    whileHover={{ x: 3, y: -3 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </motion.div>
                </Link>
              </Button>
            </div>
            
            {/* Decorative corner element */}
            <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
              <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-primary/20 to-transparent" />
              <div className="absolute top-0 right-0 h-px w-16 bg-gradient-to-l from-primary/20 to-transparent" />
            </div>
          </Card>
        </motion.div>
      </div>
    </PageLayout>
  );
} 