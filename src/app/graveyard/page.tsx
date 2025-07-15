"use client";
import { useRef } from "react";
import { useInView } from "framer-motion";
import PageLayout from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GraveyardBackground } from "@/components/sections/graveyard/GraveyardBackground";
import { GraveyardSectionHeader } from "@/components/sections/graveyard/GraveyardSectionHeader";
import { GraveyardIntroCard } from "@/components/sections/graveyard/GraveyardIntroCard";
import { deadProjects } from "@/data/project";
import { GraveyardProjectCard } from "@/components/sections/graveyard/GraveyardProjectCard";

// Quotes and data
const inspirationalQuotes = [
  "Every dead project is a stepping stone to success.",
  "Failure is just success in progress.",
  "The only real mistake is the one from which we learn nothing.",
  "Success is stumbling from failure to failure with no loss of enthusiasm.",
  "Every abandoned project brings you one step closer to the one that will succeed.",
];

export default function GraveyardPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.01 });

  // Pick a random quote only once per render
  const quote = inspirationalQuotes[0]; // deterministic, or use memo/random if you want it to change per page load

  return (
    <PageLayout activePage="Graveyard">
      <div
        ref={sectionRef}
        className="pt-36 pb-24 px-6 sm:px-8 lg:px-32 relative overflow-hidden"
      >
        <GraveyardBackground isInView={isInView} />
        <GraveyardSectionHeader isInView={isInView} quote={quote} />
        <GraveyardIntroCard isInView={isInView} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {deadProjects.map((project, index) => (
            <GraveyardProjectCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>
        <div className="text-center mt-16">
          <h3 className="text-2xl font-serif italic mb-4">
            Prefer the land of the living?
          </h3>
          <div
            className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto mb-8"
            style={{ width: "8rem" }}
          />
          <Button
            size="lg"
            className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8"
            asChild
          >
            <Link href="/projects" className="flex items-center">
              Escape the Graveyard
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}
