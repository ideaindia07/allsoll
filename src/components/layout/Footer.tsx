'use client';

const basePath = '';

export default function Footer() {
  return (
    <footer id="contact" className="w-full bg-bg-primary border-t border-border-custom py-16 md:py-[100px] pb-10 md:pb-[50px] relative z-20">
      <div className="max-w-[1800px] mx-auto px-[8%]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-20 mb-12 md:mb-20">
          <div className="flex flex-col gap-4">
            <div className="-ml-3 mb-2">
              <img src={`${basePath}/AllSoll_logo.webp`} alt="AllSoll" className="h-24 md:h-32 w-auto object-contain" />
            </div>
            <p className="font-body text-[15px] text-text-secondary max-w-[300px]">
              Branding and digital marketing agency in Jaipur, serving ambitious brands across India.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-display text-[11px] font-semibold uppercase tracking-widest text-text-tertiary">
              Services
            </span>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Branding', href: '/services/branding/' },
                { label: 'Brand Strategy', href: '/services/brand-consultation-strategy/' },
                { label: 'Social Media', href: '/services/expert-social-media/' },
                { label: 'Website Design', href: '/services/website-design-development/' },
                { label: 'Luxury Marketing', href: '/services/luxury-marketing/' },
                { label: 'Brand Photoshoots', href: '/services/brand-photoshoots/' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-body text-[15px] text-text-secondary hover:text-accent transition-colors duration-300 w-fit cursor-none"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-display text-[11px] font-semibold uppercase tracking-widest text-text-tertiary">
              Socials
            </span>
            <div className="flex flex-col gap-3">
              {[
                { name: 'LinkedIn', url: 'https://www.linkedin.com/search/results/all/?keywords=ALLSOLL&origin=RICH_QUERY_TYPEAHEAD_HISTORY&heroEntityKey=urn%3Ali%3Aorganization%3A111861665&position=0' },
                { name: 'Instagram', url: 'https://www.instagram.com/allsoll.global?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
                { name: 'YouTube', url: 'https://www.youtube.com/@allsoll.global' }
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[15px] text-text-secondary hover:text-accent transition-colors duration-300 w-fit cursor-none"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-display text-[11px] font-semibold uppercase tracking-widest text-text-tertiary">
              Connect
            </span>
            <a
              href="mailto:tanishka@allsoll.com"
              className="font-display text-lg md:text-xl lg:text-2xl font-medium text-text-primary hover:text-accent transition-colors duration-300 w-fit cursor-none break-all"
            >
              tanishka@allsoll.com
            </a>
            <a
              href="/about/"
              className="font-body text-[15px] text-text-secondary hover:text-accent transition-colors duration-300 w-fit cursor-none"
            >
              About
            </a>
            <a
              href="/contact/"
              className="font-body text-[15px] text-text-secondary hover:text-accent transition-colors duration-300 w-fit cursor-none"
            >
              Contact
            </a>
            <p className="font-body text-[15px] text-text-secondary mt-1">
              Jaipur, Rajasthan · An IDEA India Product
            </p>
          </div>
        </div>
        <div className="border-t border-border-custom pt-10 flex flex-col gap-8 font-body text-xs text-text-tertiary">
          <nav aria-label="Service locations" className="flex flex-wrap gap-x-4 gap-y-2 leading-relaxed">
            <a href="/services/branding/" className="hover:text-accent transition-colors">Branding agency in Jaipur</a>
            <a href="/services/branding/" className="hover:text-accent transition-colors">Branding agency in India</a>
            <a href="/services/brand-consultation-strategy/" className="hover:text-accent transition-colors">Marketing agency in Jaipur</a>
            <a href="/services/expert-social-media/" className="hover:text-accent transition-colors">Digital marketing agency in Jaipur</a>
            <a href="/services/website-design-development/" className="hover:text-accent transition-colors">Website design Jaipur</a>
            <a href="/services/luxury-marketing/" className="hover:text-accent transition-colors">Luxury marketing India</a>
            <a href="/services/brand-photoshoots/" className="hover:text-accent transition-colors">Brand photoshoots Jaipur</a>
            <a href="/services/" className="hover:text-accent transition-colors">Creative agency India</a>
          </nav>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p>&copy; {new Date().getFullYear()} ALLSOLL. All rights reserved. An IDEA India Product.</p>
            <div className="flex gap-[30px]">
              <a href="#" className="hover:text-text-secondary transition-colors cursor-none">Privacy Policy</a>
              <a href="#" className="hover:text-text-secondary transition-colors cursor-none">Terms of Engagement</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
