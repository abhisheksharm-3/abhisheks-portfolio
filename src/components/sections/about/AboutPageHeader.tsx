"use client";

import { PageHeader } from "@/components/shared/PageHeader";

/**
 * Displays the main header for the 'About' page, including name and introduction.
 */
export const AboutPageHeader = () => {
  return (
    <PageHeader
      eyebrow="about me"
      title="abhishek sharma"
      intro="software engineer at wednesday. i build ai pipelines, android apps, and web platforms. i care about shipping things that actually work, not just things that look good in a PR description."
    />
  );
};
