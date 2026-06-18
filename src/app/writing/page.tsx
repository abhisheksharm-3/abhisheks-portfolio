import { AppShell } from "@/components/layout/AppShell"
import { getAllPosts } from "@/lib/content/loader"
import { WritingList } from "@/components/sections/writing/WritingList"

const WritingPage = async () => {
  const allPosts = await getAllPosts({ includeDrafts: true })
  const posts = allPosts.filter((post) => !post.frontmatter.draft)
  const draftPosts = allPosts.filter((post) => post.frontmatter.draft)

  return (
    <AppShell>
      <WritingList posts={posts} draftPosts={draftPosts} />
    </AppShell>
  )
}

export default WritingPage
