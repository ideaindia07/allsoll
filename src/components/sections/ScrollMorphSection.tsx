"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, useSpring, motion, MotionValue } from "framer-motion";
import dynamic from "next/dynamic";

const EllipseCarousel = dynamic(
  () => import("@/components/ui/scroll-morph-hero"),
  { ssr: false }
);

function MotionCarousel({
  rotations,
  isMobile,
}: {
  rotations: MotionValue<number>;
  isMobile: boolean;
}) {
  const [value, setValue] = useState(0);
  useEffect(() => rotations.on("change", setValue), [rotations]);
  return <EllipseCarousel scrollProgress={value} isMobile={isMobile} />;
}

export default function ScrollMorphSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 25 });
  const rotations = useTransform(smoothProgress, [0, 1], [0, 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      id="scroll-morph"
      aria-label="Portfolio carousel showcase"
      className="relative w-full bg-bg-primary overflow-hidden"
      style={{ height: isMobile ? "80vh" : "100vh" }}
    >
      <motion.div
        className="relative w-full h-full flex flex-col items-center"
        style={{ opacity }}
      >
        {/* Top separator */}
        <div className="absolute top-0 left-[8%] right-[8%] h-[1px] bg-white/5 z-20" />

        {/* Heading */}
        <div className="absolute top-[6%] left-0 right-0 z-20 text-center pointer-events-none px-6">
          <p className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-[#FFD43B] uppercase mb-2 md:mb-3">
            // The Work
          </p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Presence is the new{" "}
            <span className="text-[#FFD43B]">Market Share.</span>
          </h2>
          <p className="mt-2 md:mt-3 text-xs md:text-base text-white/40 max-w-sm md:max-w-lg mx-auto leading-relaxed font-body">
            Scroll to explore our curated work.
          </p>
        </div>

        {/* 3-D Ellipse Carousel */}
        <div className="absolute inset-0">
          <MotionCarousel rotations={rotations} isMobile={isMobile} />
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-5 md:bottom-7 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none select-none">
          <div className="w-[1px] h-8 md:h-10 bg-white/20 relative overflow-hidden scroll-line-fill" />
          <span className="text-[9px] md:text-[10px] font-bold tracking-[0.25em] text-white/30 uppercase">
            Scroll
          </span>
        </div>
      </motion.div>
    </section>
  );
}
