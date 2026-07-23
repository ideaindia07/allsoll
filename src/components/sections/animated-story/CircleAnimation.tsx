'use client';

import { useEffect, useRef, type MutableRefObject, type RefObject } from 'react';
import { gsap } from 'gsap';

export interface CircleAnimationProps {
  active: boolean;
  wrapperRef: RefObject<HTMLDivElement | null>;
  counterRefs: MutableRefObject<(HTMLDivElement | null)[]>;
  /** Seconds for one full clockwise revolution. */
  rotationDuration?: number;
}

/**
 * Phase 5 — once the circle has formed, the whole group rotates slowly and
 * continuously (clockwise) around its own center. Each card gets an equal
 * and opposite counter-rotation applied to an inner wrapper so the images
 * themselves stay upright while orbiting. Hovering the group pauses the
 * rotation; leaving resumes it.
 */
export default function CircleAnimation({
  active,
  wrapperRef,
  counterRefs,
  rotationDuration = 30,
}: CircleAnimationProps) {
  const wrapperTween = useRef<gsap.core.Tween | null>(null);
  const counterTweens = useRef<gsap.core.Tween[]>([]);

  useEffect(() => {
    if (!active || !wrapperRef.current) return;

    const wrapperEl = wrapperRef.current;
    const counters = counterRefs.current.filter((el): el is HTMLDivElement => el !== null);

    wrapperTween.current = gsap.to(wrapperEl, {
      rotation: 360,
      duration: rotationDuration,
      repeat: -1,
      ease: 'none',
      transformOrigin: '50% 50%',
    });

    counterTweens.current = counters.map((el) =>
      gsap.to(el, {
        rotation: -360,
        duration: rotationDuration,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      })
    );

    const pause = () => {
      wrapperTween.current?.pause();
      counterTweens.current.forEach((t) => t.pause());
    };
    const resume = () => {
      wrapperTween.current?.resume();
      counterTweens.current.forEach((t) => t.resume());
    };

    wrapperEl.addEventListener('mouseenter', pause);
    wrapperEl.addEventListener('mouseleave', resume);

    return () => {
      wrapperEl.removeEventListener('mouseenter', pause);
      wrapperEl.removeEventListener('mouseleave', resume);
      wrapperTween.current?.kill();
      counterTweens.current.forEach((t) => t.kill());
      wrapperTween.current = null;
      counterTweens.current = [];
    };
  }, [active, wrapperRef, counterRefs, rotationDuration]);

  return null;
}
