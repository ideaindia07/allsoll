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

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const rotations = useTransform(smoothProgress, [0, 1], [0, 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      id="scroll-morph"
      aria-label="Portfolio carousel showcase"
      className="sticky top-0 w-full bg-bg-primary overflow-hidden z-0"
      style={{ height: isMobile ? "80vh" : "100vh" }}
    >
      {/* Checkered background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
          backgroundPosition: "center center"
        }}
      />
      <motion.div
        className="relative w-full h-full flex flex-col items-center"
        style={{ opacity }}
      >
        {/* Top separator */}
        <div className="absolute top-0 left-[8%] right-[8%] h-[1px] bg-white/5 z-20" />

        {/* Heading */}
        <div className="absolute top-[4%] left-0 right-0 z-20 text-center pointer-events-none px-6">
          <p className="text-[10px] md:text-xs font-bold tracking-[0.3em] text-[#FFD43B] uppercase mb-2 md:mb-3">
            // The Work
          </p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            Most agencies rent you attention.
          </h2>
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
            <span className="text-[#FFD43B]">We build you equity.</span>
          </h2>

        </div>

        {/* 3-D Ellipse Carousel */}
        <div className="absolute inset-0 translate-y-12 md:translate-y-16">
          <MotionCarousel rotations={rotations} isMobile={isMobile} />
        </div>

        {/* Scroll cue removed */}
      </motion.div>
    </section>
  );
}
