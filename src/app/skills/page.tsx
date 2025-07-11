import { ComingSoon } from "@/components/sections/coming-soon";
import PageLayout from "@/components/layout/page-layout";

export default function SkillsPage() {
  return (
    <PageLayout activePage="Skills">
      <div className="pt-24 px-6 sm:px-8 lg:px-32">
        <ComingSoon 
          title="Skills & Expertise" 
          description="I'm currently preparing a comprehensive overview of my technical skills, proficiency levels, and areas of expertise. Check back soon to see my full skill set."
        />
      </div>
    </PageLayout>
  );
} 