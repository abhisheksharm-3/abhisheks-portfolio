import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { PostFrontmatterType } from "@/lib/content/schema"

type PostCtaProps = {
  searchIntent: PostFrontmatterType["searchIntent"]
}

const CTA_MAP: Record<PostFrontmatterType["searchIntent"], { label: string; href: string }> = {
  informational: { label: "more writing", href: "/writing" },
  bofu: { label: "see what i'm building", href: "/projects" },
  commercial_investigation: { label: "get in touch", href: "/contact" },
}

export function PostCta({ searchIntent }: PostCtaProps) {
  const { label, href } = CTA_MAP[searchIntent]

  return (
    <div className="mt-12 pt-8 border-t border-primary/10">
      <Link
        href={href}
        className="group inline-flex items-center gap-1.5 text-sm text-foreground/40 hover:text-foreground/80 transition-colors duration-200 font-light"
      >
        <span>{label}</span>
        <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
      </Link>
    </div>
  )
}
