import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import { SharedElement } from "@/components/shared/SharedElement";
import { corpusStats, groupByDomain } from "@/lib/content/domains";
import type { PostMeta } from "@/lib/content/loader";

type WritingListPropsType = {
  posts: PostMeta[];
  draftPosts: PostMeta[];
};

export function WritingList({ posts, draftPosts }: WritingListPropsType) {
  const stats = corpusStats(posts);
  const groups = groupByDomain(posts);

  return (
    <div className="pt-36 pb-16 px-6 sm:px-10 lg:px-24">
      <PageHeader
        eyebrow="writing"
        title="thoughts & notes"
        intro="write-ups from production work. things that bit me, how i diagnosed them, and what i would do differently."
      >
        <div className="mt-8 flex flex-wrap items-baseline gap-x-8 gap-y-2 text-[11px] uppercase tracking-[0.18em] font-light text-primary/35">
          <span>
            <span className="text-foreground/70">{stats.posts}</span> write-ups
          </span>
          <span>
            <span className="text-foreground/70">{stats.words.toLocaleString("en-US")}</span> words
          </span>
          <span>
            <span className="text-foreground/70">{stats.questions}</span> questions answered
          </span>
          <span>mostly from production work</span>
        </div>
      </PageHeader>

      {groups.length > 0 && (
        <div className="mb-16">
          {groups.map((group) => (
            <section className="mb-14 last:mb-0" key={group.id}>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light">
                  {group.label}
                </span>
                <span className="text-[11px] text-primary/25 font-light">{group.posts.length}</span>
                <div className="h-px bg-primary/10 flex-1" />
              </div>

              <div className="divide-y divide-primary/8">
                {group.posts.map((post) => (
                  <div key={post.slug}>
                    <Link
                      className="group flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 py-6"
                      href={`/writing/${post.slug}`}
                      transitionTypes={["nav-forward"]}
                    >
                      <span className="text-[11px] text-primary/35 uppercase tracking-[0.15em] font-light sm:w-28 shrink-0">
                        {post.frontmatter.date.slice(0, 7)}
                      </span>
                      <div className="flex-1">
                        <SharedElement name={`post-title-${post.slug}`}>
                          <p className="text-base font-light text-foreground/70 group-hover:text-foreground/90 transition-colors duration-200 leading-snug mb-1">
                            {post.frontmatter.title}
                          </p>
                        </SharedElement>
                        <p className="text-xs text-foreground/35 font-light italic leading-relaxed">
                          {post.frontmatter.subhead}
                        </p>
                      </div>
                      <span className="text-[10px] text-primary/25 uppercase tracking-[0.15em] font-light shrink-0 self-start sm:self-auto mt-1 sm:mt-0">
                        {post.frontmatter.readingTime} min
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {draftPosts.length > 0 && (
        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light">
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
                <span className="text-[11px] text-primary/35 uppercase tracking-[0.15em] font-light sm:w-28 shrink-0">
                  {post.frontmatter.tags[0]}
                </span>
                <div className="flex-1">
                  <p className="text-base font-light text-foreground/70 leading-snug mb-1">
                    {post.frontmatter.title}
                  </p>
                  <p className="text-xs text-foreground/35 font-light italic leading-relaxed">
                    {post.frontmatter.subhead}
                  </p>
                </div>
                <span className="text-[10px] text-primary/25 uppercase tracking-[0.15em] font-light shrink-0 self-start sm:self-auto mt-1 sm:mt-0">
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
            <p className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light mb-2">
              get notified
            </p>
            <p className="text-sm text-foreground/50 font-light">
              new posts go out on x and linkedin.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://twitter.com/iabhisheksan"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm text-foreground/40 hover:text-foreground/80 transition-colors duration-200 font-light"
            >
              <span>x / twitter</span>
              <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
            <a
              href="https://linkedin.com/in/abhisheksan"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm text-foreground/40 hover:text-foreground/80 transition-colors duration-200 font-light"
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
