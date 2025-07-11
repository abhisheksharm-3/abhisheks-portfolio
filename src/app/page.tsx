"use client";
import PageLayout from "@/components/layout/page-layout";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { featuredProjects } from "@/data/project";
import { Skills } from "@/components/sections/skills";
import { Philosophy } from "@/components/sections/philosophy";
import { ContactCTA } from "@/components/sections/contact-cta";

export default function Home() {
  return (
    <PageLayout activePage="Home">
      <main className="pt-24 px-6 sm:px-8 lg:px-32">
        <Hero />
        <Projects projects={featuredProjects} />
        <Skills />
        <Philosophy />
        <ContactCTA />
      </main>
    </PageLayout>
  );
}