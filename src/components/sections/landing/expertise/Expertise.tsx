import { SectionHeader } from "@/components/shared/SectionHeader";
import { SharedBackground } from "@/components/shared/SharedBackground";
import { EXPERTISE } from "@/data/skills-expertise";
import { getSectionClasses } from "@/lib/config/spacing-standards";
import { FeaturedSkillsSection, SecondarySkillsGrid } from "./ExpertiseComponents";

/**
 * The main component for the Skills/Expertise section.
 * It orchestrates the display of a header, featured skills, and a grid of
 * additional skills.
 */
export const Skills = () => {
  // Split the services data for different layout treatments
  const mainServices = EXPERTISE.slice(0, 3);
  const additionalServices = EXPERTISE.slice(3, 6);

  return (
    <section className={getSectionClasses()} id="skills">
      <SharedBackground isInView noiseFilterId="skillsNoiseFilter" />

      <div className="relative z-10 w-full">
        <SectionHeader subtitle="expertise">
          <span className="font-serif text-foreground select-none pr-4">what i do best</span>
        </SectionHeader>

        <FeaturedSkillsSection mainServices={mainServices} />
        <SecondarySkillsGrid additionalServices={additionalServices} />
      </div>
    </section>
  );
};
