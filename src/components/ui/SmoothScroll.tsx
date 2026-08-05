'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Skip Lenis when user prefers reduced motion — keep native scroll
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      return;
    }

    const lenis = new Lenis({
      // Shorter duration feels snappier and costs less compositor work
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      // Avoid fighting native touch inertia on mobile
      syncTouch: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    // Keep Lenis aligned with native scroll (hash links, refresh, back/forward)
    lenis.scrollTo(window.scrollY, { immediate: true, force: true });

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateTicker);
    // Allow GSAP to drop frames under load instead of stacking catch-up work
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateTicker);
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, []);

  return <>{children}</>;
}
