import { SharedElement } from "@/components/shared/SharedElement";
import { domainLabel } from "@/lib/content/domains";
import type { PostMeta } from "@/lib/content/loader";

const COVER_DATE = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/**
 * A post's cover: the 1200×630 card the /og route draws for link previews, rebuilt in HTML so the
 * writing page, the home page and the post itself show the same picture. Type sizes follow the
 * card's own width, so one component reads at a grid thumbnail and at full column width. The cover
 * is a shared element, so it moves from a list into the post's header on navigation.
 */
export const PostCover = ({ post }: { post: PostMeta }) => (
  <SharedElement name={`post-cover-${post.slug}`}>
    <span className="@container block w-full">
      <span className="relative flex aspect-[1200/630] w-full flex-col justify-between overflow-hidden border border-foreground/10 bg-foreground/[0.03] p-[5cqi] transition-colors duration-200 group-hover:border-foreground/25">
        <span className="flex justify-between gap-4 font-mono text-[max(10px,2.2cqi)] lowercase text-foreground/60">
          <span>{domainLabel(post)}</span>
          <span>abhk · writing</span>
        </span>
        <span className="max-w-[85%] font-serif text-[clamp(1.05rem,6.8cqi,3.5rem)] leading-[1.08] text-foreground text-balance">
          {post.frontmatter.title}
        </span>
        <span className="flex justify-between gap-4 font-mono text-[max(10px,2.2cqi)] lowercase text-foreground/60">
          <time dateTime={post.frontmatter.date}>
            {COVER_DATE.format(new Date(post.frontmatter.date))}
          </time>
          <span>{post.frontmatter.readingTime} min</span>
        </span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-[6cqi] -bottom-[9cqi] aspect-square w-[34cqi] rounded-full border border-foreground/10 transition-transform duration-300 ease-out group-hover:scale-110 motion-reduce:transition-none"
        />
      </span>
    </span>
  </SharedElement>
);
