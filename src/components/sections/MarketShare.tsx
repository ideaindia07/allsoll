'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function MarketShare() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLHeadingElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);
  const text3Ref = useRef<HTMLHeadingElement>(null);
  const visualsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    // Staggered reveal of titles
    tl.to(text1Ref.current, { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' })
      .to(text2Ref.current, { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }, '-=0.8')
      .to(text3Ref.current, { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }, '-=0.8');

    // Staggered clip-path sliding reveal of campaign visuals
    const visuals = visualsRef.current?.querySelectorAll('.campaign-visual');
    if (visuals) {
      visuals.forEach((visual, index) => {
        const img = visual.querySelector('.visual-img');
        if (index === 0) {
          tl.to(visual, {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 2.5,
            ease: 'power2.inOut',
          }, '+=0.5');
        } else {
          tl.to(visual, {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 4,
            ease: 'power2.inOut',
          });
        }
        tl.to(img, {
          scale: 1.0,
          duration: 5,
          ease: 'none',
        }, '-=4');
      });
    }

    // Toggle header overlay opacity on enter
    ScrollTrigger.create({
      trigger: triggerRef.current,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => gsap.to('.site-header', { background: 'rgba(9, 9, 9, 0.25)', duration: 0.5 }),
      onLeave: () => gsap.to('.site-header', { background: 'rgba(9, 9, 9, 0.75)', duration: 0.5 }),
      onEnterBack: () => gsap.to('.site-header', { background: 'rgba(9, 9, 9, 0.25)', duration: 0.5 }),
      onLeaveBack: () => gsap.to('.site-header', { background: 'rgba(9, 9, 9, 0.75)', duration: 0.5 }),
    });
  }, []);

  return (
    <div ref={triggerRef} className="relative w-full h-[300vh]">
      <div
        ref={containerRef}
        className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden bg-bg-primary z-10"
      >
        <div className="relative z-20 text-center pointer-events-none select-none px-4">
          <h2
            ref={text1Ref}
            className="font-display text-[4rem] md:text-[8vw] lg:text-[10rem] font-bold uppercase leading-[0.9] tracking-tighter opacity-0 translate-y-[100px] will-change-transform"
          >
            Presence
          </h2>
          <h2
            ref={text2Ref}
            className="font-display text-[4rem] md:text-[8vw] lg:text-[10rem] font-bold uppercase leading-[0.9] tracking-tighter opacity-0 translate-y-[100px] will-change-transform"
          >
            is the new
          </h2>
          <h2
            ref={text3Ref}
            className="font-display text-[4rem] md:text-[8vw] lg:text-[10rem] font-bold uppercase leading-[0.9] tracking-tighter text-accent opacity-0 translate-y-[100px] will-change-transform"
          >
            Market Share.
          </h2>
        </div>

        <div ref={visualsRef} className="absolute top-0 left-0 w-full h-full z-0">
          {[
            'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
          ].map((url, index) => (
            <div
              key={index}
              className="campaign-visual absolute top-0 left-0 w-full h-full opacity-0 will-change-transform"
              style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            >
              <img
                src={url}
                alt={`Campaign Visual ${index + 1}`}
                className="visual-img w-full h-full object-cover scale-[1.15] filter brightness-[0.5] contrast-[1.1] will-change-transform"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-black/60" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
