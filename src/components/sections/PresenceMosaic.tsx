'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

// Edit this array to change images, copy, or layout classes (t1..t5 control
// size/rotation in the CSS below). Put real image files in /public/assets.
const ADS = [
  {
    id: 'designers',
    className: 't1',
    src: '/Ads_4.png',
    textBox: '/Text Box_4.png',
    alt: 'Designers vs Clients',
    title: 'Perspective',
    desc: "Designers and clients don't always see eye to eye — the best work happens when both sides learn to look through the same lens.",
  },
  {
    id: 'brand',
    className: 't2',
    src: '/Ads_1.png',
    textBox: '/Text Box_1.png',
    alt: 'Be the Brand',
    title: 'Visibility',
    desc: 'Be the brand they all notice in the crowd — powered by creative excellence and a strategy built to stand out.',
  },
  {
    id: 'ctrl',
    className: 't3',
    src: '/Ads_2.png',
    textBox: '/Text Box_2.png',
    alt: 'Brand Chaos Under Ctrl',
    title: 'Control',
    desc: 'Your brand chaos is under Ctrl — structured strategy turns scattered messaging into one clear voice.',
  },
  {
    id: 'person',
    className: 't4',
    src: '/Ads_3.png',
    textBox: '/Text Box_3.png',
    alt: 'If Your Brand Was A Person',
    title: 'Personality',
    desc: "If your brand was a person, who would it be? People don't connect with brands — they connect with personalities.",
  },
  {
    id: 'adore',
    className: 't5',
    src: '/Ads_5.png',
    textBox: '/Text Box_5.png',
    alt: 'Adore Campaign',
    title: 'Elegance',
    desc: 'Timeless, editorial, unmistakable — a print campaign built to be adored at first glance.',
  },
];

