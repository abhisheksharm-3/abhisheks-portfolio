import type { ProjectType } from "@/lib/types/components";
import { MarginNotes } from "./MarginNotes";

/**
 * Renders the overview text section for a project detail page, with the project's margin notes
 * beside it on wide screens and under it on narrow ones.
 * Clean editorial typography — no Card wrapper, no corner decorations.
 */
export function ProjectDetailOverview({ project }: { project: ProjectType }) {
  const overview =
    project.longDescription !== project.description ? project.longDescription : undefined;
  const notes = project.notes ?? [];
  if (!overview && notes.length === 0) return null;

  return (
    <div className="mb-16">
      <span className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light block mb-5">
        overview
      </span>

      <div className="h-px bg-primary/10 mb-8" />

      <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,48rem)_minmax(0,18rem)] lg:justify-between">
        {overview && (
          <p className="text-foreground/65 text-base font-light leading-relaxed">{overview}</p>
        )}
        {notes.length > 0 && <MarginNotes notes={notes} />}
      </div>
    </div>
  );
}
