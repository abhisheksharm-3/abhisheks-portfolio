"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import Image from "next/image";
import { ResurrectionMeter } from "./ResurrectionMeter";
import { RiCrossFill, RiGhostFill } from "@remixicon/react";

const causeOfDeath = [
  "Died of scope creep",
  "Suffocated under technical debt",
  "Fatal API deprecation",
  "Starved of resources",
  "Crushed by competing priorities",
  "Expired due to market changes",
  "Victim of budget cuts"
];

export const GraveyardProjectCard = ({ project, index }: {
  project: {
    title: string;
    description: string;
    reason: string;
    lessons: string;
    progress: string;
    technologies: string[];
    year: string;
    duration: string;
    imageSrc: string;
    epitaph: string;
    resurrectionPotential?: number;
  };
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

  const randomCause = causeOfDeath[index % causeOfDeath.length];

  const handleFlip = () => setIsFlipped((f) => !f);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: 0.1 + index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="h-full"
    >
      <Card
        className={`h-full overflow-hidden border-primary/10 backdrop-blur-sm transition-all duration-300 py-0 relative
            ${isHovered ? 'shadow-xl border-red-500/20' : 'shadow-md'}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Corners */}
        <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-px h-16 bg-gradient-to-b from-red-500/30 to-transparent" />
          <div className="absolute top-0 left-0 h-px w-16 bg-gradient-to-r from-red-500/30 to-transparent" />
        </div>
        <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 right-0 w-px h-16 bg-gradient-to-t from-red-500/30 to-transparent" />
          <div className="absolute bottom-0 right-0 h-px w-16 bg-gradient-to-l from-red-500/30 to-transparent" />
        </div>
        {/* Header */}
        <div className="p-6 pb-0 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md border border-red-500/20 bg-red-500/5">
              <RiCrossFill className="h-4 w-4 text-red-500/70" strokeWidth={1.5} />
            </div>
            <span className="text-xs text-red-500/70 font-light">Abandoned at {project.progress}</span>
          </div>
          <span className="text-xs text-primary/60 px-2 py-1 border border-primary/10 rounded-md">{project.year}</span>
        </div>
        {/* Image */}
        <div className="relative w-full h-52 overflow-hidden mt-6">
          <motion.div
            className="w-full h-full"
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src={project.imageSrc}
              alt={project.title}
              fill
              className="object-cover opacity-40 grayscale"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
            {/* Ghost animation */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-gray-900/60 via-gray-800/50 to-gray-900/70 backdrop-blur-[2px]"
              animate={isHovered ? { opacity: 1 } : { opacity: 0.9 }}
            >
              <motion.div
                animate={isHovered ?
                  { y: [0, -10, 0], opacity: 1 } :
                  { y: 0, opacity: 0.7 }
                }
                transition={{
                  y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 0.3 }
                }}
                className="flex flex-col items-center"
              >
                <RiGhostFill className="h-14 w-14 text-white/60" strokeWidth={1.5} />
              </motion.div>
            </motion.div>
            {/* Gradient overlay & title */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-2xl font-serif italic text-white mb-1">{project.title}</h3>
              <p className="text-white/70 text-sm line-clamp-2">{project.description}</p>
            </div>
          </motion.div>
          {/* Tags */}
          <div className="absolute top-4 right-4 flex flex-wrap gap-2 justify-end">
            {project.technologies.slice(0, 3).map((tech: string) => (
              <span
                key={tech}
                className="px-2 py-1 bg-black/50 backdrop-blur-sm text-white/90 rounded-md text-xs border border-white/10"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 bg-black/50 backdrop-blur-sm text-white/90 rounded-md text-xs border border-white/10">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>
        {/* Content */}
        <div className="p-6">
          {isFlipped ? (
            <div className="h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-md border border-amber-500/20 bg-amber-500/5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500/70">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5"></path>
                    <path d="M2 12l10 5 10-5"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-serif italic">Lessons Learned</h3>
              </div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "3rem" }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-[1px] bg-gradient-to-r from-amber-500/30 to-transparent mb-6"
              />
              <div className="bg-amber-500/5 border border-amber-500/10 rounded-md p-4 mb-6">
                <p className="text-foreground/70 text-sm font-light leading-relaxed">
                  {project.lessons}
                </p>
              </div>
              <div className="flex items-center justify-between text-xs text-foreground/50 pt-2 border-t border-primary/5 mt-auto">
                <div className="flex items-center">
                  <span className="text-amber-500/70 font-light">{project.title}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleFlip}
                  className="text-xs text-primary/70 hover:text-primary px-2 py-1 h-auto"
                >
                  ← Back to project
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6 p-3 bg-red-500/5 border border-red-500/10 rounded-md relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-background px-3">
                  <RiCrossFill className="h-4 w-4 text-red-500/70 mx-auto" strokeWidth={1.5} />
                </div>
                <p className="text-center text-xs italic text-foreground/60 pt-1">
                  &quot;{project.epitaph}&quot;
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-red-500/80 mb-1 flex items-center">
                    <span className="inline-block w-3 h-3 bg-red-500/20 rounded-full mr-2"></span>
                    Cause of death:
                  </h4>
                  <p className="text-foreground/60 text-xs font-light leading-relaxed pl-5">
                    {randomCause}. {project.reason}
                  </p>
                </div>
                {project.resurrectionPotential !== undefined && (
                  <div className="pt-2">
                    <ResurrectionMeter potential={project.resurrectionPotential} />
                  </div>
                )}
                <div className="flex items-center justify-between text-xs text-foreground/50 pt-2 border-t border-primary/5">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-2 text-foreground/30" />
                    <span>Lived for {project.duration}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleFlip}
                    className="text-xs text-primary/70 hover:text-primary px-2 py-1 h-auto"
                  >
                    Lessons learned →
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </Card>
    </motion.div>
  );
}