export default function PresenceMosaic() {
  const mosaicRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const trustRef = useRef<HTMLDivElement>(null);
  const restRect = useRef<any>(null);
  const resizeHandler = useRef<any>(null);

  const [activeId, setActiveId] = useState<string | null>(null);
  const active = ADS.find((a) => a.id === activeId) || null;

  const isMobile = () => window.innerWidth <= 900;

  function open(ad: any) {
    if (activeId) return;
    const tile = tileRefs.current[ad.id];
    if (!tile) return;
    const rect = tile.getBoundingClientRect();
    const cs = getComputedStyle(tile).transform;
    restRect.current = {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      transform: cs === 'none' ? 'none' : cs,
    };

    tile.style.top = rect.top + 'px';
    tile.style.left = rect.left + 'px';
    tile.style.width = rect.width + 'px';
    tile.style.height = rect.height + 'px';
    tile.style.transform = restRect.current.transform;
    tile.classList.add('flying');

    if (mosaicRef.current) mosaicRef.current.classList.add('active');
    if (backdropRef.current) backdropRef.current.classList.add('show');

    void tile.offsetWidth; // force reflow
    tile.style.transform = 'none';

    const targetH = isMobile() ? window.innerHeight * 0.42 : Math.min(window.innerHeight * 0.62, 480);
    const targetW = targetH * (rect.width / rect.height);
    const targetLeft = isMobile() ? (window.innerWidth - targetW) / 2 : window.innerWidth / 2 - targetW - 40;
    const targetTop = isMobile() ? window.innerHeight * 0.12 : (window.innerHeight - targetH) / 2;

    requestAnimationFrame(() => {
      tile.style.top = targetTop + 'px';
      tile.style.left = targetLeft + 'px';
      tile.style.width = targetW + 'px';
      tile.style.height = targetH + 'px';
    });

    setActiveId(ad.id);

    // position the trust card once it's mounted (see useEffect below)
    resizeHandler.current = () => placeTrustCard(targetLeft, targetW);
  }

  function placeTrustCard(targetLeft: number, targetW: number) {
    const wrap = trustRef.current;
    if (!wrap) return;
    if (isMobile()) return; // mobile positions via CSS
    wrap.style.left = targetLeft + targetW + 40 + 'px';
    wrap.style.top = window.innerHeight / 2 + 'px';
  }

  useEffect(() => {
    if (!activeId) return;
    // trust card just mounted — place it, then fade it in
    const wrap = trustRef.current;
    if (resizeHandler.current) resizeHandler.current();
    requestAnimationFrame(() => wrap && wrap.classList.add('show'));
    if (resizeHandler.current) {
      window.addEventListener('resize', resizeHandler.current);
      return () => window.removeEventListener('resize', resizeHandler.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  function close() {
    if (!activeId) return;
    const tile = tileRefs.current[activeId];
    const wrap = trustRef.current;

    if (wrap) wrap.classList.remove('show');
    if (backdropRef.current) backdropRef.current.classList.remove('show');

    if (!tile) return;
    const r = restRect.current;
    tile.style.top = r.top + 'px';
    tile.style.left = r.left + 'px';
    tile.style.width = r.width + 'px';
    tile.style.height = r.height + 'px';
    tile.style.transform = r.transform;

    if (mosaicRef.current) mosaicRef.current.classList.remove('active');

    const onEnd = (e: any) => {
      if (e.target !== tile || e.propertyName !== 'left') return;
      tile.classList.remove('flying');
      tile.style.top = '';
      tile.style.left = '';
      tile.style.width = '';
      tile.style.height = '';
      tile.style.transform = '';
      tile.removeEventListener('transitionend', onEnd);
      setActiveId(null);
    };
    tile.addEventListener('transitionend', onEnd);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  return (
    <section className="presence">
      <h1>Presence is the new Market</h1>

      <div className="copy">
        <p>
          We share our expertise on effective strategies and techniques to help you learn digital
          marketing in easy way. Whether you&apos;re a digital pro or just getting started, our blog
          is your go-to guide for practical tips, cool ideas, and the latest trends in digital
          marketing. We share our expertise on effective strategies and techniques to help you learn
          digital marketing in easy way.
        </p>
        <p>
          Whether you&apos;re a digital pro or just getting started, our blog is your go-to guide for
          practical tips, cool ideas, and the latest trends in digital marketing.
        </p>
      </div>

      <div className="mosaic" ref={mosaicRef}>
        {ADS.map((ad) => (
          <div
            key={ad.id}
            ref={(el) => {
              tileRefs.current[ad.id] = el;
            }}
            className={`tile ${ad.className}`}
            onClick={() => open(ad)}
          >
            <Image src={ad.src} alt={ad.alt} fill sizes="50vw" style={{ objectFit: 'cover' }} />
          </div>
        ))}
      </div>

      <div className="backdrop" ref={backdropRef} onClick={close} />

      {active && (
        <div className="trust-wrap" ref={trustRef}>
          <div className="trust-card relative">
            <Image 
              src={active.textBox} 
              alt={active.title} 
              width={400} 
              height={400} 
              className="w-full h-auto drop-shadow-2xl" 
            />
            {/* Transparent overlay for Download button */}
            <a 
              href="#" 
              onClick={(e) => e.stopPropagation()}
              className="absolute left-0 bottom-0 w-[60%] h-[25%] z-20 cursor-pointer"
              title="Download"
            ></a>
            {/* Transparent overlay for Close button - Made larger and stopProp so it doesn't fail */}
            <button 
              className="absolute right-0 bottom-0 w-[40%] h-[30%] z-20 cursor-pointer" 
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              title="Close"
              aria-label="Close"
            ></button>
          </div>
        </div>
      )}

      <style jsx>{`
        .presence {
          max-width: 1400px;
          margin: 0 auto;
          padding: 48px 48px 90px;
          background: #000;
          color: #f2f1ed;
          overflow-x: hidden;
        }
        .rule {
          border: none;
          border-top: 1px solid rgba(242, 241, 237, 0.35);
          margin: 0 0 46px;
        }
        h1 {
          font-family: var(--font-caveat), cursive;
          font-weight: 700;
          font-size: clamp(38px, 4vw, 54px);
          margin: 0 0 34px;
        }
        .copy {
          display: flex;
          gap: 60px;
          margin-bottom: 56px;
        }
        .copy p {
          flex: 1;
          margin: 0;
          font-size: 14.5px;
          line-height: 1.75;
          max-width: 480px;
        }
        .mosaic {
          position: relative;
          width: 1000px;
          height: 660px;
          margin: 0 auto;
        }
        .tile {
          position: absolute;
          cursor: pointer;
          border-radius: 2px;
          overflow: hidden;
          box-shadow: 0 18px 34px rgba(0, 0, 0, 0.55);
          transition: transform 0.35s ease, box-shadow 0.35s ease, filter 0.5s ease;
          background: #111;
        }
        .mosaic.active :global(.tile:not(.flying)) {
          pointer-events: none;
        }
        .tile:hover {
          transform: translateY(-6px) scale(1.015);
          box-shadow: 0 24px 44px rgba(0, 0, 0, 0.6);
          z-index: 10 !important;
        }
        /* t1 = designers (bottom-mid) */
        .tile.t1 { left: 300px; bottom: 0; width: 320px; height: 320px; z-index: 2; }
        /* t2 = brand (top-mid) */
        .tile.t2 { left: 300px; top: 0; width: 320px; height: 320px; z-index: 3; }
        /* t3 = ctrl (top-right) */
        .tile.t3 { left: 640px; top: 0; width: 340px; height: 410px; z-index: 2; }
        /* t4 = person (bottom-left) */
        .tile.t4 { left: 0; bottom: 0; width: 280px; height: 340px; z-index: 1; }
        /* t5 = adore (bottom-right) */
        .tile.t5 { left: 640px; bottom: 0; width: 340px; height: 230px; z-index: 1; }

        :global(.tile.flying) {
          position: fixed !important;
          z-index: 70;
          transition: top 0.55s cubic-bezier(0.2, 0.8, 0.2, 1), left 0.55s cubic-bezier(0.2, 0.8, 0.2, 1),
            width 0.55s cubic-bezier(0.2, 0.8, 0.2, 1), height 0.55s cubic-bezier(0.2, 0.8, 0.2, 1),
            transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1);
          filter: none !important;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.7);
        }
        .backdrop {
          position: fixed;
          inset: 0;
          background: transparent;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.4s ease;
          z-index: 60;
        }
        :global(.backdrop.show) {
          opacity: 1;
          pointer-events: auto;
        }
        .trust-wrap {
          position: fixed;
          z-index: 71;
          width: 280px;
          opacity: 0;
          transform: translate(-16px, -50%);
          transition: opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s;
          pointer-events: none;
        }
        :global(.trust-wrap.show) {
          opacity: 1;
          transform: translate(0, -50%);
          pointer-events: auto;
        }
        .trust-card {
          position: relative;
          background: transparent;
          border-radius: 0;
          padding: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            transition: none !important;
          }
        }
        @media (max-width: 900px) {
          .presence { padding: 32px 22px 70px; }
          .copy { flex-direction: column; gap: 20px; }
          .mosaic { 
            width: 100%; 
            height: auto; 
            display: flex; 
            flex-direction: column; 
            gap: 16px; 
          }
          .tile {
            position: relative !important;
            left: 0 !important;
            top: 0 !important;
            bottom: auto !important;
            width: 100% !important;
            height: 300px !important;
          }
          .trust-wrap {
            width: min(84vw, 300px);
            left: 8vw !important;
            top: auto !important;
            bottom: 22px;
            transform: translateY(20px) !important;
          }
          :global(.trust-wrap.show) {
            transform: translateY(0) !important;
          }
        }
      `}</style>
    </section>
  );
}
