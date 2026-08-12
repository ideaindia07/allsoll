import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from '@/components/ui/CustomCursor';
import FluidBackground from '@/components/ui/FluidBackground';
import JsonLd from '@/components/seo/JsonLd';
import { SEO_KEYWORDS, SITE_URL, organizationJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ALLSOLL — Branding & Digital Marketing Agency in Jaipur, India",
    template: "%s | ALLSOLL",
  },
  description:
    "ALLSOLL is a branding and digital marketing agency in Jaipur serving brands across India. Brand identity, strategy, social media, websites, luxury marketing and photoshoots.",
  keywords: SEO_KEYWORDS,
  authors: [{ name: "ALLSOLL" }],
  creator: "ALLSOLL",
  publisher: "ALLSOLL",
  category: "Marketing Agency",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "ALLSOLL",
    title: "ALLSOLL — Branding & Digital Marketing Agency in Jaipur, India",
    description:
      "Branding agency in Jaipur and India. We build identity, strategy, social, digital and luxury campaigns that compound — not rented attention.",
    images: [{ url: "/AllSoll_logo.webp", alt: "ALLSOLL — branding agency in Jaipur, India" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ALLSOLL — Branding Agency in Jaipur, India",
    description:
      "Creative and performance marketing agency in Jaipur. Branding, social, websites and luxury campaigns for India.",
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
  other: {
    "geo.region": "IN-RJ",
    "geo.placename": "Jaipur",
    "geo.position": "26.9124;75.7873",
    ICBM: "26.9124, 75.7873",
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className="h-full antialiased overflow-x-hidden">
      <body className="min-h-full bg-bg-primary text-text-primary selection:bg-accent selection:text-bg-primary overflow-x-hidden">
        {/* Film grain noise texture overlay */}
        <div className="noise-overlay" />
        {/* Ambient radial glow behind content */}
        <div className="ambient-glow" />
        {/* Fluid wave effect on cursor move */}
        <FluidBackground />
        
        <CustomCursor />
        <JsonLd data={organizationJsonLd()} />
        {children}
      </body>
    </html>
  );
}
