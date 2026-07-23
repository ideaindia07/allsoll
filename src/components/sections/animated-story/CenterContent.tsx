'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export interface CenterContentProps {
  revealed: boolean;
  logoSrc?: string;
  logoAlt?: string;
}

const SENTENCE_ONE = ["WE DON'T", 'MANAGE CHANNELS'];
const SENTENCE_TWO_PREFIX = ['WE'];
const SENTENCE_TWO_ACCENT = 'ORCHESTRATE';
const SENTENCE_TWO_SUFFIX = ['PRESENCE.'];
const basePath = process.env.NODE_ENV === 'production' ? '/allsoll' : '';

export default function CenterContent({
  revealed,
  logoSrc = '/logo.svg',
  logoAlt = 'Allsoll Logo',
}: CenterContentProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const sentenceOneRef = useRef<HTMLDivElement>(null);
  const sentenceTwoRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const floatTween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!revealed || !rootRef.current) return;

    const ctx = gsap.context(() => {
      const lines1 = gsap.utils.toArray<HTMLElement>('[data-line="one"]');
      const lines2 = gsap.utils.toArray<HTMLElement>('[data-line="two"]');

      const tl = gsap.timeline();

      // Sentence 1 — line by line, opacity + blur + upward drift.
      tl.set([lines1, lines2], { opacity: 0, filter: 'blur(12px)', y: 24 });
      tl.set(logoRef.current, { opacity: 0, scale: 0.8 });

      tl.to(lines1, {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        duration: 0.9,
        ease: 'power4.out',
        stagger: 0.12,
      });

      tl.to({}, { duration: 1.4 }); // hold sentence 1

      // Sentence 1 exits, sentence 2 enters.
      tl.to(lines1, {
        opacity: 0,
        filter: 'blur(12px)',
        y: -24,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.08,
      });

      tl.to(
        lines2,
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          duration: 0.9,
          ease: 'power4.out',
          stagger: 0.12,
        },
        '-=0.2'
      );

      // Phase 7 — logo fade + scale in below the text.
      tl.to(logoRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
      });

      tl.eventCallback('onComplete', () => {
        // Phase 8 — subtle infinite floating on the whole center block.
        floatTween.current = gsap.to(rootRef.current, {
          y: 6,
          duration: 5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      });
    }, rootRef);

    return () => {
      floatTween.current?.kill();
      ctx.revert();
    };
  }, [revealed]);

  return (
    <div
      ref={rootRef}
      className={`
        pointer-events-none
        absolute
        left-1/2
        top-1/2
        z-20
        flex
        w-[180px]
        -translate-x-1/2
        -translate-y-1/2
        flex-col
        items-center
        justify-center
        text-center
        sm:w-[220px]
        md:w-[260px]
        ${!revealed ? 'opacity-0' : ''}
      `}
    >
      <div
        className="
          absolute
          left-1/2
          top-1/2
          -z-10
          h-[280px]
          w-[280px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[radial-gradient(circle,rgba(0,0,0,0.96)_0%,rgba(0,0,0,0.78)_45%,transparent_75%)]
        "
      />
      <div className="relative">
        <div ref={sentenceOneRef} className="absolute inset-0 flex flex-col items-center">
          {SENTENCE_ONE.map((line) => (
            <span
              key={line}
              data-line="one"
              className="block font-[700] text-white leading-[1.1] text-[18px] sm:text-[22px] md:text-[28px] lg:text-[32px] tracking-tight"
              style={{ fontFamily: "'General Sans', sans-serif" }}
            >
              {line}
            </span>
          ))}
        </div>

        <div ref={sentenceTwoRef} className="flex flex-col items-center">
          {SENTENCE_TWO_PREFIX.map((line) => (
            <span
              key={line}
              data-line="two"
              className="block font-[700] text-white leading-[1.1] text-[18px] sm:text-[22px] md:text-[28px] lg:text-[32px] tracking-tight"
              style={{ fontFamily: "'General Sans', sans-serif" }}
            >
              {line}
            </span>
          ))}
          <span
            data-line="two"
            className="block bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#06B6D4] bg-clip-text font-[700] leading-[1.1] text-[18px] sm:text-[22px] md:text-[28px] lg:text-[32px] tracking-tight text-transparent"
            style={{ fontFamily: "'General Sans', sans-serif" }}
          >
            {SENTENCE_TWO_ACCENT}
          </span>
          {SENTENCE_TWO_SUFFIX.map((line) => (
            <span
              key={line}
              data-line="two"
              className="block font-[700] text-white leading-[1.1] text-[18px] sm:text-[22px] md:text-[28px] lg:text-[32px] tracking-tight"
              style={{ fontFamily: "'General Sans', sans-serif" }}
            >
              {line}
            </span>
          ))}
        </div>
      </div>

      {logoSrc && (
        <div ref={logoRef} className="mt-10 h-10 w-auto opacity-0">
          <div className="flex justify-center select-none pt-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${basePath}${logoSrc}`} alt={logoAlt} className="h-10 w-auto object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
