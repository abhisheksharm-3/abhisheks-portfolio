import type { Metadata } from "next";
import type { ReactNode } from "react";
import { projects } from "@/data/projects";
import { breadcrumbSchema, JsonLd, projectSchema } from "@/lib/seo/json-ld";

export const metadata: Metadata = {
  title: "Polaris | Abhishek Sharma",
  description:
    "A project operating system for Claude Code: eighteen flows, thirty-one commands, and the gates that keep an agent honest.",
};

/**
 * Layout for the dedicated Polaris project page. Exists to attach static
 * metadata, since the page itself is a client component.
 */
const PolarisPageLayout = ({ children }: { children: ReactNode }): ReactNode => {
  const polaris = projects.find((entry) => entry.slug === "polaris");

  return (
    <>
      {polaris && (
        <JsonLd
          schemas={[
            projectSchema(polaris),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Projects", path: "/projects" },
              { name: "Polaris", path: "/projects/polaris" },
            ]),
          ]}
        />
      )}
      {children}
    </>
  );
};

export default PolarisPageLayout;
