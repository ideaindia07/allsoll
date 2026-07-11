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
    if (isMobile) return; // mobile uses vertical stack — no GSAP pin needed

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const trigger = triggerRef.current;
      if (!track || !trigger) return;

      const pinTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth + window.innerWidth * 0.16}`,
          scrub: true,
          pin: true,
          // pinSpacing: false,
          invalidateOnRefresh: true,
        },
      });

      pinTimeline.to(track, {
        x: () => {
          const offset = window.innerWidth * 0.08;
          return -(track.scrollWidth - window.innerWidth + offset * 2);
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
  }, [isMobile]);

  if (!hasMounted) {
    return <section id="work" className="relative w-full min-h-screen bg-bg-primary z-20" />;
  }

  // ─── Mobile: vertical stacked cards ──────────────────────────────────────
  if (isMobile) {
    return (
      <section id="work" className="relative w-full bg-bg-primary z-20 py-16 px-6">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[#FFD43B] font-bold mb-3">
            // The Work
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tighter text-white leading-tight">
            Presence is the new{' '}
            <span className="text-[#FFD43B]">Market Share.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-5">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="relative w-full h-[55vw] min-h-[200px] rounded-2xl overflow-hidden border border-white/10"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${basePath}${project.img}`}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#FFD43B] font-bold">
                  {project.tag}
                </span>
                <h3 className="font-display text-xl font-semibold mt-1 text-white">
                  {project.title}
                </h3>
              </div>
              <span className="absolute top-4 right-5 font-display text-4xl font-bold text-white/10">
                0{i + 1}
              </span>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // ─── Desktop: horizontal GSAP scroll ─────────────────────────────────────
  return (
    <section
      ref={triggerRef}
      id="work"
      className="relative w-full bg-bg-primary z-20 overflow-hidden"
    >
      <div className="h-screen flex flex-col justify-center overflow-hidden">
        <div className="max-w-[1800px] mx-auto px-[8%] w-full mb-10 select-none">
          <p className="text-xs uppercase tracking-[0.3em] text-accent font-bold mb-4">
            // The Work
          </p>
          <h2
            ref={titleRef}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter max-w-5xl text-white leading-tight will-change-transform"
          >
            Presence is the new{' '}
            <span className="text-accent">Market Share.</span>
          </h2>
        </div>

        <div
          ref={trackRef}
          className="flex gap-6 md:gap-8 pl-[8%] pr-[8%] will-change-transform w-fit"
        >
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="relative group shrink-0 w-[80vw] md:w-[45vw] h-[50vh] rounded-2xl overflow-hidden border border-white/10"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${basePath}${project.img}`}
                alt={project.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-0 left-0 p-8 select-none">
                <span className="text-xs uppercase tracking-[0.2em] text-accent font-bold">
                  {project.tag}
                </span>
                <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold mt-2 text-white">
                  {project.title}
                </h3>
              </div>

              <span className="absolute top-6 right-8 font-display text-5xl md:text-6xl font-bold text-white/10 select-none">
                0{i + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
