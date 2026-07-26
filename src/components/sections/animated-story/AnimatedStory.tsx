'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePinnedTimeline } from '../../../hooks/usePinnedTimeline';
import CenterContent from './CenterContent';

export interface StoryCard {
  id: string;
  src: string;
}

const CARDS: StoryCard[] = [
  { id: '1', src: '/Webicon _6(1).webp' },
  { id: '2', src: '/Webicon_6(2).webp' },
  { id: '3', src: '/Webicon_6(3).webp' },
  { id: '4', src: '/Webicon_6(4).webp' },
  { id: '5', src: '/Webicon_6(5).webp' },
  { id: '6', src: '/Webicon_6(6).webp' },
];

const basePath = '';

type Breakpoint = { count: number; radius: number };

function getBreakpoint(): Breakpoint {
  if (typeof window === 'undefined') {
    return { count: 6, radius: 240 };
  }

  const width = window.innerWidth;

  if (width < 640) {
    return { count: 6, radius: 150 };
  }

  if (width < 1024) {
    return { count: 6, radius: 180 };
  }

  if (width < 1440) {
    return { count: 6, radius: 230 };
  }

  return { count: 6, radius: 270 };
}

export default function AnimatedStory({ logoSrc }: { logoSrc?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleWrapperRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const counterRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [{ count, radius }, setBreakpoint] = useState<Breakpoint>({ count: 6, radius: 150 });
  const [circleComplete, setCircleComplete] = useState(false);

  useEffect(() => {
    const update = () => setBreakpoint(getBreakpoint());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const onCircleComplete = useCallback(() => setCircleComplete(true), []);
  const onCircleReverse = useCallback(() => setCircleComplete(false), []);

  usePinnedTimeline({
    containerRef,
    imageRefs,
    cardCount: count,
    radius,
    onCircleComplete,
    onCircleReverse,
  });

  const visibleCards = CARDS.slice(0, count);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      <div
        ref={circleWrapperRef}
        className="
          absolute
          left-1/2
          top-1/2
          h-[420px]
          w-[420px]
          -translate-x-1/2
          -translate-y-1/2
          sm:h-[520px]
          sm:w-[520px]
          lg:h-[650px]
          lg:w-[650px]
        "
        style={{
          willChange: 'transform',
          transformOrigin: 'center center',
        }}
      >
        {visibleCards.map((card, i) => (
          <div
            key={card.id}
            ref={(el) => {
              imageRefs.current[i] = el;
            }}
            className="
              absolute
              left-1/2
              top-1/2
              h-28
              w-28
              overflow-hidden
              rounded-[22px]
              border
              border-white/[0.1]
              shadow-[0_24px_70px_rgba(0,0,0,0.55)]
              sm:h-32
              sm:w-32
              md:h-36
              md:w-36
              lg:h-40
              lg:w-40
            "
            style={{ willChange: 'transform', backfaceVisibility: 'hidden' }}
          >
            <div
              ref={(el) => {
                counterRefs.current[i] = el;
              }}
              className="flex h-full w-full items-center justify-center bg-black"
              style={{ willChange: 'transform' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${basePath}${card.src}`} alt={card.id} className="h-full w-full object-cover" />
            </div>
          </div>
        ))}
      </div>

      <CenterContent revealed={circleComplete} logoSrc={logoSrc} />
    </section>
  );
}
