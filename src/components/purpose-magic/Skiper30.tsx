"use client";

import { TextLoop } from "./TextLoop";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const image = [
    "/images/lummi/img15.png",
    "/images/lummi/img21.png",
    "/images/lummi/img3.png",
    "/images/lummi/img4.png",
    "/images/lummi/img5.png",
    "/images/lummi/img6.png",
    "/images/lummi/img7.png",
    "/images/lummi/img8.png",
    "/images/lummi/img24.png",
    "/images/lummi/img10.png",
    "/images/lummi/img11.png",
    "/images/lummi/img12.png",
    "/images/lummi/img13.png",
];

const Skiper30 = ({ img = image }: { img?: string[] }) => {
    const gallery = useRef<HTMLDivElement>(null);
    const [dimension, setDimension] = useState({ width: 0, height: 0 });

    const { scrollYProgress } = useScroll({
        target: gallery,
        offset: ["start end", "end start"],
    });

    const { height } = dimension;
    const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
    const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

    useEffect(() => {
        const resize = () => {
            setDimension({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener("resize", resize);
        resize();

        return () => {
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <main
            style={{
                background: "radial-gradient(125% 125% at 50% 90%, #000000 40%, #0d1a36 100%)",
            }}

            className="w-full   text-black">
            <div className="font-sans flex h-[80vh] items-center justify-center gap-2">

                {/* <span className="relative text-yellow-300 max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-white after:to-black after:content-['']">
            scroll down to see
          </span> */}
                <div className="text-white text-5xl md:text-8xl gap-3 md:gap-10 grid grid-cols-2 w-full">
                    <div className="  flex justify-end ">
                        <p>THE</p>
                    </div>

                    <TextLoop
                        className='overflow-y-clip text-amber-300 '
                        transition={{
                            type: 'spring',
                            stiffness: 900,
                            damping: 80,
                            mass: 10,
                        }}
                        variants={{
                            initial: {
                                y: 20,
                                rotateX: 90,
                                opacity: 0,
                                filter: 'blur(4px)',
                            },
                            animate: {
                                y: 0,
                                rotateX: 0,
                                opacity: 1,
                                filter: 'blur(0px)',
                            },
                            exit: {
                                y: -20,
                                rotateX: -90,
                                opacity: 0,
                                filter: 'blur(4px)',
                            },
                        }}
                    >
                        <span>WORK</span>
                        <span>MYTH</span>
                        <span>LEGEND</span>
                        {/* <span>Design Engineers</span> */}
                    </TextLoop>
                </div>







            </div>

            <div
                ref={gallery}
                className="relative box-border flex h-[175vh] gap-[2vw] overflow-hidden  p-[2vw]"
            >
                <Column images={[img[0], img[1], img[2]]} y={y} />
                <Column images={[img[3], img[4], img[5]]} y={y2} />
                <Column images={[img[6], img[7], img[8]]} y={y3} className="hidden md:flex" />
                <Column images={[img[9], img[10], img[11]]} y={y4} className="hidden md:flex" />
            </div>
            {/* <div className="font-sans relative flex h-screen items-center justify-center gap-2">
        <div className="absolute left-1/2 top-[10%] grid -translate-x-1/2 content-start justify-items-center gap-6 text-center text-black">
          <span className="relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-white after:to-black after:content-['']">
            scroll Up to see
          </span>
        </div>
      </div> */}
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
            className={`relative -top-[45%] flex h-full w-1/2 md:w-1/4 min-w-[0px] md:min-w-[250px] flex-col gap-[2vw] first:top-[-45%] [&:nth-child(2)]:top-[-95%] [&:nth-child(3)]:top-[-45%] [&:nth-child(4)]:top-[-75%] ${className}`}
            style={{ y }}
        >
            {images.map((src, i) => (
                <div key={i} className="relative h-full w-full overflow-hidden">
                    <img
                        src={`${src}`}
                        alt="image"
                        className="pointer-events-none object-cover"
                    />
                </div>
            ))}
        </motion.div>
    );
};

export { Skiper30 };
