import { ComingSoon } from "@/components/sections/coming-soon";
import PageLayout from "@/components/layout/page-layout";

export default function ProjectsPage() {
  return (
    <PageLayout activePage="Projects">
      <ComingSoon 
        title="Projects" 
        description="I'm currently organizing a detailed showcase of my projects with case studies, technical details, and outcomes. Check back soon to explore my work."
      />
    </PageLayout>
  );
} 