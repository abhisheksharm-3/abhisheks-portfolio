import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ExpertiseType } from "@/lib/types/components";

interface SkillRowPropsType {
  service: ExpertiseType;
  index: number;
}

interface FeaturedSkillsSectionPropsType {
  mainServices: ExpertiseType[];
}

interface SecondarySkillsGridPropsType {
  additionalServices: ExpertiseType[];
}

/**
 * Every tag of an area as plain text. Nothing is truncated into a count: a reader should
 * see all of them or none.
 */
const SkillTags = ({ skills, className }: { skills: readonly string[]; className: string }) => (
  <ul className={`flex flex-wrap gap-x-4 gap-y-1 font-light text-foreground/60 ${className}`}>
    {skills.map((skill) => (
      <li key={skill}>{skill}</li>
    ))}
  </ul>
);

/**
 * Renders a single expertise row in the editorial list.
 */
const SkillRow = ({ service, index }: SkillRowPropsType) => (
  <div>
    <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-8 py-7">
      <div className="flex items-baseline gap-4 sm:w-1/3">
        <span
          aria-hidden="true"
          className="text-[11px] text-primary/40 tracking-[0.2em] font-light tabular-nums w-5 shrink-0"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <h4 className="text-lg font-light text-foreground">{service.title}</h4>
      </div>

      <div className="sm:w-2/3">
        <p className="text-foreground/65 text-sm font-light leading-relaxed">
          {service.description}
        </p>
        <SkillTags skills={service.skills} className="mt-4 text-[11px]" />
      </div>
    </div>
    <div className="h-px bg-primary/10" />
  </div>
);

/**
 * Renders the featured skills area as an editorial list with a description aside.
 */
export const FeaturedSkillsSection = ({ mainServices }: FeaturedSkillsSectionPropsType) => (
  <div className="mb-16">
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 mb-10">
      <div className="lg:w-2/5">
        <h3 className="text-2xl sm:text-3xl font-serif text-foreground mb-4">how i work</h3>
        <p className="text-foreground/65 text-sm font-light leading-relaxed mb-6">
          small slices, shipped and checked against production.
        </p>
        <Link
          href="/about"
          transitionTypes={["nav-forward"]}
          className="group inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors duration-200"
        >
          see how i build things
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>

      <div className="lg:w-3/5">
        <div className="h-px bg-primary/10" />
        {mainServices.map((service, index) => (
          <SkillRow key={service.title} service={service} index={index} />
        ))}
      </div>
    </div>
  </div>
);

/**
 * Renders a minimal multi-column list of secondary skills.
 */
export const SecondarySkillsGrid = ({ additionalServices }: SecondarySkillsGridPropsType) => (
  <div>
    <div className="flex items-center gap-4 mb-6">
      <span className="text-[11px] text-primary/60 uppercase tracking-[0.2em] font-light">
        also comfortable with
      </span>
      <div className="h-px bg-primary/10 flex-1" />
    </div>

    <div
      className={`grid grid-cols-1 gap-0 ${additionalServices.length > 2 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}
    >
      {additionalServices.map((service, index) => (
        <div key={service.title}>
          <div
            className={`py-6 pr-8 ${index < additionalServices.length - 1 ? "sm:border-r border-primary/10" : ""} ${index > 0 ? "sm:pl-8" : ""}`}
          >
            <h4 className="mb-2 text-sm font-light text-foreground">{service.title}</h4>
            <p className="text-foreground/65 text-xs font-light leading-relaxed mb-3">
              {service.description}
            </p>
            <SkillTags skills={service.skills} className="text-[11px]" />
          </div>
          <div className="h-px bg-primary/10 sm:hidden" />
        </div>
      ))}
    </div>
  </div>
);
