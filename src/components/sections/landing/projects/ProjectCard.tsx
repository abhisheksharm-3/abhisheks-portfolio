"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ExternalLink, Github, Calendar } from "lucide-react";
import { ProjectType } from "@/lib/types";

/**
 * Renders a subtle, animated geometric accent in the corner of the project image.
 * @param {{ isHovered: boolean }} props - Controls the animation state.
 */
const ProjectImageAccent = ({ isHovered }: { isHovered: boolean }) => (
  <motion.div
    className="absolute top-6 left-6 z-20"
    animate={{
      scale: isHovered ? 1.1 : 1,
      opacity: isHovered ? 1 : 0.7,
    }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    aria-hidden="true"
  >
    <div className="relative">
      <div className="w-2 h-2 rounded-full bg-primary/60 shadow-lg shadow-primary/20" />
      <motion.div
        className="absolute -top-1 -left-1 w-4 h-4 rounded-full border border-primary/30"
        animate={{ rotate: isHovered ? 180 : 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    </div>
  </motion.div>
);

/**
 * Renders a sophisticated gradient overlay that animates on hover.
 * @param {{ isHovered: boolean }} props - Controls the animation state.
 */
const ProjectImageOverlay = ({ isHovered }: { isHovered: boolean }) => (
  <motion.div
    className="absolute inset-0 z-10"
    animate={{
      background: isHovered
        ? "linear-gradient(135deg, hsl(var(--background))/0.1 0%, hsl(var(--background))/0.4 50%, hsl(var(--background))/0.8 100%)"
        : "linear-gradient(135deg, hsl(var(--background))/0.2 0%, hsl(var(--background))/0.5 50%, hsl(var(--background))/0.85 100%)",
    }}
    transition={{ duration: 0.5 }}
  />
);

/**
 * Renders the project's cover image with animated scale and filter effects on hover.
 * @param {{ project: ProjectType; isHovered: boolean }} props - Component props.
 */
const ProjectImage = ({
  project,
  isHovered,
}: {
  project: ProjectType;
  isHovered: boolean;
}) => (
  <motion.div
    className="h-full w-full"
    animate={{
      scale: isHovered ? 1.08 : 1,
      filter: isHovered
        ? "brightness(1.1) saturate(1.2) contrast(1.05)"
        : "brightness(0.9) saturate(0.9)",
    }}
    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
  >
    <Image
      src={project.imageSrc}
      alt={project.title}
      fill
      className="object-cover transition-all duration-700 will-change-transform"
      sizes="(max-width: 1024px) 100vw, 50vw"
      draggable={false}
    />
  </motion.div>
);

/**
 * Renders technology tags, showing the first two and a "+N" badge for the rest.
 * @param {{ tags?: string[]; isHovered: boolean }} props - Component props.
 */
const ProjectTags = ({
  tags,
  isHovered,
}: {
  tags?: string[];
  isHovered: boolean;
}) => {
  if (!tags?.length) return null;
  const visibleTags = tags.slice(0, 2);
  const remainingCount = tags.length - 2;

  return (
    <div className="absolute top-6 right-6 z-20 flex flex-col gap-2 items-end max-w-[60%]">
      {visibleTags.map((tag, index) => (
        <motion.div
          key={tag}
          initial={{ opacity: 0, x: 20, y: -10 }}
          animate={{
            opacity: isHovered ? 1 : 0.8,
            x: 0,
            y: 0,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{
            duration: 0.4,
            delay: 0.2 + index * 0.1,
            ease: "easeOut",
          }}
        >
          <Badge
            variant="secondary"
            className="bg-background/90 text-foreground/70 border-border/50 backdrop-blur-md shadow-lg text-xs font-medium px-3 py-1.5 hover:bg-background/95 transition-colors"
          >
            {tag}
          </Badge>
        </motion.div>
      ))}
      {remainingCount > 0 && (
        <motion.div
          initial={{ opacity: 0, x: 20, y: -10 }}
          animate={{
            opacity: isHovered ? 0.9 : 0.6,
            x: 0,
            y: 0,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
        >
          <Badge
            variant="outline"
            className="bg-background/60 text-muted-foreground border-border/40 backdrop-blur-sm text-xs px-2.5 py-1"
          >
            +{remainingCount}
          </Badge>
        </motion.div>
      )}
    </div>
  );
};

/**
 * Renders project action links, transitioning between text links and full buttons on hover.
 * This component maintains a fixed height to prevent layout shift during the transition.
 * @param {{ project: ProjectType; isHovered: boolean }} props - Component props.
 */
const ProjectActions = ({
  project,
  isHovered,
}: {
  project: ProjectType;
  isHovered: boolean;
}) => {
  const hasUrl = project.url;
  const hasGithub = project.github;

  return (
    <div className="h-8 flex items-center">
      <AnimatePresence mode="wait">
        {isHovered ? (
          <motion.div
            key="buttons"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex items-center gap-2"
          >
            {hasUrl && (
              <Button
                size="sm"
                className="h-8 px-3 text-xs font-medium"
                asChild
              >
                <Link
                  href={hasUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5"
                >
                  View Live
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </Button>
            )}
            {hasGithub && (
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 text-xs font-medium"
                asChild
              >
                <Link
                  href={hasGithub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5"
                >
                  <Github className="h-3 w-3" />
                  Code
                </Link>
              </Button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="text-links"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 h-full"
          >
            {hasUrl && (
              <Link
                href={hasUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 group"
              >
                <ExternalLink className="h-3 w-3 group-hover:text-primary transition-colors" />
                Visit
              </Link>
            )}
            {hasGithub && hasUrl && <div className="w-px h-3 bg-border/50" />}
            {hasGithub && (
              <Link
                href={hasGithub}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 group"
              >
                <Github className="h-3 w-3 group-hover:text-primary transition-colors" />
                Source
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/**
 * Renders the header section of the project card content.
 * @param {{ project: ProjectType; isHovered: boolean }} props - Component props.
 */
const ProjectHeader = ({
  project,
  isHovered,
}: {
  project: ProjectType;
  isHovered: boolean;
}) => (
  <CardHeader className="pt-8 pb-0 px-8">
    <div className="flex items-center justify-between mb-4">
      <motion.div
        className="flex items-center gap-2"
        animate={{ opacity: isHovered ? 1 : 0.7 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-2 h-2 rounded-full bg-primary/60" />
        <span className="text-xs text-muted-foreground font-medium tracking-wider uppercase">
          Featured
        </span>
      </motion.div>
      <motion.div
        className="flex items-center gap-2 text-xs text-muted-foreground/80"
        animate={{ opacity: isHovered ? 0.9 : 0.6 }}
        transition={{ duration: 0.3 }}
      >
        <Calendar className="h-3 w-3" />
        <span className="font-mono">{project.year}</span>
      </motion.div>
    </div>

    <CardTitle className="text-2xl md:text-3xl font-serif tracking-tight leading-tight mb-4">
      <motion.span
        className="inline-block"
        animate={{
          color: isHovered ? "hsl(var(--primary))" : "hsl(var(--foreground))",
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {project.title}
      </motion.span>
    </CardTitle>

    <motion.div
      initial={{ width: "2rem", opacity: 0.3 }}
      animate={{
        width: isHovered ? "5rem" : "3rem",
        opacity: isHovered ? 0.8 : 0.5,
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="h-[1px] bg-gradient-to-r from-primary/50 via-primary/30 to-transparent"
    />
  </CardHeader>
);

/**
 * Renders the description section of the project card content.
 * @param {{ description: string; isHovered: boolean }} props - Component props.
 */
const ProjectDescription = ({
  description,
  isHovered,
}: {
  description: string;
  isHovered: boolean;
}) => (
  <CardContent className="pt-6 px-8 flex-1">
    <motion.div
      className="relative"
      animate={{
        opacity: isHovered ? 0.95 : 0.75,
        y: isHovered ? 0 : 2,
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/2 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <p className="relative text-muted-foreground text-sm leading-relaxed font-light px-2 py-1">
        {description}
      </p>
    </motion.div>
  </CardContent>
);

/**
 * Renders the footer section of the project card content.
 * @param {{ project: ProjectType; isHovered: boolean }} props - Component props.
 */
const ProjectFooter = ({
  project,
  isHovered,
}: {
  project: ProjectType;
  isHovered: boolean;
}) => (
  <CardFooter className="px-8 pt-6 pb-8 flex justify-between items-center">
    <motion.div
      className="flex items-center gap-3"
      animate={{ opacity: isHovered ? 0.9 : 0.6 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
        <div className="w-3 h-[1px] bg-gradient-to-r from-primary/30 to-transparent" />
      </div>
      <span className="text-xs text-muted-foreground font-medium">
        {project.role || "Developer"}
      </span>
    </motion.div>
    <ProjectActions project={project} isHovered={isHovered} />
  </CardFooter>
);

/**
 * A container component for the project's image and its decorative overlays.
 * @param {{ project: ProjectType; isHovered: boolean }} props - Component props.
 */
export const ProjectImageContainer = ({
  project,
  isHovered,
}: {
  project: ProjectType;
  isHovered: boolean;
}) => (
  <div className="relative w-full h-80 overflow-hidden rounded-t-2xl">
    <ProjectImageAccent isHovered={isHovered} />
    <ProjectImageOverlay isHovered={isHovered} />
    <ProjectImage project={project} isHovered={isHovered} />
    <ProjectTags tags={project.tags} isHovered={isHovered} />

    {/* Enhanced corner decoration */}
    <div className="absolute bottom-4 left-4 opacity-60 group-hover:opacity-80 transition-opacity duration-300">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-primary/40" />
        <div className="w-4 h-[1px] bg-gradient-to-r from-primary/30 to-transparent" />
      </div>
    </div>
  </div>
);

/**
 * A container component for the project's textual content, including header, description, and footer.
 * It uses a flex column layout to ensure the footer is always at the bottom.
 * @param {{ project: ProjectType; isHovered: boolean }} props - Component props.
 */
export const ProjectContent = ({
  project,
  isHovered,
}: {
  project: ProjectType;
  isHovered: boolean;
}) => (
  <div className="flex flex-col flex-1">
    <ProjectHeader project={project} isHovered={isHovered} />
    <ProjectDescription
      description={project.description}
      isHovered={isHovered}
    />
    <ProjectFooter project={project} isHovered={isHovered} />
  </div>
);
