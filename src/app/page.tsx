"use client";

import { AppShell } from "@/components/layout/AppShell";
import { ContactCTA } from "@/components/sections/landing/cta/ContactCTA";
import { Hero } from "@/components/sections/landing/hero/HeroComponent";
import { Philosophy } from "@/components/sections/landing/dev-philosophy/DevPhilosophy";
import { Projects } from "@/components/sections/landing/projects/Projects";
import { Skills } from "@/components/sections/landing/expertise/Expertise";

/**
 * The main landing page component for the application.
 * It serves as the entry point and composes the primary sections of the page.
 * @returns {JSX.Element} The rendered home page.
 */
const Home = () => {
  return (
    <AppShell>
      <main className="pt-24 px-6 sm:px-8 lg:px-32">
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
