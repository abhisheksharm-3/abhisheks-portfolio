import type { MetadataRoute } from "next"
import { projects } from "@/data/projects"
import { getAllPosts } from "@/lib/content/loader"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts()
  const baseUrl = "https://abhisheksan.com"
  const siteUpdatedAt = new Date("2026-05-30")

  const staticRoutes = [
    { path: "", changeFrequency: "monthly", priority: 1 },
    { path: "/about", changeFrequency: "monthly", priority: 0.8 },
    { path: "/projects", changeFrequency: "weekly", priority: 0.9 },
    { path: "/graveyard", changeFrequency: "monthly", priority: 0.6 },
    { path: "/writing", changeFrequency: "weekly", priority: 0.9 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
  ] as const

  const staticEntries = staticRoutes.map((entry) => ({
    url: `${baseUrl}${entry.path}`,
    lastModified: siteUpdatedAt,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  })) satisfies MetadataRoute.Sitemap

  const projectEntries = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: siteUpdatedAt,
    changeFrequency: "yearly",
    priority: project.isFeatured ? 0.8 : 0.6,
  })) satisfies MetadataRoute.Sitemap

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/writing/${post.slug}`,
    lastModified: new Date(post.frontmatter.updatedAt ?? post.frontmatter.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }))

  return [...staticEntries, ...projectEntries, ...postEntries]
}
