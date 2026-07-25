'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Project {
  title: string;
  tag: string;
  img: string;
}

const projects: Project[] = [
  { title: 'SAS', tag: 'Brand Identity & Digital Strategy', img: '/project_sas.png' },
  { title: 'BOOKIT', tag: 'Website Design & Development', img: '/project_bookit.png' },
  { title: 'EMPIRAS', tag: 'Luxury Marketing & Brand Photoshoots', img: '/project_empiras.png' },
  { title: 'VICINITY', tag: 'Social Media & Omnipresence Strategy', img: '/project_vicinity.png' },
];

const basePath = process.env.NODE_ENV === 'production' ? '/allsoll' : '';

export default function SelectedWork() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
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
          // pinSpacing: false,
          invalidateOnRefresh: true,
        },
      });

      pinTimeline.to(track, {
        x: () => {
          return -(track.scrollWidth - window.innerWidth);
        },
        ease: 'none',
      });

      if (titleRef.current) {
        pinTimeline.to(titleRef.current, {
          x: () => -window.innerWidth * 0.15,
          ease: 'none',
        }, 0);
      }
    }, triggerRef);

    return () => {
      ctx.revert();
    };
  }, [hasMounted, isMobile]);

  if (!hasMounted) {
    return <section id="work" className="relative w-full min-h-screen bg-bg-primary z-20" />;
  }

  if (isMobile) {
    const mobileProjects = [
      { title: 'Luxury Tent', tag: 'Growth Story', img: '/Growth Stories_1.png' },
      { title: 'Lakeside Retreat', tag: 'Growth Story', img: '/Growth Stories_2.png' },
      { title: 'Guided Adventure', tag: 'Growth Story', img: '/Growth Stories_3.png' },
      { title: 'Campfire Feast', tag: 'Growth Story', img: '/Growth Stories_4.png' },
      { title: 'Mountain Spa', tag: 'Growth Story', img: '/Growth Stories_5.png' },
      { title: 'Guided Adventure 2', tag: 'Growth Story', img: '/Growth Stories_6.png' },
      { title: 'Mountain Spa 2', tag: 'Growth Story', img: '/Growth Stories_7.png' },
      { title: 'Guided Adventure 3', tag: 'Growth Story', img: '/Growth Stories_8.png' },
    ];

    return (
      <section id="work" className="sticky bottom-0 w-full bg-bg-primary z-10 py-16 px-6">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[#FFD43B] font-bold mb-3">
            // The Work
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tighter text-white leading-tight">
            Growth Stories{' '}
            <span className="text-[#FFD43B]">Market Share.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-5">
          {mobileProjects.map((project, i) => (
            <div
              key={project.title + i}
              className="relative w-full h-[120vw] min-h-[300px] rounded-2xl overflow-hidden border border-white/10"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${basePath}${project.img}`}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ─── Desktop: hidden ─────────────────────────────────────
  return <section id="work" style={{ display: 'none' }} />;
}
