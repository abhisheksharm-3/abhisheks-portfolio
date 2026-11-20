import { ContentBlock } from "@/components/shared/ContentBlock";
import type { ProjectType } from "@/lib/types/components";
import { MarginNotes } from "./MarginNotes";

/**
 * What a project does, at the full reading measure under a serif heading, then the notes written
 * while building it.
 */
export function ProjectDetailOverview({ project }: { project: ProjectType }) {
  const overview =
    project.longDescription !== project.description ? project.longDescription : undefined;
  const notes = project.notes ?? [];

  return (
    <>
      {overview && (
        <div className="mb-16">
          <ContentBlock label="what it does">
            <p className="max-w-[62ch] text-base font-light leading-[1.75] text-foreground/75">
              {overview}
            </p>
          </ContentBlock>
        </div>
      )}

      {notes.length > 0 && (
        <div className="mb-16">
          <ContentBlock label="notes from building it">
            <MarginNotes notes={notes} />
          </ContentBlock>
        </div>
      )}
    </>
  );
}
