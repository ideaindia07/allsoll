'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/ui/SmoothScroll';
import CustomCursor from '@/components/ui/CustomCursor';
import SplitText from '@/components/ui/SplitText';

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [startReveal, setStartReveal] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const timer = setTimeout(() => setStartReveal(true), 300);

    // Parallax on the about hero image
    gsap.to('.about-hero-img', {
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      y: 120,
      scale: 1.1,
      ease: 'none',
    });

    return () => clearTimeout(timer);
  }, []);

  const values = [
    {
      num: '01',
      title: 'Data-Driven',
      description: 'Every decision powered by deep analytics and attribution intelligence.',
    },
    {
      num: '02',
      title: 'Human-Centric',
      description: 'Building authentic connections between brands and their audiences.',
    },
    {
      num: '03',
      title: 'Future-Forward',
      description: 'Pioneering tomorrow\'s digital landscape with cutting-edge technology.',
    },
    {
      num: '04',
      title: 'Results-Obsessed',
      description: 'Relentlessly focused on measurable, scalable growth outcomes.',
    },
  ];

  return (
    <SmoothScroll>
      <CustomCursor />
      <Header />

      <main className="relative w-full overflow-hidden bg-bg-primary">
        {/* About Hero */}
        <section
          ref={heroRef}
          className="relative w-full h-[80vh] flex items-end overflow-hidden pt-[90px]"
        >
          <div className="about-hero-img absolute inset-0 w-full h-full">
            <div className="w-full h-full bg-gradient-to-b from-bg-primary/30 via-bg-primary/50 to-bg-primary" />
          </div>

          <div className="relative z-10 w-full max-w-[1800px] mx-auto px-[8%] pb-20">
            <span className="font-body text-[11px] font-semibold tracking-[0.3em] text-accent uppercase block mb-6">
              // About Allsoll
            </span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-[6.5rem] font-bold leading-[0.95] tracking-tighter max-w-[1000px] select-none">
              <SplitText text="We curate" trigger={startReveal} delay={0.1} className="block" />
              <SplitText text="omnipresence" trigger={startReveal} delay={0.3} className="block text-accent" />
              <SplitText text="for ambitious brands." trigger={startReveal} delay={0.5} className="block" />
            </h1>
          </div>
        </section>

        {/* Story Section */}
        <section className="w-full py-40 px-[8%]">
          <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <span className="font-body text-[11px] font-semibold tracking-[0.3em] text-text-secondary uppercase block mb-5">
                // Our Story
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight">
                Connecting groundbreaking companies with extraordinary talent.
              </h2>
            </div>
            <div className="flex flex-col gap-8">
              <p className="font-body text-lg text-text-secondary leading-relaxed">
                Allsoll is a creative and branding agency that takes a data-driven, 
                human-centric approach to building brands. We don&apos;t just manage channels — 
                we orchestrate presence across every touchpoint that matters.
              </p>
              <p className="font-body text-lg text-text-secondary leading-relaxed">
                From brand consultation and strategy to expert social media management, 
                luxury marketing, website design & development, and brand photoshoots — 
                we architect the complete digital infrastructure for your brand&apos;s omnipresence.
              </p>
              <p className="font-body text-base text-text-tertiary">
                An IDEA India Product.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="w-full py-40 px-[8%] border-t border-border-custom">
          <div className="max-w-[1800px] mx-auto">
            <span className="font-body text-[11px] font-semibold tracking-[0.3em] text-text-secondary uppercase block mb-5">
              // What We Do
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-semibold leading-tight tracking-tight mb-20 max-w-[600px]">
              Full-spectrum brand orchestration.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
              {[
                { title: 'Branding', desc: 'Complete brand identity systems that define how the world perceives you.' },
                { title: 'Brand Consultation & Strategy', desc: 'Strategic frameworks for market positioning and competitive advantage.' },
                { title: 'Expert Social Media', desc: 'Transforming your online presence into result-driven, omnipresent channels.' },
                { title: 'Website Design & Development', desc: 'Immersive, luxury digital experiences that convert visitors into believers.' },
                { title: 'Luxury Marketing', desc: 'Premium campaigns that elevate brand perception and drive exclusivity.' },
                { title: 'Brand Photoshoots', desc: 'Visual storytelling that captures your brand\'s essence with cinematic precision.' },
              ].map((service, i) => (
                <div
                  key={service.title}
                  className="p-10 border border-border-custom hover:bg-white/[0.02] transition-colors duration-500 group"
                >
                  <span className="font-body text-[11px] font-bold tracking-widest text-accent mb-6 block">
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-xl font-semibold mb-4 group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="font-body text-sm text-text-secondary leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="w-full py-40 px-[8%]">
          <div className="max-w-[1800px] mx-auto">
            <span className="font-body text-[11px] font-semibold tracking-[0.3em] text-text-secondary uppercase block mb-5">
              // Our Values
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-semibold leading-tight tracking-tight mb-20 max-w-[600px]">
              Principles that drive everything.
            </h2>

            <div className="border-t border-border-custom">
              {values.map((value) => (
                <div
                  key={value.num}
                  className="py-16 border-b border-border-custom flex flex-col md:flex-row md:items-center gap-8 group"
                >
                  <span className="font-display text-lg font-medium text-accent w-[60px] shrink-0">
                    {value.num}
                  </span>
                  <h3 className="font-display text-2xl md:text-4xl font-semibold tracking-tight flex-grow group-hover:translate-x-4 transition-transform duration-500">
                    {value.title}
                  </h3>
                  <p className="font-body text-base text-text-secondary max-w-[400px]">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-40 px-[8%] text-center">
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-8">
            Ready to become <span className="text-accent">impossible to ignore</span>?
          </h2>
          <a
            href="/#cta"
            className="inline-flex items-center justify-center px-12 py-5 rounded-full border border-white/15 text-text-primary font-body font-medium text-base tracking-wide transition-all duration-300 hover:border-accent hover:bg-accent hover:text-bg-primary select-none cursor-none"
          >
            Orchestrate Presence
          </a>
        </section>
      </main>

      <Footer />
    </SmoothScroll>
  );
}
