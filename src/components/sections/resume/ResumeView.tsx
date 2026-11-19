"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
  summary: "the whole record, including what does not fit on a page. lighter lines live only here.",
} as const;

const CUTS = [...RESUME_LENSES, FULL_CUT];

const PdfLink = ({ lens, label }: { lens: string; label: string }) => (
  <a
    href={`/resume/${lens}.pdf`}
    download={`abhishek-sharma-${lens}.pdf`}
    className="group inline-flex items-center gap-2 self-start font-mono text-xs tracking-[0.05em] text-foreground/65 transition-colors duration-200 hover:text-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/40 sm:self-auto"
  >
    <ArrowDown
      aria-hidden="true"
      className="h-3 w-3 transition-transform duration-200 group-hover:translate-y-0.5"
    />
    {label} pdf, one page
  </a>
);

/**
 * The cut's summary. It is the only part of the page that crossfades: old and new sit in the
 * same grid cell, so the swap does not reflow while they overlap.
 */
const CutSummary = ({ cutId, children }: { cutId: string; children: string }) => {
  const reduceMotion = useReducedMotion();
  const duration = reduceMotion ? 0 : 0.2;

  return (
    <span className="grid">
      <AnimatePresence initial={false}>
        <motion.span
          key={cutId}
          className="col-start-1 row-start-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration, ease: "easeOut" } }}
          exit={{ opacity: 0, transition: { duration, ease: "easeIn" } }}
        >
          {children}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

/**
 * The resume page body. A cut picks which claims show, matching the PDF of the same name;
 * "everything" shows the full corpus and points the download at the general PDF. Switching
 * cuts animates only what changed: the summary crossfades, and bullets enter and leave.
 */
export const ResumeView = () => {
  const [cut, setCut] = useState<ResumeCut>("general");
  const active = CUTS.find((candidate) => candidate.id === cut) ?? CUTS[0];
  const pdf =
    cut === "all" ? { lens: "general", label: "general" } : { lens: cut, label: active.label };

  return (
    <>
      <PageHeader
        eyebrow="resume"
        title="the record"
        intro={<CutSummary cutId={active.id}>{active.summary}</CutSummary>}
      />

      <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <fieldset>
          <legend className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-primary/60">
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
                    : "border-transparent text-foreground/60 hover:text-foreground/85",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </fieldset>

        <PdfLink lens={pdf.lens} label={pdf.label} />
      </div>

      <p className="sr-only" aria-live="polite">
        showing the {active.label} cut
      </p>

      <ResumeSections view={cutResume(cut)} isFullCut={cut === "all"} />

      <div className="border-t border-foreground/8 py-10">
        <PdfLink lens={pdf.lens} label={pdf.label} />
      </div>
    </>
  );
};
