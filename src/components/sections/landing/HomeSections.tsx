import Image from "next/image";
import Link from "next/link";
import { ContentBlock } from "@/components/shared/ContentBlock";
import { ProjectTile } from "@/components/shared/ProjectTile";
import { PostCover } from "@/components/writing/PostCover";
import { projects } from "@/data/projects";
import { HOME_PHOTOS } from "@/data/site-media";
import type { PostMeta } from "@/lib/content/loader";

const HOME_PROJECT_SLUGS = ["flockr", "inquora", "project-sleeve"] as const;
const homeProjects = HOME_PROJECT_SLUGS.flatMap((slug) => projects.filter((p) => p.slug === slug));

const NOTE_LINK_CLASS = "transition-colors duration-200 hover:text-foreground";

/** Three projects as picture-first tiles, each opening its own page. */
export const HomeProjects = () => (
  <ContentBlock
    label="things i build"
    note={
      <Link href="/projects" transitionTypes={["nav-forward"]} className={NOTE_LINK_CLASS}>
        all of them on /projects →
      </Link>
    }
  >
    <ul className="grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-3">
      {homeProjects.map((project) => (
        <li key={project.slug}>
          <ProjectTile project={project} />
        </li>
      ))}
    </ul>
  </ContentBlock>
);

/** The newest posts as their covers. Expects `posts` newest first. */
export const HomeWriting = ({ posts }: { posts: readonly PostMeta[] }) => {
  if (posts.length === 0) return null;
  return (
    <ContentBlock
      label="latest writing"
      note={
        <Link href="/writing" transitionTypes={["nav-forward"]} className={NOTE_LINK_CLASS}>
          all posts →
        </Link>
      }
    >
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/writing/${post.slug}`}
              transitionTypes={["nav-forward"]}
              className="group block"
            >
              <PostCover post={post} />
            </Link>
          </li>
        ))}
      </ul>
    </ContentBlock>
  );
};

/** Four photos from away from the desk, each leading to the about page's person side. */
export const OffTheClock = () => (
  <ContentBlock
    label="off the clock"
    note={
      <Link href="/about" transitionTypes={["nav-forward"]} className={NOTE_LINK_CLASS}>
        more on /about →
      </Link>
    }
  >
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {HOME_PHOTOS.map(({ src, alt, caption }) => (
        <li key={src}>
          <Link href="/about" transitionTypes={["nav-forward"]} className="group block">
            <span className="relative block aspect-square overflow-hidden border border-foreground/10">
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(min-width: 640px) 22vw, 45vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
              />
            </span>
            <span className="mt-2 block font-mono text-[10px] text-foreground/60">{caption}</span>
          </Link>
        </li>
      ))}
    </ul>
  </ContentBlock>
);
