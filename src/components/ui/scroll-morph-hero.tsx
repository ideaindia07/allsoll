"use client";

import { motion } from "framer-motion";

const basePath = '';

// ─── Real client logos from /public ──────────────────────────────────────────
const LOGOS = [
  "/Webicon _6(1).jpg",
  "/Webicon_6(2).png",
  "/Webicon_6(3).png",
  "/Webicon_6(4).png",
  "/Webicon_6(5).png",
  "/Webicon_6(6).png",
].map(path => `${basePath}${path}`);

// Use exactly the 6 images
const IMAGES = LOGOS;
const TOTAL = IMAGES.length;

// ─── Responsive ellipse radii (set via CSS var below, overridden on mobile) ──
const CARD_W = 240;
const CARD_H = 240;
const RX = 360; // horizontal radius — wide ellipse
const RY = 90;  // vertical squish → depth illusion

// ─── Carousel ─────────────────────────────────────────────────────────────────
export default function EllipseCarousel({
  scrollProgress,
  isMobile = false,
}: {
  scrollProgress: number;
  isMobile?: boolean;
}) {
  const rx = isMobile ? 130 : RX;
  const ry = isMobile ? 50 : RY;
  const cardW = isMobile ? 120 : CARD_W;
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
      style={{ paddingTop: isMobile ? "10%" : "5%" }}
    >
      {sorted.map(({ i, x, y, scale, zIndex, depthT }) => (
        <motion.div
          key={i}
          className="absolute cursor-pointer group"
          animate={{ x, y: y * 1.8, scale, opacity: 0.3 + depthT * 0.7 }}
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
              className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center"
              style={{ backfaceVisibility: "hidden" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMAGES[i]}
                alt={`client-${i}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* subtle vignette */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 group-hover:opacity-0 transition-opacity duration-300 rounded-2xl" />
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMAGES[i]}
                alt={`client-${i}-back`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 group-hover:opacity-0 transition-opacity duration-300 rounded-2xl" />
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
