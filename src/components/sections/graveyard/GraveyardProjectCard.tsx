"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { DeadProjectType } from "@/data/projects";

interface GraveyardProjectCardProps {
  project: DeadProjectType;
  index: number;
}

export const GraveyardProjectCard = ({ project, index }: GraveyardProjectCardProps) => {
  const [isShowingLessons, setIsShowingLessons] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group h-full"
    >
      <Card className="h-full rounded-none shadow-none py-0 gap-0 border-foreground/8 bg-transparent hover:border-foreground/15 transition-colors duration-200 overflow-hidden flex flex-col">
      <div className="relative w-full h-44 overflow-hidden shrink-0">
        <Image
          src={project.imageSrc}
          alt={project.title}
          fill
          className="object-cover grayscale brightness-75 transition-all duration-500 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 50vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="absolute top-3 right-3 flex items-center gap-1">
          <Calendar className="w-3 h-3 text-white/35" />
          <span className="text-[10px] font-mono text-white/45">{project.year}</span>
        </div>

        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 3).map((tag: string) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-black/40 backdrop-blur-sm text-white/65 text-[10px] font-light"
            >
              {tag}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="px-2 py-0.5 bg-black/40 backdrop-blur-sm text-white/40 text-[10px]">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-serif text-foreground/85 group-hover:text-foreground transition-colors duration-200 mb-3">
          {project.title}
        </h3>

        <p className="text-foreground/50 text-sm font-light leading-relaxed mb-3 line-clamp-2">
          {project.description}
        </p>

        <span className="text-xs text-foreground/25 font-light mb-4">
          abandoned at {project.progress}
        </span>

        <AnimatePresence mode="wait">
          <motion.div
            key={isShowingLessons ? "lessons" : "reason"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="flex-1"
          >
            <h4 className="text-[10px] font-light text-foreground/25 uppercase tracking-[0.15em] mb-1.5">
              {isShowingLessons ? "lessons learned" : "why abandoned"}
            </h4>
            <p className="text-foreground/50 text-sm font-light leading-relaxed">
              {isShowingLessons ? project.lessons : project.reason}
            </p>
          </motion.div>
        </AnimatePresence>

        {project.duration && (
          <p className="text-xs text-foreground/20 font-light mt-3 mb-4">{project.duration}</p>
        )}

        <div className="flex items-center gap-3 pt-3 border-t border-foreground/8">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-foreground/35 hover:text-foreground/65 transition-colors duration-200"
            >
              <ExternalLink className="h-3 w-3" />
              live
            </a>
          )}
          {project.link && project.repo && (
            <div className="w-px h-3 bg-foreground/8" />
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-foreground/35 hover:text-foreground/65 transition-colors duration-200"
            >
              <Github className="h-3 w-3" />
              code
            </a>
          )}
          <button
            onClick={() => setIsShowingLessons(!isShowingLessons)}
            className="ml-auto text-xs text-foreground/25 hover:text-foreground/55 transition-colors duration-200"
          >
            {isShowingLessons ? "← details" : "lessons →"}
          </button>
        </div>
      </div>
      </Card>
    </motion.div>
  );
};
