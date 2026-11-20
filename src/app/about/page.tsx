import { AppShell } from "@/components/layout/AppShell";
import { AboutReadings } from "@/components/sections/about/AboutReadings";
import { PersonReading } from "@/components/sections/about/PersonReading";
import { WorkReading } from "@/components/sections/about/WorkReading";
import { SharedBackground } from "@/components/shared/SharedBackground";

/**
 * The about page: the portrait and who i am, then one switch between two readings of the same
 * page, the person and the work.
 */
const AboutPage = () => {
  return (
    <AppShell>
      <div className="pt-36 pb-16 px-6 sm:px-10 lg:px-24 overflow-x-hidden">
        <SharedBackground isInView noiseFilterId="aboutPageNoiseFilter" />
        <AboutReadings person={<PersonReading />} work={<WorkReading />} />
      </div>
    </AppShell>
  );
};

export default AboutPage;
