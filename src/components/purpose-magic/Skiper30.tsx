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
    const [dimension, setDimension] = useState({ width: 0, height: 0 });

    const { scrollYProgress } = useScroll({
        target: gallery,
        offset: ["start end", "end start"],
    });

    const { height } = dimension;
    // Slightly gentler parallax distances = fewer large paint regions per frame
    const y = useTransform(scrollYProgress, [0, 1], [0, height * 1.6]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 2.4]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.1]);
    const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 2.2]);

    useEffect(() => {
        let raf = 0;
        const resize = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                setDimension({ width: window.innerWidth, height: window.innerHeight });
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
            className="w-full text-black"
        >
            <div className="font-sans flex h-[80vh] items-center justify-center gap-2">
                <div className="text-white text-5xl md:text-8xl gap-3 md:gap-10 grid grid-cols-2 w-full">
                    <div className="flex justify-end">
                        <p>THE</p>
                    </div>

                    <TextLoop
                        className="overflow-y-clip text-amber-300"
                        transition={{
                            type: "spring",
                            stiffness: 900,
                            damping: 80,
                            mass: 10,
                        }}
                        variants={{
                            initial: {
                                y: 20,
                                rotateX: 90,
                                opacity: 0,
                            },
                            animate: {
                                y: 0,
                                rotateX: 0,
                                opacity: 1,
                            },
                            exit: {
                                y: -20,
                                rotateX: -90,
                                opacity: 0,
                            },
                        }}
                    >
                        <span>WORK</span>
                        <span>MYTH</span>
                        <span>LEGEND</span>
                    </TextLoop>
                </div>
            </div>

            <div
                ref={gallery}
                className="relative box-border flex h-[175vh] gap-[2vw] overflow-hidden p-[2vw] [contain:layout_paint]"
            >
                <Column images={[img[0], img[1], img[2]]} y={y} />
                <Column images={[img[3], img[4], img[5]]} y={y2} />
                <Column images={[img[6], img[7], img[8]]} y={y3} className="hidden md:flex" />
                <Column images={[img[9], img[10], img[11]]} y={y4} className="hidden md:flex" />
            </div>
        </main>
    );
};

type ColumnProps = {
    images: string[];
    y: MotionValue<number>;
    className?: string;
};

const Column = ({ images, y, className }: ColumnProps) => {
    return (
        <motion.div
            className={`relative -top-[45%] flex h-full w-1/2 md:w-1/4 min-w-[0px] md:min-w-[250px] flex-col gap-[2vw] will-change-transform first:top-[-45%] [&:nth-child(2)]:top-[-95%] [&:nth-child(3)]:top-[-45%] [&:nth-child(4)]:top-[-75%] ${className ?? ""}`}
            style={{ y }}
        >
            {images.map((src, i) => (
                <div
                    key={`${src}-${i}`}
                    className="relative h-full w-full overflow-hidden rounded-sm [transform:translateZ(0)]"
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
