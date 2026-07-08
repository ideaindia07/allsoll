'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Project {
  id: string;
  num: string;
  title: string;
  category: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 'sas',
    num: '01',
    title: 'SAS',
    category: 'Brand Identity & Digital Strategy',
    image: 'https://allsoll.com/SAS.png',
  },
  {
    id: 'bookit',
    num: '02',
    title: 'BOOKIT',
    category: 'Website Design & Development',
    image: 'https://allsoll.com/Bookit.png',
  },
  {
    id: 'empiras',
    num: '03',
    title: 'EMPIRAS',
    category: 'Luxury Marketing & Brand Photoshoots',
    image: 'https://allsoll.com/empiras.png',
  },
  {
    id: 'vicinity',
    num: '04',
    title: 'VICINITY',
    category: 'Social Media & Omnipresence Strategy',
    image: 'https://allsoll.com/Vicinity.png',
  },
];

export default function SelectedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for tracking mouse positions of floating visual
  const previewX = useSpring(mouseX, { damping: 30, stiffness: 280, mass: 0.5 });
  const previewY = useSpring(mouseY, { damping: 30, stiffness: 280, mass: 0.5 });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Stagger list element fade up reveals
    gsap.from('.work-item-reveal', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'bottom 90%',
        toggleActions: 'play none none none',
      },
      y: 80,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: 'power4.out',
    });

    const handleGlobalMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      id="work"
      className="relative w-full min-h-screen py-[140px] px-[8%] bg-bg-primary z-20"
    >
      <div className="max-w-[1200px] mb-20">
        <span className="font-body text-[11px] font-semibold tracking-[0.3em] text-text-secondary uppercase block mb-5">// WORK GALLERY</span>
        <h2 className="font-display text-4xl md:text-6xl font-semibold leading-tight tracking-tight">
          Presence is the new market share.
        </h2>
      </div>

      <div
        className="border-t border-border-custom max-w-[1600px] mx-auto relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setActiveProject(null);
        }}
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className="work-item-reveal border-b border-border-custom py-[50px] hover:py-[65px] flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group"
            onMouseEnter={() => setActiveProject(project)}
          >
            <div className="font-display text-lg font-medium text-text-tertiary mr-10 select-none">
              {project.num}
            </div>

            <div className="flex-grow select-none group-hover:translate-x-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
              <h3 className="font-display text-3xl md:text-5xl lg:text-[5.5rem] font-semibold leading-none tracking-tight group-hover:text-accent transition-colors duration-300">
                {project.title}
              </h3>
              <p className="font-body text-sm md:text-[15px] text-text-secondary mt-3">
                {project.category}
              </p>
            </div>

            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-text-secondary transition-all duration-500 group-hover:bg-text-primary group-hover:border-text-primary group-hover:text-bg-primary group-hover:scale-110">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 group-hover:rotate-45 transition-transform duration-500">
                <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        ))}

        {/* Floating preview box */}
        <AnimatePresence>
          {isHovered && activeProject && (
            <motion.div
              className="fixed w-[380px] h-[240px] pointer-events-none z-30 rounded-xl overflow-hidden shadow-2xl origin-center"
              style={{
                left: previewX,
                top: previewY,
                x: '-50%',
                y: '-50%',
              }}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="relative w-full h-full bg-[#121212]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
