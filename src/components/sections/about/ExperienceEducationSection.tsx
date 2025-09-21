import { Card, CardContent } from "@/components/ui/card";
import { educationData, experienceData } from "@/data/about";
import { TypeTimelineCardProps } from "@/lib/types";
import { Briefcase, GraduationCap } from "lucide-react";

/**
 * A reusable card component for displaying a list of timeline events.
 */
export const TimelineCard = ({ title, Icon, items }: TypeTimelineCardProps) => (
  <Card className="border-primary/10 backdrop-blur-sm relative">
    <CardContent className="p-8">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 rounded-md border border-primary/10 flex items-center justify-center mr-3 bg-primary/5">
          <Icon className="h-5 w-5 text-primary/70" strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-serif italic">{title}</h3>
      </div>
      <div className="space-y-8">
        {items.map((item, index) => (
          <div
            key={index}
            className="relative pl-6 border-l border-primary/10 group hover:border-primary/30 transition-colors duration-300"
          >
            <div className="absolute left-[-4px] top-0 w-2 h-2 rounded-full bg-primary/40 group-hover:bg-primary/70 transition-colors duration-300" />
            <h4 className="text-lg font-medium group-hover:text-primary/90 transition-colors duration-300">
              {item.title}
            </h4>
            <div className="flex items-center text-sm text-foreground/60 mt-1 mb-2">
              <span className="font-medium">{item.subtitle}</span>
              <span className="mx-2">•</span>
              <span className="italic">{item.date}</span>
            </div>
            <p className="text-sm text-foreground/70 font-light">
              {item.description}
            </p>
            {item.badges && (
              <div className="flex gap-2 mt-3">
                {item.badges.map((badge) => (
                  <div
                    key={badge.label}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-primary/5 text-primary/80 border border-primary/10"
                  >
                    {badge.label}: {badge.value}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-px h-16 bg-gradient-to-t from-primary/20 to-transparent" />
        <div className="absolute bottom-0 right-0 h-px w-16 bg-gradient-to-l from-primary/20 to-transparent" />
      </div>
    </CardContent>
  </Card>
);

/**
 * Renders the Experience and Education sections in a two-column layout.
 */
export const ExperienceEducationSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <TimelineCard
        title="Experience"
        Icon={Briefcase}
        items={experienceData}
      />
      <TimelineCard
        title="Education"
        Icon={GraduationCap}
        items={educationData}
      />
    </div>
  );
};
