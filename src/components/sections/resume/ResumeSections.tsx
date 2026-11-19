"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import { RESUME_EDUCATION } from "@/data/resume";
import type { ResumeCutView } from "@/lib/resume";
import type { ResumeBullet } from "@/lib/types/resume";
import { cn } from "@/lib/utils";

type ResumeSectionsPropsType = {
  view: ResumeCutView;
  /** In the full cut, claims that sit on no PDF render lighter, so the one-page cut stays visible. */
  isFullCut: boolean;
};

const STATUS_LABEL = { internal: "internal", "in-progress": "ongoing" } as const;

const COLLAPSED = { height: 0, opacity: 0, overflow: "hidden" } as const;
const OPEN = { height: "auto", opacity: 1, transitionEnd: { overflow: "visible" } } as const;
const COLLAPSE_EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Presence wrapper for anything that can enter or leave between cuts. It collapses and expands
 * in height and opacity, and `layout="position"` lets what stays glide instead of jump. Spacing
 * lives inside the child as padding, because a margin cannot collapse with the height. With
 * reduced motion the change is instant.
 */
const Collapse = ({ as = "div", children }: { as?: "div" | "li"; children: ReactNode }) => {
  const reduceMotion = useReducedMotion();
  const Tag = as === "li" ? motion.li : motion.div;

  return (
    <Tag
      layout="position"
      initial={COLLAPSED}
      animate={OPEN}
      exit={COLLAPSED}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.28, ease: COLLAPSE_EASE }}
    >
      {children}
    </Tag>
  );
};

const Section = ({ label, children }: { label: string; children: ReactNode }) => (
  <section className="grid gap-x-14 gap-y-6 border-t border-foreground/8 py-12 lg:grid-cols-[12rem_1fr]">
    <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary/60">{label}</h2>
    <div className="-mb-12">{children}</div>
  </section>
);

const Meta = ({ children }: { children: ReactNode }) => (
  <p className="font-mono text-[11px] tracking-[0.05em] text-foreground/60">{children}</p>
);

/**
 * Bullets keyed by their text: a claim present in both cuts keeps its element and stays put,
 * a dropped one collapses, an added one expands. Claims on no pdf are lighter and say so to
 * screen readers.
 */
const BulletList = ({
  bullets,
  isFullCut,
}: {
  bullets: readonly ResumeBullet[];
  isFullCut: boolean;
}) => (
  <ul className="mt-2.5 max-w-3xl">
    <AnimatePresence initial={false}>
      {bullets.map((bullet) => {
        const isOffPdf = isFullCut && bullet.lenses.length === 0;
        return (
          <Collapse as="li" key={bullet.text}>
            <div
              className={cn(
                "relative py-1.5 pl-5 text-sm font-light leading-relaxed before:absolute before:left-0 before:top-[1.2em] before:h-px before:w-2.5 before:bg-foreground/25",
                isOffPdf ? "text-foreground/60" : "text-foreground/80",
              )}
            >
              {bullet.text.replace(/ -- /g, " – ")}
              {isOffPdf && <span className="sr-only"> (not on any pdf)</span>}
              {bullet.status && bullet.status !== "shipped" && (
                <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.15em] text-primary/60">
                  {STATUS_LABEL[bullet.status]}
                </span>
              )}
            </div>
          </Collapse>
        );
      })}
    </AnimatePresence>
  </ul>
);

const period = (value: string) => value.replace(/ -- /g, " – ");

/**
 * The resume body for one cut: experience, projects, achievements, education, skills. Roles,
 * engagements, projects and achievements enter and leave with the same collapse as bullets.
 */
export const ResumeSections = ({ view, isFullCut }: ResumeSectionsPropsType) => (
  <div>
    <Section label="experience">
      <AnimatePresence initial={false}>
        {view.experience.map((role) => (
          <Collapse key={role.company}>
            <article className="pb-12">
              <div className="grid gap-1 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-x-6">
                <h3 className="font-serif text-2xl text-foreground/90 sm:col-start-1 sm:row-start-1 sm:text-3xl">
                  {role.company}
                </h3>
                <p className="font-serif text-lg italic text-foreground/65 sm:col-start-1 sm:row-start-2">
                  {role.title}
                </p>
                <Meta>
                  {role.location} · {period(role.period)}
                </Meta>
              </div>

              <div className="mt-8 -mb-10">
                <AnimatePresence initial={false}>
                  {role.engagements.map((engagement) => (
                    <Collapse key={engagement.name}>
                      <div className="pb-10">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                          <p className="text-sm text-foreground/85">{engagement.name}</p>
                          <Meta>{period(engagement.period)}</Meta>
                        </div>
                        <Meta>{engagement.stack}</Meta>
                        <BulletList bullets={engagement.bullets} isFullCut={isFullCut} />
                      </div>
                    </Collapse>
                  ))}
                </AnimatePresence>
              </div>
            </article>
          </Collapse>
        ))}
      </AnimatePresence>
    </Section>

    <Section label="projects">
      <AnimatePresence initial={false}>
        {view.projects.map((project) => (
          <Collapse key={project.slug}>
            <article className="pb-12">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <Link
                  href={`/projects/${project.slug}`}
                  transitionTypes={["nav-back"]}
                  className="font-serif text-xl text-foreground/90 underline decoration-foreground/30 underline-offset-4 transition-colors duration-200 hover:decoration-foreground/60"
                >
                  {project.title}
                </Link>
                <Meta>{period(project.period)}</Meta>
              </div>
              <Meta>{project.stack}</Meta>
              <BulletList bullets={project.bullets} isFullCut={isFullCut} />
            </article>
          </Collapse>
        ))}
      </AnimatePresence>
    </Section>

    <Section label="achievements">
      <AnimatePresence initial={false}>
        {view.achievements.map((entry) => (
          <Collapse key={entry.title}>
            <article className="pb-12">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                {entry.url ? (
                  <a
                    href={entry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-foreground/85 underline decoration-foreground/30 underline-offset-4 transition-colors duration-200 hover:decoration-foreground/60"
                  >
                    {entry.title}
                  </a>
                ) : (
                  <p className="text-base text-foreground/85">{entry.title}</p>
                )}
                <Meta>{entry.period}</Meta>
              </div>
              <p className="mt-1 text-sm font-light text-foreground/65">
                {[entry.detail, entry.note].filter(Boolean).join(", ")}
              </p>
              {entry.bullets.length > 0 && (
                <BulletList bullets={entry.bullets} isFullCut={isFullCut} />
              )}
            </article>
          </Collapse>
        ))}
      </AnimatePresence>
    </Section>

    <Section label="education">
      <div className="pb-12">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="text-base text-foreground/85">{RESUME_EDUCATION.school}</p>
          <Meta>{period(RESUME_EDUCATION.period)}</Meta>
        </div>
        <p className="mt-1 text-sm font-light text-foreground/65">{RESUME_EDUCATION.degree}</p>
      </div>
    </Section>

    <Section label="skills">
      <dl className="grid max-w-3xl gap-x-8 gap-y-4 pb-12 sm:grid-cols-[10rem_1fr]">
        {view.skills.map((group) => (
          <div key={group.label} className="contents">
            <dt className="text-sm text-foreground/80">{group.label.toLowerCase()}</dt>
            <dd className="font-mono text-xs leading-relaxed text-foreground/65">
              {group.items.join(", ")}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  </div>
);
