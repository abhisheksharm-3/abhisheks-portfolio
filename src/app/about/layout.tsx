import type { Metadata } from "next";
import type { ReactNode } from "react";

/**
 * Metadata for the /about page and its nested routes.
 * This information is used for SEO and browser tab display.
 */
export const metadata: Metadata = {
  title: "About | Abhishek Sharma",
  description:
    "A quick look at who I am — my background, skills, and the work I’ve done in web, mobile, and design.",
};

/**
 * Defines the layout for the /about route segment.
 *
 * This component serves as a pass-through layout. Its primary purpose is to
 * apply the route-specific `metadata` defined in this file to all pages
 * within the /about path, without adding any extra wrapper elements to the DOM.
 *
 * @param {{ children: ReactNode }} props - The props object.
 * @param {ReactNode} props.children - The child components to be rendered within this layout.
 * @returns {ReactNode} The rendered child components.
 */
const AboutLayout = ({ children }: { children: ReactNode }) => children;

export default AboutLayout;
