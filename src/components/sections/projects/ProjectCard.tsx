"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ExternalLink, Github, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SPACING_STANDARDS } from "@/lib/config/spacing-standards";
import type { ProjectCardPropsType } from "@/lib/types";

/**
 * ProjectCard displays a project with image, details, and action buttons.
 * Features hover animations, tags display, and metadata.
 */
export const ProjectCard = ({ project, delay = 0 }: ProjectCardPropsType) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.01 });

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.8,
        delay: 0.1 + delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="h-full group"
    >
      <Card
        className={`
          h-full overflow-hidden border-primary/10 backdrop-blur-sm transition-all duration-500 py-0
          ${isHovered ? "shadow-xl border-primary/20 -translate-y-1" : "shadow-md"}
        `}
      >
        {/* Image container */}
        <div className="relative w-full h-48 overflow-hidden">
          <motion.div
            className="w-full h-full"
            animate={{ scale: isHovered ? 1.05 : 1 }}
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80" />

          {/* Year badge */}
          <div className="absolute top-4 right-4">
            <div className="flex items-center space-x-1 bg-black/40 backdrop-blur-sm text-white/90 rounded-md px-2 py-1">
              <Calendar className="w-3 h-3" />
              <span className="text-xs font-medium">{project.year}</span>
            </div>
          </div>

          {/* Tags overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag: string) => (
              <span
                key={tag}
                className="px-2 py-1 bg-black/40 backdrop-blur-sm text-white/90 rounded-md text-xs font-light"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-2 py-1 bg-black/40 backdrop-blur-sm text-white/90 rounded-md text-xs font-light">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className={SPACING_STANDARDS.CARD.PADDING_SMALL}>
          <div
            className={`flex items-start justify-between ${SPACING_STANDARDS.CONTENT.SMALL_SPACING}`}
          >
            <h3 className="text-xl font-serif text-foreground/90 group-hover:text-primary/90 transition-colors duration-300">
              {project.title}
            </h3>
          </div>

          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "2.5rem" } : { width: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + delay }}
            className="h-[1px] bg-gradient-to-r from-primary/30 to-transparent mb-4"
          />

          <p className="text-foreground/60 text-sm font-light leading-relaxed mb-6 line-clamp-3">
            {project.description}
          </p>

          {/* Project metadata */}
          {(project.role || project.client || project.duration) && (
            <div className="space-y-2 mb-6 border-l-2 border-primary/10 pl-4">
              {project.role && (
                <div className="flex items-center text-xs">
                  <span className="w-12 text-foreground/40 font-light">Role</span>
                  <span className="text-foreground/70">{project.role}</span>
                </div>
              )}
              {project.client && (
                <div className="flex items-center text-xs">
                  <span className="w-12 text-foreground/40 font-light">Client</span>
                  <span className="text-foreground/70">{project.client}</span>
                </div>
              )}
              {project.duration && (
                <div className="flex items-center text-xs">
                  <span className="w-12 text-foreground/40 font-light">Time</span>
                  <span className="text-foreground/70">{project.duration}</span>
                </div>
              )}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center gap-3 mt-auto pt-2">
            {project.url && (
              <Button
                variant="outline"
                size="sm"
                className="group/btn border-primary/10 hover:bg-primary/5 hover:border-primary/20 transition-all duration-300"
                asChild
              >
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <span className="text-xs font-light">Live Site</span>
                  <ExternalLink className="ml-1.5 h-3 w-3 text-primary/70 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              </Button>
            )}
            {project.github && (
              <Button
                variant="outline"
                size="sm"
                className="group/btn border-primary/10 hover:bg-primary/5 hover:border-primary/20 transition-all duration-300"
                asChild
              >
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <span className="text-xs font-light">Code</span>
                  <Github className="ml-1.5 h-3 w-3 text-primary/70" />
                </a>
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              className="group/btn border-primary/10 hover:bg-primary/5 hover:border-primary/20 ml-auto transition-all duration-300"
              asChild
            >
              <Link
                href={`/projects/${project.slug}`}
                className="flex items-center"
              >
                <span className="text-xs font-light">View Details</span>
                <ArrowUpRight className="ml-1.5 h-3 w-3 text-primary/70 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Decorative corner */}
        <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden opacity-60">
          <div className="absolute top-0 right-0 w-px h-16 bg-gradient-to-b from-primary/20 to-transparent" />
          <div className="absolute top-0 right-0 h-px w-16 bg-gradient-to-l from-primary/20 to-transparent" />
          <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300" />
        </div>
      </Card>
    </motion.div>
  );
};
