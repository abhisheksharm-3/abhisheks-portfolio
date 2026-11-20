import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import { SharedElement } from "@/components/shared/SharedElement";
import { PostCover } from "@/components/writing/PostCover";
import { corpusStats, domainLabel, postDateRange } from "@/lib/content/domains";
import type { PostMeta } from "@/lib/content/loader";

type WritingListPropsType = {
  posts: PostMeta[];
  draftPosts: PostMeta[];
};

export function WritingList({ posts, draftPosts }: WritingListPropsType) {
  const stats = corpusStats(posts);
  const [latest, ...rest] = posts;

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

      {latest && (
        <Link
          href={`/writing/${latest.slug}`}
          transitionTypes={["nav-forward"]}
          className="group mb-16 grid grid-cols-1 items-center gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-12"
        >
          <PostCover post={latest} />
          <span className="flex flex-col gap-3">
            <span className="font-mono text-[11px] text-foreground/60">
              latest · {domainLabel(latest)} · {latest.frontmatter.readingTime} min
            </span>
            <SharedElement name={`post-title-${latest.slug}`}>
              <span className="font-serif text-3xl leading-tight text-foreground sm:text-4xl">
                {latest.frontmatter.title}
              </span>
            </SharedElement>
            <span className="text-sm font-light leading-relaxed text-foreground/65">
              {latest.frontmatter.subhead}
            </span>
          </span>
        </Link>
      )}

      {rest.length > 0 && (
        <ul className="mb-16 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/writing/${post.slug}`}
                transitionTypes={["nav-forward"]}
                className="group block"
              >
                <PostCover post={post} />
                <span className="mt-3 block text-sm font-light leading-relaxed text-foreground/65 transition-colors duration-200 group-hover:text-foreground/85">
                  {post.frontmatter.subhead}
                </span>
              </Link>
            </li>
          ))}
        </ul>
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
              new posts go out by rss, x, and linkedin.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="/writing/feed.xml"
              className="text-sm text-foreground/60 hover:text-foreground/90 transition-colors duration-200 font-light"
            >
              rss
            </a>
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
