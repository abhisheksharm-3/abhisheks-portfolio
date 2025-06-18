"use client";
import { Background } from "@/components/layout/background";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Philosophy } from "@/components/sections/philosophy";
import { ContactCTA } from "@/components/sections/contact-cta";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { featuredProjects } from "@/data/project";

export default function Home() {
  const scrollPosition = useScrollPosition();

  return (
    <div className="min-h-screen  text-foreground relative overflow-x-hidden">
      <Background />
      <Header scrollPosition={scrollPosition} />
      
      <main className="pt-24 px-6 sm:px-8 lg:px-32">
        <Hero />
        <Projects projects={featuredProjects} />
        <Skills />
        <Philosophy />
        <ContactCTA />
      </main>
      
      <Footer />
    </div>
  );
}