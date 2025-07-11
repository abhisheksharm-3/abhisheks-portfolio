import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Complete Project Portfolio | Abhishek Sharma",
  description: "Browse my comprehensive collection of projects spanning web development, mobile applications, and design work.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 