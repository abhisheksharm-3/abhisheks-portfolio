import { AppShell } from "@/components/layout/AppShell"
import { getAllPosts } from "@/lib/posts"
import { WritingListClient } from "./WritingListClient"

const WritingPage = async () => {
  const allPosts = await getAllPosts({ includeDrafts: true })
  const posts = allPosts.filter((post) => !post.frontmatter.draft)
  const draftPosts = allPosts.filter((post) => post.frontmatter.draft)

  return (
    <AppShell>
      <WritingListClient posts={posts} draftPosts={draftPosts} />
    </AppShell>
  )
}

export default WritingPage
