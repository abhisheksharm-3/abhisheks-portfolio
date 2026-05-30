"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Calendar, ExternalLink, Github, AlertCircle } from "lucide-react";
import Image from "next/image";
import { DeadProjectType } from "@/data/project";

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
      className="h-full group"
    >
      <Card className="h-full overflow-hidden border-primary/10 hover:border-primary/20 transition-colors duration-300 py-0 bg-card flex flex-col">
        <div className="relative w-full h-44 overflow-hidden shrink-0">
          <Image
            src={project.imageSrc}
            alt={project.title}
            fill
            className="object-cover opacity-65 grayscale-[20%] transition-all duration-500 group-hover:opacity-75"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded">
            <Calendar className="w-3 h-3 text-white/50" />
            <span className="text-[10px] font-mono text-white/60">{project.year}</span>
          </div>

          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 3).map((tag: string) => (
              <span
                key={tag}
                className="px-2 py-0.5 bg-black/50 backdrop-blur-sm text-white/75 rounded text-[10px] font-light"
              >
                {tag}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-0.5 bg-black/50 backdrop-blur-sm text-white/50 rounded text-[10px]">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-lg font-serif text-foreground/90 group-hover:text-foreground transition-colors duration-200 mb-1.5">
            {project.title}
          </h3>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "2rem" }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
            className="h-[1px] bg-gradient-to-r from-primary/25 to-transparent mb-3"
          />

          <p className="text-foreground/50 text-sm font-light leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>

          <div className="mb-4">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/8 border border-amber-500/15 rounded">
              <AlertCircle className="w-3 h-3 text-amber-500/60" />
              <span className="text-xs text-amber-600 dark:text-amber-400/80 font-light">
                abandoned at {project.progress}
              </span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={isShowingLessons ? "lessons" : "reason"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="flex-1"
            >
              <h4 className="text-[10px] font-light text-foreground/30 uppercase tracking-wider mb-1.5">
                {isShowingLessons ? "lessons learned" : "why abandoned"}
              </h4>
              <p className="text-foreground/55 text-sm font-light leading-relaxed">
                {isShowingLessons ? project.lessons : project.reason}
              </p>
            </motion.div>
          </AnimatePresence>

          {project.duration && (
            <p className="text-xs text-foreground/25 font-light mt-3 mb-4">{project.duration}</p>
          )}

          <div className="flex items-center gap-3 pt-3 border-t border-primary/8">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-foreground/40 hover:text-foreground/80 transition-colors duration-200"
              >
                <ExternalLink className="h-3 w-3" />
                live
              </a>
            )}
            {project.link && project.repo && <div className="w-px h-3 bg-primary/10" />}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-foreground/40 hover:text-foreground/80 transition-colors duration-200"
              >
                <Github className="h-3 w-3" />
                code
              </a>
            )}
            <button
              onClick={() => setIsShowingLessons(!isShowingLessons)}
              className="ml-auto text-xs text-foreground/30 hover:text-foreground/60 transition-colors duration-200"
            >
              {isShowingLessons ? "← details" : "lessons →"}
            </button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
