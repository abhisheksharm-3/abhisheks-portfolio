import type { Metadata } from "next";
import { Geist_Mono, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Analytics } from "@vercel/analytics/next";
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
  metadataBase: new URL("https://abhisheksan.com"),
  title: "Abhishek Sharma | Developer",
  description:
    "I'm Abhishek Sharma. I design and build for the web and mobile. This is my corner of the internet to share what I work on.",
  openGraph: {
    title: "Abhishek Sharma | Developer",
    description:
      "I build web apps, Android apps, and AI systems. This is my work.",
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

const RootLayout = ({ children }: Readonly<RootLayoutPropsType>) => (
  <html lang="en" suppressHydrationWarning>
    <body
      className={`${spaceGrotesk.variable} ${geistMono.variable} ${basteleur.variable} antialiased`}
    >
      <Providers>
        {children}
        <Analytics />
      </Providers>
    </body>
  </html>
);

export default RootLayout;
