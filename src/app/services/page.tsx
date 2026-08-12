import type { Metadata } from 'next';
import { ServicesIndexPage } from '@/components/sections/ServicePages';
import { SEO_KEYWORDS } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Services — Branding, Strategy, Social, Digital | Jaipur & India',
  description:
    'ALLSOLL services in Jaipur and across India: branding, brand strategy, expert social media, website design, luxury marketing and brand photoshoots.',
  keywords: SEO_KEYWORDS,
  alternates: { canonical: '/services/' },
};

export default function ServicesPage() {
  return <ServicesIndexPage />;
}
