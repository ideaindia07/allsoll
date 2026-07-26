import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ALLSOLL — Orchestrate Omnipresence",
  description: "We don't manage marketing channels. We orchestrate omnipresence for ambitious, future-forward brands. Luxury, minimal, cinematic digital experience.",
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

import CustomCursor from '@/components/ui/CustomCursor';
import FluidBackground from '@/components/ui/FluidBackground';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased overflow-x-hidden">
      <body className="min-h-full bg-bg-primary text-text-primary selection:bg-accent selection:text-bg-primary overflow-x-hidden">
        {/* Film grain noise texture overlay */}
        <div className="noise-overlay" />
        {/* Ambient radial glow behind content */}
        <div className="ambient-glow" />
        {/* Fluid wave effect on cursor move */}
        <FluidBackground />
        
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
