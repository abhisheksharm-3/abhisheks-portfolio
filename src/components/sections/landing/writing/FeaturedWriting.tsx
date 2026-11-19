import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SharedElement } from "@/components/shared/SharedElement";
import type { PostMeta } from "@/lib/content/loader";

const POST_DATE = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

/**
 * The newest posts as dated hairline rows: title, date, reading time. No excerpts, so the
 * list stays a quiet aside under the projects instead of a section competing with them.
 * Expects `posts` newest first.
 */
export const FeaturedWriting = ({ posts }: { posts: readonly PostMeta[] }) => {
  if (posts.length === 0) return null;

  return (
    <div className="relative z-10 border-t border-foreground/8 pt-8">
      <div className="flex items-baseline justify-between gap-6 mb-2">
        <h3 className="text-[11px] text-primary/60 uppercase tracking-[0.2em] font-light">
          latest writing
        </h3>
        <Link
          href="/writing"
          transitionTypes={["nav-forward"]}
          className="group inline-flex items-center gap-2 text-xs font-light text-foreground/60 hover:text-foreground/85 transition-colors duration-200"
        >
          <span>all posts</span>
          <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>

      <ul className="divide-y divide-foreground/8">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/writing/${post.slug}`}
              transitionTypes={["nav-forward"]}
              className="group flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-8"
            >
              <time
                dateTime={post.frontmatter.date}
                className="font-mono text-[11px] lowercase text-foreground/60 sm:w-32 sm:shrink-0"
              >
                {POST_DATE.format(new Date(post.frontmatter.date))}
              </time>
              <SharedElement name={`post-title-${post.slug}`}>
                <span className="flex-1 font-serif text-lg text-foreground/80 transition-colors duration-200 group-hover:text-foreground sm:text-xl">
                  {post.frontmatter.title}
                </span>
              </SharedElement>
              <span className="font-mono text-[11px] text-foreground/60 sm:shrink-0">
                {post.frontmatter.readingTime} min
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
