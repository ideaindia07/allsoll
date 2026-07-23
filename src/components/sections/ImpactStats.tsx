'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

export function NumberTicker({
  value,
  direction = 'up',
  delay = 0,
  className,
}: {
  value: number;
  direction?: 'up' | 'down';
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === 'down' ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: '0px' });

  useEffect(() => {
    if (isInView) {
      const timeoutId = setTimeout(() => {
        motionValue.set(direction === 'down' ? 0 : value);
      }, delay * 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [motionValue, isInView, delay, value, direction]);

  useEffect(() => {
    return springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat('en-US').format(
          Number(latest.toFixed(0))
        );
      }
    });
  }, [springValue]);

  return <span className={`inline-block tabular-nums ${className || ''}`} ref={ref} />;
}

interface Stat {
  id: string;
  target: number;
  suffix: string;
  label: string;
  description: string;
}

const statsData: Stat[] = [
  {
    id: 'campaigns',
    target: 150,
    suffix: '+',
    label: 'Campaigns Orchestrated',
    description: 'Transforming legacy operations into high-impact digital presence.'
  },
  {
    id: 'impressions',
    target: 50,
    suffix: 'M+',
    label: 'Total Impressions Generated',
    description: 'Creating organic, un-ignorable traction across all key customer nodes.'
  },
  {
    id: 'content',
    target: 500,
    suffix: '+',
    label: 'Premium Content Items',
    description: 'Bespoke editorial assets designed for prestige credibility and influence.'
  },
];

function StatRow({ stat, index }: { stat: Stat; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Mask sliding reveal for numbers & label
      gsap.fromTo(
        rowRef.current,
        { opacity: 0, y: 50 },
        {
          scrollTrigger: {
            trigger: rowRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
        }
      );
    }, rowRef);

    return () => {
      ctx.revert();
    };
  }, [stat.target]);

  return (
    <div
      ref={rowRef}
      className="w-full py-10 md:py-24 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-5 md:gap-8 select-none overflow-hidden"
    >
      {/* Massive number layout matching the 146% jump graphic */}
      <div
        ref={numRef}
        className="font-display text-[4.5rem] sm:text-[6.5rem] md:text-[9.5rem] lg:text-[13rem] font-bold leading-none tracking-tighter text-white flex items-baseline select-none"
      >
        <NumberTicker value={stat.target} />
        <span className="text-accent ml-1 font-light">{stat.suffix}</span>
      </div>

      {/* Label and description aligned to the right (infographic style) */}
      <div className="max-w-[450px] flex flex-col gap-3">
        <span className="font-body text-[11px] font-bold tracking-[0.25em] text-accent uppercase">
          // Stat 0{index + 1}
        </span>
        <h3 className="font-display text-xl md:text-2xl font-semibold text-white tracking-tight">
          {stat.label}
        </h3>
        <p className="font-body text-sm text-text-secondary leading-relaxed font-light">
          {stat.description}
        </p>
      </div>
    </div>
  );
}

export default function ImpactStats() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Expand the divider lines
      gsap.fromTo(
        '.impact-top-border',
        { scaleX: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
          scaleX: 1,
          duration: 1.8,
          ease: 'power4.inOut',
        }
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="stats"
      className="relative w-full py-16 md:py-40 px-6 md:px-[8%] bg-bg-primary z-20 overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Subtitle / Header info */}
        <div className="mb-20">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-white max-w-[600px]">
            Measurable acceleration. Proven growth metrics.
          </h2>
        </div>

        {/* Rows wrapper with animated top border line */}
        <div className="relative w-full">
          <div className="impact-top-border absolute top-0 left-0 w-full h-[1px] bg-white/15 origin-left" />

          <div className="flex flex-col">
            {statsData.map((stat, index) => (
              <StatRow key={stat.id} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
