"use cache";

import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { PostCta } from "@/components/writing/PostCta";
import { PostToc } from "@/components/writing/PostToc";
import { getAllPosts, getPostBySlug } from "@/lib/content/loader";
import { breadcrumbSchema, JsonLd } from "@/lib/seo/json-ld";
import { SITE_URL } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const { frontmatter } = post;
  const ogUrl = `/og?title=${encodeURIComponent(frontmatter.title)}&tag=${encodeURIComponent(frontmatter.tags[0] ?? "")}&subhead=${encodeURIComponent(frontmatter.subhead)}&date=${encodeURIComponent(new Date(frontmatter.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }))}&min=${frontmatter.readingTime}`;

  return {
    title: `${frontmatter.title} | Abhishek Sharma`,
    description: frontmatter.subhead,
    keywords: frontmatter.keywords,
    authors: [{ name: "Abhishek Sharma", url: SITE_URL }],
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.subhead,
      type: "article",
      publishedTime: frontmatter.date,
      modifiedTime: frontmatter.updatedAt ?? frontmatter.date,
      authors: ["Abhishek Sharma"],
      images: [{ url: ogUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.subhead,
      images: [ogUrl],
    },
  };
}

function buildJsonLd(post: Awaited<ReturnType<typeof getPostBySlug>>) {
  if (!post) return null;
  const { frontmatter, slug } = post;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.subhead,
    datePublished: frontmatter.date,
    dateModified: frontmatter.updatedAt ?? frontmatter.date,
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
    keywords: frontmatter.keywords.join(", "),
    url: `${SITE_URL}/writing/${slug}`,
  };

  const faqSchema = frontmatter.faqs
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: frontmatter.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }
    : null;

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Writing", path: "/writing" },
    { name: frontmatter.title, path: `/writing/${slug}` },
  ]);

  return { articleSchema, faqSchema, breadcrumbs };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const { frontmatter, content, toc } = post;
  const schemas = buildJsonLd(post);

  const formattedDate = new Date(frontmatter.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <AppShell showBackground={false}>
      {schemas && (
        <JsonLd
          schemas={[
            schemas.articleSchema,
            schemas.breadcrumbs,
            ...(schemas.faqSchema ? [schemas.faqSchema] : []),
          ]}
        />
      )}

      <div className="pt-36 pb-24 px-6 sm:px-10 lg:px-24">
        {/* The article stays centred at every width; the rail hangs in the margin it
            already had, so no post shifts depending on whether it has one. */}
        <div className="relative mx-auto max-w-3xl">
          <aside className="hidden xl:block absolute right-full top-0 h-full w-48 pr-8">
            <div className="sticky top-32">
              <PostToc entries={toc} variant="rail" />
            </div>
          </aside>

          <div className="min-w-0">
            <Link
              href="/writing"
              className="group inline-flex items-center gap-1.5 text-xs text-foreground/35 hover:text-foreground/70 transition-colors duration-200 font-light mb-10"
            >
              <ArrowLeft className="h-3 w-3 group-hover:-translate-x-0.5 transition-transform duration-200" />
              <span>writing</span>
            </Link>

            <p className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light mb-4">
              {frontmatter.tags[0]} / {formattedDate} / {frontmatter.readingTime} min
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-tight text-foreground mb-4">
              {frontmatter.title}
            </h1>

            <p className="text-foreground/60 font-light leading-relaxed mb-8">
              {frontmatter.subhead}
            </p>

            <div className="h-px bg-primary/10 w-full mb-10" />

            <PostToc entries={toc} />

            <div className="prose-writing">{content}</div>

            {frontmatter.faqs && frontmatter.faqs.length > 0 && (
              <>
                <div className="h-px bg-primary/10 w-full mt-12 mb-10" />
                <div id="frequently-asked-questions">
                  <h2 className="text-lg font-serif text-foreground/80 mb-6">
                    frequently asked questions
                  </h2>
                  <div className="space-y-6">
                    {frontmatter.faqs.map((faq) => (
                      <div key={faq.question}>
                        <p className="text-sm text-foreground/80 font-light mb-2">{faq.question}</p>
                        <p className="text-sm text-foreground/65 font-light leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {frontmatter.relatedPosts && frontmatter.relatedPosts.length > 0 && (
              <>
                <div className="h-px bg-primary/10 w-full mt-12 mb-8" />
                <div>
                  <p className="text-[11px] text-primary/35 uppercase tracking-[0.2em] font-light mb-4">
                    related
                  </p>
                  <div className="space-y-3">
                    {frontmatter.relatedPosts.map((related) => (
                      <Link
                        key={related.slug}
                        href={`/writing/${related.slug}`}
                        className="group flex items-baseline gap-4 py-2"
                      >
                        <span className="text-sm text-foreground/60 font-light group-hover:text-foreground/90 transition-colors duration-200 leading-snug">
                          {related.title}
                        </span>
                        <span className="text-xs text-foreground/25 font-light shrink-0">
                          {related.readingTime} min
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}

            <PostCta searchIntent={frontmatter.searchIntent} />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
