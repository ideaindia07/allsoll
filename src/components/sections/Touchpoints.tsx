'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Panel {
  id: string;
  image: string;
}

const basePath = process.env.NODE_ENV === 'production' ? '/allsoll' : '';

const panelsData = [
  {
    id: 'visibility',
    image: '/Strip_1.png',
  },
  {
    id: 'credibility',
    image: '/Strip_2.png',
  },
  {
    id: 'influence',
    image: '/Strip_3.png',
  },
  {
    id: 'impact',
    image: '/Strip_4.png',
  },
];

export default function Touchpoints() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
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
    if (!hasMounted || isMobile) return; // wait for mount and skip on mobile

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
  }, [hasMounted, isMobile]);

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

        <div className="flex flex-col gap-6">
          {panelsData.map((panel, index) => (
            <motion.div
              key={panel.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="w-full relative rounded-[30px] overflow-hidden"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${basePath}${panel.image}`} alt={panel.id} className="w-full h-auto" />
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
        <div className="flex gap-[2vw] items-center h-full w-max py-[15vh]">
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
          <div ref={panelsRef} className="flex gap-[40px] h-[75vh] min-h-[550px]">
            {panelsData.map((panel) => (
              <div
                key={panel.id}
                className="touchpoint-card h-full relative rounded-[30px] overflow-hidden shadow-2xl transition-transform duration-500 hover:-translate-y-4"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${basePath}${panel.image}`} alt={panel.id} className="h-full w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
