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
      intro="associate forward deployed engineer at wednesday. i'm the engineer behind a client's ai video platform: its analytics, billing, team access, and releases. i also build ai agents and the infra under them, and my own tools on the side."
    />
  );
};
