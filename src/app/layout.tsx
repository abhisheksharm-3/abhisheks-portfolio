import type { Metadata } from "next";
import { Geist_Mono, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "@/components/Providers";
import { WebMcpTools } from "@/components/WebMcpTools";
import { getAllPosts } from "@/lib/content/loader";
import { JsonLd, personSchema, websiteSchema } from "@/lib/seo/json-ld";
import { SITE_URL, WEBMCP_ORIGIN_TRIAL_TOKEN } from "@/lib/site";
import type { RootLayoutPropsType } from "@/lib/types/layout";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const basteleur = localFont({
  variable: "--font-basteleur",
  src: [
    { path: "./fonts/Basteleur-Moonlight.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Basteleur-Bold.woff2", weight: "700", style: "normal" },
  ],
});

/**
 * Application metadata for SEO and social sharing.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Abhishek Sharma | Forward Deployed Engineer",
  description:
    "I'm Abhishek Sharma, a forward deployed engineer at Wednesday Solutions. I build AI agent pipelines, billing systems, and the infra they run on, from discovery to production.",
  openGraph: {
    title: "Abhishek Sharma | Forward Deployed Engineer",
    description:
      "Forward deployed engineer. I build AI agent pipelines, billing systems, and the infra they run on, from discovery to production.",
    url: SITE_URL,
    siteName: "Abhishek Sharma",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abhishek Sharma | Forward Deployed Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhishek Sharma | Forward Deployed Engineer",
    description:
      "Forward deployed engineer. I build AI agent pipelines, billing systems, and the infra they run on, from discovery to production.",
    images: ["/images/og-image.png"],
    creator: "@iabhisheksan",
  },
  authors: [{ name: "Abhishek Sharma", url: SITE_URL }],
  category: "personal",
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [{ url: "/writing/feed.xml", title: "Writing by Abhishek Sharma" }],
      "text/plain": [{ url: "/llms.txt", title: "Site index for agents" }],
    },
  },
  creator: "Abhishek Sharma",
  publisher: "Abhishek Sharma",
};

const RootLayout = async ({ children }: Readonly<RootLayoutPropsType>) => {
  const posts = await getAllPosts();
  const postIndex = posts.map(({ slug, frontmatter }) => ({
    slug,
    title: frontmatter.title,
    subhead: frontmatter.subhead,
    date: frontmatter.date,
    tags: frontmatter.tags,
    readingTime: frontmatter.readingTime,
  }));

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta content={WEBMCP_ORIGIN_TRIAL_TOKEN} httpEquiv="origin-trial" />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${geistMono.variable} ${basteleur.variable} antialiased`}
      >
        <JsonLd schemas={[personSchema, websiteSchema]} />
        <Providers>
          {children}
          <Analytics />
        </Providers>
        <WebMcpTools posts={postIndex} />
      </body>
    </html>
  );
};

export default RootLayout;
