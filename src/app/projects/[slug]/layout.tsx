import type { Metadata } from "next";
import type { ReactNode } from "react";

/**
 * Converts a URL-friendly slug into a human-readable, title-cased string.
 * For example, "my-cool-project" becomes "My Cool Project".
 *
 * @param {string} slug - The input string, typically from a URL parameter.
 * @returns {string} The formatted, title-cased string.
 */
const slugToTitleCase = (slug: string): string => {
  return slug
    .replace(/-/g, " ")
    .replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase(),
    );
};

/**
 * Dynamically generates metadata for each project page based on its slug.
 * This function is called by Next.js at build time to create the page's <head> tags.
 *
 * @param {{ params: Promise<{ slug: string }> }} props - The props containing dynamic route parameters.
 * @returns {Promise<Metadata>} A metadata object tailored to the specific project page.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const formattedTitle = slugToTitleCase(slug);

  return {
    title: `${formattedTitle} | Abhishek Sharma`,
    description: `A closer look at my project "${formattedTitle}" — what I built, learned, and explored along the way.`,
  };
}

/**
 * Defines the layout for the dynamic [slug] project pages.
 *
 * This is a pass-through component that doesn't render any visible UI.
 * Its purpose is to associate the dynamic `generateMetadata` function
 * with this route segment.
 *
 * @param {{ children: ReactNode }} props - The component props.
 * @param {ReactNode} props.children - The page component to be rendered within this layout.
 * @returns {ReactNode} The rendered children.
 */
const DetailedProjectPageLayout = ({
  children,
}: {
  children: ReactNode;
}): ReactNode => {
  return children;
};

export default DetailedProjectPageLayout;
