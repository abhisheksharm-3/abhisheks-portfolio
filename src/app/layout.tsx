import type { Metadata } from "next";
import { Geist_Mono, Geist, Newsreader } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Analytics } from "@vercel/analytics/next";
import type { RootLayoutPropsType } from "@/lib/types";

/**
 * Initializes the Geist Sans font with the Latin subset.
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/**
 * Initializes the Geist Mono font with the Latin subset.
 */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Initializes the Newsreader font with the Latin subset.
 */
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

/**
 * Application metadata for SEO and social sharing.
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://abhisheksan.com"),
  title: "Abhishek Sharma | Developer",
  description:
    "I'm Abhishek Sharma. I design and build for the web and mobile. This is my corner of the internet to share what I work on.",
  openGraph: {
    title: "Abhishek Sharma | Developer",
    description:
      "I make web and mobile apps. Here's my portfolio—projects, ideas, and ways to connect.",
    url: "https://abhisheksan.com",
    siteName: "Abhishek Sharma",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abhishek Sharma | Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhishek Sharma | Developer",
    description:
      "I build for web and mobile. This site is where I share my work.",
    images: ["/images/og-image.png"],
    creator: "@iabhisheksan",
  },
  authors: [{ name: "Abhishek Sharma", url: "https://abhisheksan.com" }],
  category: "personal",
  creator: "Abhishek Sharma",
  publisher: "Abhishek Sharma",
};

/**
 * Root layout component wrapping the application with providers and fonts.
 */
const RootLayout = ({ children }: Readonly<RootLayoutPropsType>) => (
  <html lang="en" suppressHydrationWarning>
    <body
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} antialiased`}
    >
      <Providers>
        {children}
        <Analytics />
      </Providers>
    </body>
  </html>
);

export default RootLayout;
