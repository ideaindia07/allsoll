"use client";
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

import card1 from '@/assets/cards/01.png';
import card2 from '@/assets/cards/02.png';
import card3 from '@/assets/cards/03.png';
import card4 from '@/assets/cards/04.png';

const ServicesSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const cards = [
    { id: '01', img: card1, rotate: -2 },
    { id: '02', img: card2, rotate: 2 },
    { id: '03', img: card3, rotate: -1 },
    { id: '04', img: card4, rotate: 3 },
  ];

  return (
    <section ref={containerRef} className="relative bg-black text-[#F5F5F0] py-32 px-6 overflow-hidden">

      {/* Header */}
      <div className="relative max-w-6xl mx-auto text-center mb-24 z-10">
        <h3 className="text-[2.5rem] md:text-[3.5rem] font-serif text-[#F5F5F0] mb-6 tracking-wide relative inline-block">
          Everything Your Business Needs to Be
        </h3>

        <div className="relative inline-block">
          <h2 className="text-[1.5rem] md:text-[3rem] leading-tight text-[#F5F5F0] font-sans font-bold uppercase tracking-widest flex flex-row flex-wrap items-center justify-center gap-3 md:gap-6">
            <span>Built</span>
            <span className="text-[#FEF7CD]">•</span>
            <span>Seen</span>
            <span className="text-[#FEF7CD]">•</span>
            <span>Remembered</span>
          </h2>

          {/* Floating Shapes Decorations (SVG Placeholders) */}
          <motion.div
            style={{ y }}
            className="absolute -top-10 -left-10 md:-left-20 w-16 h-16 md:w-24 md:h-24 text-[#9b87f5]"
          >
            <svg viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 10 L90 90 L10 90 Z" />
            </svg>
          </motion.div>

          <motion.div
            style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
            className="absolute top-10 -right-4 md:-right-16 w-12 h-12 md:w-20 md:h-20 text-[#FEF7CD]"
          >
            <svg viewBox="0 0 100 100" fill="currentColor">
              <circle cx="50" cy="50" r="45" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Cards Scroll Container */}
      <div className="max-w-[1920px] mx-auto px-4 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 50, rotate: card.rotate }}
              whileInView={{ opacity: 1, y: 0, rotate: card.rotate }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 0, transition: { duration: 0.3 } }}
              className="relative group"
            >
              <img
                src={card.img}
                alt={`Service ${card.id}`}
                loading="lazy"
                className="w-full h-auto drop-shadow-xl"
              />
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default ServicesSection;


