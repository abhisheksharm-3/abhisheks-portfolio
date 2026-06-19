"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { ProjectType } from "@/lib/types/components";

interface ProjectCardPartPropsType {
  project: ProjectType;
  isHovered: boolean;
}

export const ProjectImageContainer = ({
  project,
  isHovered,
}: ProjectCardPartPropsType) => (
  <div className="relative w-full h-52 sm:h-64 overflow-hidden shrink-0">
    <motion.div
      className="relative w-full h-full"
      animate={{ scale: isHovered ? 1.03 : 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Image
        src={project.imageSrc}
        alt={project.title}
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 50vw"
        draggable={false}
      />
    </motion.div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

    <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
      {project.tags?.slice(0, 2).map((tag) => (
        <span
          key={tag}
          className="text-[10px] font-light text-white/65 bg-black/40 backdrop-blur-sm px-2 py-0.5"
        >
          {tag}
        </span>
      ))}
      {(project.tags?.length ?? 0) > 2 && (
        <span className="text-[10px] text-white/40 bg-black/40 backdrop-blur-sm px-2 py-0.5">
          +{(project.tags?.length ?? 0) - 2}
        </span>
      )}
    </div>
  </div>
);

export const ProjectContent = ({ project }: ProjectCardPartPropsType) => (
  <div className="flex flex-col flex-1 p-5 sm:p-6">
    <div className="flex items-baseline justify-between mb-2">
      <span className="text-[10px] text-foreground/25 font-mono">{project.year}</span>
    </div>

    <h3 className="text-xl font-serif text-foreground/85 group-hover:text-foreground transition-colors duration-200 mb-2 leading-snug">
      {project.title}
    </h3>

    <p className="text-foreground/50 text-sm font-light leading-relaxed flex-1 mb-4 line-clamp-3">
      {project.description}
    </p>

    <div className="flex items-center justify-between pt-3 border-t border-foreground/8">
      <span className="text-xs text-foreground/25 font-light">
        {project.role || "developer"}
      </span>
      <div className="flex items-center gap-3">
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-foreground/35 hover:text-foreground/65 transition-colors duration-200"
          >
            <ExternalLink className="h-3 w-3" />
            visit
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
      </div>
    </div>
  </div>
);
