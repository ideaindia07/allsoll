'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Project {
  title: string;
  tag: string;
  img: string;
}

const projects: Project[] = [
  {
    title: 'SAS',
    tag: 'Brand Identity & Digital Strategy',
    img: 'https://allsoll.com/SAS.png',
  },
  {
    title: 'BOOKIT',
    tag: 'Website Design & Development',
    img: 'https://allsoll.com/Bookit.png',
  },
  {
    title: 'EMPIRAS',
    tag: 'Luxury Marketing & Brand Photoshoots',
    img: 'https://allsoll.com/empiras.png',
  },
  {
    title: 'VICINITY',
    tag: 'Social Media & Omnipresence Strategy',
    img: 'https://allsoll.com/Vicinity.png',
  },
];

export default function SelectedWork() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Calculate exact scrollable distance dynamically to prevent black screen
    const track = trackRef.current;
    const trigger = triggerRef.current;
    if (!track || !trigger) return;

    const pinTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: 'top top',
        end: () => `+=${track.scrollWidth - window.innerWidth + window.innerWidth * 0.16}`, // 8% padding on left/right
        scrub: true,
        pin: true,
        invalidateOnRefresh: true,
      },
    });

    // Translate the track horizontally
    pinTimeline.to(track, {
      x: () => {
        const offset = window.innerWidth * 0.08; // Match 8% padding
        return -(track.scrollWidth - window.innerWidth + offset * 2);
      },
      ease: 'none',
    });

    // Translate the title slightly to create parallax/editorial effect
    if (titleRef.current) {
      pinTimeline.to(titleRef.current, {
        x: () => -window.innerWidth * 0.15,
        ease: 'none',
      }, 0);
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === triggerRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={triggerRef}
      id="work"
      className="relative w-full bg-bg-primary z-20 overflow-hidden"
    >
      <div className="h-screen flex flex-col justify-center overflow-hidden">
        {/* Gallery Title & Subtitle */}
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

        {/* Horizontal Card Track */}
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
                src={project.img}
                alt={project.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-80" />
              
              {/* Text Meta info */}
              <div className="absolute bottom-0 left-0 p-8 select-none">
                <span className="text-xs uppercase tracking-[0.2em] text-accent font-bold">
                  {project.tag}
                </span>
                <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold mt-2 text-white">
                  {project.title}
                </h3>
              </div>

              {/* Index number label */}
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
