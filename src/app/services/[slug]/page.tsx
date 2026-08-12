import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SERVICES, getService } from '@/lib/services';
import { ServiceDetailPage } from '@/components/sections/ServicePages';
import JsonLd from '@/components/seo/JsonLd';
import { SERVICE_SEO, serviceFaqJsonLd } from '@/lib/seo';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  const seo = SERVICE_SEO[slug];
  if (!service) return { title: 'Service' };
  return {
    title: seo?.title ?? `${service.title} — ALLSOLL`,
    description: seo?.description ?? service.desc,
    keywords: seo?.keywords,
    alternates: { canonical: `/services/${service.slug}/` },
    openGraph: {
      title: seo?.title ?? service.title,
      description: seo?.description ?? service.desc,
      locale: 'en_IN',
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return (
    <>
      <JsonLd data={serviceFaqJsonLd(slug)} />
      <ServiceDetailPage service={service} />
    </>
  );
}
