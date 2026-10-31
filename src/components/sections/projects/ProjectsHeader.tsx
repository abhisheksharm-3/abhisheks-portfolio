"use client";

import { PageHeader } from "@/components/shared/PageHeader";

/**
 * ProjectsHeader - Main header component for the Projects page.
 * Editorial feel with large display heading, no gradient text, no decorative chrome.
 */
export const ProjectsHeader = () => {
  return (
    <PageHeader
      eyebrow="project archive"
      title="things i've built"
      intro="client work, web apps, android apps, and ai tools, including a hackathon winner. filter by area or scroll."
    />
  );
};
