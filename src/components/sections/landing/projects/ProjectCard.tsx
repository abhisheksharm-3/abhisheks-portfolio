"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { ProjectType } from "@/lib/types";

const ProjectImageOverlay = ({ isHovered }: { isHovered: boolean }) => (
  <div
    className="absolute inset-0 z-10 bg-gradient-to-br from-background/10 via-background/40 to-background/80 transition-opacity duration-500"
    style={{ opacity: isHovered ? 0.8 : 1 }}
  />
);

const ProjectImage = ({ project, isHovered }: { project: ProjectType; isHovered: boolean }) => (
  <motion.div
    className="h-full w-full"
    animate={{ scale: isHovered ? 1.06 : 1 }}
    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
  >
    <Image
      src={project.imageSrc}
      alt={project.title}
      fill
      className="object-cover will-change-transform"
      sizes="(max-width: 1024px) 100vw, 50vw"
      draggable={false}
    />
  </motion.div>
);

const ProjectTags = ({ tags, isHovered }: { tags?: string[]; isHovered: boolean }) => {
  if (!tags?.length) return null;
  const visibleTags = tags.slice(0, 2);
  const remainingCount = tags.length - 2;

  return (
    <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 flex flex-col gap-1.5 items-end">
      {visibleTags.map((tag) => (
        <motion.div
          key={tag}
          animate={{ opacity: isHovered ? 1 : 0.85, scale: isHovered ? 1.03 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Badge
            variant="secondary"
            className="bg-background/90 text-foreground/70 border-border/50 backdrop-blur-md text-[10px] sm:text-xs font-medium px-2 py-0.5"
          >
            {tag}
          </Badge>
        </motion.div>
      ))}
      {remainingCount > 0 && (
        <Badge
          variant="outline"
          className="bg-background/60 text-muted-foreground border-border/40 backdrop-blur-sm text-[10px] px-2 py-0.5"
        >
          +{remainingCount}
        </Badge>
      )}
    </div>
  );
};

const ProjectActions = ({ project }: { project: ProjectType }) => {
  const { url, github } = project;

  return (
    <div className="flex items-center gap-3 h-8">
      {url && (
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
        >
          <ExternalLink className="h-3 w-3" />
          Visit
        </Link>
      )}
      {url && github && <div className="w-px h-3 bg-border/50" />}
      {github && (
        <Link
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
        >
          <Github className="h-3 w-3" />
          Code
        </Link>
      )}
    </div>
  );
};

const ProjectHeader = ({ project, isHovered }: { project: ProjectType; isHovered: boolean }) => (
  <CardHeader className="pt-4 pb-0 px-4 sm:pt-6 sm:px-6 md:pt-8 md:px-8">
    <div className="flex items-center justify-end mb-3">
      <span className="text-[10px] sm:text-xs text-muted-foreground font-mono">{project.year}</span>
    </div>
    <CardTitle className="text-lg sm:text-2xl md:text-3xl font-serif tracking-tight leading-tight mb-3">
      <span className={`inline-block transition-colors duration-300 ${isHovered ? "text-primary" : "text-foreground"}`}>
        {project.title}
      </span>
    </CardTitle>
    <div className="h-[1px] bg-primary/15" />
  </CardHeader>
);

const ProjectDescription = ({ description, isHovered }: { description: string; isHovered: boolean }) => (
  <CardContent className="pt-3 px-4 sm:pt-4 sm:px-6 md:pt-5 md:px-8 flex-1">
    <p
      className="text-muted-foreground text-xs sm:text-sm leading-relaxed font-light transition-opacity duration-300"
      style={{ opacity: isHovered ? 0.95 : 0.75 }}
    >
      {description}
    </p>
  </CardContent>
);

const ProjectFooter = ({ project }: { project: ProjectType }) => (
  <CardFooter className="px-4 pt-3 pb-4 sm:px-6 sm:pb-6 md:px-8 md:pb-8 flex justify-between items-center">
    <span className="text-[10px] sm:text-xs text-muted-foreground font-light">
      {project.role || "Developer"}
    </span>
    <ProjectActions project={project} />
  </CardFooter>
);

export const ProjectImageContainer = ({
  project,
  isHovered,
}: {
  project: ProjectType;
  isHovered: boolean;
}) => (
  <div className="relative w-full h-48 sm:h-60 md:h-80 overflow-hidden rounded-t-xl sm:rounded-t-2xl">
    <ProjectImageOverlay isHovered={isHovered} />
    <ProjectImage project={project} isHovered={isHovered} />
    <ProjectTags tags={project.tags} isHovered={isHovered} />
  </div>
);

export const ProjectContent = ({
  project,
  isHovered,
}: {
  project: ProjectType;
  isHovered: boolean;
}) => (
  <div className="flex flex-col flex-1">
    <ProjectHeader project={project} isHovered={isHovered} />
    <ProjectDescription description={project.description} isHovered={isHovered} />
    <ProjectFooter project={project} />
  </div>
);
