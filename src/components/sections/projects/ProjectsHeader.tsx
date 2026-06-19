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
      intro="web apps, android apps, ai tools. some for fun, some for clients, one that won a hackathon. filter by tech or just scroll."
    />
  );
};
