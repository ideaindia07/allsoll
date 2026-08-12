'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { SERVICES } from '@/lib/services';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const spans = [
  'md:col-span-7',
  'md:col-span-5',
  'md:col-span-4',
  'md:col-span-8',
  'md:col-span-6',
  'md:col-span-6',
];

type ServicesGridProps = {
  eyebrow?: string;
  heading?: string;
  id?: string;
};

export default function ServicesGrid({
  eyebrow = '// What We Do',
  heading = 'Full-spectrum brand orchestration.',
  id = 'services',
}: ServicesGridProps) {
  return (
    <section id={id} className="relative w-full overflow-hidden bg-bg-primary py-28 md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-accent/8 blur-[140px]"
      />

      <div className="relative mx-auto max-w-[1800px] px-[6%] md:px-[8%]">
        <div className="mb-14 flex flex-col gap-8 md:mb-20 md:flex-row md:items-end md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease }}
            className="max-w-[640px]"
          >
            <span className="mb-5 block font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
              {eyebrow}
            </span>
            <h2 className="font-display text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-[3.4rem]">
              {heading}
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
            className="max-w-[360px] font-body text-[15px] leading-relaxed text-text-secondary"
          >
            Six practices. One system of presence. Open any discipline to see how we build it.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-4">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.06, ease }}
              className={spans[i]}
            >
              <Link
                href={`/services/${service.slug}`}
                className="group relative flex h-full min-h-[240px] flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 md:min-h-[280px] md:p-9"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-4 -top-8 font-display text-[7.5rem] font-bold leading-none tracking-tighter text-white/[0.035] transition-colors duration-500 group-hover:text-white/[0.07] md:text-[9rem]"
                >
                  {service.num}
                </span>
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(120% 80% at 100% 0%, ${service.accent}22, transparent 55%)`,
                  }}
                />
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                />

                <div className="relative z-10 flex items-start justify-between gap-4">
                  <span className="font-body text-[11px] font-bold tracking-[0.22em] text-accent">
                    {service.num}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-black">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>

                <div className="relative z-10 mt-10">
                  <h3 className="mb-3 max-w-[18ch] font-display text-2xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-accent md:text-[1.7rem]">
                    {service.title}
                  </h3>
                  <p className="max-w-[38ch] font-body text-sm leading-relaxed text-text-secondary">
                    {service.desc}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40 transition-colors duration-300 group-hover:text-accent">
                    Explore
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
