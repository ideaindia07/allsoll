import { gsap } from 'gsap';

export interface CirclePosition {
  x: number;
  y: number;
  rotate: number;
  scale: number;
  zIndex: number;
}

export function computeCirclePositions(
  count: number,
  radius: number
): CirclePosition[] {
  const positions: CirclePosition[] = [
    {
      x: 0,
      y: -radius,
      rotate: -6,
      scale: 1,
      zIndex: 6,
    },
    {
      x: radius * 0.72,
      y: -radius * 0.5,
      rotate: 7,
      scale: 0.94,
      zIndex: 5,
    },
    {
      x: radius * 0.8,
      y: radius * 0.48,
      rotate: -5,
      scale: 0.92,
      zIndex: 4,
    },
    {
      x: 0,
      y: radius,
      rotate: 6,
      scale: 1,
      zIndex: 6,
    },
    {
      x: -radius * 0.8,
      y: radius * 0.48,
      rotate: -7,
      scale: 0.92,
      zIndex: 4,
    },
    {
      x: -radius * 0.72,
      y: -radius * 0.5,
      rotate: 5,
      scale: 0.94,
      zIndex: 5,
    },
  ];

  return positions.slice(0, count);
}

export interface BuildStoryTimelineArgs {
  imageEls: HTMLDivElement[];
  positions: CirclePosition[];
  holdDuration?: number;
  transitionDuration?: number;
}

/**
 * Builds the Phase 1 -> Phase 4 timeline:
 *   Phase 1: first image fades/settles in
 *   Phase 2: images swap one at a time, only one ever visible
 *   Phase 3: hold, then the last image shrinks toward center
 *   Phase 4: all images fly outward into a circular composition
 *
 * This timeline is designed to be scrubbed by a GSAP ScrollTrigger — every
 * tween has an explicit duration so the total length maps predictably to
 * scroll distance.
 */
export function buildStoryTimeline({
  imageEls,
  positions,
  holdDuration = 0.6,
  transitionDuration = 0.8,
}: BuildStoryTimelineArgs): gsap.core.Timeline {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Base state: every card centered, invisible, slightly oversized.
  tl.set(imageEls, {
    xPercent: -50,
    yPercent: -50,
    x: 0,
    y: 0,
    scale: 1.05,
    opacity: 0,
    rotate: 0,
    borderRadius: 28,
  });

  // ---------------- Phase 1 ----------------
  tl.set(imageEls[0], { opacity: 1 });
  tl.to(imageEls[0], { scale: 1, duration: 0.7, ease: 'power3.out' }, 'phase1');
  tl.to({}, { duration: holdDuration });

  // ---------------- Phase 2 ----------------
  for (let i = 1; i < imageEls.length; i++) {
    const prev = imageEls[i - 1];
    const next = imageEls[i];
    const label = `swap-${i}`;

    tl.to(
      prev,
      { opacity: 0, scale: 0.94, y: -36, duration: transitionDuration, ease: 'power3.out' },
      label
    );
    tl.fromTo(
      next,
      { opacity: 0, scale: 1.05, y: 36 },
      { opacity: 1, scale: 1, y: 0, duration: transitionDuration, ease: 'power3.out' },
      label
    );
    tl.to({}, { duration: holdDuration });
  }

  // ---------------- Phase 3 ----------------
  const last = imageEls[imageEls.length - 1];
  tl.to({}, { duration: 2 }); // hold on the final image
  tl.to(
    last,
    {
      scale: 0.55,
      opacity: 1,
      duration: 0.8,
      ease: 'power4.out',
    },
    'shrink'
  );

  // ---------------- Phase 4 ----------------
  // Bring every card back to full opacity at center, then fly each one
  // out to its position on the circle with a small random tilt.
  tl.set(
    imageEls,
    {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 0.55,
      rotate: 0,
    },
    'flyOut'
  );

  imageEls.forEach((el, i) => {
    const pos = positions[i];

    tl.to(
      el,
      {
        x: pos.x,
        y: pos.y,
        scale: pos.scale,
        rotate: pos.rotate,
        zIndex: pos.zIndex,
        borderRadius: 24,
        duration: 1.15,
        ease: 'power4.out',
      },
      `flyOut+=${i * 0.07}`
    );
  });

  return tl;
}
