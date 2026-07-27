"use client";

import { TextLoop } from "./TextLoop";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const image = [
    "/images/lummi/img15.webp",
    "/images/lummi/img21.webp",
    "/images/lummi/img3.webp",
    "/images/lummi/img4.webp",
    "/images/lummi/img5.webp",
    "/images/lummi/img6.webp",
    "/images/lummi/img7.webp",
    "/images/lummi/img8.webp",
    "/images/lummi/img24.webp",
    "/images/lummi/img10.webp",
    "/images/lummi/img11.webp",
    "/images/lummi/img12.webp",
    "/images/lummi/img13.webp",
];

const Skiper30 = ({ img = image }: { img?: string[] }) => {
    const gallery = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(1);
    const [isMobile, setIsMobile] = useState(false);

    const { scrollYProgress } = useScroll({
        target: gallery,
        offset: ["start end", "end start"],
    });

    // Same travel distance both sides — opposite direction only
    const travel = height * (isMobile ? 1.15 : 1.5);
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -travel]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, travel]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -travel * 0.9]);
    const y4 = useTransform(scrollYProgress, [0, 1], [0, travel * 1.1]);

    useEffect(() => {
        let raf = 0;
        const resize = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                setHeight(Math.max(window.innerHeight, 1));
                setIsMobile(window.innerWidth < 768);
            });
        };

        window.addEventListener("resize", resize, { passive: true });
        resize();

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <main
            style={{
                background: "radial-gradient(125% 125% at 50% 90%, #000000 40%, #0d1a36 100%)",
            }}
            className="w-full text-black pb-0"
        >
            <div className="relative font-sans h-[55vh] md:h-[75vh] w-full">
                <h2
                    className="absolute left-1/2 top-1/2 m-0 flex -translate-x-1/2 -translate-y-1/2
                      flex-row flex-nowrap items-center justify-center gap-[0.3em]
                      whitespace-nowrap px-4
                      text-white text-[clamp(1.75rem,8vw,5.5rem)] md:text-8xl
                      font-semibold tracking-tight leading-none"
                    style={{ perspective: 1000 }}
                >
                    <span className="shrink-0 text-white">THE</span>
                    <TextLoop
                        className="!relative !inline-block shrink-0 overflow-hidden text-amber-300"
                        mode="wait"
                        transition={{
                            type: "spring",
                            stiffness: 900,
                            damping: 80,
                            mass: 10,
                        }}
                        variants={{
                            initial: { y: "0.35em", rotateX: 80, opacity: 0 },
                            animate: { y: 0, rotateX: 0, opacity: 1 },
                            exit: { y: "-0.35em", rotateX: -80, opacity: 0 },
                        }}
                    >
                        <span className="inline-block">WORK</span>
                        <span className="inline-block">MYTH</span>
                        <span className="inline-block">LEGEND</span>
                    </TextLoop>
                </h2>
            </div>

            <div
                ref={gallery}
                className="relative box-border flex h-[110vh] md:h-[155vh] gap-[2vw] overflow-hidden px-[2vw] pt-[2vw] pb-0"
            >
                <Column
                    images={[img[0], img[1], img[2]]}
                    y={y1}
                    offsetClass="top-[-32%] md:top-[-45%]"
                />
                <Column
                    images={[img[3], img[4], img[5]]}
                    y={y2}
                    offsetClass="top-[-52%] md:top-[-95%]"
                />
                <Column
                    images={[img[6], img[7], img[8]]}
                    y={y3}
                    offsetClass="top-[-45%]"
                    className="hidden md:flex"
                />
                <Column
                    images={[img[9], img[10], img[11]]}
                    y={y4}
                    offsetClass="top-[-75%]"
                    className="hidden md:flex"
                />
            </div>
        </main>
    );
};

type ColumnProps = {
    images: string[];
    y: MotionValue<number>;
    offsetClass: string;
    className?: string;
};

const Column = ({ images, y, offsetClass, className }: ColumnProps) => {
    return (
        <motion.div
            className={`relative flex h-[130%] w-1/2 md:w-1/4 min-w-0 md:min-w-[250px] flex-col gap-[2vw] will-change-transform [backface-visibility:hidden] ${offsetClass} ${className ?? ""}`}
            style={{ y }}
            transformTemplate={(_, generated) => `${generated} translateZ(0)`}
        >
            {images.map((src, i) => (
                <div
                    key={`${src}-${i}`}
                    className="relative min-h-0 flex-1 w-full overflow-hidden rounded-sm"
                >
                    <img
                        src={src}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        width={600}
                        height={800}
                        className="pointer-events-none h-full w-full object-cover"
                        draggable={false}
                    />
                </div>
            ))}
        </motion.div>
    );
};

export { Skiper30 };
