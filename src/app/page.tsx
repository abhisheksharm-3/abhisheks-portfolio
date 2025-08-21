"use client";

import PageLayout from "@/components/layout/page-layout";
import { Hero } from "@/components/sections/landing/hero/hero";
import { Projects } from "@/components/sections/landing/projects/projects";
import { Philosophy } from "@/components/sections/landing/philosophy/philosophy";
import { ContactCTA } from "@/components/sections/landing/cta/contact-cta";
import { Skills } from "@/components/sections/landing/skills/skills";

/**
 * The main landing page of the application.
 *
 * This component serves as the entry point for the website, composing various
 * sections like Hero, Projects, Skills, Philosophy, and a Contact CTA
 * within a consistent page layout.
 *
 * @returns {JSX.Element} The rendered home page component.
 */
const Home = () => {
  return (
    <PageLayout activePage="Home">
      <main className="pt-24 px-6 sm:px-8 lg:px-32">
        <Hero />
        <Projects />
        <Skills />
        <Philosophy />
        <ContactCTA />
      </main>
    </PageLayout>
  );
};

export default Home;