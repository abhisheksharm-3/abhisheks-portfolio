import { AppShell } from "@/components/layout/AppShell";
import { AboutPageCTA } from "@/components/sections/about/AboutPageCTA";
import { AboutPageHeader } from "@/components/sections/about/AboutPageHeader";
import { BioCard } from "@/components/sections/about/BioCard";
import { ContactCard } from "@/components/sections/about/ContactCard";
import { ExperienceEducationSection } from "@/components/sections/about/ExperienceEducationSection";
import { GitHubActivity } from "@/components/sections/about/GitHubActivity";
import { InterestsSection } from "@/components/sections/about/InterestsSection";
import { SkillsSection } from "@/components/sections/about/SkillsSection";
import { SharedBackground } from "@/components/shared/SharedBackground";
import { SPACING_STANDARDS } from "@/lib/config/spacing-standards";

/**
 * Renders the "About Me" page.
 * @returns {JSX.Element} The About page component.
 */
const AboutPage = () => {
  return (
    <AppShell>
      <div className="pt-36 pb-16 px-6 sm:px-10 lg:px-24 overflow-x-hidden">
        <section>
          <SharedBackground isInView noiseFilterId="aboutPageNoiseFilter" />

          <AboutPageHeader />

          <div
            className={`grid grid-cols-1 md:grid-cols-3 ${SPACING_STANDARDS.GRID.GAP_LARGE} ${SPACING_STANDARDS.CONTENT.SECTION_SPACING}`}
          >
            <div className="md:col-span-2">
              <BioCard />
            </div>
            <div>
              <ContactCard />
            </div>
          </div>

          <div className={SPACING_STANDARDS.CONTENT.SECTION_SPACING}>
            <ExperienceEducationSection />
          </div>

          <div className={SPACING_STANDARDS.CONTENT.SECTION_SPACING}>
            <SkillsSection />
          </div>

          <div className={SPACING_STANDARDS.CONTENT.SECTION_SPACING}>
            <GitHubActivity />
          </div>

          <div className={SPACING_STANDARDS.CONTENT.SECTION_SPACING}>
            <InterestsSection />
          </div>

          <AboutPageCTA />
        </section>
      </div>
    </AppShell>
  );
};

export default AboutPage;
