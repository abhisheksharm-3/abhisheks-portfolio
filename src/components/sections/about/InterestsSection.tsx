import { PERSONAL_INTERESTS } from "@/data/about";

/**
 * Renders personal interests as a clean editorial list.
 */
export const InterestsSection = () => {
  return (
    <div>
      <p className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light mb-4">
        beyond code
      </p>
      <h3 className="text-2xl font-serif text-foreground mb-8">What keeps me going</h3>
      <div className="h-px bg-primary/10 mb-10" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
        {PERSONAL_INTERESTS.map((interest) => (
          <div key={interest.category}>
            <div className="flex items-center gap-2 mb-2">
              <interest.icon className="h-3.5 w-3.5 text-primary/35" strokeWidth={1.5} />
              <p className="text-sm font-medium text-foreground/70">{interest.category}</p>
            </div>
            <p className="text-sm text-foreground/50 font-light leading-relaxed mb-3">
              {interest.description}
            </p>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {interest.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] text-primary/35 uppercase tracking-[0.1em] font-light"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
