import type { MetadataRoute } from 'next';
import { SITE_PAGES, SITE_URL } from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return SITE_PAGES.map((page) => ({
    url: `${SITE_URL}${page.path === '/' ? '/' : page.path}`,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
