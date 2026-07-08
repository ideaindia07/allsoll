'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitText from '@/components/ui/SplitText';

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [startReveal, setStartReveal] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Trigger entrance animations
    const timer = setTimeout(() => {
      setStartReveal(true);
    }, 450);

    // Zoom background video on scroll
    gsap.to(videoWrapperRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      scale: 1.15,
      y: 80,
      ease: 'none',
    });

    // Fade out content on scroll
    gsap.to(contentRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      y: -100,
      opacity: 0,
      ease: 'none',
    });

    // Mouse movement parallax effect
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const xVal = (e.clientX - window.innerWidth / 2) * 0.015;
      const yVal = (e.clientY - window.innerHeight / 2) * 0.015;

      gsap.to(contentRef.current, {
        x: xVal,
        y: yVal,
        duration: 0.8,
        ease: 'power2.out',
      });

      if (videoRef.current) {
        gsap.to(videoRef.current, {
          x: -xVal * 0.5,
          y: -yVal * 0.5,
          duration: 0.8,
          ease: 'power2.out',
        });
      }
    };

    section.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(timer);
      section.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden px-[8%]"
    >
      <div
        ref={videoWrapperRef}
        className="absolute top-0 left-0 w-full h-full z-1 will-change-transform"
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover filter brightness-[0.4] contrast-[1.1]"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="https://assets.codepen.io/3364143/7bda2f718d7ef20b7ee8a09ad7d40bd3.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-bg-primary/40 to-bg-primary/95" />
      </div>

      <div ref={contentRef} className="relative z-10 max-w-[1200px] text-center mt-10">
        <h1 className="font-display text-[4.5rem] md:text-[6.5rem] lg:text-[8rem] font-bold leading-[0.95] uppercase tracking-tighter mb-10 overflow-hidden select-none">
          <SplitText text="Become" trigger={startReveal} delay={0.2} className="block md:inline-block" />
          <SplitText text="Impossible" trigger={startReveal} delay={0.4} className="text-accent block md:inline-block" />
          <SplitText text="to Ignore." trigger={startReveal} delay={0.6} className="block md:inline-block" />
        </h1>

        <div className="max-w-[800px] mx-auto flex flex-col gap-3">
          <p className="font-body text-lg md:text-xl lg:text-2xl font-light text-text-secondary leading-relaxed select-none">
            <SplitText text="We curate" trigger={startReveal} delay={0.8} />{' '}
            <SplitText text="omnipresence" trigger={startReveal} delay={1.0} className="text-accent" />{' '}
            <SplitText text="for ambitious brands." trigger={startReveal} delay={1.2} />
          </p>
          <p className="font-body text-base md:text-lg lg:text-xl font-light text-text-secondary leading-relaxed select-none">
            <SplitText
              text="Across visibility, credibility, culture, community, and technology."
              trigger={startReveal}
              delay={1.5}
              stagger={0.02}
            />
          </p>
        </div>
      </div>

      <div className="absolute bottom-[5vh] left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-4 font-body text-[11px] font-semibold tracking-[0.25em] text-text-secondary uppercase select-none">
        <div className="relative w-[1px] h-[60px] bg-white/15 overflow-hidden scroll-line-fill" />
        <span>Scroll to Reveal</span>
      </div>
    </section>
  );
}
