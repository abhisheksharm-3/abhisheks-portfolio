import type { Metadata } from "next";
import type { ReactNode } from "react";

/**
 * Metadata for the /contact page and its nested routes.
 * This information is used for SEO and browser tab display.
 */
export const metadata: Metadata = {
  title: "Contact | Abhishek Sharma",
  description:
    "Get in touch with me for collaborations, project ideas, or just to say hi.",
};

/**
 * Defines the layout for the /contact route segment.
 *
 * This is a pass-through layout, meaning it doesn't render any wrapper
 * elements. Its sole function is to apply the route-specific `metadata`
 * to all pages within the /contact path.
 *
 * @param {{ children: ReactNode }} props - The props object.
 * @param {ReactNode} props.children - The child components to be rendered.
 * @returns {ReactNode} The rendered child components.
 */
const ContactPageLayout = ({ children }: { children: ReactNode }) => children;

export default ContactPageLayout;
