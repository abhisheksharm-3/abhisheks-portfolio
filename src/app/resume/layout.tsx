import type { Metadata } from "next";
import type { ReactNode } from "react";
import { breadcrumbSchema, JsonLd } from "@/lib/seo/json-ld";

/** Metadata for /resume, the web view of the same corpus the PDFs compile from. */
export const metadata: Metadata = {
  title: "Resume | Abhishek Sharma",
  description:
    "Associate forward deployed engineer at Wednesday. Billing, releases, and production systems for client platforms, with a one-page PDF per role.",
};

const ResumeLayout = ({ children }: { children: ReactNode }) => (
  <>
    <JsonLd
      schemas={[
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Resume", path: "/resume" },
        ]),
      ]}
    />
    {children}
  </>
);

export default ResumeLayout;
