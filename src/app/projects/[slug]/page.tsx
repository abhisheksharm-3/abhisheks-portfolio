"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { ProjectDetailImage } from "@/components/sections/projects/ProjectDetailImage";
import { ProjectDetailMeta } from "@/components/sections/projects/ProjectDetailMeta";
import { ProjectDetailMoreProjects } from "@/components/sections/projects/ProjectDetailMoreProjects";
import { ProjectDetailOverview } from "@/components/sections/projects/ProjectDetailOverview";
import { ProjectDetailHeader } from "@/components/sections/projects/ProjectDetailsHeader";
import { ProjectsPageBackground } from "@/components/sections/projects/ProjectsPageBackground";
import { projects } from "@/data/projects";

/**
 * Renders the detailed view for a single project based on the URL slug.
 * @returns {JSX.Element} The ProjectDetailPage component.
 */
const DetailedProjectPage = () => {
  const params = useParams();
  const project = projects.find((p) => p.slug === params?.slug);

  if (!project) {
    notFound();
  }

  return (
    <AppShell>
      <div className="pt-36 pb-16 px-6 sm:px-10 lg:px-24 relative overflow-hidden">
        <ProjectsPageBackground />

        <div className="mb-10">
          <Link
            href="/projects"
            transitionTypes={["nav-back"]}
            className="group inline-flex items-center gap-2 text-xs text-foreground/40 hover:text-foreground/70 transition-colors duration-200"
          >
            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
            back to projects
          </Link>
        </div>

        <div className="mb-10">
          <ProjectDetailHeader project={project} />
        </div>

        <div className="mb-12">
          <ProjectDetailMeta project={project} />
        </div>

        <ProjectDetailImage slug={project.slug} src={project.imageSrc} alt={project.title} />

        <ProjectDetailOverview project={project} />

        <ProjectDetailMoreProjects />
      </div>
    </AppShell>
  );
};

export default DetailedProjectPage;
