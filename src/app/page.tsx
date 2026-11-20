import { AppShell } from "@/components/layout/AppShell";
import { HomeProjects, HomeWriting, OffTheClock } from "@/components/sections/landing/HomeSections";
import { Hero } from "@/components/sections/landing/hero/HeroComponent";
import { TrustedWith } from "@/components/sections/landing/TrustedWith";
import { getAllPosts } from "@/lib/content/loader";

const LATEST_POST_COUNT = 3;

/**
 * The landing page: the name beside a clip, what the client platform trusts me with, three
 * projects, the newest posts as covers, and four photos that lead to /about. Server-rendered so
 * the writing section can read posts from disk.
 */
const Home = async () => {
  const posts = await getAllPosts();

  return (
    <AppShell>
      <main className="mx-auto max-w-[2000px] px-6 pt-32 pb-24 sm:px-8 lg:px-24 2xl:px-40">
        <Hero />
        <div className="mt-16 space-y-20 sm:mt-24 sm:space-y-28">
          <TrustedWith />
          <HomeProjects />
          <HomeWriting posts={posts.slice(0, LATEST_POST_COUNT)} />
          <OffTheClock />
        </div>
      </main>
    </AppShell>
  );
};

export default Home;
