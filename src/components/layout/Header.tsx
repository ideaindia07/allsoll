'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Header() {
  const headerRef = useRef<HTMLHeadElement>(null);
  const leftLinkRef = useRef<HTMLAnchorElement>(null);
  const logoLinkRef = useRef<HTMLAnchorElement>(null);
  const rightLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Staggered entrance animation
    gsap.from(headerRef.current, {
      y: -100,
      opacity: 0,
      duration: 1.2,
      ease: 'power4.out',
    });

    // Add magnetic hover to all header elements
    const elements = [leftLinkRef.current, logoLinkRef.current, rightLinkRef.current];
    elements.forEach(el => {
      if (!el) return;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(el, {
          x: x * 0.15,
          y: y * 0.15,
          duration: 0.35,
          ease: 'power2.out',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.35)',
        });
      };

      el.addEventListener('mousemove', handleMouseMove);
      el.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        el.removeEventListener('mousemove', handleMouseMove);
        el.removeEventListener('mouseleave', handleMouseLeave);
      };
    });
  }, []);

  return (
    <header
      ref={headerRef}
      className="site-header fixed top-0 left-0 w-full h-[90px] z-50 border-b border-border-custom bg-bg-primary/75 backdrop-blur-xl flex items-center"
    >
      <div className="w-full max-w-[1800px] mx-auto px-[6%] flex items-center justify-between">
        {/* Left Side: About link with emoji */}
        <a
          ref={leftLinkRef}
          href="/about"
          className="font-body text-[15px] md:text-base font-medium text-text-secondary hover:text-text-primary transition-colors cursor-none flex items-center gap-2"
        >
          <span>👓</span>
          <span>About</span>
        </a>

        {/* Center: Logo (All + Soll in separate spans under flex) */}
        <a
          ref={logoLinkRef}
          href="#hero"
          className="font-display font-bold text-2xl tracking-[0.15em] text-text-primary uppercase select-none flex items-center gap-0.5 cursor-none"
        >
          <span>All</span>
          <span className="text-accent">Soll</span>
        </a>

        {/* Right Side: Contact link with envelope emoji */}
        <a
          ref={rightLinkRef}
          href="#cta"
          className="font-body text-[15px] md:text-base font-medium text-text-secondary hover:text-text-primary transition-colors cursor-none flex items-center gap-2"
        >
          <span>✉️</span>
          <span>Contact</span>
        </a>
      </div>
    </header>
  );
}
