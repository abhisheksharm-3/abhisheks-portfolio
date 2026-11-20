import Image from "next/image";
import Link from "next/link";
import { PostCover } from "@/components/writing/PostCover";
import { SITE_MEDIA } from "@/data/site-media";
import type { PostMeta } from "@/lib/content/loader";

/**
 * The end of a post: who wrote it, with a small photo and the role, beside the next post as its
 * cover. `next` is the following older post, wrapping to the newest; absent, only the byline shows.
 */
export const PostByline = ({ next }: { next?: PostMeta }) => {
  const { byline } = SITE_MEDIA;
  return (
    <div className="mt-12 grid grid-cols-1 items-end gap-8 border-t border-primary/10 pt-8 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <Link
        href="/about"
        transitionTypes={["nav-forward"]}
        className="group flex items-center gap-4"
      >
        <Image
          src={byline.src}
          alt={byline.alt}
          width={64}
          height={64}
          className="size-16 shrink-0 border border-foreground/10 object-cover"
        />
        <span className="flex flex-col gap-0.5">
          <span className="font-mono text-[11px] text-foreground/60">written by</span>
          <span className="font-serif text-xl text-foreground transition-colors duration-200 group-hover:text-foreground/80">
            abhishek sharma
          </span>
          <span className="text-xs font-light text-foreground/60">
            forward deployed engineer at wednesday
          </span>
        </span>
      </Link>
      {next && (
        <Link
          href={`/writing/${next.slug}`}
          transitionTypes={["nav-forward"]}
          className="group flex flex-col gap-2"
        >
          <span className="font-mono text-[11px] text-foreground/60">next post</span>
          <PostCover post={next} />
        </Link>
      )}
    </div>
  );
};
