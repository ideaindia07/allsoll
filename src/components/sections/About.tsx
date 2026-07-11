 'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Node {
  num: string;
  title: string;
  desc: string;
}

const nodesData: Node[] = [
  { num: '1', title: 'Strategy', desc: 'Establishing brand voice, baseline metrics, and targeted media positioning.' },
  { num: '2', title: 'Identity', desc: 'Crafting the visual codes and assets that establish digital authority.' },
  { num: '3', title: 'Visibility', desc: 'Launching highly targeted search dominance engines and paid campaigns.' },
  { num: '4', title: 'Influence', desc: 'Amplifying presence via creator networks and cultural syndications.' },
  { num: '5', title: 'Growth', desc: 'Converting traffic into long-term customer equity through deep automation.' },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Left title mask reveals
    gsap.from('.about-title-reveal', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      y: '100%',
      duration: 1.2,
      stagger: 0.1,
      ease: 'power4.out',
    });

    // Right paragraphs entrance animations
    gsap.from('.about-p-reveal', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
      y: 30,
      opacity: 0,
      duration: 1.0,
      stagger: 0.2,
      ease: 'power3.out',
    });

    // Timeline bar height progress animation
    gsap.to(progressBarRef.current, {
      scrollTrigger: {
        trigger: timelineRef.current,
        start: 'top 65%',
        end: 'bottom 65%',
        scrub: true,
      },
      height: '100%',
      ease: 'none',
    });

    // Active Node triggers on Scroll
    const nodes = gsap.utils.toArray('.timeline-node-item');
    nodes.forEach((node: any) => {
      ScrollTrigger.create({
        trigger: node,
        start: 'top 65%',
        end: 'bottom 65%',
        onEnter: () => node.classList.add('active-node'),
        onLeaveBack: () => node.classList.remove('active-node'),
      });
    });
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full py-20 md:py-40 px-6 md:px-[8%] bg-bg-primary z-20"
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left Side (Sticky typography) */}
          <div className="lg:sticky lg:top-[150px] h-fit">
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-[6.5rem] font-bold leading-[0.95] uppercase tracking-tighter text-white select-none">
              <span className="block overflow-hidden">
                <span className="about-title-reveal inline-block">We build</span>
              </span>
              <span className="block overflow-hidden text-accent">
                <span className="about-title-reveal inline-block">presence.</span>
              </span>
              <span className="block overflow-hidden">
                <span className="about-title-reveal inline-block">Not campaigns.</span>
              </span>
            </h2>
          </div>

          {/* Right Side */}
          <div className="flex flex-col">
            <p className="about-p-reveal font-body text-lg sm:text-xl md:text-2xl lg:text-3xl font-light leading-relaxed mb-8 md:mb-10 text-white select-none">
              Allsoll was founded on a realization: advertising is dead. Today&apos;s consumer is immune to algorithms and ads. They don&apos;t buy products; they align with cultures.
            </p>
            <p className="about-p-reveal font-body text-base md:text-lg text-text-secondary leading-relaxed mb-20 select-none">
              We exist to bridge the gap between traditional digital marketing and raw brand omnipresence. Through cinematic narratives, creator networks, technology stack architectures, and public relations, we make your brand impossible to ignore.
            </p>

            {/* Timeline Wrapper */}
            <div ref={timelineRef} className="relative pl-[50px] timeline-nodes-container">
              {/* Vertical line track */}
              <div className="absolute left-0 top-[10px] bottom-[10px] w-[1px] bg-white/10">
                <div
                  ref={progressBarRef}
                  className="absolute top-0 left-0 w-full h-0 bg-accent shadow-[0_0_10px_#FFD43B] origin-top will-change-transform"
                />
              </div>

              {nodesData.map((node) => (
                <div
                  key={node.num}
                  className="timeline-node-item relative mb-[60px] last:mb-0 opacity-[0.15] translate-y-5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] select-none [&.active-node]:opacity-100 [&.active-node]:translate-y-0"
                >
                  {/* Dot Node */}
                  <div className="absolute left-[-50px] top-[8px] w-[9px] h-[9px] rounded-full bg-white/30 -translate-x-[4px] timeline-node-dot transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />

                  <div className="timeline-node-content">
                    <h4 className="font-display text-2xl font-semibold mb-2 text-white timeline-node-title transition-colors duration-500">
                      {node.num}. {node.title}
                    </h4>
                    <p className="font-body text-base text-text-secondary">
                      {node.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Dynamic Class styling hooks */}
      <style jsx global>{`
        .timeline-node-item.active-node .timeline-node-dot {
          background-color: #FFD43B;
          box-shadow: 0 0 10px #FFD43B;
          transform: scale(1.5) translateX(-2.5px);
        }
        .timeline-node-item.active-node .timeline-node-title {
          color: #FFD43B;
        }
      `}</style>
    </section>
  );
}
