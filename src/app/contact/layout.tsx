import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact ALLSOLL — Branding Agency in Jaipur',
  description:
    'Talk to ALLSOLL in Jaipur. Branding, digital marketing, social media, websites and luxury campaigns for brands across India. tanishka@allsoll.com',
  keywords: [
    'contact branding agency Jaipur',
    'digital marketing agency Jaipur contact',
    'hire branding agency India',
  ],
  alternates: { canonical: '/contact/' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
