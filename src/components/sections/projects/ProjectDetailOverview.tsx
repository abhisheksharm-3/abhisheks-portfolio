import type { ProjectType } from "@/lib/types/components";
import { MarginNotes } from "./MarginNotes";

const LABEL_CLASS =
  "font-mono text-[11px] uppercase leading-loose tracking-[0.2em] text-primary/60";

const ROW_CLASS = "grid gap-x-14 gap-y-6 lg:grid-cols-[1fr_1.4fr]";

/**
 * The overview text of a project detail page and its margin notes, each in the label-column grid
 * the hand-built project pages use.
 */
export function ProjectDetailOverview({ project }: { project: ProjectType }) {
  const overview =
    project.longDescription !== project.description ? project.longDescription : undefined;
  const notes = project.notes ?? [];

  return (
    <>
      {overview && (
        <section className="mb-16">
          <div className={ROW_CLASS}>
            <p className={LABEL_CLASS}>overview</p>
            <p className="max-w-xl text-base font-light leading-relaxed text-foreground/70">
              {overview}
            </p>
          </div>
        </section>
      )}

      {notes.length > 0 && (
        <section className="mb-16">
          <div className={ROW_CLASS}>
            <p className={LABEL_CLASS}>in the margin</p>
            <div className="max-w-md">
              <MarginNotes notes={notes} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
