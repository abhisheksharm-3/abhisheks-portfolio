// Server-only — uses fs. Do not import from client components.
import "server-only"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { compileMDX } from "next-mdx-remote/rsc"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import { PostFrontmatter, type PostFrontmatterType } from "./schema"
import { PostCallout } from "@/components/writing/PostCallout"

const POSTS_DIR = path.resolve(process.cwd(), "content/posts")
const POST_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export type PostMeta = {
  slug: string
  frontmatter: PostFrontmatterType
}

function getSlugFromFilename(filename: string): string {
  const slug = path.basename(filename, ".mdx")

  if (!POST_SLUG_PATTERN.test(slug)) {
    throw new Error(
      `Invalid post filename "${filename}". Use lowercase kebab-case slugs.`
    )
  }

  return slug
}

function getPostFilePath(slug: string): string | null {
  if (!POST_SLUG_PATTERN.test(slug)) return null

  const filePath = path.resolve(POSTS_DIR, `${slug}.mdx`)
  const isInsidePostsDir = filePath.startsWith(`${POSTS_DIR}${path.sep}`)

  return isInsidePostsDir ? filePath : null
}

export async function getAllPosts(opts?: { includeDrafts?: boolean }): Promise<PostMeta[]> {
  if (!fs.existsSync(POSTS_DIR)) return []

  const files = fs
    .readdirSync(POSTS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name)

  const posts = files.map((filename) => {
    const slug = getSlugFromFilename(filename)
    const filePath = getPostFilePath(slug)

    if (!filePath) {
      throw new Error(`Invalid post path for "${filename}".`)
    }

    const source = fs.readFileSync(filePath, "utf-8")
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

export async function getPostBySlug(
  slug: string,
  opts?: { includeDrafts?: boolean }
) {
  const filePath = getPostFilePath(slug)

  if (!filePath || !fs.existsSync(filePath)) return null

  const source = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(source)
  const frontmatter = PostFrontmatter.parse(data)

  if (frontmatter.draft && !opts?.includeDrafts) return null

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
