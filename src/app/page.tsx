import { AppShell } from "@/components/layout/AppShell";
import { ContactCTA } from "@/components/sections/landing/cta/ContactCTA";
import { Skills } from "@/components/sections/landing/expertise/Expertise";
import { Hero } from "@/components/sections/landing/hero/HeroComponent";
import { Projects } from "@/components/sections/landing/projects/Projects";
import { FeaturedWriting } from "@/components/sections/landing/writing/FeaturedWriting";
import { getAllPosts } from "@/lib/content/loader";

/**
 * The landing page. Server-rendered so the writing section can read posts from disk.
 */
const Home = async () => {
  const posts = await getAllPosts();

  return (
    <AppShell>
      <main className="pt-32 pb-24 px-6 sm:px-8 lg:px-24 2xl:px-40 max-w-[2000px] mx-auto">
        <Hero />
        <Projects footer={<FeaturedWriting post={posts[0]} />} showCta={false} />
        <Skills />
        <ContactCTA />
      </main>
    </AppShell>
  );
};

export default Home;
