'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';

const basePath = '';

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
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const restRect = useRef<any>(null);
  const resizeHandler = useRef<any>(null);

  const [activeId, setActiveId] = useState<string | null>(null);
  const active = ADS.find((a) => a.id === activeId) || null;

  // Ref to store previous focus to restore after modal closes
  const prevFocusRef = useRef<HTMLElement | null>(null);

  // Ref to store scroll lock state
  const scrollLockRef = useRef<{
    scrollY: number;
    overflow: string;
    bodyOverflow: string;
    paddingRight: string;
  } | null>(null);

  const isMobile = () => typeof window !== 'undefined' && window.innerWidth <= 900;

  function lockScroll() {
    if (typeof window === 'undefined' || scrollLockRef.current) return;
    const scrollY = window.scrollY;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    scrollLockRef.current = {
      scrollY,
      overflow: document.documentElement.style.overflow,
      bodyOverflow: document.body.style.overflow,
      paddingRight: document.body.style.paddingRight,
    };

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  }

  function unlockScroll() {
    if (typeof window === 'undefined' || !scrollLockRef.current) return;
    
    document.documentElement.style.overflow = scrollLockRef.current.overflow;
    document.body.style.overflow = scrollLockRef.current.bodyOverflow;
    document.body.style.paddingRight = scrollLockRef.current.paddingRight;
    
    window.scrollTo(0, scrollLockRef.current.scrollY);
    scrollLockRef.current = null;
  }

  // Cleanup scroll lock on unmount
  useEffect(() => {
    return () => {
      unlockScroll();
    };
  }, []);

  // Globally prevent wheel/touch scroll (specifically for smooth scrollers like Lenis)
  useEffect(() => {
    if (!activeId) return;
    const preventScroll = (e: Event) => {
       e.preventDefault();
    };
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    return () => {
       window.removeEventListener('wheel', preventScroll);
       window.removeEventListener('touchmove', preventScroll);
    };
  }, [activeId]);

  function open(ad: any) {
    if (activeId) return; // Do not allow another tile to open while one is active
    const tile = tileRefs.current[ad.id];
    if (!tile) return;

    prevFocusRef.current = document.activeElement as HTMLElement;

    lockScroll();

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

    // Calculate dimensions
    const mobile = isMobile();
    
    let targetH, targetW, targetLeft, targetTop, trustW;
    const aspect = rect.width / rect.height;

    if (mobile) {
      // Mobile: Image above text box, fit within viewport vertically
      const paddingY = 40;
      const availableH = window.innerHeight - paddingY * 2;
      
      // Assume text box takes roughly 300px height or similar on mobile
      const textH = 260;
      targetH = Math.min(availableH - textH - 20, window.innerHeight * 0.4);
      targetW = targetH * aspect;

      // Ensure width doesn't exceed screen
      if (targetW > window.innerWidth * 0.85) {
        targetW = window.innerWidth * 0.85;
        targetH = targetW / aspect;
      }

      targetLeft = (window.innerWidth - targetW) / 2;
      targetTop = paddingY + (availableH - (targetH + 20 + textH)) / 2;
      if (targetTop < paddingY) targetTop = paddingY;

    } else {
      // Desktop: Center the composition (Image + Gap + TextBox)
      trustW = 280;
      const gap = 40;
      
      targetH = Math.min(window.innerHeight * 0.65, 520);
      targetW = targetH * aspect;
      
      // Ensure the whole composition fits horizontally
      let totalW = targetW + gap + trustW;
      if (totalW > window.innerWidth * 0.9) {
        targetW = window.innerWidth * 0.9 - gap - trustW;
        targetH = targetW / aspect;
        totalW = targetW + gap + trustW;
      }

      const startX = (window.innerWidth - totalW) / 2;
      targetLeft = startX;
      targetTop = (window.innerHeight - targetH) / 2;
    }

    requestAnimationFrame(() => {
      tile.style.top = targetTop + 'px';
      tile.style.left = targetLeft + 'px';
      tile.style.width = targetW + 'px';
      tile.style.height = targetH + 'px';
    });

    setActiveId(ad.id);

    // position the trust card
    resizeHandler.current = () => placeTrustCard(targetLeft, targetW, targetTop, targetH);
  }

  function placeTrustCard(targetLeft: number, targetW: number, targetTop: number, targetH: number) {
    const wrap = trustRef.current;
    if (!wrap) return;
    if (isMobile()) {
       wrap.style.left = '50%';
       wrap.style.top = (targetTop + targetH + 20) + 'px';
       wrap.style.transform = 'translate(-50%, 0)';
    } else {
       wrap.style.left = targetLeft + targetW + 40 + 'px';
       wrap.style.top = window.innerHeight / 2 + 'px';
       wrap.style.transform = 'translate(0, -50%)';
    }
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

  // Focus trap / focus management
  useEffect(() => {
    if (activeId && closeButtonRef.current) {
       // A small timeout ensures the element is fully mounted and focusable
       setTimeout(() => closeButtonRef.current?.focus(), 100);
    }
  }, [activeId]);

  function close() {
    if (!activeId) return;
    const tile = tileRefs.current[activeId];
    const wrap = trustRef.current;

    if (wrap) wrap.classList.remove('show');
    if (backdropRef.current) backdropRef.current.classList.remove('show');

    if (!tile) {
       setActiveId(null);
       unlockScroll();
       return;
    }
    
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
      unlockScroll();
      
      if (prevFocusRef.current) {
         prevFocusRef.current.focus();
      }
    };
    tile.addEventListener('transitionend', onEnd);
  }

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
            role="button"
            tabIndex={0}
            onClick={() => {
              if (activeId === ad.id) close();
              else open(ad);
            }}
            onKeyDown={(e) => {
               if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  open(ad);
               }
            }}
            aria-label={`Open ${ad.title}`}
          >
            <Image src={`${basePath}${encodeURI(ad.src)}`} alt={ad.alt} fill sizes="50vw" style={{ objectFit: 'cover' }} />
            <div className="hover-overlay" aria-hidden="true">
              <span>Click to view</span>
            </div>
          </div>
        ))}
      </div>

      <div className="backdrop" ref={backdropRef} aria-hidden="true" onClick={close} />

      {active && (
        <div 
          className="trust-wrap" 
          ref={trustRef}
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={close}
        >
          <div className="trust-card relative" onClick={(e) => e.stopPropagation()}>
            <Image 
              src={`${basePath}${encodeURI(active.textBox)}`} 
              alt={`${active.title} Text Box`} 
              width={400} 
              height={400} 
              className="w-full h-auto drop-shadow-2xl" 
            />
            {/* Transparent overlay for Download button */}
            <button 
              type="button"
              className="absolute left-[10%] bottom-[8%] w-[50%] h-[18%] z-[75] cursor-pointer outline-none"
              title="Download"
              aria-label="Download"
              onClick={(e) => {
                 e.stopPropagation();
                 // Add real download logic later
                 console.log("Download clicked");
              }}
            ></button>
            {/* Transparent overlay for Close button */}
            <button 
              ref={closeButtonRef}
              type="button"
              className="absolute right-[5%] bottom-[5%] w-[25%] h-[25%] z-[75] cursor-pointer rounded-full outline-none" 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                close();
              }}
              title="Close"
              aria-label="Close active image"
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
        h1 {
          font-family: var(--font-caveat), cursive;
          font-weight: 700;
          font-size: clamp(38px, 4vw, 54px);
          margin: 0 0 40px;
        }
        .copy {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 80px;
          margin-bottom: 80px;
          padding-top: 40px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .copy p {
          margin: 0;
          font-size: 18px;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.75);
          font-weight: 300;
          max-width: 600px;
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
          transform: scale(1.015);
          box-shadow: 0 24px 44px rgba(0, 0, 0, 0.6);
        }
        .hover-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 10;
        }
        .hover-overlay span {
          color: white;
          font-family: inherit;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 8px 18px;
          border: 1px solid rgba(255, 255, 255, 0.6);
          border-radius: 30px;
          backdrop-filter: blur(4px);
          transform: translateY(10px);
          transition: transform 0.3s ease, background-color 0.3s ease;
        }
        .tile:hover .hover-overlay {
          opacity: 1;
        }
        .tile:hover .hover-overlay span {
          transform: translateY(0);
          background-color: rgba(0, 0, 0, 0.2);
        }
        :global(.tile.flying) .hover-overlay {
          opacity: 0 !important;
          transition: none;
        }
        .tile.t1 { left: 300px; bottom: 0; width: 320px; height: 320px; z-index: 2; }
        .tile.t2 { left: 300px; top: 0; width: 320px; height: 320px; z-index: 3; }
        .tile.t3 { left: 640px; top: 0; width: 340px; height: 410px; z-index: 2; }
        .tile.t4 { left: 0; bottom: 0; width: 280px; height: 340px; z-index: 1; }
        .tile.t5 { left: 640px; bottom: 0; width: 340px; height: 230px; z-index: 1; }

        :global(.tile.flying) {
          position: fixed !important;
          z-index: 70 !important;
          transition: top 0.55s cubic-bezier(0.2, 0.8, 0.2, 1), left 0.55s cubic-bezier(0.2, 0.8, 0.2, 1),
            width 0.55s cubic-bezier(0.2, 0.8, 0.2, 1), height 0.55s cubic-bezier(0.2, 0.8, 0.2, 1),
            transform 0.55s cubic-bezier(0.2, 0.8, 0.2, 1) !important;
          filter: none !important;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.7) !important;
        }
        .backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
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
          transition: opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s;
          pointer-events: none;
        }
        :global(.trust-wrap.show) {
          opacity: 1;
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
          .copy { 
            grid-template-columns: 1fr; 
            gap: 28px; 
            padding-top: 24px;
            margin-bottom: 50px;
          }
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
          }
        }
      `}</style>
    </section>
  );
}
