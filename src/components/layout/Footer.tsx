'use client';

const basePath = process.env.NODE_ENV === 'production' ? '/allsoll' : '';

export default function Footer() {
  return (
    <footer id="contact" className="w-full bg-bg-primary border-t border-border-custom py-16 md:py-[100px] pb-10 md:pb-[50px] relative z-20">
      <div className="max-w-[1800px] mx-auto px-[8%]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-20 mb-12 md:mb-20">
          <div className="flex flex-col gap-4">
            <div className="-ml-3 mb-2">
              <img src={`${basePath}/AllSoll_logo.png`} alt="AllSoll" className="h-24 md:h-32 w-auto object-contain" />
            </div>
            <p className="font-body text-[15px] text-text-secondary max-w-[300px]">
              Orchestrating omnipresence for ambitious, future-forward brands.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-display text-[11px] font-semibold uppercase tracking-widest text-text-tertiary">
              Navigation
            </span>
            <div className="flex flex-col gap-3">
              {['Work', 'Ecosystem', 'Services', 'About', 'Team'].map((item) => (
                <a
                  key={item}
                  href={item === 'About' ? '/about' : `#${item.toLowerCase()}`}
                  className="font-body text-[15px] text-text-secondary hover:text-accent transition-colors duration-300 w-fit cursor-none"
                >
                  {item}
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
            <p className="font-body text-[15px] text-text-secondary mt-1">
              An IDEA India Product
            </p>
          </div>
        </div>
        <div className="border-t border-border-custom pt-10 flex flex-col md:flex-row justify-between items-center gap-6 font-body text-xs text-text-tertiary">
          <p>&copy; {new Date().getFullYear()} ALLSOLL. All rights reserved. An IDEA India Product.</p>
          <div className="flex gap-[30px]">
            <a href="#" className="hover:text-text-secondary transition-colors cursor-none">Privacy Policy</a>
            <a href="#" className="hover:text-text-secondary transition-colors cursor-none">Terms of Engagement</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
