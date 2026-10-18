import type { Metadata } from "next";
import type { ReactNode } from "react";
import { projects } from "@/data/projects";
import { breadcrumbSchema, JsonLd, projectSchema } from "@/lib/seo/json-ld";

export const metadata: Metadata = {
  title: "AI video platform | Abhishek Sharma",
  description:
    "Client work in production: an AI video platform with 200+ paying customers. Scriptwriting agents, a Remotion render path on Lambda, Stripe billing, and social analytics.",
};

/**
 * Layout for the dedicated client-work page. Exists to attach static metadata,
 * since the page itself is a client component.
 */
const AiVideoPlatformLayout = ({ children }: { children: ReactNode }): ReactNode => {
  const project = projects.find((entry) => entry.slug === "ai-video-platform");

  return (
    <>
      {project && (
        <JsonLd
          schemas={[
            projectSchema(project),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Projects", path: "/projects" },
              { name: "AI video platform", path: "/projects/ai-video-platform" },
            ]),
          ]}
        />
      )}
      {children}
    </>
  );
};

export default AiVideoPlatformLayout;
