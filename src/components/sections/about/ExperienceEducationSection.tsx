import { EDUCATION_DATA, EXPERIENCE_DATA } from "@/data/about";
import { TimelineCardPropsType } from "@/lib/types/components";
import { Briefcase, GraduationCap } from "lucide-react";

/**
 * A reusable editorial timeline for displaying a list of experience or education events.
 */
export const TimelineCard = ({ title, Icon, items }: TimelineCardPropsType) => (
  <div>
    <div className="flex items-center gap-3 mb-8">
      <Icon className="h-4 w-4 text-primary/40" strokeWidth={1.5} />
      <p className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light">
        {title}
      </p>
    </div>

    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-[3px] top-2 bottom-2 w-px bg-primary/10" />

      <div className="space-y-10">
        {items.map((item, index) => (
          <div key={index} className="relative pl-8">
            {/* Timeline dot */}
            <div className="absolute left-0 top-[6px] w-1.5 h-1.5 rounded-full bg-primary/25" />

            <h4 className="text-base font-medium text-foreground/85 leading-snug">
              {item.title}
            </h4>
            <div className="flex flex-wrap items-center gap-x-2 text-xs text-foreground/45 mt-1 mb-2 font-light">
              <span>{item.subtitle}</span>
              <span className="text-primary/20">·</span>
              <span className="italic">{item.date}</span>
            </div>
            <p className="text-sm text-foreground/55 font-light leading-relaxed">
              {item.description}
            </p>
            {item.badges && (
              <div className="flex flex-wrap gap-2 mt-3">
                {item.badges.map((badge) => (
                  <span
                    key={badge.label}
                    className="text-[11px] text-primary/50 font-light"
                  >
                    {badge.label}: {badge.value}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);

/**
 * Renders the Experience and Education sections in a two-column layout.
 */
export const ExperienceEducationSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
      <TimelineCard
        title="Experience"
        Icon={Briefcase}
        items={EXPERIENCE_DATA}
      />
      <TimelineCard
        title="Education"
        Icon={GraduationCap}
        items={EDUCATION_DATA}
      />
    </div>
  );
};
