'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';

const basePath = process.env.NODE_ENV === 'production' ? '/allsoll' : '';

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const leftLinkRef = useRef<HTMLAnchorElement>(null);
  const logoLinkRef = useRef<HTMLAnchorElement>(null);
  const rightLinkRef = useRef<HTMLAnchorElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: -100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
      });

      // Magnetic hover — desktop only
      const elements = [leftLinkRef.current, logoLinkRef.current, rightLinkRef.current];
      const cleanups = elements.map(el => {
        if (!el) return null;
        const handleMouseMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(el, { x: x * 0.15, y: y * 0.15, duration: 0.35, ease: 'power2.out' });
        };
        const handleMouseLeave = () => {
          gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.35)' });
        };
        el.addEventListener('mousemove', handleMouseMove);
        el.addEventListener('mouseleave', handleMouseLeave);
        return () => {
          el.removeEventListener('mousemove', handleMouseMove);
          el.removeEventListener('mouseleave', handleMouseLeave);
        };
      });

      return () => {
        cleanups.forEach(cleanup => cleanup && cleanup());
      };
    }, headerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'Partners', href: '#partners' },
    { label: 'About', href: '/about' },
    { label: 'Team', href: '#team' },
    { label: 'Contact', href: '#cta' },
  ];

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-40 px-6 py-5 md:px-10 md:py-6 transition-all duration-300 w-full max-w-[100vw] overflow-x-hidden "
      >
        <nav className="flex items-center justify-between max-w-[1800px] mx-auto">
          {/* Left: About (desktop only) */}
          <div className="hidden md:flex items-center gap-4">
            <a
              ref={leftLinkRef}
              href="/about"
              className="px-5 py-2 rounded-full bg-secondary text-sm font-medium hover:bg-secondary/80 transition-colors flex items-center gap-2"
            >
              <span className="w-4 h-4 text-xs flex items-center justify-center">👓</span> About
            </a>
          </div>

          {/* Center: Logo */}
          <a
            ref={logoLinkRef}
            href="/"
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer"
          >
            <div className="relative flex">
              <span className="font-serif text-3xl md:text-5xl tracking-normal leading-none font-bold text-white">All</span>
              <span className="font-serif text-3xl md:text-5xl tracking-normal leading-none -mt-[2px] md:-mt-1 text-brand-yellow drop-shadow-sm mix-blend-difference font-bold">Soll</span>
            </div>
          </a>

          {/* Right: Contact (desktop) + Hamburger (mobile) */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6">
              <span className="text-sm font-medium bg-transparent text-white">India | 10:33 am</span>
              <a
                ref={rightLinkRef}
                href="/contact"
                className="px-6 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 text-black bg-white"
              >
                <span className="w-4 h-4 bg-black/10 rounded-full flex items-center justify-center text-[8px]">✉️</span> Contact
              </a>
            </div>

            {/* Hamburger button — mobile only */}
            <button
              className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 relative z-[60]"
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle menu"
            >
              <motion.span
                className="block w-6 h-[1.5px] bg-white origin-center"
                animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block w-6 h-[1.5px] bg-white origin-center"
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block w-6 h-[1.5px] bg-white origin-center"
                animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-bg-primary flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {/* Accent glow blob */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-[#FFD43B]/5 blur-3xl pointer-events-none" />

            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i + 0.1, duration: 0.4, ease: 'easeOut' }}
                onClick={() => setMenuOpen(false)}
                className="font-display text-4xl font-bold tracking-tighter text-white hover:text-[#FFD43B] transition-colors duration-200"
              >
                {link.label}
              </motion.a>
            ))}

            <motion.a
              href="mailto:presence@allsoll.com"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-4 text-xs font-body tracking-[0.2em] text-white/30 uppercase"
            >
              presence@allsoll.com
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
