'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Project {
  title: string;
  tag: string;
  img: string;
}

const mobileProjects: Project[] = [
  { title: 'Aaroma', tag: 'Growth Story', img: '/Growth Stories_1.png' },
  { title: 'Panacea', tag: 'Growth Story', img: '/Growth Stories_2.png' },
  { title: 'SAS', tag: 'Growth Story', img: '/Growth Stories_3.png' },
  { title: 'Morski', tag: 'Growth Story', img: '/Growth Stories_4.png' },
  { title: 'Infinity', tag: 'Growth Story', img: '/Growth Stories_5.png' },
  { title: 'Vicinity', tag: 'Growth Story', img: '/Growth Stories_6.png' },
  { title: 'Empiras', tag: 'Growth Story', img: '/Growth Stories_7.png' },
  { title: 'Archana', tag: 'Growth Story', img: '/Growth Stories_8.png' },
];

const basePath = '';

export default function SelectedWork() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const check = () => setIsMobileOrTablet(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (!hasMounted || !isMobileOrTablet) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const trigger = triggerRef.current;
      if (!track || !trigger) return;

      const pinTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      pinTimeline.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 48), // 48 is for padding
        ease: 'none',
      });
    }, triggerRef);

    return () => {
      ctx.revert();
    };
  }, [hasMounted, isMobileOrTablet]);

  if (!hasMounted) {
    return <section id="work" className="relative w-full min-h-screen bg-bg-primary z-20" />;
  }

  if (isMobileOrTablet) {
    return (
      <section id="work" ref={triggerRef} className="relative w-full h-screen bg-bg-primary z-10 overflow-hidden flex flex-col pt-24 pb-12">
        <div className="px-6 mb-6 shrink-0">
          <p className="text-xs uppercase tracking-[0.3em] text-[#FFD43B] font-bold mb-2">
            // The Work
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tighter text-white leading-tight">
            Growth Stories{' '}
            <span className="text-[#FFD43B]">Market Share.</span>
          </h2>
        </div>

        <div className="flex-1 flex items-center overflow-hidden w-full relative">
          <div ref={trackRef} className="flex h-full w-[max-content] items-center px-6 gap-6">
            {mobileProjects.map((project, i) => (
              <div
                key={project.title + i}
                className="relative w-[85vw] md:w-[60vw] h-full max-h-[70vh] shrink-0 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`${basePath}${project.img}`}
                  alt={project.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-40 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ─── Desktop: hidden ─────────────────────────────────────
  return <section id="work" className="hidden" />;
}
