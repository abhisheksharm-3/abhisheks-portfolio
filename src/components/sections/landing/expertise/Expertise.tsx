import { SectionHeader } from "@/components/shared/SectionHeader";
import { SharedBackground } from "@/components/shared/SharedBackground";
import { EXPERTISE } from "@/data/skills-expertise";
import { getSectionClasses } from "@/lib/config/spacing-standards";
import { HowIWorkLink, SkillRows } from "./ExpertiseComponents";

const HOME_AREA_COUNT = 3;

/**
 * The compact expertise section on the home page: three areas, one sentence of proof each,
 * then a link to how i work on the about page.
 */
export const Skills = () => (
  <section className={getSectionClasses()} id="skills">
    <SharedBackground isInView noiseFilterId="skillsNoiseFilter" />

    <div className="relative z-10 w-full">
      <SectionHeader subtitle="expertise">
        <span className="font-serif text-foreground select-none pr-4">what i do best</span>
      </SectionHeader>

      <SkillRows services={EXPERTISE.slice(0, HOME_AREA_COUNT)} />
      <HowIWorkLink />
    </div>
  </section>
);
