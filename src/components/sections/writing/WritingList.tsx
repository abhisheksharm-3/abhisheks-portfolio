import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import { SharedElement } from "@/components/shared/SharedElement";
import { corpusStats, domainLabel, postDateRange } from "@/lib/content/domains";
import type { PostMeta } from "@/lib/content/loader";

type WritingListPropsType = {
  posts: PostMeta[];
  draftPosts: PostMeta[];
};

export function WritingList({ posts, draftPosts }: WritingListPropsType) {
  const stats = corpusStats(posts);

  return (
    <div className="pt-36 pb-16 px-6 sm:px-10 lg:px-24">
      <PageHeader
        eyebrow="writing"
        title="thoughts & notes"
        intro="write-ups from production work. things that bit me, how i diagnosed them, and what i would do differently."
      >
        <div className="mt-8 flex flex-wrap items-baseline gap-x-8 gap-y-2 text-[11px] uppercase tracking-[0.18em] font-light text-primary/60">
          <span>
            <span className="text-foreground/80">{stats.posts}</span> write-ups
          </span>
          <span>
            <span className="text-foreground/80">{stats.words.toLocaleString("en-US")}</span> words
          </span>
          <span>{postDateRange(posts)}</span>
        </div>
      </PageHeader>

      {posts.length > 0 && (
        <div className="mb-16 divide-y divide-primary/8">
          {posts.map((post) => (
            <Link
              className="group flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 py-6"
              href={`/writing/${post.slug}`}
              key={post.slug}
              transitionTypes={["nav-forward"]}
            >
              <span className="flex items-baseline gap-3 sm:w-36 sm:shrink-0 sm:flex-col sm:gap-1 font-mono text-[11px] text-primary/60">
                <span className="tabular-nums">{post.frontmatter.date.slice(0, 7)}</span>
                <span>{domainLabel(post)}</span>
              </span>
              <div className="flex-1">
                <SharedElement name={`post-title-${post.slug}`}>
                  <p className="text-base font-light text-foreground/80 group-hover:text-foreground/95 transition-colors duration-200 leading-snug mb-1">
                    {post.frontmatter.title}
                  </p>
                </SharedElement>
                <p className="text-sm text-foreground/60 font-light italic leading-relaxed">
                  {post.frontmatter.subhead}
                </p>
              </div>
              <span className="font-mono text-[11px] text-primary/60 shrink-0 self-start sm:self-auto mt-1 sm:mt-0">
                {post.frontmatter.readingTime} min
              </span>
            </Link>
          ))}
        </div>
      )}

      {draftPosts.length > 0 && (
        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[11px] text-primary/60 uppercase tracking-[0.2em] font-light">
              drafts in progress
            </span>
            <div className="h-px bg-primary/10 flex-1" />
          </div>

          <div className="divide-y divide-primary/8">
            {draftPosts.map((post) => (
              <div
                key={post.slug}
                className="group flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 py-6"
              >
                <span className="font-mono text-[11px] text-primary/60 sm:w-36 shrink-0">
                  {post.frontmatter.tags[0]}
                </span>
                <div className="flex-1">
                  <p className="text-base font-light text-foreground/70 leading-snug mb-1">
                    {post.frontmatter.title}
                  </p>
                  <p className="text-sm text-foreground/60 font-light italic leading-relaxed">
                    {post.frontmatter.subhead}
                  </p>
                </div>
                <span className="font-mono text-[11px] text-primary/60 shrink-0 self-start sm:self-auto mt-1 sm:mt-0">
                  drafting
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-12 pt-8 border-t border-primary/10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <p className="text-[11px] text-primary/60 uppercase tracking-[0.2em] font-light mb-2">
              get notified
            </p>
            <p className="text-sm text-foreground/60 font-light">
              new posts go out on x and linkedin.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://twitter.com/iabhisheksan"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm text-foreground/60 hover:text-foreground/90 transition-colors duration-200 font-light"
            >
              <span>x / twitter</span>
              <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
            <a
              href="https://linkedin.com/in/abhisheksan"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm text-foreground/60 hover:text-foreground/90 transition-colors duration-200 font-light"
            >
              <span>linkedin</span>
              <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
