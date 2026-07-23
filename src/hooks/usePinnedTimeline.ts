'use client';

import { useLayoutEffect, useRef, type RefObject, type MutableRefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { buildStoryTimeline, computeCirclePositions } from '../lib/ScrollTimeline';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface UsePinnedTimelineArgs {
  containerRef: RefObject<HTMLDivElement | null>;
  imageRefs: MutableRefObject<(HTMLDivElement | null)[]>;
  cardCount: number;
  radius: number;
  onCircleComplete: () => void;
  onCircleReverse: () => void;
}

/*
 * Pins the story section for 500vh and scrubs the Phase 1-4 timeline against
 * scroll position. When the scrubbed timeline reaches its end (the circle
 * has fully formed), onCircleComplete fires so the caller can start the
 * infinite rotation and reveal the center content. Scrolling back up past
 * the start reverses it via onCircleReverse.
 */
export function usePinnedTimeline({
  containerRef,
  imageRefs,
  cardCount,
  radius,
  onCircleComplete,
  onCircleReverse,
}: UsePinnedTimelineArgs) {
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const els = imageRefs.current.filter((el): el is HTMLDivElement => el !== null);
      if (els.length === 0) return;

      const positions = computeCirclePositions(cardCount, radius);
      const timeline = buildStoryTimeline({ imageEls: els, positions });

      timeline.eventCallback('onComplete', onCircleComplete);
      timeline.eventCallback('onReverseComplete', onCircleReverse);

      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=150%',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        animation: timeline,
      });
    }, containerRef);

    return () => {
      ctx.revert();
      scrollTriggerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, imageRefs, cardCount, radius]);

  return scrollTriggerRef;
}
