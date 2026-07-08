import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ALLSOLL — Orchestrate Omnipresence",
  description: "We don't manage marketing channels. We orchestrate omnipresence for ambitious, future-forward brands. Luxury, minimal, cinematic digital experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full bg-bg-primary text-text-primary selection:bg-accent selection:text-bg-primary">
        {/* Film grain noise texture overlay */}
        <div className="noise-overlay" />
        {/* Ambient radial glow behind content */}
        <div className="ambient-glow" />
        
        {children}
      </body>
    </html>
  );
}
