import { ComingSoon } from "@/components/sections/coming-soon";
import PageLayout from "@/components/layout/page-layout";

export default function AboutPage() {
  return (
    <PageLayout activePage="About">
      <ComingSoon 
        title="About Me" 
        description="I'm currently updating this page with more information about my background, skills, and approach to development. Check back soon to learn more about my journey and expertise."
      />
    </PageLayout>
  );
} 