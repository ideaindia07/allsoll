'use client';

import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring, motion, useScroll, useTransform } from 'framer-motion';

export function NumberTicker({
  value,
  direction = 'up',
  delay = 0,
  className,
}: {
  value: number;
  direction?: 'up' | 'down';
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === 'down' ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

  useEffect(() => {
    if (isInView) {
      const timeoutId = setTimeout(() => {
        motionValue.set(direction === 'down' ? 0 : value);
      }, delay * 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [motionValue, isInView, delay, value, direction]);

  useEffect(() => {
    return springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat('en-US').format(
          Number(latest.toFixed(0))
        );
      }
    });
  }, [springValue]);

  return <span className={`inline-block tabular-nums ${className || ''}`} ref={ref} />;
}

interface Stat {
  id: string;
  target: number;
  suffix: string;
  label: string;
  description: string;
}

const statsData: Stat[] = [
  {
    id: 'campaigns',
    target: 150,
    suffix: '+',
    label: 'Campaigns Orchestrated',
    description: 'Transforming legacy operations into high-impact digital presence.'
  },
  {
    id: 'impressions',
    target: 50,
    suffix: 'M+',
    label: 'Total Impressions Generated',
    description: 'Creating organic, un-ignorable traction across all key customer nodes.'
  },
  {
    id: 'content',
    target: 500,
    suffix: '+',
    label: 'Premium Content Items',
    description: 'Bespoke editorial assets designed for prestige credibility and influence.'
  },
];

const cinematicEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

function StatRow({ stat, index }: { stat: Stat; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"]
  });

  const yNum = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const yDesc = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const opacityOut = useTransform(scrollYProgress, [0.65, 1], [1, 0]);
  const scaleOut = useTransform(scrollYProgress, [0.65, 1], [1, 0.95]);

  const blockVariants = {
    hidden: { opacity: 0, y: 120, scale: 0.8, filter: 'blur(18px)' },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: cinematicEase }
    }
  };

  const suffixVariants = {
    hidden: { opacity: 0, scale: 0.5, x: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 1, delay: 0.4, ease: cinematicEase }
    }
  };

  const formattedIndex = `0${index + 1} / IMPACT`;

  return (
    <motion.div
      ref={rowRef}
      style={{ opacity: opacityOut, scale: scaleOut }}
      className="relative w-full max-sm:min-h-[15vh] min-h-[45vh] md:min-h-[35vh] flex flex-col justify-center select-none overflow-visible"
    >
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.2, ease: cinematicEase }}
        className="absolute top-0 left-0 w-full h-[1px] bg-white/10 origin-left"
      />

      <div className="flex flex-col max-sm:gap-2 max-sm:py-2 md:flex-row md:items-center justify-between gap-12 md:gap-8 w-full py-16 md:py-0">

        <motion.div
          style={{ y: yNum }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15%" }}
          variants={blockVariants}
          className="font-display text-[22vw] sm:text-[18vw] md:text-[14vw] lg:text-[12vw] font-bold leading-[0.85] tracking-tighter text-white flex items-baseline group"
        >
          <motion.div
            whileHover={{ scale: 1.02, filter: 'brightness(1.1)' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex items-baseline cursor-default"
          >
            <NumberTicker value={stat.target} delay={0.2} />
            <motion.span
              variants={suffixVariants}
              className="text-accent ml-2 md:ml-4 font-light text-[16vw] sm:text-[14vw] md:text-[10vw]"
            >
              {stat.suffix}
            </motion.span>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: yDesc }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15%" }}
          variants={blockVariants}
          className="max-w-[420px] flex flex-col gap-4 md:gap-6 w-full group pt-8 md:pt-0"
        >
          <motion.span
            whileHover={{ scale: 1.02, x: 5 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="font-body text-xs md:text-sm font-bold tracking-[0.3em] text-accent uppercase cursor-default"
          >
            {formattedIndex}
          </motion.span>

          <motion.h3
            whileHover={{ scale: 1.02, x: 5 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight cursor-default"
          >
            {stat.label}
          </motion.h3>

          <motion.p
            whileHover={{ scale: 1.01, filter: 'brightness(1.2)' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="font-body text-base md:text-lg text-white/50 leading-relaxed font-light cursor-default"
          >
            {stat.description}
          </motion.p>
        </motion.div>

      </div>
    </motion.div>
  );
}

export default function ImpactStats() {
  return (
    <section
      id="stats"
      className="relative w-full px-6 md:px-[8%] bg-black z-20"
    >
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />
      <div 
        className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }}
      />
      {/* Checkered background */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none" 
        style={{ 
          backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", 
          backgroundSize: "120px 120px",
          backgroundPosition: "center center"
        }} 
      />

      <div className="max-w-[1600px] mx-auto relative z-10 flex flex-col pt-10 md:pt-10 pb-12">
        {/* Header info */}
        <div className="mb-20 max-sm:mb-4">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-white max-w-[600px]">
            Measurable acceleration. Proven growth metrics.
          </h2>
        </div>
        {statsData.map((stat, index) => (
          <StatRow key={stat.id} stat={stat} index={index} />
        ))}
      </div>
    </section>
  );
}
