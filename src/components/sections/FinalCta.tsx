'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function FinalCta() {
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.25,
        y: y * 0.25,
        duration: 0.35,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.35)',
      });
    };

    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section
      id="cta"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-bg-primary z-20"
    >
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <video
          className="w-full h-full object-cover filter brightness-[0.35] contrast-[1.15]"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="https://assets.codepen.io/3364143/7bda2f718d7ef20b7ee8a09ad7d40bd3.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-bg-primary via-transparent to-bg-primary" />
      </div>

      <div className="relative z-10 text-center max-w-[1200px] px-6 md:px-4 select-none">
        <h2 className="font-display text-[2.5rem] sm:text-[3.2rem] md:text-[6vw] lg:text-[7.5rem] font-bold leading-[0.95] uppercase tracking-tighter mb-12 md:mb-20 text-white">
          Ready to become <br />
          <span className="text-accent">impossible to ignore?</span>
        </h2>

        <div className="inline-block">
          <a
            ref={btnRef}
            href="mailto:presence@allsoll.com"
            className="group btn-large flex items-center justify-center w-[200px] h-[200px] md:w-[280px] md:h-[280px] rounded-full border border-white/15 text-text-primary font-display text-[14px] md:text-[16px] font-semibold tracking-wider uppercase relative overflow-hidden transition-colors duration-500 hover:border-accent cursor-none"
          >
            <span className="relative z-10 transition-colors duration-500 group-hover:text-bg-primary max-w-[140px] md:max-w-[180px] text-center leading-snug">
              Let&apos;s Build Presence
            </span>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-0 h-0 bg-accent z-0 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-[110%] group-hover:h-[110%]" />
          </a>
        </div>
      </div>
    </section>
  );
}
