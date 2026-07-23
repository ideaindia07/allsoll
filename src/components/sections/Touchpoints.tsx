'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const basePath = process.env.NODE_ENV === 'production' ? '/allsoll' : '';

const panelsData = [
  {
    id: 'visibility',
    image: '/Strip_1.png',
  },
  {
    id: 'credibility',
    image: '/Strip_2.png',
  },
  {
    id: 'influence',
    image: '/Strip_3.png',
  },
  {
    id: 'impact',
    image: '/Strip_4.png',
  },
];

export default function Touchpoints() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <section id="services" className="relative w-full min-h-screen bg-bg-primary z-20" />;
  }

  return (
    <section id="services" className="relative w-full bg-bg-primary z-20 py-24 px-6 md:px-12 lg:px-24">
      {/* Centered Text Header */}
      <div className="flex flex-col items-center text-center mb-24 mt-10">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ delay: 0.1 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-[0.95] tracking-tighter text-white"
        >
          Every <span className='text-accent'>Touchpoint</span> <br className="hidden md:block" /> Matters.
        </motion.h2>
      </div>

      {/* Cards in a Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-[1400px] mx-auto pb-20">
        {panelsData.map((panel, index) => (
          <motion.div
            key={panel.id}
            initial={{ opacity: 0, x: 80, y: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="w-full relative rounded-[20px] md:rounded-[30px] overflow-hidden shadow-2xl"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${basePath}${panel.image}`} alt={panel.id} className="w-full h-auto object-cover block" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
