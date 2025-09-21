import type { Metadata } from "next";
import type { ReactNode } from "react";

/**
 * Metadata for the /graveyard page and its nested routes.
 * This is used for SEO and for the browser tab's title and description.
 */
export const metadata: Metadata = {
  title: "Project Graveyard | Abhishek Sharma",
  description:
    "A space where I share old projects — the unfinished, the experiments, and the ones I’ve retired along the way.",
};

/**
 * Defines the layout for the /graveyard route segment.
 *
 * This component is a pass-through layout, meaning it renders its children
 * directly without adding any wrapper elements. Its main purpose is to apply
 * the route-specific `metadata` to all pages under the /graveyard path.
 *
 * @param {{ children: ReactNode }} props - The component props.
 * @param {ReactNode} props.children - The child pages or components to render.
 * @returns {ReactNode} The rendered children.
 */
const GraveyardPageLayout = ({ children }: { children: ReactNode }): ReactNode => {
  return children;
};

export default GraveyardPageLayout;
