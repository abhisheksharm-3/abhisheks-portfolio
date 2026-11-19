"use cache";

import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { SharedElement } from "@/components/shared/SharedElement";
import { PostCta } from "@/components/writing/PostCta";
import { PostToc } from "@/components/writing/PostToc";
import { projects } from "@/data/projects";
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

const FAQ_ID = "frequently-asked-questions";

function projectForPost(slug: string) {
  return projects.find((project) =>
    project.notes?.some((note) => note.href === `/writing/${slug}`),
  );
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const { frontmatter, content, toc } = post;
  const schemas = buildJsonLd(post);
  const project = projectForPost(slug);
  const tocEntries = frontmatter.faqs?.length
    ? [...toc, { id: FAQ_ID, label: "frequently asked questions" }]
    : toc;

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
        <div className="relative mx-auto max-w-[38rem]">
          <aside className="hidden xl:block absolute right-full top-0 h-full w-48 pr-8">
            <div className="sticky top-32">
              <PostToc entries={tocEntries} variant="rail" />
            </div>
          </aside>

          <div className="min-w-0">
            <Link
              href="/writing"
              transitionTypes={["nav-back"]}
              className="group inline-flex items-center gap-1.5 text-xs text-foreground/60 hover:text-foreground/90 transition-colors duration-200 font-light mb-10"
            >
              <ArrowLeft className="h-3 w-3 group-hover:-translate-x-0.5 transition-transform duration-200" />
              <span>writing</span>
            </Link>

            <p className="text-[11px] text-primary/60 uppercase tracking-[0.2em] font-light mb-2">
              {frontmatter.tags[0]} / {formattedDate} / {frontmatter.readingTime} min
            </p>

            {project && (
              <p className="mb-4 text-sm font-light">
                <Link
                  href={`/projects/${project.slug}`}
                  transitionTypes={["nav-forward"]}
                  className="text-foreground/60 underline decoration-foreground/15 underline-offset-4 transition-colors duration-200 hover:text-foreground/90 hover:decoration-foreground/60"
                >
                  from the {project.title.toLowerCase()}
                </Link>
              </p>
            )}

            <SharedElement name={`post-title-${slug}`}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-tight text-foreground mb-4">
                {frontmatter.title}
              </h1>
            </SharedElement>

            <p className="text-foreground/60 font-light leading-relaxed mb-8">
              {frontmatter.subhead}
            </p>

            <div className="h-px bg-primary/10 w-full mb-8" />

            <PostToc entries={tocEntries} />

            <div className="prose-writing">{content}</div>

            {frontmatter.faqs && frontmatter.faqs.length > 0 && (
              <>
                <div className="h-px bg-primary/10 w-full mt-12 mb-10" />
                <section aria-labelledby={`${FAQ_ID}-heading`} className="scroll-mt-24" id={FAQ_ID}>
                  <h2
                    className="mb-6 font-serif text-xl italic text-foreground/85"
                    id={`${FAQ_ID}-heading`}
                  >
                    frequently asked questions
                  </h2>
                  <dl className="space-y-8">
                    {frontmatter.faqs.map((faq) => (
                      <div key={faq.question}>
                        <dt className="mb-2 font-serif text-lg font-normal italic leading-snug text-foreground/85">
                          {faq.question}
                        </dt>
                        <dd className="font-light leading-[1.8] text-foreground/70">
                          {faq.answer}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              </>
            )}

            {frontmatter.relatedPosts && frontmatter.relatedPosts.length > 0 && (
              <>
                <div className="h-px bg-primary/10 w-full mt-12 mb-8" />
                <div>
                  <p className="text-[11px] text-primary/60 uppercase tracking-[0.2em] font-light mb-4">
                    related
                  </p>
                  <div className="space-y-3">
                    {frontmatter.relatedPosts.map((related) => (
                      <Link
                        key={related.slug}
                        href={`/writing/${related.slug}`}
                        transitionTypes={["nav-forward"]}
                        className="group flex items-baseline gap-4 py-2"
                      >
                        <SharedElement name={`post-title-${related.slug}`}>
                          <span className="text-sm text-foreground/70 font-light group-hover:text-foreground/90 transition-colors duration-200 leading-snug">
                            {related.title}
                          </span>
                        </SharedElement>
                        <span className="text-xs text-foreground/60 font-light shrink-0">
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
