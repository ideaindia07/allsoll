import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import CustomCursor from '@/components/ui/CustomCursor';
import FluidBackground from '@/components/ui/FluidBackground';
import JsonLd from '@/components/seo/JsonLd';
import SeoCrawlLinks from '@/components/seo/SeoCrawlLinks';
import { SEO_KEYWORDS, SITE_URL, organizationJsonLd, HOME_SEO_TITLE, HOME_SEO_DESCRIPTION } from '@/lib/seo';

const GA_MEASUREMENT_ID = "G-P4HK9F1ZYE";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_SEO_TITLE,
    template: "%s | ALLSOLL",
  },
  description: HOME_SEO_DESCRIPTION,
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
    title: HOME_SEO_TITLE,
    description: HOME_SEO_DESCRIPTION,
    images: [{ url: "/AllSoll_logo.webp", alt: "ALLSOLL — branding agency in Jaipur, India" }],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_SEO_TITLE,
    description: HOME_SEO_DESCRIPTION,
  },
  verification: {
    google: "o8pX7520hJVgvd7KgsGs_ix47XqZxOXFsRP7T9GekU8",
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
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        {/* Film grain noise texture overlay */}
        <div className="noise-overlay" />
        {/* Ambient radial glow behind content */}
        <div className="ambient-glow" />
        {/* Fluid wave effect on cursor move */}
        <FluidBackground />
        
        <CustomCursor />
        <JsonLd data={organizationJsonLd()} />
        <SeoCrawlLinks />
        {children}
      </body>
    </html>
  );
}
