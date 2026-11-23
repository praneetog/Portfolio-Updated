import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { portfolioData } from "@/data/portfolioData";
import { SITE_URL } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const titleDefault = `${portfolioData.name} — ${portfolioData.role}`;

const description =
  "Praneet Kashyap — Full-Stack Software Engineer building scalable, AI-powered web apps with Next.js, TypeScript & Go at MyTravaly Worldwide, shipping Swoovo.";

// Derived entirely from portfolioData — single source of truth, capped to
// stay targeted rather than an exhaustive, spammy tag dump.
const keywords = Array.from(
  new Set([
    portfolioData.name,
    portfolioData.role,
    portfolioData.meta.company,
    ...portfolioData.projects.map((p) => p.title),
    ...portfolioData.techStack.flatMap((g) => g.tags.slice(0, 4)),
  ]),
);

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: titleDefault,
    template: `%s | ${portfolioData.name}`,
  },
  description,
  keywords,
  authors: [{ name: portfolioData.name, url: SITE_URL }],
  creator: portfolioData.name,
  publisher: portfolioData.name,
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "f5acHT3yfCrgmaXM-5_LoUsFlgetWRNKyYK4JGZP5J4",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: `${portfolioData.name} — Portfolio`,
    title: titleDefault,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: titleDefault,
    description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>
      <body>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
