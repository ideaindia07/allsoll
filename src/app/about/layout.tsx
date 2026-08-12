import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About ALLSOLL — Creative Agency in Jaipur, India',
  description:
    'ALLSOLL is a data-driven, human-centric branding and marketing agency in Jaipur. We orchestrate presence for ambitious brands across India.',
  keywords: [
    'about Allsoll',
    'creative agency Jaipur',
    'branding agency in Jaipur',
    'marketing agency India',
    'IDEA India',
  ],
  alternates: { canonical: '/about/' },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
