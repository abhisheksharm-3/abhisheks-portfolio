import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { AppShell } from "@/components/layout/AppShell"
import { getAllPosts, getPostBySlug } from "@/lib/content/loader"
import { PostCta } from "@/components/writing/PostCta"

type Props = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}

  const { frontmatter } = post
  const ogUrl = `/og?title=${encodeURIComponent(frontmatter.title)}&tag=${encodeURIComponent(frontmatter.tags[0] ?? "")}&subhead=${encodeURIComponent(frontmatter.subhead)}&date=${encodeURIComponent(new Date(frontmatter.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }))}&min=${frontmatter.readingTime}`

  return {
    title: `${frontmatter.title} | Abhishek Sharma`,
    description: frontmatter.subhead,
    keywords: frontmatter.keywords,
    authors: [{ name: "Abhishek Sharma", url: "https://abhisheksan.com" }],
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
  }
}

function serializeJsonLd(data: object): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
}

function buildJsonLd(post: Awaited<ReturnType<typeof getPostBySlug>>) {
  if (!post) return null
  const { frontmatter, slug } = post

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.subhead,
    datePublished: frontmatter.date,
    dateModified: frontmatter.updatedAt ?? frontmatter.date,
    author: {
      "@type": "Person",
      name: "Abhishek Sharma",
      url: "https://abhisheksan.com",
    },
    publisher: {
      "@type": "Person",
      name: "Abhishek Sharma",
      url: "https://abhisheksan.com",
    },
    keywords: frontmatter.keywords.join(", "),
    url: `https://abhisheksan.com/writing/${slug}`,
  }

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
    : null

  return { articleSchema, faqSchema }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  const { frontmatter, content } = post
  const schemas = buildJsonLd(post)

  const formattedDate = new Date(frontmatter.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <AppShell showBackground={false}>
      {schemas && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: serializeJsonLd(schemas.articleSchema) }}
          />
          {schemas.faqSchema && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: serializeJsonLd(schemas.faqSchema) }}
            />
          )}
        </>
      )}

      <div className="pt-36 pb-24 px-6 sm:px-10 lg:px-24">
        <div className="max-w-3xl mx-auto">

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

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif italic leading-tight text-foreground mb-4">
            {frontmatter.title}
          </h1>

          <p className="text-foreground/60 font-light leading-relaxed mb-8">
            {frontmatter.subhead}
          </p>

          <div className="h-px bg-primary/10 w-full mb-10" />

          <div className="prose-writing">
            {content}
          </div>

          {frontmatter.faqs && frontmatter.faqs.length > 0 && (
            <>
              <div className="h-px bg-primary/10 w-full mt-12 mb-10" />
              <div id="frequently-asked-questions">
                <h2 className="text-lg font-serif italic text-foreground/80 mb-6">
                  frequently asked questions
                </h2>
                <div className="space-y-6">
                  {frontmatter.faqs.map((faq, i) => (
                    <div key={i}>
                      <p className="text-sm text-foreground/80 font-light mb-2">
                        {faq.question}
                      </p>
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
    </AppShell>
  )
}
