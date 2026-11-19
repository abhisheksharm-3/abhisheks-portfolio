"use client";

import { PageHeader } from "@/components/shared/PageHeader";

/**
 * Displays the main header for the 'About' page, including name and introduction.
 * The ai video role and its numbers live in the experience timeline, not here.
 */
export const AboutPageHeader = () => {
  return (
    <PageHeader
      eyebrow="about me"
      title="abhishek sharma"
      intro="associate forward deployed engineer at wednesday. i build client platforms end to end, ai agents and the infra under them, and my own tools on the side."
    />
  );
};
