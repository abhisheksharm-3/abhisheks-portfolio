/** Shapes of the resume corpus in src/data/resume.ts. */

/** A cut of the corpus aimed at one kind of role. Each lens compiles to a one-page PDF. */
export type ResumeLens = "general" | "fde" | "fullstack";

/** How far a claim has gone. Anything short of shipped is labelled wherever it renders. */
export type ClaimStatus = "shipped" | "internal" | "in-progress";

/**
 * One claim. `lenses` lists the cuts it appears in; an empty list keeps it in the corpus and the
 * page's full view, but off every PDF.
 */
export interface ResumeBullet {
  text: string;
  lenses: readonly ResumeLens[];
  status?: ClaimStatus;
}

/** A client engagement inside a job. The client stays unnamed; `name` describes it. */
export interface ResumeEngagement {
  name: string;
  period: string;
  stack: string;
  bullets: readonly ResumeBullet[];
}

export interface ResumeRole {
  company: string;
  title: string;
  location: string;
  period: string;
  lenses: readonly ResumeLens[];
  engagements: readonly ResumeEngagement[];
}

/** A project row. Title and links come from src/data/projects.ts by slug. */
export interface ResumeProject {
  slug: string;
  stack: string;
  period: string;
  lenses: readonly ResumeLens[];
  bullets: readonly ResumeBullet[];
}

/** An achievement, talk, publication, or certification. */
export interface ResumeEntry {
  title: string;
  detail: string;
  /** Right-hand italic beside `detail`, such as a hackathon track. */
  note?: string;
  period: string;
  url?: string;
  lenses: readonly ResumeLens[];
  bullets: readonly ResumeBullet[];
}

export interface ResumeSkillGroup {
  label: string;
  items: readonly string[];
  lenses: readonly ResumeLens[];
}

export interface ResumeLensMeta {
  id: ResumeLens;
  label: string;
  /** The page's subhead for this lens, in the site's lowercase voice. */
  summary: string;
  /** The PDF's Summary section, in resume voice. */
  pdfSummary: string;
}
