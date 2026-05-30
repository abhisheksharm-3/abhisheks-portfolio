// Server-only — uses fs. Do not import from client components.
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { compileMDX } from "next-mdx-remote/rsc"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import { PostFrontmatter, type PostFrontmatterType } from "./post-schema"
import { PostCallout } from "@/components/writing/PostCallout"

const POSTS_DIR = path.join(process.cwd(), "content/posts")

export type PostMeta = {
  slug: string
  frontmatter: PostFrontmatterType
}

export async function getAllPosts(opts?: { includeDrafts?: boolean }): Promise<PostMeta[]> {
  if (!fs.existsSync(POSTS_DIR)) return []

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"))

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "")
    const source = fs.readFileSync(path.join(POSTS_DIR, filename), "utf-8")
    const { data } = matter(source)
    const frontmatter = PostFrontmatter.parse(data)
    return { slug, frontmatter }
  })

  const filtered = opts?.includeDrafts
    ? posts
    : posts.filter((p) => !p.frontmatter.draft)

  return filtered.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  )
}

export async function getPostBySlug(slug: string) {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) return null

  const source = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(source)
  const frontmatter = PostFrontmatter.parse(data)

  const { content: mdxContent } = await compileMDX({
    source: content,
    components: { PostCallout },
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypePrettyCode, { theme: "one-dark-pro", keepBackground: false }],
        ],
      },
    },
  })

  return { slug, frontmatter, content: mdxContent }
}
