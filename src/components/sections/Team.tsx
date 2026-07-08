'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Member {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

const teamData: Member[] = [
  {
    id: 'nik',
    name: 'Nikita S.',
    role: 'Founder & Chief Presence Architect',
    bio: 'Designing digital environments for high-growth tech platforms and global luxury houses.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop',
  },
  {
    id: 'alex',
    name: 'Alexander V.',
    role: 'Creative Director & Visual Storyteller',
    bio: 'Leading the aesthetic guidelines across media assets, interactive design, and styling.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 'sophia',
    name: 'Sophia M.',
    role: 'VP of Creator Networks & Influence',
    bio: 'Connecting key disruptors with creator networks and active online communities.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop',
  },
];

export default function Team() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.team-card-item', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      y: 80,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power4.out',
    });
  }, []);

  return (
    <section
      ref={containerRef}
      id="team"
      className="relative w-full py-40 px-[8%] bg-bg-primary z-20"
    >
      <div className="max-w-[1200px] mb-20">
        <span className="font-body text-[11px] font-semibold tracking-[0.3em] text-text-secondary uppercase block mb-5">
          // MINDS BEHIND THE SYSTEM
        </span>
        <h2 className="font-display text-4xl md:text-6xl font-semibold leading-tight tracking-tight text-white">
          The Architects of Omnipresence
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-[1600px] mx-auto">
        {teamData.map((member) => (
          <div
            key={member.id}
            className="team-card-item group border border-border-custom hover:border-accent/30 bg-white/[0.01] rounded-3xl p-6 flex flex-col transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[10px]"
          >
            {/* Card image container */}
            <div className="w-full aspect-[4/5] relative overflow-hidden rounded-2xl mb-8">
              <img
                src={member.image}
                alt={member.name}
                className="absolute top-0 left-0 w-full h-full object-cover grayscale opacity-100 group-hover:scale-105 group-hover:opacity-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
              <img
                src={member.image}
                alt={`${member.name} Color`}
                className="absolute top-0 left-0 w-full h-full object-cover scale-100 opacity-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
              {/* Bottom gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/95 via-transparent to-transparent pointer-events-none z-10" />
            </div>

            {/* Info contents */}
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-semibold leading-none tracking-tight mb-2 group-hover:text-accent transition-colors duration-300">
                {member.name}
              </h3>
              <p className="font-body text-[13px] md:text-[14px] text-text-secondary font-medium uppercase tracking-wider mb-6">
                {member.role}
              </p>
              
              {/* Expandable bio panel */}
              <div className="h-0 opacity-0 overflow-hidden border-t border-border-custom group-hover:h-[75px] group-hover:opacity-100 group-hover:pt-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                <p className="font-body text-sm leading-relaxed text-text-secondary">
                  {member.bio}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
