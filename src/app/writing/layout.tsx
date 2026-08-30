import type { Metadata } from "next";
import { getAllPosts } from "@/lib/content/loader";
import { breadcrumbSchema, itemListSchema, JsonLd } from "@/lib/seo/json-ld";

export const metadata: Metadata = {
  title: "Writing | Abhishek Sharma",
  description: "write-ups from production work on backend systems, ai, and web software.",
};

export default async function WritingLayout({ children }: { children: React.ReactNode }) {
  const posts = await getAllPosts();

  return (
    <>
      <JsonLd
        schemas={[
          itemListSchema({
            name: "Writing",
            path: "/writing",
            items: posts.map((post) => ({
              name: post.frontmatter.title,
              path: `/writing/${post.slug}`,
              description: post.frontmatter.subhead,
            })),
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Writing", path: "/writing" },
          ]),
        ]}
      />
      {children}
    </>
  );
}
