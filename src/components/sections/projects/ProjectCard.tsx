"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import type { ProjectCardPropsType } from "@/lib/types/components";

export const ProjectCard = ({ project, delay = 0 }: ProjectCardPropsType) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.01 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: 0.1 + delay, ease: [0.22, 1, 0.36, 1] }}
      className="group h-full"
    >
      <Card className="h-full rounded-none shadow-none py-0 gap-0 border-foreground/8 bg-transparent hover:border-foreground/15 transition-colors duration-200 overflow-hidden flex flex-col">
      <div className="relative w-full h-44 overflow-hidden shrink-0">
        <Image
          src={project.imageSrc}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

        <span className="absolute top-3 right-3 text-[10px] font-mono text-white/45">
          {project.year}
        </span>

        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag: string) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-black/40 backdrop-blur-sm text-white/65 text-[10px] font-light"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 py-0.5 bg-black/40 backdrop-blur-sm text-white/40 text-[10px]">
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-serif text-foreground/85 group-hover:text-foreground transition-colors duration-200 mb-1.5">
          {project.title}
        </h3>

        <p className="text-foreground/50 text-sm font-light leading-relaxed mb-4 line-clamp-2 flex-1">
          {project.description}
        </p>

        {(project.role || project.duration) && (
          <div className="flex flex-wrap gap-x-4 mb-4">
            {project.role && (
              <span className="text-xs text-foreground/30 font-light">
                <span className="mr-1 text-foreground/20">role</span>
                {project.role}
              </span>
            )}
            {project.duration && (
              <span className="text-xs text-foreground/30 font-light">
                <span className="mr-1 text-foreground/20">time</span>
                {project.duration}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center gap-3 pt-3 border-t border-foreground/8">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-foreground/35 hover:text-foreground/65 transition-colors duration-200"
            >
              <ExternalLink className="h-3 w-3" />
              live
            </a>
          )}
          {project.url && project.github && (
            <div className="w-px h-3 bg-foreground/8" />
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-foreground/35 hover:text-foreground/65 transition-colors duration-200"
            >
              <Github className="h-3 w-3" />
              code
            </a>
          )}
          <Link
            href={`/projects/${project.slug}`}
            className="flex items-center gap-1 text-xs text-foreground/35 hover:text-foreground/65 transition-colors duration-200 ml-auto group/link"
          >
            details
            <ArrowUpRight className="h-3 w-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
          </Link>
        </div>
      </div>
      </Card>
    </motion.div>
  );
};
