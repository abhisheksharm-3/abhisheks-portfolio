"use client";

import { RiGithubLine } from "@remixicon/react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { MarginNotes } from "@/components/sections/projects/MarginNotes";
import { SharedElement } from "@/components/shared/SharedElement";
import type { ProjectRowPropsType } from "@/lib/types/components";

/**
 * The install command with a copy button, for projects you install rather than visit.
 * Clipboard access can be blocked, so a failed copy stays silent: the command is selectable either way.
 */
const InstallCommand = ({ command }: { command: string }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mb-4 flex items-center gap-2 border border-foreground/8 bg-foreground/[0.03] pl-3 pr-1.5 py-1.5">
      <code className="flex-1 truncate font-mono text-[11px] text-foreground/70">{command}</code>
      <button
        aria-label={copied ? "install command copied" : "copy install command"}
        className="shrink-0 p-1.5 text-foreground/60 hover:text-foreground transition-colors duration-200"
        onClick={copy}
        type="button"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={copied ? "copied" : "copy"}
            initial={{ opacity: 0, scale: 0.6, filter: "blur(2px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.6, filter: "blur(2px)" }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
};

/** The text of a featured project card: year, title, the whole description, and its first margin note. */
export const ProjectContent = ({ project }: ProjectRowPropsType) => {
  const [note] = project.notes ?? [];

  return (
    <div className="flex flex-col flex-1 p-6 sm:p-8">
      <span className="mb-3 font-mono text-[11px] text-foreground/60">{project.year}</span>

      <SharedElement name={`project-title-${project.slug}`}>
        <h3 className="mb-4 font-serif text-3xl leading-snug text-foreground/85 transition-colors duration-200 group-hover:text-foreground group-focus-within:text-foreground sm:text-4xl">
          {project.title}
        </h3>
      </SharedElement>

      <p className="mb-6 max-w-md text-sm font-light leading-relaxed text-foreground/65">
        {project.description}
      </p>

      {note && (
        <div className="mb-8 flex-1">
          <MarginNotes notes={[note]} />
        </div>
      )}

      {project.installCommand && <InstallCommand command={project.installCommand} />}

      <div className="flex items-center justify-between gap-4 border-t border-foreground/8 pt-3">
        <span className="text-xs font-light text-foreground/60">{project.role || "developer"}</span>
        <div className="flex items-center gap-3">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-foreground/60 hover:text-foreground transition-colors duration-200"
            >
              <ExternalLink className="h-3 w-3" />
              visit
            </a>
          )}
          {project.url && project.github && <div className="w-px h-3 bg-foreground/15" />}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-foreground/60 hover:text-foreground transition-colors duration-200"
            >
              <RiGithubLine className="h-3 w-3" />
              code
            </a>
          )}
          <Link
            className="group/link flex items-center gap-1 text-xs text-foreground/60 hover:text-foreground transition-colors duration-200"
            href={`/projects/${project.slug}`}
            transitionTypes={["nav-forward"]}
          >
            details
            <ArrowUpRight className="h-3 w-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </div>
  );
};
