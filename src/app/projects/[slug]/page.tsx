"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { ProjectDetailMeta } from "@/components/sections/projects/ProjectDetailMeta";
import { ProjectDetailMoreProjects } from "@/components/sections/projects/ProjectDetailMoreProjects";
import { ProjectDetailOverview } from "@/components/sections/projects/ProjectDetailOverview";
import { ProjectDetailScreens } from "@/components/sections/projects/ProjectDetailScreens";
import { ProjectDetailHeader } from "@/components/sections/projects/ProjectDetailsHeader";
import { ProjectsPageBackground } from "@/components/sections/projects/ProjectsPageBackground";
import { ContentBlock } from "@/components/shared/ContentBlock";
import { ProjectVisual } from "@/components/shared/ProjectVisual";
import { projects } from "@/data/projects";

/**
 * A project's page: its header beside its picture, the facts in one row, what it does, its
 * screens when it has them, and the next project as a picture.
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
            className="group inline-flex items-center gap-2 text-xs text-foreground/60 hover:text-foreground transition-colors duration-200"
          >
            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
            back to projects
          </Link>
        </div>

        <div className="relative z-10 mb-14 grid grid-cols-1 items-end gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-12">
          <ProjectDetailHeader project={project} />
          <ProjectVisual project={project} />
        </div>

        <div className="mb-16">
          <ProjectDetailMeta project={project} />
        </div>

        <ProjectDetailOverview project={project} />

        {project.screens && (
          <div className="mb-16">
            <ContentBlock label="screens">
              <ProjectDetailScreens screens={project.screens} />
            </ContentBlock>
          </div>
        )}

        <ProjectDetailMoreProjects slug={project.slug} />
      </div>
    </AppShell>
  );
};

export default DetailedProjectPage;
