import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Graveyard | Abhishek Sharma",
  description: "Explore abandoned projects and the valuable lessons learned from them. Every failure is a stepping stone to success.",
};

export default function GraveyardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 