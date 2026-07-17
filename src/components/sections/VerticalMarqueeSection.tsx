"use client";

import { motion } from "framer-motion";

const basePath = process.env.NODE_ENV === "production" ? "/allsoll" : "";

const imagesCol1 = [
  "/Growth Stories_1.png",
  "/Growth Stories_2.png",
  "/Growth Stories_3.png",
  "/Growth Stories_4.png",
];

const imagesCol2 = [
  "/Growth Stories_1.2.png",
  "/Growth Stories_2.2.png",
  "/Growth Stories_3.2.png",
  "/Growth Stories_4.2.png",
];

export default function VerticalMarqueeSection() {
  return (
    <section className="relative z-20 w-full min-h-screen bg-bg-primary overflow-hidden flex items-center justify-center py-20">
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-bg-primary via-transparent to-bg-primary" />

      <div className="container mx-auto px-4 md:px-6 h-full flex items-center">
        <div className="w-full md:w-1/3 z-20 mb-10 md:mb-0">
          <span className="font-body text-[11px] font-semibold tracking-[0.3em] text-text-secondary uppercase block mb-5">
            // HIGHLIGHTS
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight uppercase tracking-tighter">
            Elevating <br /> Brands.
          </h2>
          <p className="text-gray-400 text-lg max-w-sm">
            A glimpse into our visual aesthetics and how we transform identities.
          </p>
        </div>

        <div className="w-full md:w-2/3 h-full flex gap-4 md:gap-8 overflow-hidden relative rotate-[-5deg] scale-110">
          {/* Column 1 - Scrolling UP */}
          <div className="w-1/2 flex flex-col gap-4 md:gap-8">
            <motion.div
              className="flex flex-col gap-4 md:gap-8"
              animate={{ y: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 20,
              }}
            >
              {[...imagesCol1, ...imagesCol1].map((src, idx) => (
                <div key={idx} className="relative w-full aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${basePath}${src}`}
                    alt="Work showcase"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Column 2 - Scrolling DOWN */}
          <div className="w-1/2 flex flex-col gap-4 md:gap-8">
            <motion.div
              className="flex flex-col gap-4 md:gap-8"
              animate={{ y: ["-50%", "0%"] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: 20,
              }}
            >
              {[...imagesCol2, ...imagesCol2].map((src, idx) => (
                <div key={idx} className="relative w-full aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${basePath}${src}`}
                    alt="Work showcase"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
