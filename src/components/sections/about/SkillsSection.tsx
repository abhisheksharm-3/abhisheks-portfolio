import { EXPERTISE } from "@/data/skills-expertise";

/**
 * Renders technical skills as a clean typographic grid.
 */
export const SkillsSection = () => {
  return (
    <div>
      <h2 className="text-2xl font-serif text-foreground mb-8">what i work with</h2>
      <div className="h-px bg-primary/10 mb-10" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
        {EXPERTISE.map((category) => (
          <div key={category.title}>
            <div className="flex items-center gap-2 mb-3">
              <category.icon className="h-3.5 w-3.5 text-primary/35" strokeWidth={1.5} />
              <p className="text-[11px] text-primary/60 uppercase tracking-[0.15em] font-light">
                {category.title}
              </p>
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1.5">
              {category.skills.map((skill) => (
                <span key={skill} className="text-sm text-foreground/65 font-light">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
