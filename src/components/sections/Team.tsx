'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

interface Member {
  name: string;
  role: string;
  img: string;
  bio: string;
}

const teamData: Member[] = [
  {
    name: 'Shree Verma',
    role: 'Founder & Presence Strategist',
    img: '/team_shree.png',
    bio: 'Pioneering presence architecture to build long-term, indestructible digital authority.',
  },
  {
    name: 'Arjun Mehta',
    role: 'Head of Digital PR',
    img: '/team_arjun.png',
    bio: 'Positioning brands at the epicenter of public discussions and mainstream media attention.',
  },
  {
    name: 'Sofia Rao',
    role: 'Creative Director',
    img: '/team_sofia.png',
    bio: 'Directing cinematic guidelines across platforms to evoke luxury perception at first glance.',
  },
  {
    name: 'Leo Martins',
    role: 'Influence & Partnerships',
    img: '/team_leo.png',
    bio: 'Bridging creators and active networks to orchestrate raw, peer-to-peer brand advocacy.',
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
      stagger: 0.12,
      ease: 'power4.out',
    });
  }, []);

  return (
    <section
      ref={containerRef}
      id="team"
      className="relative w-full py-24 md:py-36 bg-[#0A0A0A] z-20"
    >
      <div className="max-w-[1800px] mx-auto px-[8%]">
        {/* Header Block */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6 select-none">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent font-bold mb-4">
              // Our Team
            </p>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter max-w-2xl text-white">
              The Architects of <span className="text-accent">Presence.</span>
            </h2>
          </div>
          <p className="text-text-secondary max-w-sm text-sm leading-relaxed">
            A collective of strategists, storytellers and technologists engineering omnipresence.
          </p>
        </div>

        {/* Mapped Team Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1600px] mx-auto">
          {teamData.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="team-card-item group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-white/[0.01]"
            >
              {/* Image Overlay */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={member.img}
                alt={member.name}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 scale-105 group-hover:scale-110 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent pointer-events-none z-10" />

              {/* Hover Bio and Identity Details */}
              <div className="absolute bottom-0 left-0 p-5 md:p-6 w-full translate-y-3 group-hover:translate-y-0 transition-transform duration-500 z-20 select-none">
                <h3 className="font-display text-lg md:text-xl font-semibold text-white">
                  {member.name}
                </h3>
                <p className="text-xs text-accent mt-1 uppercase tracking-wider font-semibold">
                  {member.role}
                </p>
                <div className="h-0 opacity-0 overflow-hidden group-hover:h-[60px] group-hover:opacity-100 group-hover:mt-3 transition-all duration-500 ease-out">
                  <p className="font-body text-xs text-text-secondary leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
