/** Cuts the resume corpus down to one lens, joining project rows to their entries in projects.ts. */
import { projects } from "../data/projects.ts";
import {
  RESUME_ACHIEVEMENTS,
  RESUME_EXPERIENCE,
  RESUME_PROJECTS,
  RESUME_SKILLS,
} from "../data/resume.ts";
import type { ResumeBullet, ResumeLens } from "./types/resume.ts";

/** A lens id, or "all" for the full corpus the page shows on request. */
export type ResumeCut = ResumeLens | "all";

const isInCut = (lenses: readonly ResumeLens[], cut: ResumeCut) =>
  cut === "all" || lenses.includes(cut);

const bulletsIn = (bullets: readonly ResumeBullet[], cut: ResumeCut) =>
  bullets.filter((bullet) => isInCut(bullet.lenses, cut));

/**
 * The resume as one lens shows it. Items keep corpus order, which is ranked strongest first.
 * Throws when a project slug is missing from projects.ts, so a rename fails the build.
 */
export function cutResume(cut: ResumeCut) {
  const experience = RESUME_EXPERIENCE.filter((role) => isInCut(role.lenses, cut)).map((role) => ({
    ...role,
    engagements: role.engagements
      .map((engagement) => ({ ...engagement, bullets: bulletsIn(engagement.bullets, cut) }))
      .filter((engagement) => engagement.bullets.length > 0),
  }));

  const projectRows = RESUME_PROJECTS.filter((row) => isInCut(row.lenses, cut)).map((row) => {
    const project = projects.find((candidate) => candidate.slug === row.slug);
    if (!project) throw new Error(`resume project "${row.slug}" is not in src/data/projects.ts`);
    return {
      ...row,
      title: project.title,
      url: project.url ?? project.github,
      bullets: bulletsIn(row.bullets, cut),
    };
  });

  const achievements = RESUME_ACHIEVEMENTS.filter((entry) => isInCut(entry.lenses, cut)).map(
    (entry) => ({ ...entry, bullets: bulletsIn(entry.bullets, cut) }),
  );

  const skills = RESUME_SKILLS.filter((group) => isInCut(group.lenses, cut));

  return { experience, projects: projectRows, achievements, skills };
}

export type ResumeCutView = ReturnType<typeof cutResume>;
