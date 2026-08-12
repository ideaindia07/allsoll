'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SmoothScroll from '@/components/ui/SmoothScroll';
import ServicesGrid from '@/components/sections/ServicesGrid';
import { SERVICES, getAdjacentServices, type Service } from '@/lib/services';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ServicesIndexPage() {
  return (
    <SmoothScroll>
      <Header />
      <main className="relative w-full overflow-x-hidden bg-bg-primary">
        <section className="relative px-[6%] pb-8 pt-36 md:px-[8%] md:pt-44">
          <div className="mx-auto max-w-[1800px]">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="mb-6 block font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-accent"
            >
              // Services
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.05, ease }}
              className="max-w-[18ch] font-display text-5xl font-bold leading-[0.95] tracking-tighter md:text-7xl lg:text-[5.5rem]"
            >
              Six disciplines.
              <span className="mt-2 block text-accent">One presence system.</span>
            </motion.h1>
          </div>
        </section>
        <ServicesGrid eyebrow="// The Practice" heading="Choose a discipline." id="practice" />
      </main>
      <Footer />
    </SmoothScroll>
  );
}

export function ServiceDetailPage({ service }: { service: Service }) {
  const { prev, next } = getAdjacentServices(service.slug);

  return (
    <SmoothScroll>
      <Header />
      <main className="relative w-full overflow-x-hidden bg-bg-primary">
        <section className="relative min-h-[72vh] px-[6%] pb-20 pt-36 md:px-[8%] md:pt-44">
          <div
            aria-hidden
            className="pointer-events-none absolute right-[-8%] top-20 h-[480px] w-[480px] rounded-full blur-[160px]"
            style={{ background: `${service.accent}18` }}
          />

          <div className="relative mx-auto max-w-[1800px]">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="mb-10 flex items-center gap-3 font-body text-[11px] uppercase tracking-[0.22em] text-text-tertiary"
            >
              <Link href="/services" className="hover:text-accent">
                Services
              </Link>
              <span>/</span>
              <span className="text-text-secondary">{service.shortTitle}</span>
            </motion.div>

            <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-[1.15fr_0.85fr]">
              <div>
                <motion.span
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 block font-body text-[12px] font-bold tracking-[0.28em] text-accent"
                >
                  {service.num} — {service.title}
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, ease }}
                  className="max-w-[18ch] font-display text-4xl font-bold leading-[1.02] tracking-tighter md:text-6xl lg:text-[4.4rem]"
                >
                  {service.headline}
                </motion.h1>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border-custom px-[6%] py-24 md:px-[8%] md:py-32">
          <div className="mx-auto max-w-[820px]">
            <div className="flex flex-col gap-8">
              {service.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="font-body text-lg leading-[1.75] text-text-secondary md:text-[1.2rem]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        {service.faqs.length > 0 && (
          <section className="border-t border-border-custom px-[6%] py-24 md:px-[8%] md:py-32">
            <div className="mx-auto max-w-[820px]">
              <span className="mb-4 block font-body text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
                // FAQs
              </span>
              <h2 className="mb-12 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                Questions, answered.
              </h2>
              <div className="divide-y divide-white/10 border-t border-white/10">
                {service.faqs.map((faq) => (
                  <FaqItem key={faq.q} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="px-[6%] pb-28 text-center md:px-[8%]">
          <h2 className="mx-auto mb-8 max-w-[22ch] font-display text-3xl font-bold tracking-tighter md:text-5xl">
            {service.cta}
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-12 py-5 font-body text-base font-medium tracking-wide transition-all duration-300 hover:border-accent hover:bg-accent hover:text-bg-primary"
          >
            Start a conversation
          </Link>
        </section>

        <nav className="border-t border-border-custom">
          <div className="mx-auto grid max-w-[1800px] grid-cols-1 md:grid-cols-2">
            {prev && (
              <Link
                href={`/services/${prev.slug}`}
                className="group border-b border-border-custom px-[6%] py-12 md:border-b-0 md:border-r md:px-12 lg:px-16"
              >
                <span className="mb-3 block font-body text-[11px] uppercase tracking-[0.22em] text-text-tertiary">
                  Previous
                </span>
                <span className="font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent md:text-3xl">
                  {prev.title}
                </span>
              </Link>
            )}
            {next && (
              <Link
                href={`/services/${next.slug}`}
                className="group px-[6%] py-12 text-left md:px-12 md:text-right lg:px-16"
              >
                <span className="mb-3 block font-body text-[11px] uppercase tracking-[0.22em] text-text-tertiary">
                  Next
                </span>
                <span className="font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent md:text-3xl">
                  {next.title}
                </span>
              </Link>
            )}
          </div>
        </nav>

        <section className="border-t border-border-custom px-[6%] py-16 md:px-[8%]">
          <div className="mx-auto flex max-w-[1800px] flex-wrap gap-3">
            {SERVICES.filter((s) => s.slug !== service.slug).map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="rounded-full border border-white/12 px-4 py-2 font-body text-xs tracking-wide text-text-secondary transition-colors hover:border-accent hover:text-accent"
              >
                {s.num} {s.shortTitle}
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </SmoothScroll>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-6 py-6 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-lg font-medium tracking-tight md:text-xl">
          {question}
        </span>
        <span
          className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/15 text-sm transition-transform duration-300 ${open ? 'rotate-45 border-accent text-accent' : 'text-white/60'}`}
          aria-hidden
        >
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 font-body text-base leading-relaxed text-text-secondary">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
