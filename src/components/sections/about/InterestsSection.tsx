import { DefinitionRows } from "@/components/sections/about/DefinitionRows";
import { PhotoStrip } from "@/components/sections/about/PhotoStrip";
import { PERSONAL_INTERESTS } from "@/data/about";

const rows = PERSONAL_INTERESTS.map(({ category, description }) => ({
  term: category,
  detail: description,
}));

/**
 * Renders personal interests as a plain two-column list: the topic, then one true line.
 * The photo strip sits above it and renders nothing until there are photos.
 */
export const InterestsSection = () => {
  return (
    <div>
      <h2 className="text-2xl font-serif text-foreground mb-8">what keeps me going</h2>
      <div className="h-px bg-primary/10 mb-8" />

      <PhotoStrip />

      <DefinitionRows rows={rows} />
    </div>
  );
};
