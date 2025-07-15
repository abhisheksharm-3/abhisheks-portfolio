import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ProjectCard({
  project,
  delay = 0
}: {
  project: {
    title: string;
    description: string;
    tags: string[];
    year: string;
    role?: string;
    client?: string;
    duration?: string;
    imageSrc: string;
    url?: string;
    github?: string;
    slug: string;
  };
  delay?: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.01 });

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
          ${isHovered ? "shadow-lg border-primary/20" : "shadow-md"}
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70" />
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
        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden">
          <div className="absolute top-0 right-0 w-px h-12 bg-gradient-to-b from-primary/20 to-transparent" />
          <div className="absolute top-0 right-0 h-px w-12 bg-gradient-to-l from-primary/20 to-transparent" />
        </div>
      </Card>
    </motion.div>
  );
}