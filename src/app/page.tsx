"use client";

import { AppShell } from "@/components/layout/AppShell";
import { ContactCTA } from "@/components/sections/landing/cta/ContactCTA";
import { Hero } from "@/components/sections/landing/hero/HeroComponent";
import { Philosophy } from "@/components/sections/landing/dev-philosophy/DevPhilosophy";
import { Projects } from "@/components/sections/landing/projects/Projects";
import { Skills } from "@/components/sections/landing/expertise/Expertise";
import { getPageWrapperClasses } from "@/lib/config/spacing-standards";

/**
 * The main landing page component for the application.
 * It serves as the entry point and composes the primary sections of the page.
 * @returns {JSX.Element} The rendered home page.
 */
const Home = () => {
  return (
    <AppShell>
      <main className={getPageWrapperClasses()}>
        <div className="flex flex-col items-center">
          <Hero />
        </div>
        <Projects />
        <Skills />
        <Philosophy />
        <ContactCTA />
      </main>
    </AppShell>
  );
};

export default Home;
