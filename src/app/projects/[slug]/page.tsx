"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PageLayout from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, Github, Calendar } from "lucide-react";
import { featuredProjects } from "@/data/project";

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

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = featuredProjects.find(p => p.slug === params.slug);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  // If project not found, redirect to 404
  if (!project) {
    notFound();
  }

  return (
    <PageLayout activePage="Projects">
      <div ref={sectionRef} className="pt-36 pb-24 px-6 sm:px-8 lg:px-32 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Noise texture */}
          <div className="absolute inset-0 z-0 mix-blend-overlay opacity-10">
            <svg className="w-full h-full opacity-20" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <filter id="projectDetailNoiseFilter">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#projectDetailNoiseFilter)" />
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

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <Button 
            variant="outline" 
            size="sm" 
            className="group border-primary/10 hover:bg-primary/5"
            asChild
          >
            <Link href="/projects" className="flex items-center">
              <ArrowLeft className="mr-2 h-3 w-3 transition-transform group-hover:-translate-x-1" />
              Back to Projects
            </Link>
          </Button>
        </motion.div>

        {/* Project Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="overflow-visible mb-4">
              <motion.h1 
                initial={{ y: 60, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-4xl sm:text-5xl md:text-6xl font-serif italic leading-relaxed pb-2"
              >
                <div className="py-1">
                  <span className="bg-gradient-to-r from-primary/80 via-primary/90 to-primary/70 bg-clip-text text-transparent select-none">
                    {project.title}
                  </span>
                </div>
              </motion.h1>
            </div>
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={isInView ? { width: "5rem", opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.6 }}
              className="h-[1px] bg-gradient-to-r from-primary/40 to-transparent mt-4 mb-6"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-foreground/70 max-w-2xl text-base sm:text-lg font-light leading-relaxed"
            >
              {project.longDescription || project.description}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:col-span-1"
          >
            <Card className="border-primary/10 backdrop-blur-sm overflow-hidden relative">
              <div className="p-6 sm:p-8">
                <h3 className="text-xl font-medium mb-4">Project Details</h3>
                
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "3rem" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="h-[1px] bg-gradient-to-r from-primary/30 to-transparent mb-6"
                />
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <span className="w-24 text-sm text-foreground/50">Year:</span>
                    <span className="text-sm">{project.year}</span>
                  </div>
                  
                  {project.role && (
                    <div className="flex items-center">
                      <span className="w-24 text-sm text-foreground/50">Role:</span>
                      <span className="text-sm">{project.role}</span>
                    </div>
                  )}
                  
                  {project.client && (
                    <div className="flex items-center">
                      <span className="w-24 text-sm text-foreground/50">Client:</span>
                      <span className="text-sm">{project.client}</span>
                    </div>
                  )}
                  
                  {project.duration && (
                    <div className="flex items-center">
                      <span className="w-24 text-sm text-foreground/50">Duration:</span>
                      <span className="text-sm">{project.duration}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center pt-2">
                    <span className="w-24 text-sm text-foreground/50">Technologies:</span>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span 
                          key={tag}
                          className="px-2 py-1 bg-primary/5 border border-primary/10 rounded-md text-xs text-primary/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 mt-8">
                  {project.url && (
                    <Button
                      variant="default"
                      size="sm"
                      className="group bg-primary hover:bg-primary/90 text-primary-foreground"
                      asChild
                    >
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        Visit Website
                        <ExternalLink className="ml-2 h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
                        View Source
                        <Github className="ml-2 h-3 w-3 text-primary/70" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
              
              {/* Decorative corner element */}
              <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
                <div className="absolute top-0 right-0 w-px h-12 bg-gradient-to-b from-primary/20 to-transparent" />
                <div className="absolute top-0 right-0 h-px w-12 bg-gradient-to-l from-primary/20 to-transparent" />
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Project Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-xl border border-primary/10">
            <Image
              src={project.imageSrc}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>
        </motion.div>

        {/* Project Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mb-16"
        >
          <Card className="border-primary/10 backdrop-blur-sm overflow-hidden relative">
            <div className="p-8 sm:p-10">
              <h2 className="text-2xl font-serif italic mb-6">Project Overview</h2>
              
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "3rem" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-[1px] bg-gradient-to-r from-primary/30 to-transparent mb-6"
              />
              
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="text-foreground/70 text-base font-light leading-relaxed">
                  {project.longDescription || 
                    `${project.description} This project showcases my skills in ${project.tags.join(", ")}. 
                    As the ${project.role || "developer"}, I was responsible for the entire development process 
                    from concept to deployment.`
                  }
                </p>
                
                <p className="text-foreground/70 text-base font-light leading-relaxed mt-4">
                  The project was completed {project.duration || `in ${project.year}`} and demonstrates my ability to 
                  deliver high-quality solutions that meet client requirements and user needs.
                </p>
              </div>
            </div>
            
            {/* Decorative corner element */}
            <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
              <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-primary/20 to-transparent" />
              <div className="absolute top-0 right-0 h-px w-16 bg-gradient-to-l from-primary/20 to-transparent" />
            </div>
          </Card>
        </motion.div>

        {/* More Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <h3 className="text-2xl font-serif italic mb-4">Explore More Projects</h3>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "8rem" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto mb-8"
          />
          
          <Button
            size="lg"
            className="group border-primary/10 bg-primary/5 hover:bg-primary/10 text-foreground px-8 py-6"
            asChild
          >
            <Link href="/projects" className="flex items-center">
              View All Projects
              <motion.div
                className="ml-2 flex items-center justify-center"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowLeft className="h-4 w-4 rotate-180" />
              </motion.div>
            </Link>
          </Button>
        </motion.div>
      </div>
    </PageLayout>
  );
} 