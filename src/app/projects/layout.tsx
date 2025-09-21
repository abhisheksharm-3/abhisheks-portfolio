import type { Metadata } from "next";
import type { ReactNode } from "react";

/**
 * Metadata for the /projects page and its nested routes.
 * This is used for SEO and for the browser tab's title and description.
 */
export const metadata: Metadata = {
  title: "Projects | Abhishek Sharma",
  description:
    "Check out the projects I’ve worked on — from web apps to mobile builds to design experiments.",
};

/**
 * Defines the layout for the /projects route segment.
 *
 * This component is a pass-through layout, meaning it renders its children
 * directly without adding any wrapper elements. Its main purpose is to apply
 * the route-specific `metadata` to all pages under the /projects path.
 *
 * @param {{ children: ReactNode }} props - The component props.
 * @param {ReactNode} props.children - The child pages or components to render.
 * @returns {ReactNode} The rendered children.
 */
const ProjectsPageLayout = ({ children }: { children: ReactNode }): ReactNode => {
  return children;
};

export default ProjectsPageLayout;
