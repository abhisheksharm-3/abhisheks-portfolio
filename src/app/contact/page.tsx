import { ComingSoon } from "@/components/sections/coming-soon";
import PageLayout from "@/components/layout/page-layout";

export default function ContactPage() {
  return (
    <PageLayout activePage="Contact">
      <ComingSoon 
        title="Get in Touch" 
        description="I'm currently setting up a dedicated contact form and additional ways to connect. In the meantime, you can reach me at abhitiku2003@gmail.com or through my social media profiles."
      />
    </PageLayout>
  );
} 