'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

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

const basePath = '';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
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
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section id="more" className="relative py-24 md:py-40 px-6 md:px-10 lg:px-20 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main large gradients */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-brand-purple/25 blur-[150px] rounded-full -z-10" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-brand-yellow/20 blur-[150px] rounded-full -z-10" />

        <div className="absolute top-[10%] right-[5%] w-20 md:w-32 opacity-40 float-slow">
          <img
            src={`${basePath}/assets/blob-yellow.png`}
            alt="yellow blob"
            className="w-full h-full object-cover object-center opacity-40 mix-blend-screen animate-blob-slow blur-[80px]"
          />
        </div>
        <div className="absolute top-[50%] left-[3%] w-16 md:w-24 opacity-40 float-medium">
          <img
            src={`${basePath}/assets/blob-purple.png`}
            alt="purple blob"
            className="w-full h-full object-cover object-center opacity-40 mix-blend-screen animate-blob-slower blur-[80px]"
          />
        </div>
        <div className="absolute bottom-[15%] right-[20%] w-14 md:w-20 opacity-40 float-fast">
          <img
            src={`${basePath}/assets/blob-red.png`}
            alt="red blob"
            className="w-full h-full object-cover object-center opacity-30 mix-blend-screen animate-blob-slowest blur-[80px]"
          />
        </div>
      </div>

      <div className="relative z-10 max-w-[1800px] mx-auto">
        {/* Section Title */}
        <div className="text-center mb-20 md:mb-32">
          <h2 className="text-[3rem] md:text-[5rem] lg:text-[7rem] font-serif leading-[0.95] tracking-tight">
            <span className="block">People</span>
            <span className="block italic">make</span>
            <span className="block">businesses</span>
          </h2>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-6">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif">
              We've been there. We know what it takes.
            </h3>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Unlike traditional search firms, we've been part of building innovative companies – like Kickstarter, Casper and Etsy – from the ground up, giving us a deep understanding of what it takes to build effective, thriving teams.
            </p>
          </div>

          {/* Two Cards */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mt-20">
            {/* For Companies */}
            <div id="companies" className="bg-card p-8 md:p-10 rounded-3xl border border-border/50 hover:shadow-xl hover:border-border transition-all duration-300 group">
              <div className="w-14 h-14 md:w-16 md:h-16 mb-8 rounded-full bg-brand-yellow flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </div>
              <blockquote className="text-xl md:text-2xl font-serif italic mb-8 leading-relaxed">
                "They just get it. They 100% understand what we're trying to build and the team we're trying to build."
              </blockquote>
              <div className="text-sm mb-8">
                <p className="font-medium text-foreground">Sarah Chen</p>
                <p className="text-muted-foreground">VP People, Series B Startup</p>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground group-hover:gap-3 transition-all"
              >
                Complete your team
                <span className="text-lg">→</span>
              </a>
            </div>

            {/* For Candidates */}
            <div id="candidates" className="bg-card p-8 md:p-10 rounded-3xl border border-border/50 hover:shadow-xl hover:border-border transition-all duration-300 group">
              <div className="w-14 h-14 md:w-16 md:h-16 mb-8 rounded-full bg-brand-purple flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--background))" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <blockquote className="text-xl md:text-2xl font-serif italic mb-8 leading-relaxed">
                "I would work with Purpose again in a heartbeat. I've been wowed by their ability to lead me to mission-focused opportunities."
              </blockquote>
              <div className="text-sm mb-8">
                <p className="font-medium text-foreground">Ruby Hoose</p>
                <p className="text-muted-foreground">Global Talent Leader</p>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground group-hover:gap-3 transition-all"
              >
                Find your rhythm
                <span className="text-lg">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // return (
  //   <section
  //     ref={containerRef}
  //     id="about"
  //     className="relative w-full py-20 md:py-40 px-6 md:px-[8%] bg-bg-primary z-20"
  //   >
  //     <div className="max-w-[1600px] mx-auto">
  //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
  //         {/* Left Side (Sticky typography) */}
  //         <div className="lg:sticky lg:top-[150px] h-fit">
  //           <h2 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-[6.5rem] font-bold leading-[0.95] uppercase tracking-tighter text-white select-none">
  //             <span className="block overflow-hidden">
  //               <span className="about-title-reveal inline-block">We build</span>
  //             </span>
  //             <span className="block overflow-hidden text-accent">
  //               <span className="about-title-reveal inline-block">presence.</span>
  //             </span>
  //             <span className="block overflow-hidden">
  //               <span className="about-title-reveal inline-block">Not campaigns.</span>
  //             </span>
  //           </h2>
  //         </div>

  //         {/* Right Side */}
  //         <div className="flex flex-col">
  //           <p className="about-p-reveal font-body text-lg sm:text-xl md:text-2xl lg:text-3xl font-light leading-relaxed mb-8 md:mb-10 text-white select-none">
  //             Allsoll was founded on a realization: advertising is dead. Today&apos;s consumer is immune to algorithms and ads. They don&apos;t buy products; they align with cultures.
  //           </p>
  //           <p className="about-p-reveal font-body text-base md:text-lg text-text-secondary leading-relaxed mb-20 select-none">
  //             We exist to bridge the gap between traditional digital marketing and raw brand omnipresence. Through cinematic narratives, creator networks, technology stack architectures, and public relations, we make your brand impossible to ignore.
  //           </p>

  //           {/* Timeline Wrapper */}
  //           <div ref={timelineRef} className="relative pl-[50px] timeline-nodes-container">
  //             {/* Vertical line track */}
  //             <div className="absolute left-0 top-[10px] bottom-[10px] w-[1px] bg-white/10">
  //               <div
  //                 ref={progressBarRef}
  //                 className="absolute top-0 left-0 w-full h-0 bg-accent shadow-[0_0_10px_#FFD43B] origin-top will-change-transform"
  //               />
  //             </div>

  //             {nodesData.map((node) => (
  //               <div
  //                 key={node.num}
  //                 className="timeline-node-item relative mb-[60px] last:mb-0 opacity-[0.15] translate-y-5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] select-none [&.active-node]:opacity-100 [&.active-node]:translate-y-0"
  //               >
  //                 {/* Dot Node */}
  //                 <div className="absolute left-[-50px] top-[8px] w-[9px] h-[9px] rounded-full bg-white/30 -translate-x-[4px] timeline-node-dot transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />

  //                 <div className="timeline-node-content">
  //                   <h4 className="font-display text-2xl font-semibold mb-2 text-white timeline-node-title transition-colors duration-500">
  //                     {node.num}. {node.title}
  //                   </h4>
  //                   <p className="font-body text-base text-text-secondary">
  //                     {node.desc}
  //                   </p>
  //                 </div>
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       </div>
  //     </div>

  //     {/* Dynamic Class styling hooks */}
  //     <style jsx global>{`
  //       .timeline-node-item.active-node .timeline-node-dot {
  //         background-color: #FFD43B;
  //         box-shadow: 0 0 10px #FFD43B;
  //         transform: scale(1.5) translateX(-2.5px);
  //       }
  //       .timeline-node-item.active-node .timeline-node-title {
  //         color: #FFD43B;
  //       }
  //     `}</style>
  //   </section>
  // );
}
