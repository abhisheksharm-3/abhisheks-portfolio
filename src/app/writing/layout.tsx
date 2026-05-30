import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing | Abhishek Sharma",
  description:
    "write-ups from production work on backend systems, ai, and web software.",
};

export default function WritingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
