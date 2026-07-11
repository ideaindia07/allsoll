'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Panel {
  id: string;
  num: string;
  title: string;
  services: string[];
}

const panelsData: Panel[] = [
  {
    id: 'visibility',
    num: '01',
    title: 'Visibility',
    services: ['Expert Social Media Management', 'Website Design & Development', 'Content Engine Architecture', 'Performance Marketing'],
  },
  {
    id: 'credibility',
    num: '02',
    title: 'Credibility',
    services: ['Brand Consultation & Strategy', 'Brand Identity Design', 'Brand Photoshoots', 'Awards & Accolades Curation'],
  },
  {
    id: 'influence',
    num: '03',
    title: 'Influence',
    services: ['Luxury Marketing', 'Creator Partnerships', 'Community Cultivation', 'Strategic Alliances'],
  },
  {
    id: 'growth',
    num: '04',
    title: 'Growth',
    services: ['Next-Gen Technology Stack', 'Marketing Automation', 'Deep Attribution Analytics', 'Conversion Optimization'],
  },
];

export default function Touchpoints() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(panelsRef.current, {
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
        },
        x: () => {
          const panelsWidth = panelsRef.current?.scrollWidth || 0;
          const introWidth = 400;
          const totalScrollable = panelsWidth + introWidth + (window.innerWidth * 0.08) - window.innerWidth;
          return -totalScrollable;
        },
        ease: 'none',
      });

      gsap.from('.touchpoint-card', {
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: '+=50%',
          scrub: true,
        },
        x: 100,
        opacity: 0,
        stagger: 0.15,
        ease: 'power2.out',
      });
    }, triggerRef);

    return () => {
      ctx.revert();
    };
  }, [isMobile]);

  if (!hasMounted) {
    return <section id="services" className="relative w-full min-h-screen bg-bg-primary z-20" />;
  }

  // ─── Mobile: vertical stacked panels ─────────────────────────────────────
  if (isMobile) {
    return (
      <section id="services" className="relative w-full bg-bg-primary z-20 py-16 px-6">
        <div className="mb-10">
          <span className="font-body text-[11px] font-semibold tracking-[0.3em] text-white/40 uppercase block mb-4">
            // THE METHODOLOGY
          </span>
          <h2 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-tighter text-white">
            Every Touchpoint Matters.
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {panelsData.map((panel, index) => (
            <motion.div
              key={panel.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="w-full bg-white/[0.03] border border-white/8 rounded-2xl p-6"
            >
              <span className="font-display text-sm text-white/30 font-medium mb-2 block">
                {panel.num}
              </span>
              <h3 className="font-display text-2xl font-semibold text-[#FFD43B] mb-4">
                {panel.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {panel.services.map((service, sIndex) => (
                  <li
                    key={sIndex}
                    className="font-body text-sm text-white/60 relative pl-4"
                  >
                    <span className="absolute left-0 text-white/30">—</span>
                    {service}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>
    );
  }

  // ─── Desktop: GSAP horizontal scroll ─────────────────────────────────────
  return (
    <div ref={triggerRef} className="relative w-full h-[200vh] bg-bg-primary z-20">
      <div className="sticky top-0 w-full h-screen flex items-center overflow-hidden px-[4%]">
        <div className="flex gap-[8vw] items-center h-full w-max py-[15vh]">
          {/* Left Intro Block */}
          <div className="w-[400px] flex-shrink-0 flex flex-col justify-center select-none">
            <span className="font-body text-[11px] font-semibold tracking-[0.3em] text-text-secondary uppercase block mb-5">
              // THE METHODOLOGY
            </span>
            <h2 className="font-display text-5xl md:text-7xl font-bold uppercase leading-[0.95] tracking-tighter mb-10 text-white">
              Every <br />
              Touchpoint <br />
              Matters.
            </h2>
            <div className="flex items-center gap-4 font-body text-[11px] tracking-widest text-text-secondary uppercase select-none">
              <span>Scroll Horizontally</span>
              <div className="w-20 h-[1px] bg-accent" />
            </div>
          </div>

          {/* Service Panel Cards */}
          <div ref={panelsRef} className="flex gap-[30px] h-[65vh] min-h-[480px]">
            {panelsData.map((panel, index) => {
              const isActive = hoveredIndex === index;
              const isAnyHovered = hoveredIndex !== null;
              let flexValue = '1';
              if (isAnyHovered) flexValue = isActive ? '1.8' : '0.7';

              return (
                <motion.div
                  key={panel.id}
                  layout
                  className="touchpoint-card w-[350px] h-full bg-white/[0.02] border border-border-custom hover:border-accent/40 rounded-[20px] p-10 flex flex-col justify-between relative overflow-hidden transition-colors duration-500 cursor-none"
                  style={{ flex: flexValue }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none transition-opacity duration-500"
                    style={{ opacity: isActive ? 1 : 0 }}
                  />

                  <div className="relative z-10">
                    <span className="font-display text-xl text-text-tertiary font-medium mb-5 block select-none">
                      {panel.num}
                    </span>
                    <h3 className={`font-display text-3xl font-semibold tracking-tight transition-colors duration-300 ${isActive ? 'text-accent' : 'text-white'}`}>
                      {panel.title}
                    </h3>
                  </div>

                  <div className="relative z-10">
                    <ul className="flex flex-col gap-4 list-none">
                      {panel.services.map((service, sIndex) => (
                        <li
                          key={sIndex}
                          className="font-body text-base text-text-secondary relative pl-5 transition-colors duration-300 select-none"
                          style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                        >
                          <span className="absolute left-0 text-text-tertiary select-none">—</span>
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
