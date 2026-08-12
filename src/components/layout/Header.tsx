'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';

const basePath = '';

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const leftLinkRef = useRef<HTMLAnchorElement>(null);
  const logoLinkRef = useRef<HTMLAnchorElement>(null);
  const rightLinkRef = useRef<HTMLAnchorElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoShifted, setLogoShifted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: -100,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
      });

      // Magnetic hover — About / Contact only (logo has its own one-way shift)
      const elements = [leftLinkRef.current, rightLinkRef.current];
      const cleanups = elements.map((el) => {
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
        cleanups.forEach((cleanup) => cleanup && cleanup());
      };
    }, headerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const navLinks = [
    { label: 'Work', href: '/#work' },
    { label: 'Services', href: '/services' },
    { label: 'Impact', href: '/#stats' },
    { label: 'About', href: '/about' },
    { label: 'Team', href: '/#team' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-40 px-5 py-4 md:px-10 md:py-5 w-full pointer-events-none"
      >
        <nav className="relative flex items-center justify-between max-w-[1800px] mx-auto pointer-events-auto">
          {/* Left: About (desktop only) */}
          <div className="hidden md:flex items-center z-10">
            <a
              ref={leftLinkRef}
              href="/about"
              className="group relative inline-flex items-center gap-2.5 px-5 py-2.5
                rounded-full border border-white/20 bg-white/5
                text-[13px] font-display font-semibold tracking-wide text-white
                backdrop-blur-md
                shadow-[3px_3px_0_0_rgba(255,212,59,0.35)]
                transition-all duration-300 ease-out
                hover:border-[#FFD43B]/70 hover:bg-[#FFD43B]/10 hover:text-[#FFD43B]
                hover:shadow-[5px_5px_0_0_#FFD43B] hover:-translate-y-0.5
                active:translate-y-0 active:shadow-[2px_2px_0_0_#FFD43B]"
            >
              <span
                className="flex h-5 w-5 items-center justify-center rounded-full
                  border border-white/25 bg-white/10 text-[10px] leading-none
                  transition-colors group-hover:border-[#FFD43B]/60 group-hover:bg-[#FFD43B]/15"
                aria-hidden
              >
                ✦
              </span>
              About
              <span
                className="pointer-events-none absolute inset-0 rounded-full
                  opacity-0 transition-opacity duration-300
                  group-hover:opacity-100
                  bg-[radial-gradient(circle_at_30%_20%,rgba(255,212,59,0.18),transparent_55%)]"
              />
            </a>
          </div>

          {/* Center: Logo — one-way hover: shift right & stay */}
          <a
            ref={logoLinkRef}
            href="/"
            onMouseEnter={() => setLogoShifted(true)}
            className={`absolute left-1/2 top-1/2 -translate-y-1/2
              flex items-center justify-center cursor-pointer z-0
              transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
              will-change-transform
              ${logoShifted ? '-translate-x-[38%] md:-translate-x-[42%]' : '-translate-x-1/2'}`}
          >
            <img
              src={`${basePath}/AllSoll_logo.webp`}
              alt="AllSoll"
              className={`h-24 sm:h-28 md:h-36 lg:h-40 w-auto object-contain select-none
                transition-[object-position] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                ${logoShifted ? 'object-right' : 'object-center'}`}
              draggable={false}
            />
          </a>

          {/* Right: Contact (desktop) + Hamburger (mobile) */}
          <div className="flex items-center gap-4 ml-auto z-10">
            <div className="hidden md:flex items-center">
              <a
                ref={rightLinkRef}
                href="/contact"
                className="group relative inline-flex items-center gap-2.5 px-6 py-2.5
                  rounded-full bg-[#FFD43B] text-black
                  text-[13px] font-display font-bold tracking-wide
                  border-2 border-black
                  shadow-[4px_4px_0_0_#fff]
                  transition-all duration-300 ease-out
                  hover:shadow-[6px_6px_0_0_#fff] hover:-translate-x-0.5 hover:-translate-y-0.5
                  hover:bg-[#ffe066]
                  active:translate-x-0 active:translate-y-0 active:shadow-[2px_2px_0_0_#fff]"
              >
                <span
                  className="relative flex h-5 w-5 items-center justify-center overflow-hidden
                    rounded-full bg-black text-[#FFD43B] text-[9px] leading-none"
                  aria-hidden
                >
                  <span className="transition-transform duration-300 group-hover:scale-110">→</span>
                </span>
                Contact
                <span
                  className="pointer-events-none absolute -inset-px rounded-full
                    opacity-0 blur-md transition-opacity duration-300
                    group-hover:opacity-60 bg-[#FFD43B]/50"
                />
              </a>
            </div>

            {/* Hamburger button — mobile only */}
            <button
              className="md:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10
                rounded-full border border-white/20 bg-white/5 backdrop-blur-md
                relative z-[60]"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <motion.span
                className="block w-5 h-[1.5px] bg-white origin-center"
                animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block w-5 h-[1.5px] bg-white origin-center"
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block w-5 h-[1.5px] bg-white origin-center"
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
            className="fixed inset-0 z-40 bg-bg-primary flex flex-col items-center justify-center gap-8 md:hidden overflow-y-auto"
          >
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
              href="mailto:tanishka@allsoll.com"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-4 text-xs font-body tracking-[0.2em] text-white/30 uppercase"
            >
              tanishka@allsoll.com
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
