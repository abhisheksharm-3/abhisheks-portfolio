import { EXPERTISE } from "@/data/skills-expertise";
import { AUTHOR, SITE_URL } from "@/lib/site";
import type { ProjectType } from "@/lib/types/components";

/** Every named technology across the expertise cards, deduped. */
const KNOWS_ABOUT = [...new Set(EXPERTISE.flatMap((area) => area.skills))];

/** Escapes the two characters that could close the surrounding script tag. */
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c").replace(/>/g, "\\u003e");
}

/** The author, referenced by every other schema on the site. */
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: AUTHOR.name,
  url: SITE_URL,
  email: `mailto:${AUTHOR.email}`,
  jobTitle: "Software Engineer",
  description: "Full-stack developer. I build web apps, Android apps, and AI systems.",
  sameAs: [AUTHOR.github, AUTHOR.linkedin, AUTHOR.x],
  knowsAbout: KNOWS_ABOUT,
  hasOccupation: {
    "@type": "Occupation",
    name: "Forward Deployed Engineer",
    occupationLocation: { "@type": "Country", name: "India" },
    skills: KNOWS_ABOUT.join(", "),
  },
  worksFor: {
    "@type": "Organization",
    name: "Wednesday Solutions",
    url: "https://wednesday.is",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Chandigarh College of Engineering and Technology, Panjab University",
  },
  award: "Winner, Network18 track — Google Gen AI Exchange Hackathon (2024)",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chandigarh",
    addressCountry: "IN",
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: AUTHOR.name,
  author: { "@id": `${SITE_URL}/#person` },
  inLanguage: "en-US",
} as const;

/** A project page. Code-bearing projects get SoftwareSourceCode, the rest CreativeWork. */
export function projectSchema(project: ProjectType) {
  return {
    "@context": "https://schema.org",
    "@type": project.github ? "SoftwareSourceCode" : "CreativeWork",
    name: project.title,
    description: project.longDescription ?? project.description,
    url: `${SITE_URL}/projects/${project.slug}`,
    author: { "@id": `${SITE_URL}/#person` },
    dateCreated: project.year,
    keywords: project.tags.join(", "),
    ...(project.github ? { codeRepository: project.github } : {}),
    ...(project.url ? { sameAs: [project.url] } : {}),
    ...(project.tags.length ? { programmingLanguage: project.tags } : {}),
  };
}

/** A listing page's items, so an engine reads it as a list rather than prose. */
export function itemListSchema({
  name,
  path,
  items,
}: {
  name: string;
  path: string;
  items: readonly { name: string; path: string; description?: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    url: `${SITE_URL}${path}`,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#person` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        url: `${SITE_URL}${item.path}`,
        ...(item.description ? { description: item.description } : {}),
      })),
    },
  };
}

/** Trail of {name, path} pairs, root first. */
export function breadcrumbSchema(trail: readonly { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}

/** Renders one or more schemas as script tags. */
export function JsonLd({ schemas }: { schemas: readonly object[] }) {
  return (
    <>
      {schemas.map((schema) => (
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD has to be injected as raw script content
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
          key={serializeJsonLd(schema).slice(0, 64)}
          type="application/ld+json"
        />
      ))}
    </>
  );
}
