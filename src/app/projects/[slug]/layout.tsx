import type { Metadata } from "next";
import type { ReactNode } from "react";
import { projects } from "@/data/projects";
import { breadcrumbSchema, JsonLd, projectSchema } from "@/lib/seo/json-ld";

/**
 * Projects with their own route under src/app/projects/. Prerendering them here too
 * writes a second <slug>.html, and whichever the build writes last is what gets served.
 */
const HAND_BUILT_SLUGS = new Set(["polaris", "ai-video-platform"]);

/** Every project is known at build time, so every project page is prerendered. */
export function generateStaticParams() {
  return projects
    .filter((project) => !HAND_BUILT_SLUGS.has(project.slug))
    .map((project) => ({ slug: project.slug }));
}

/**
 * Metadata for each project page, taken from src/data/projects.ts, which is the
 * source of truth for project information.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);

  if (!project) return { title: "Project | Abhishek Sharma" };

  return {
    title: `${project.title} | Abhishek Sharma`,
    description: project.longDescription ?? project.description,
    keywords: project.tags,
    // Archived projects are early learning work; their pages stay reachable but out of search.
    ...(project.isArchived && { robots: { index: false } }),
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      url: `/projects/${project.slug}`,
      images: [{ url: project.imageSrc, alt: project.title }],
    },
  };
}

/**
 * Attaches metadata and structured data to the dynamic project route. The page
 * itself is a client component, so both belong here.
 */
const DetailedProjectPageLayout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);

  return (
    <>
      {project && (
        <JsonLd
          schemas={[
            projectSchema(project),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Projects", path: "/projects" },
              { name: project.title, path: `/projects/${project.slug}` },
            ]),
          ]}
        />
      )}
      {children}
    </>
  );
};

export default DetailedProjectPageLayout;
