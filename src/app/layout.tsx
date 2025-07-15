import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abhishek Sharma — Web Experiences & Mobile Innovation",
  description:
    "Explore the digital portfolio of Abhishek Sharma—crafting next-gen web and mobile solutions with precision and clarity. Contact for collaborations in impactful digital product engineering.",
  openGraph: {
    title: "Abhishek Sharma — Web Experiences & Mobile Innovation",
    description:
      "Engineering unique web and mobile apps. Discover Abhishek Sharma's work in full stack development, UI/UX, and cross-platform solutions. Connect for bespoke digital craftsmanship.",
    url: "https://abhisheksharma.tech",
    siteName: "Abhishek Sharma Portfolio",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abhishek Sharma — Web & Mobile Developer | Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhishek Sharma — Web Experiences & Mobile Innovation",
    description:
      "Bespoke web and mobile solutions by Abhishek Sharma. Discover projects, skills, and contact for custom development.",
    images: ["/images/og-image.png"],
    creator: "@iabhisheksan",
  },
  metadataBase: new URL("https://abhisheksharma.tech"),
  keywords: [
    "Abhishek Sharma",
    "Web Experiences",
    "Mobile Innovation",
    "Full Stack",
    "Software Engineer",
    "Developer Portfolio",
    "UI/UX",
    "Cross-platform Apps",
    "Digital Product",
    "Next.js",
    "React Native"
  ],
  authors: [{ name: "Abhishek Sharma", url: "https://abhisheksharma.tech" }],
  category: "technology",
  creator: "Abhishek Sharma",
  publisher: "Abhishek Sharma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}