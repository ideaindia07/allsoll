"use client";

import { motion } from "framer-motion";

// ─── Config ──────────────────────────────────────────────────────────────────
const IMAGES = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80",
  "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=400&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&q=80",
  "https://images.unsplash.com/photo-1506765515384-028b60a970df?w=400&q=80",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&q=80",
  "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?w=400&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80",
  "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=400&q=80",
];

const CARD_W = 160;
const CARD_H = 220;
const TOTAL = IMAGES.length;

// Ellipse radii — wide & shallow for that 3-D tilted-ring look
const RX = 560; // horizontal radius
const RY = 100; // vertical radius (squish = tilt illusion)

// ─── Carousel ─────────────────────────────────────────────────────────────────
export default function EllipseCarousel({ scrollProgress }: { scrollProgress: number }) {
  // scrollProgress 0→1 drives a full 360° rotation
  const baseAngleDeg = scrollProgress * 360;

  // Sort cards back-to-front so front cards paint on top
  const cards = Array.from({ length: TOTAL }, (_, i) => {
    const angleDeg = baseAngleDeg + (i / TOTAL) * 360;
    const angleRad = (angleDeg * Math.PI) / 180;
    const x = Math.sin(angleRad) * RX;   // left/right
    const y = Math.cos(angleRad) * RY;   // depth proxy (+ve = front)
    // Normalize depth -1…1 → scale/opacity
    const depthT = (y + RY) / (2 * RY);  // 0 = back, 1 = front
    const scale = 0.45 + depthT * 0.75;  // 0.45 … 1.2
    const zIndex = Math.round(depthT * 100);
    return { i, x, y, scale, zIndex, depthT };
  });

  // Sort so front cards render on top
  const sorted = [...cards].sort((a, b) => a.zIndex - b.zIndex);

  return (
    // Shift the whole carousel centre down so the heading above stays clear
    <div className="relative w-full h-full flex items-center justify-center" style={{ paddingTop: '18%' }}>
      {sorted.map(({ i, x, y, scale, zIndex, depthT }) => (
        <motion.div
          key={i}
          className="absolute cursor-pointer group"
          animate={{ x, y: y * 2.2, scale, opacity: 0.3 + depthT * 0.7 }}
          transition={{ type: "spring", stiffness: 60, damping: 20 }}
          style={{ zIndex, width: CARD_W, height: CARD_H }}
        >
          <motion.div
            className="relative w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
            whileHover={{ rotateY: 180 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
          >
            {/* Front */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
              style={{ backfaceVisibility: "hidden" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMAGES[i]}
                alt={`work-${i}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* subtle dark overlay that lifts on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/40 group-hover:opacity-0 transition-opacity duration-300" />
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl bg-[#111] border border-white/10 flex flex-col items-center justify-center gap-2"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <p className="text-[10px] font-bold tracking-[0.25em] text-[#FFD43B] uppercase">View</p>
              <p className="text-sm font-semibold text-white">Details</p>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
