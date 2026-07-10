"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, useSpring, motion, MotionValue } from "framer-motion";
import dynamic from "next/dynamic";

const EllipseCarousel = dynamic(
  () => import("@/components/ui/scroll-morph-hero"),
  { ssr: false }
);

// ─── Bridge: MotionValue<number> → plain number ───────────────────────────────
function MotionCarousel({ rotations }: { rotations: MotionValue<number> }) {
  const [value, setValue] = useState(0);
  useEffect(() => rotations.on("change", setValue), [rotations]);
  return <EllipseCarousel scrollProgress={value} />;
}

// ─── Main Section ─────────────────────────────────────────────────────────────
/**
 * A single 100vh section — no sticky, no gap.
 * As the section scrolls through the viewport, scrollYProgress 0→1 drives
 * the carousel rotation. Simple and Lenis-compatible.
 */
export default function ScrollMorphSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Track scroll as this section passes through the viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],   // 0 = section bottom at viewport bottom, 1 = section top at viewport top
  });

  // Smooth the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
  });

  // 0→1 scroll progress → 0→1.5 full rotations of the carousel
  const rotations = useTransform(smoothProgress, [0, 1], [0, 1.5]);

  // Fade in as section enters, fade out as it leaves
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      id="scroll-morph"
      aria-label="Portfolio carousel showcase"
      className="relative w-full bg-bg-primary overflow-hidden"
      style={{ height: "100vh" }}
    >
      <motion.div
        className="relative w-full h-full flex flex-col items-center"
        style={{ opacity }}
      >
        {/* Top separator */}
        <div className="absolute top-0 left-[8%] right-[8%] h-[1px] bg-white/5 z-20" />

        {/* Heading */}
        <div className="absolute top-[7%] left-0 right-0 z-20 text-center pointer-events-none px-4">
          <p className="text-xs font-bold tracking-[0.3em] text-[#FFD43B] uppercase mb-3">
            // The Work
          </p>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Presence is the new{" "}
            <span className="text-[#FFD43B]">Market Share.</span>
          </h2>
          <p className="mt-3 text-sm md:text-base text-white/40 max-w-lg mx-auto leading-relaxed font-body">
            Scroll to explore our curated work.
          </p>
        </div>

        {/* 3-D Ellipse Carousel */}
        <div className="absolute inset-0">
          <MotionCarousel rotations={rotations} />
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none select-none">
          <div className="w-[1px] h-10 bg-white/20 relative overflow-hidden scroll-line-fill" />
          <span className="text-[10px] font-bold tracking-[0.25em] text-white/30 uppercase">
            Scroll
          </span>
        </div>
      </motion.div>
    </section>
  );
}
