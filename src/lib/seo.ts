import { SERVICES } from '@/lib/services';

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://allsoll.com').replace(
  /\/$/,
  ''
);

export const SITE_NAME = 'ALLSOLL';

export const HOME_SEO_TITLE =
  'Branding & Digital Marketing Agency in India | Allsoll';
export const HOME_SEO_DESCRIPTION =
  'Allsoll is a branding and digital marketing agency in India, helping brands grow with creative strategy, performance marketing, and digital solutions.';

export const SEO_KEYWORDS = [
  'branding agency in Jaipur',
  'branding agency in India',
  'best branding agency in India',
  'top branding agencies in India',
  'top 10 branding companies in India',
  'creative agency Jaipur',
  'creative agency India',
  'marketing agency in Jaipur',
  'digital marketing agency in Jaipur',
  'digital marketing agency in India',
  'digital marketing agency for startups',
  'performance marketing agency Jaipur',
  'performance marketing expert India',
  'performance marketing management',
  'advertising agency Jaipur',
  'best ad agencies in India',
  'social media agency Jaipur',
  'social media marketing India',
  'website design company Jaipur',
  'website development India',
  'luxury marketing agency India',
  'brand photoshoot Jaipur',
  'brand strategy India',
  'brand identity design Jaipur',
  'Allsoll Jaipur',
  'Allsoll India',
];

/** Crawlable footer links — visually hidden, kept in DOM for search engines */
export const FOOTER_CRAWL_LINKS: { label: string; href: string }[] = [
  { label: 'Branding agency in Jaipur', href: '/services/branding/' },
  { label: 'Branding agency in India', href: '/services/branding/' },
  { label: 'Best branding agency in India', href: '/services/branding/' },
  { label: 'Top branding agencies in India', href: '/services/branding/' },
  { label: 'Top 10 branding companies in India', href: '/services/branding/' },
  { label: 'Brand identity design Jaipur', href: '/services/branding/' },
  { label: 'Marketing agency in Jaipur', href: '/services/brand-consultation-strategy/' },
  { label: 'Brand strategy India', href: '/services/brand-consultation-strategy/' },
  { label: 'Performance marketing expert India', href: '/services/brand-consultation-strategy/' },
  { label: 'Performance marketing management', href: '/services/brand-consultation-strategy/' },
  { label: 'Digital marketing agency in Jaipur', href: '/services/expert-social-media/' },
  { label: 'Digital marketing agency in India', href: '/services/expert-social-media/' },
  { label: 'Social media agency Jaipur', href: '/services/expert-social-media/' },
  { label: 'Social media marketing India', href: '/services/expert-social-media/' },
  { label: 'Website design company Jaipur', href: '/services/website-design-development/' },
  { label: 'Website development India', href: '/services/website-design-development/' },
  { label: 'Digital marketing agency for startups', href: '/services/website-design-development/' },
  { label: 'Luxury marketing agency India', href: '/services/luxury-marketing/' },
  { label: 'Best ad agencies in India', href: '/services/luxury-marketing/' },
  { label: 'Brand photoshoot Jaipur', href: '/services/brand-photoshoots/' },
  { label: 'Creative agency Jaipur', href: '/services/' },
  { label: 'Creative agency India', href: '/services/' },
  { label: 'Advertising agency Jaipur', href: '/services/' },
  { label: 'Performance marketing agency Jaipur', href: '/services/' },
  { label: 'Allsoll Jaipur', href: '/about/' },
  { label: 'Allsoll India', href: '/about/' },
];

export const SERVICE_SEO: Record<
  string,
  { title: string; description: string; keywords: string[] }
