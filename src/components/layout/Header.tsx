'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const leftLinkRef = useRef<HTMLAnchorElement>(null);
  const logoLinkRef = useRef<HTMLAnchorElement>(null);
  const rightLinkRef = useRef<HTMLAnchorElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    gsap.from(headerRef.current, {
      y: -100,
      opacity: 0,
      duration: 1.2,
      ease: 'power4.out',
    });

    // Magnetic hover — desktop only
    const elements = [leftLinkRef.current, logoLinkRef.current, rightLinkRef.current];
    elements.forEach(el => {
      if (!el) return;
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
        className="site-header fixed top-0 left-0 w-full h-[70px] md:h-[90px] z-50 border-b border-border-custom bg-bg-primary/80 backdrop-blur-xl flex items-center"
      >
        <div className="w-full max-w-[1800px] mx-auto px-5 md:px-[6%] flex items-center justify-between">

          {/* Left: About (desktop only) */}
          <a
            ref={leftLinkRef}
            href="/about"
            className="hidden md:flex font-body text-[15px] font-medium text-text-secondary hover:text-text-primary transition-colors cursor-none items-center gap-2"
          >
            <span>👓</span>
            <span>About</span>
          </a>

          {/* Center: Logo */}
          <a
            ref={logoLinkRef}
            href="#hero"
            className="font-display font-bold text-xl md:text-2xl tracking-[0.15em] text-text-primary uppercase select-none flex items-center gap-0.5 cursor-none"
          >
            <span>All</span>
            <span className="text-accent">Soll</span>
          </a>

          {/* Right: Contact (desktop) + Hamburger (mobile) */}
          <div className="flex items-center gap-4">
            <a
              ref={rightLinkRef}
              href="#cta"
              className="hidden md:flex font-body text-[15px] font-medium text-text-secondary hover:text-text-primary transition-colors cursor-none items-center gap-2"
            >
              <span>✉️</span>
              <span>Contact</span>
            </a>

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
        </div>
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
