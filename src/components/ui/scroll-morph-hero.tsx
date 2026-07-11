"use client";

import { motion } from "framer-motion";

// ─── Real client logos from /public ──────────────────────────────────────────
const LOGOS = [
  "/BharatVenture Logo.png",
  "/Fair BNB logo.png",
  "/Infinity Logo white.png",
  "/Panacea logo.png",
  "/SAS logo.png",
];

// Cycle logos to fill all 10 cards
const IMAGES = Array.from({ length: 10 }, (_, i) => LOGOS[i % LOGOS.length]);
const TOTAL = IMAGES.length;

// ─── Responsive ellipse radii (set via CSS var below, overridden on mobile) ──
const CARD_W = 130;
const CARD_H = 180;
const RX = 500; // horizontal radius — wide ellipse
const RY = 90;  // vertical squish → depth illusion

// ─── Carousel ─────────────────────────────────────────────────────────────────
export default function EllipseCarousel({
  scrollProgress,
  isMobile = false,
}: {
  scrollProgress: number;
  isMobile?: boolean;
}) {
  const rx = isMobile ? 200 : RX;
  const ry = isMobile ? 50 : RY;
  const cardW = isMobile ? 90 : CARD_W;
  const cardH = isMobile ? 120 : CARD_H;

  const baseAngleDeg = scrollProgress * 360;

  const cards = Array.from({ length: TOTAL }, (_, i) => {
    const angleDeg = baseAngleDeg + (i / TOTAL) * 360;
    const angleRad = (angleDeg * Math.PI) / 180;
    const x = Math.sin(angleRad) * rx;
    const y = Math.cos(angleRad) * ry;
    const depthT = (y + ry) / (2 * ry); // 0 = back, 1 = front
    const scale = 0.5 + depthT * 0.7;   // 0.5 … 1.2
    const zIndex = Math.round(depthT * 100);
    return { i, x, y, scale, zIndex, depthT };
  });

  const sorted = [...cards].sort((a, b) => a.zIndex - b.zIndex);

  return (
    <div
      className="relative w-full h-full flex items-center justify-center"
      style={{ paddingTop: isMobile ? "30%" : "18%" }}
    >
      {sorted.map(({ i, x, y, scale, zIndex, depthT }) => (
        <motion.div
          key={i}
          className="absolute cursor-pointer group"
          animate={{ x, y: y * 2.2, scale, opacity: 0.3 + depthT * 0.7 }}
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
          style={{ zIndex, width: cardW, height: cardH }}
        >
          <motion.div
            className="relative w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
            whileHover={{ rotateY: 180 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
          >
            {/* Front — dark card with logo centered */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border border-white/30 bg-[#0f0f0f] flex items-center justify-center p-4"
              // className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border border-white/60 bg-[#ffffff] flex items-center justify-center p-4"
              style={{ backfaceVisibility: "hidden" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMAGES[i]}
                alt={`client-${i}`}
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-lg"
              />
              {/* subtle vignette */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 group-hover:opacity-0 transition-opacity duration-300 rounded-2xl" />
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 rounded-2xl shadow-2xl bg-[#FFD43B] border border-[#FFD43B]/30 flex flex-col items-center justify-center gap-1"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <p className="text-[10px] font-bold tracking-[0.25em] text-[#090909] uppercase">View</p>
              <p className="text-sm font-semibold text-[#090909]">Work</p>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
