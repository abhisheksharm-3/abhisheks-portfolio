"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import PageLayout from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/data/project";
import AbstractPath from "@/components/shared/AbstractPath";
import { ProjectDetailHeader } from "@/components/sections/projects/ProjectDetailsHeader";
import { ProjectDetailSidebar } from "@/components/sections/projects/ProjectDetailsSidebar";
import { ProjectDetailImage } from "@/components/sections/projects/ProjectDetailImage";
import { ProjectDetailOverview } from "@/components/sections/projects/ProjectDetailOverview";
import { ProjectDetailMoreProjects } from "@/components/sections/projects/ProjectDetailMoreProjects";

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const project = projects.find((p) => p.slug === slug);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.01 });
  if (!project) notFound();

  return (
    <PageLayout activePage="Projects">
      <div ref={sectionRef} className="pt-36 pb-24 px-6 sm:px-8 lg:px-32 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 z-0 mix-blend-overlay opacity-10">
            <svg className="w-full h-full opacity-20" viewBox="0 0 200 200">
              <filter id="projectDetailNoiseFilter">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#projectDetailNoiseFilter)" />
            </svg>
          </div>
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 bottom-0 w-[1px] bg-primary/30" style={{ left: '13%' }} />
            <div className="absolute top-0 bottom-0 w-[1px] bg-primary/10" style={{ left: '28%' }} />
            <div className="absolute top-0 bottom-0 w-[1px] bg-primary/20" style={{ left: '67%' }} />
            <div className="absolute top-0 bottom-0 w-[1px] bg-primary/15" style={{ left: '89%' }} />
            <div className="absolute left-0 right-0 h-[1px] bg-primary/25" style={{ top: '22%' }} />
            <div className="absolute left-0 right-0 h-[1px] bg-primary/10" style={{ top: '58%' }} />
            <div className="absolute left-0 right-0 h-[1px] bg-primary/20" style={{ top: '81%' }} />
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="absolute left-[5%] top-[15%] text-primary/8"
          >
            <AbstractPath pathD="M10,30 C20,50 40,10 50,40 S80,20 90,40" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute right-[10%] bottom-[20%] rotate-180 text-primary/8"
          >
            <AbstractPath pathD="M10,50 Q40,20 50,50 T90,30" />
          </motion.div>
        </div>
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <Button
            variant="outline"
            size="sm"
            className="group border-primary/10 hover:bg-primary/5"
            asChild
          >
            <Link href="/projects" className="flex items-center">
              <ArrowLeft className="mr-2 h-3 w-3 transition-transform group-hover:-translate-x-1" />
              Back to Projects
            </Link>
          </Button>
        </motion.div>
        {/* Header & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <ProjectDetailHeader
              title={project.title}
              description={project.longDescription || project.description}
              isInView={isInView}
            />
          </motion.div>
          <ProjectDetailSidebar project={project} isInView={isInView} />
        </div>
        {/* Main Project Image */}
        <ProjectDetailImage src={project.imageSrc} alt={project.title} isInView={isInView} />
        {/* Overview Card */}
        <ProjectDetailOverview project={project} isInView={isInView} />
        {/* More Projects CTA */}
        <ProjectDetailMoreProjects isInView={isInView} />
      </div>
    </PageLayout>
  );
}