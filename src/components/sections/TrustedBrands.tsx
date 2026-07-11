'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface BrandItem {
  name: string;
  gradient: string;
  tagline: string;
}

const row1Brands: BrandItem[] = [
  { name: 'VANGUARD', gradient: 'from-blue-600 to-indigo-600', tagline: 'Futuristic AI Scaling Systems' },
  { name: 'AETHER', gradient: 'from-purple-600 to-pink-600', tagline: 'Next-Gen Immersive Experience' },
  { name: 'KINETIC', gradient: 'from-yellow-500 to-amber-600', tagline: 'Dynamic Digital Orchestration' },
  { name: 'SYNAPSE', gradient: 'from-emerald-600 to-teal-500', tagline: 'Neural Business Intelligence' },
  { name: 'NEBULA', gradient: 'from-fuchsia-600 to-cyan-500', tagline: 'Cloud Talent Ecosystems' },
  { name: 'AURA', gradient: 'from-rose-500 to-orange-500', tagline: 'Omnipresent Creative Brandings' },
  { name: 'ELEVATE', gradient: 'from-sky-500 to-blue-600', tagline: 'Prestige Growth Accelerators' },
  { name: 'OBSIDIAN', gradient: 'from-neutral-700 to-neutral-950', tagline: 'Minimalist Engineering Co.' },
];

const row2Brands: BrandItem[] = [
  { name: 'STRATOS', gradient: 'from-violet-600 to-blue-600', tagline: 'Atmospheric Brand Visibility' },
  { name: 'PULSE', gradient: 'from-red-600 to-rose-500', tagline: 'Creator Engagement Networks' },
  { name: 'LUMEN', gradient: 'from-amber-400 to-yellow-600', tagline: 'Lightweight Vector Solutions' },
  { name: 'SPECTRA', gradient: 'from-green-500 to-emerald-600', tagline: 'Full-Spectrum PR campaigns' },
  { name: 'VERTEX', gradient: 'from-cyan-600 to-blue-500', tagline: 'Immersive VR Ecosystem Architect' },
  { name: 'NEXUS', gradient: 'from-pink-500 to-purple-600', tagline: 'Synergy Talent Connections' },
  { name: 'MATRIX', gradient: 'from-emerald-700 to-green-500', tagline: 'High-Density Growth Analytics' },
  { name: 'CHRONOS', gradient: 'from-indigo-500 to-purple-600', tagline: 'Timeless Aesthetic Redefinition' },
];

export default function TrustedBrands() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  
  const [hoveredBrand, setHoveredBrand] = useState<BrandItem | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (!previewRef.current) return;

    if (hoveredBrand) {
      // Fade in and follow
      gsap.to(previewRef.current, {
        opacity: 1,
        scale: 1,
        x: mousePos.x + 25,
        y: mousePos.y + 25,
        duration: 0.45,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    } else {
      // Fade out
      gsap.to(previewRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.35,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }
  }, [hoveredBrand, mousePos]);

  return (
    <section 
      ref={sectionRef}
      id="partners" 
      className="relative w-full py-20 md:py-40 bg-bg-primary overflow-hidden z-20"
    >
      <div className="w-full max-w-[1800px] mx-auto px-[8%] select-none">
        <span className="font-body text-[11px] font-semibold tracking-[0.3em] text-text-secondary uppercase block mb-5">
          // Growth Stories Across Industries
        </span>
        <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight tracking-tight max-w-[800px] mb-20 text-white">
          Trusted by brands building the future.
        </h2>
      </div>

      <div className="flex flex-col gap-[35px] w-screen left-1/2 -translate-x-1/2 relative select-none">
        {/* Row 1: Left to Right */}
        <div className="group/row flex w-max overflow-hidden border-t border-b border-white/5 py-4">
          <div className="flex gap-[60px] pr-[60px] animate-marquee-ltr group-hover/row:[animation-play-state:paused] will-change-transform">
            {row1Brands.concat(row1Brands).map((brand, index) => (
              <div
                key={index}
                className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-text-secondary hover:text-white transition-colors duration-300 flex items-center cursor-none py-2"
                onMouseEnter={() => setHoveredBrand(brand)}
                onMouseLeave={() => setHoveredBrand(null)}
              >
                <span>{brand.name}</span>
                <span className="ml-[60px] w-2 h-2 rounded-full bg-accent" />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left */}
        <div className="group/row flex w-max overflow-hidden border-b border-white/5 py-4">
          <div className="flex gap-[60px] pr-[60px] animate-marquee-rtl group-hover/row:[animation-play-state:paused] will-change-transform">
            {row2Brands.concat(row2Brands).map((brand, index) => (
              <div
                key={index}
                className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-text-secondary hover:text-white transition-colors duration-300 flex items-center cursor-none py-2"
                onMouseEnter={() => setHoveredBrand(brand)}
                onMouseLeave={() => setHoveredBrand(null)}
              >
                <span>{brand.name}</span>
                <span className="ml-[60px] w-2 h-2 rounded-full bg-accent" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Hover Brand Preview Box (Visual Electric cursor hover design) */}
      <div
        ref={previewRef}
        className="fixed top-0 left-0 w-[280px] h-[160px] rounded-xl border border-white/15 bg-bg-primary/90 backdrop-blur-xl shadow-2xl p-6 pointer-events-none z-50 flex flex-col justify-between opacity-0 scale-90 will-change-transform"
      >
        <div className="flex items-center justify-between">
          <span className="font-display font-black text-lg tracking-wider text-white">
            {hoveredBrand?.name}
          </span>
          <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${hoveredBrand?.gradient} blur-[4px] opacity-80`} />
        </div>
        
        <div className="flex flex-col gap-1.5 mt-auto">
          <span className="font-body text-[10px] font-bold tracking-wider text-accent uppercase">
            Omnipresence Partner
          </span>
          <p className="font-body text-xs font-medium text-text-secondary">
            {hoveredBrand?.tagline}
          </p>
        </div>

        {/* Glow behind the preview box */}
        <div className={`absolute inset-0 -z-10 rounded-xl bg-gradient-to-br ${hoveredBrand?.gradient} opacity-10 blur-xl`} />
      </div>
    </section>
  );
}
