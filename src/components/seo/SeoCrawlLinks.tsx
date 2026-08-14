import { FOOTER_CRAWL_LINKS } from '@/lib/seo';

/**
 * Static HTML crawl links for search engines.
 * Visually hidden with CSS, present in the document source on every page.
 */
export default function SeoCrawlLinks() {
  return (
    <nav
      id="seo-crawl-links"
      aria-label="ALLSOLL services in Jaipur and India"
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        borderWidth: 0,
      }}
    >
      <ul>
        {FOOTER_CRAWL_LINKS.map((link) => (
          <li key={link.label}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
