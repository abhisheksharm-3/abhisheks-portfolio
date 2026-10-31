import Link from "next/link";
import type { ReactNode } from "react";
import { RESUME_EDUCATION } from "@/data/resume";
import type { ResumeCutView } from "@/lib/resume";
import type { ResumeBullet } from "@/lib/types/resume";
import { cn } from "@/lib/utils";

type ResumeSectionsPropsType = {
  view: ResumeCutView;
  /** In the full cut, claims that sit on no PDF render dimmer, so the one-page cut stays visible. */
  isFullCut: boolean;
};

const STATUS_LABEL = { internal: "internal", "in-progress": "ongoing" } as const;

const Section = ({ label, children }: { label: string; children: ReactNode }) => (
  <section className="grid gap-x-14 gap-y-6 border-t border-foreground/8 py-12 lg:grid-cols-[12rem_1fr]">
    <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary/35">{label}</h2>
    <div className="space-y-12">{children}</div>
  </section>
);

const Meta = ({ children }: { children: ReactNode }) => (
  <p className="font-mono text-[11px] tracking-[0.05em] text-foreground/40">{children}</p>
);

const BulletList = ({
  bullets,
  isFullCut,
}: {
  bullets: readonly ResumeBullet[];
  isFullCut: boolean;
}) => (
  <ul className="mt-4 max-w-3xl space-y-3">
    {bullets.map((bullet) => (
      <li
        key={bullet.text}
        className={cn(
          "relative pl-5 text-sm font-light leading-relaxed before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-foreground/25",
          isFullCut && bullet.lenses.length === 0 ? "text-foreground/40" : "text-foreground/65",
        )}
      >
        {bullet.text.replace(/ -- /g, " – ")}
        {bullet.status && bullet.status !== "shipped" && (
          <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.15em] text-primary/40">
            {STATUS_LABEL[bullet.status]}
          </span>
        )}
      </li>
    ))}
  </ul>
);

const period = (value: string) => value.replace(/ -- /g, " – ");

/** The resume body for one cut: experience, projects, achievements, education, skills. */
export const ResumeSections = ({ view, isFullCut }: ResumeSectionsPropsType) => (
  <div>
    <Section label="experience">
      {view.experience.map((role) => (
        <article key={role.company}>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="font-serif text-2xl text-foreground/90 sm:text-3xl">{role.company}</h3>
            <Meta>
              {role.location} · {period(role.period)}
            </Meta>
          </div>
          <p className="mt-1 font-serif text-lg italic text-foreground/60">{role.title}</p>

          <div className="mt-8 space-y-10">
            {role.engagements.map((engagement) => (
              <div key={engagement.name}>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <p className="text-sm text-foreground/85">{engagement.name}</p>
                  <Meta>{period(engagement.period)}</Meta>
                </div>
                <Meta>{engagement.stack}</Meta>
                <BulletList bullets={engagement.bullets} isFullCut={isFullCut} />
              </div>
            ))}
          </div>
        </article>
      ))}
    </Section>

    <Section label="projects">
      {view.projects.map((project) => (
        <article key={project.slug}>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            <Link
              href={`/projects/${project.slug}`}
              className="font-serif text-xl text-foreground/90 underline decoration-foreground/20 underline-offset-4 transition-colors duration-200 hover:decoration-foreground/60"
            >
              {project.title}
            </Link>
            <Meta>{period(project.period)}</Meta>
          </div>
          <Meta>{project.stack}</Meta>
          <BulletList bullets={project.bullets} isFullCut={isFullCut} />
        </article>
      ))}
    </Section>

    <Section label="achievements">
      {view.achievements.map((entry) => (
        <article key={entry.title}>
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
            {entry.url ? (
              <a
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-foreground/85 underline decoration-foreground/20 underline-offset-4 transition-colors duration-200 hover:decoration-foreground/60"
              >
                {entry.title}
              </a>
            ) : (
              <p className="text-base text-foreground/85">{entry.title}</p>
            )}
            <Meta>{entry.period}</Meta>
          </div>
          <p className="mt-1 text-sm font-light text-foreground/55">
            {[entry.detail, entry.note].filter(Boolean).join(", ")}
          </p>
          {entry.bullets.length > 0 && <BulletList bullets={entry.bullets} isFullCut={isFullCut} />}
        </article>
      ))}
    </Section>

    <Section label="education">
      <div>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <p className="text-base text-foreground/85">{RESUME_EDUCATION.school}</p>
          <Meta>{period(RESUME_EDUCATION.period)}</Meta>
        </div>
        <p className="mt-1 text-sm font-light text-foreground/55">{RESUME_EDUCATION.degree}</p>
      </div>
    </Section>

    <Section label="skills">
      <dl className="grid max-w-3xl gap-x-8 gap-y-4 sm:grid-cols-[10rem_1fr]">
        {view.skills.map((group) => (
          <div key={group.label} className="contents">
            <dt className="text-sm text-foreground/80">{group.label.toLowerCase()}</dt>
            <dd className="font-mono text-xs leading-relaxed text-foreground/50">
              {group.items.join(", ")}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  </div>
);
