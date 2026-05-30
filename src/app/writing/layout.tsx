import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing | Abhishek Sharma",
  description:
    "thoughts on building software, ai, and the occasional late-night idea. coming soon.",
};

export default function WritingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