> = {
  branding: {
    title: 'Branding Agency in India & Jaipur | Brand Identity Systems — ALLSOLL',
    description:
      'Allsoll is a branding agency in India and Jaipur building complete brand identity systems — logo, visual language, tone and positioning — not just a logo file.',
    keywords: [
      'branding agency in India',
      'branding agency in Jaipur',
      'best branding agency in India',
      'top branding agencies in India',
      'top 10 branding companies in India',
      'brand identity design Jaipur',
      'logo and brand system India',
    ],
  },
  'brand-consultation-strategy': {
    title: 'Brand Strategy & Consultation in Jaipur | Marketing Agency — ALLSOLL',
    description:
      'Brand consultation and strategy from a marketing agency in Jaipur. Positioning, competitor mapping and performance marketing management that compounds.',
    keywords: [
      'marketing agency in Jaipur',
      'brand strategy India',
      'brand consultation Jaipur',
      'performance marketing expert',
      'performance marketing management',
      'positioning strategy India',
    ],
  },
  'expert-social-media': {
    title: 'Social Media Agency in Jaipur | Expert Social Media — ALLSOLL',
    description:
      'Expert social media from a digital marketing agency in Jaipur. Organic and paid campaigns built for recall, engagement and conversion — not vanity metrics.',
    keywords: [
      'social media agency Jaipur',
      'digital marketing agency in Jaipur',
      'social media marketing India',
      'Instagram marketing Jaipur',
      'LinkedIn marketing India',
      'best performance marketing agencies',
    ],
  },
  'website-design-development': {
    title: 'Website Design & Development in Jaipur | Custom Sites — ALLSOLL',
    description:
      'Custom website design and development in Jaipur and across India. Immersive, luxury digital experiences for startups and brands — built to convert, not templates.',
    keywords: [
      'website design company Jaipur',
      'website development India',
      'digital marketing agency for startups',
      'custom website design Jaipur',
      'ecommerce website India',
    ],
  },
  'luxury-marketing': {
    title: 'Luxury Marketing Agency in India | Premium Brand Campaigns — ALLSOLL',
    description:
      'Luxury marketing from one of the best ad agencies in India. Premium campaigns for fashion, jewellery, hospitality and lifestyle brands that protect exclusivity.',
    keywords: [
      'luxury marketing agency India',
      'best ad agencies in India',
      'premium brand marketing India',
      'luxury advertising Jaipur',
      'top 10 branding companies in India',
    ],
  },
  'brand-photoshoots': {
    title: 'Brand Photoshoots in Jaipur | Cinematic Brand Photography — ALLSOLL',
    description:
      'Cinematic brand photoshoots in Jaipur with full production — concept, styling, location and post. Visual assets at the standard of top creative agencies in India.',
    keywords: [
      'brand photoshoot Jaipur',
      'brand photography India',
      'top creative agencies in India',
      'commercial photoshoot Jaipur',
      'brand content production India',
    ],
  },
};

export function absoluteUrl(path = '/') {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const withSlash = normalized.endsWith('/') ? normalized : `${normalized}/`;
  return `${SITE_URL}${withSlash === '//' ? '/' : withSlash}`;
}

export const SITE_PAGES = [
  { path: '/', changeFrequency: 'weekly' as const, priority: 1 },
  { path: '/about/', changeFrequency: 'monthly' as const, priority: 0.8 },
  { path: '/services/', changeFrequency: 'weekly' as const, priority: 0.9 },
  { path: '/contact/', changeFrequency: 'monthly' as const, priority: 0.7 },
  { path: '/privacy-policy/', changeFrequency: 'yearly' as const, priority: 0.4 },
  ...SERVICES.map((service) => ({
    path: `/services/${service.slug}/`,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  })),
];

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['ProfessionalService', 'LocalBusiness'],
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/AllSoll_logo.webp`,
    image: `${SITE_URL}/AllSoll_logo.webp`,
    email: 'tanishka@allsoll.com',
    description:
      'Branding, digital marketing, social media, website design, luxury marketing and brand photoshoots. A creative agency in Jaipur serving brands across India.',
    areaServed: [
      { '@type': 'City', name: 'Jaipur' },
      { '@type': 'State', name: 'Rajasthan' },
      { '@type': 'Country', name: 'India' },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jaipur',
      addressRegion: 'Rajasthan',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 26.9124,
      longitude: 75.7873,
    },
    sameAs: [
      'https://www.instagram.com/allsoll.global',
      'https://www.youtube.com/@allsoll.global',
    ],
    knowsAbout: SEO_KEYWORDS,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'ALLSOLL Services',
      itemListElement: SERVICES.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          url: absoluteUrl(`/services/${service.slug}/`),
          description: service.desc,
          areaServed: ['Jaipur', 'India'],
        },
      })),
    },
  };
}

export function serviceFaqJsonLd(slug: string) {
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service || service.faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}
