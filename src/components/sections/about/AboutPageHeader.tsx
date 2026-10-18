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
      intro="forward deployed engineer at wednesday. i build ai agent pipelines, billing systems, and the infra under them. i care about shipping things that actually work, not just things that look good in a PR description."
    />
  );
};
