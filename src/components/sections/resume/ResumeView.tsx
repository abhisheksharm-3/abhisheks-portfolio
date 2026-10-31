"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useState } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { RESUME_LENSES } from "@/data/resume";
import { cutResume, type ResumeCut } from "@/lib/resume";
import { cn } from "@/lib/utils";
import { ResumeSections } from "./ResumeSections";

const FULL_CUT = {
  id: "all",
  label: "everything",
  summary: "the whole record, including what does not fit on a page. dimmer lines live only here.",
} as const;

const CUTS = [...RESUME_LENSES, FULL_CUT];

/**
 * The resume page body. A cut picks which claims show, matching the PDF of the same name;
 * "everything" shows the full corpus and points the download at the general PDF.
 */
export const ResumeView = () => {
  const [cut, setCut] = useState<ResumeCut>("general");
  const active = CUTS.find((candidate) => candidate.id === cut) ?? CUTS[0];
  const pdfLens = cut === "all" ? "general" : cut;

  return (
    <>
      <PageHeader eyebrow="resume" title="the record" intro={active.summary} />

      <div className="mb-16 flex flex-col gap-6 border-b border-foreground/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <fieldset>
          <legend className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-primary/35">
            cut for
          </legend>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {CUTS.map((option) => (
              <button
                key={option.id}
                type="button"
                aria-pressed={cut === option.id}
                onClick={() => setCut(option.id)}
                className={cn(
                  "border-b pb-1 text-sm font-light transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/40",
                  cut === option.id
                    ? "border-foreground/70 text-foreground/90"
                    : "border-transparent text-foreground/45 hover:text-foreground/75",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </fieldset>

        <a
          href={`/resume/${pdfLens}.pdf`}
          download={`abhishek-sharma-${pdfLens}.pdf`}
          className="group inline-flex items-center gap-2 self-start font-mono text-xs tracking-[0.05em] text-foreground/60 transition-colors duration-200 hover:text-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/40 sm:self-auto"
        >
          <ArrowDown className="h-3 w-3 transition-transform duration-200 group-hover:translate-y-0.5" />
          {pdfLens} pdf, one page
        </a>
      </div>

      <motion.div
        key={cut}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <ResumeSections view={cutResume(cut)} isFullCut={cut === "all"} />
      </motion.div>
    </>
  );
};
