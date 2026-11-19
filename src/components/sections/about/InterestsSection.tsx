import { PERSONAL_INTERESTS } from "@/data/about";

/**
 * Renders personal interests as a plain two-column list: the topic, then one true line.
 */
export const InterestsSection = () => {
  return (
    <div>
      <h2 className="text-2xl font-serif text-foreground mb-8">what keeps me going</h2>
      <div className="h-px bg-primary/10 mb-2" />

      <dl className="divide-y divide-primary/10">
        {PERSONAL_INTERESTS.map((interest) => (
          <div
            key={interest.category}
            className="grid grid-cols-1 gap-1 py-5 sm:grid-cols-[10rem_1fr] sm:gap-10"
          >
            <dt className="text-sm text-foreground/85">{interest.category}</dt>
            <dd className="max-w-2xl text-sm font-light leading-relaxed text-foreground/65">
              {interest.description}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
