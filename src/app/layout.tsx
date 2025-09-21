import type { Metadata } from "next";
import { Geist_Mono, Geist, Newsreader } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";

/**
 * Initializes the Geist Sans font with the Latin subset.
 * It's assigned to the CSS variable `--font-geist-sans`.
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/**
 * Initializes the Geist Mono font with the Latin subset.
 * It's assigned to the CSS variable `--font-geist-mono`.
 */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Initializes the Newsreader font with the Latin subset, including normal and italic styles.
 * It's assigned to the CSS variable `--font-newsreader`.
 */
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

/**
 * Defines the metadata for the application, used for SEO and social media sharing.
 * Includes title, description, Open Graph, and Twitter card information.
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://abhisheksan.com"),
  title: "Abhishek Sharma | Developer",
  description:
    "I’m Abhishek Sharma. I design and build for the web and mobile. This is my corner of the internet to share what I work on.",
  openGraph: {
    title: "Abhishek Sharma | Developer",
    description:
      "I make web and mobile apps. Here’s my portfolio—projects, ideas, and ways to connect.",
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
 * The root layout component that wraps the entire application.
 * It sets up the HTML structure, applies global fonts, theme provider, and analytics.
 *
 * @param {object} props - The properties for the component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The root layout of the application.
 */
const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="en" suppressHydrationWarning>
    <body
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} antialiased`}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Analytics />
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;