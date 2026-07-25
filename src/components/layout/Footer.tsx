'use client';

export default function Footer() {
  return (
    <footer className="w-full bg-bg-primary border-t border-border-custom py-16 md:py-[100px] pb-10 md:pb-[50px] relative z-20">
      <div className="max-w-[1800px] mx-auto px-[8%]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-20 mb-12 md:mb-20">
          <div className="flex flex-col gap-4">
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl tracking-widest">ALLSOLL</h2>
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
              {['LinkedIn', 'Instagram', 'YouTube'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="font-body text-[15px] text-text-secondary hover:text-accent transition-colors duration-300 w-fit cursor-none"
                >
                  {item}
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
