import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { ExpertiseType } from "@/lib/types/components";

interface SkillRowPropsType {
  service: ExpertiseType;
}

interface SkillRowsPropsType {
  services: readonly ExpertiseType[];
}

/**
 * Every tag of an area as plain text. Nothing is truncated into a count: a reader should
 * see all of them or none.
 */
const SkillTags = ({ skills }: { skills: readonly string[] }) => (
  <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-light text-foreground/60">
    {skills.map((skill) => (
      <li key={skill}>{skill}</li>
    ))}
  </ul>
);

/**
 * One area as a hairline row: its name, one sentence of proof with the page that shows it,
 * and the tools as plain text.
 */
const SkillRow = ({ service }: SkillRowPropsType) => (
  <div>
    <div className="grid grid-cols-1 gap-3 py-7 sm:grid-cols-3 sm:gap-8">
      <h3 className="text-lg font-light text-foreground">{service.title}</h3>

      <div className="sm:col-span-2">
        <p className="max-w-2xl text-sm font-light leading-relaxed text-foreground/65">
          {service.proof}{" "}
          <Link
            href={service.link.href}
            transitionTypes={["nav-forward"]}
            className="text-foreground/65 underline decoration-foreground/30 underline-offset-4 transition-colors duration-200 hover:text-foreground/85 hover:decoration-foreground/60"
          >
            {service.link.label}
          </Link>
        </p>
        <SkillTags skills={service.skills} />
      </div>
    </div>
    <div className="h-px bg-primary/10" />
  </div>
);

/**
 * The compact expertise list: a hairline above, one row per area.
 */
export const SkillRows = ({ services }: SkillRowsPropsType) => (
  <div>
    <div className="h-px bg-primary/10" />
    {services.map((service) => (
      <SkillRow key={service.title} service={service} />
    ))}
  </div>
);

/**
 * The working approach in one line, linking to the section on the about page that backs it up.
 */
export const HowIWorkLink = () => (
  <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6">
    <p className="text-sm font-light text-foreground/65">
      small slices, shipped and checked against production.
    </p>
    <Link
      href="/about#how-i-work"
      transitionTypes={["nav-forward"]}
      className="group inline-flex items-center gap-2 text-sm text-foreground/60 transition-colors duration-200 hover:text-primary"
    >
      see how i build things
      <ArrowRight
        aria-hidden="true"
        className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
      />
    </Link>
  </div>
);
