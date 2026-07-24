'use client';

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { ColorTheme } from '@/lib/theme'
import { CrowdCanvas } from './CrowdCanvas';
import MagneticButton from '@/components/ui/magnetic-button';
import DynamicText from './DynamicText';
import cactusDoodle from '@/assets/doodle_cactus.png';
const Hero = () => {
    const { bgPrimary, bgSecondary, textPrimary, textSecondary, border } = ColorTheme();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        mouseX.set(clientX / innerWidth - 0.5);
        mouseY.set(clientY / innerHeight - 0.5);
    };

    const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            style={{
                background: "radial-gradient(125% 125% at 50% 90%, #000000 40%, #0d1a36 100%)",
            }}

            className={` relative  min-h-[100vh]  flex-col  w-full flex justify-center items-center overflow-hidden `}>

            <div className={` px-0  w-full  min-h-screen z-20 relative flex flex-col items-center justify-center `}>

                {/* Big Typography "WORK THAT MATTERS" */}
                <motion.div
                    style={{ y: y2 }}
                    className="relative z-20 flex flex-col items-center leading-[0.85] font-serif mix-blend-difference"
                >
                    {/* WORK */}
                    <div className=' mb-[-2vw]'> <DynamicText /> </div>
                    <h1 className="text-[5rem] md:text-[8rem] lg:text-[11rem] text-[#fbf8f3] transform -rotate-2 origin-bottom-right tracking-tighter hover:text-brand-yellow transition-colors duration-500 cursor-default">
                        WORK
                    </h1>

                    {/* THAT MATTERS Container */}
                    <div className="flex flex-col md:flex-row items-center md:items-baseline gap-4 md:-mt-4 relative">
                        <img src={cactusDoodle.src} alt="Cactus doodle" className="w-12 md:w-16 opacity-90 absolute top-[30%] right-[10%] md:right-[-50px] transform rotate-12 z-0 pointer-events-none" />

                        {/* THAT */}
                        <span className="text-[3rem] md:text-[5rem] lg:text-[7rem] font-serif italic text-brand-yellow drop-shadow-sm z-10 transform -translate-y-2 md:translate-y-0">
                            that
                        </span>

                        {/* MATTERS */}
                        <span className="text-[4.5rem] md:text-[7.5rem] lg:text-[10.5rem] text-[#fbf8f3] transform rotate-1 origin-bottom-left tracking-tighter hover:scale-105 transition-transform duration-300 inline-block cursor-default">
                            MATTERS
                        </span>
                    </div>
                </motion.div>

                {/* Bottom Section: Search Text & Buttons */}
                <div className="mt-16 md:mt-24 flex flex-col md:flex-row items-center gap-8 md:gap-16 z-20 max-w-5xl mx-auto w-full px-4">
                    {/* Text Left */}
                    {/* <div className="text-center md:text-left text-white">
                        <p className="text-sm font-medium tracking-wide uppercase text-gray-400 mb-1">Search • Talent Consultancy</p>
                        <h3 className="text-xl md:text-2xl font-serif max-w-md leading-tight">
                            Connecting groundbreaking companies with extraordinary talent
                        </h3>
                    </div> */}

                    {/* Buttons Right */}
                    {/* <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                        <MagneticButton href="#services">
                            <span className="px-8 py-3 rounded-full bg-brand-yellow text-[#1a1a1a] font-bold text-lg hover:bg-yellow-400 transition-colors shadow-sm inline-block">
                                Learn more
                            </span>
                        </MagneticButton>

                        <MagneticButton href="/contact">
                            <span className="px-8 py-3 rounded-full border-2 border-[#fbf8f3]/10 text-[#fbf8f3] font-semibold text-lg hover:border-[#fbf8f3] transition-colors bg-white/5 backdrop-blur-sm inline-block">
                                Get in touch
                            </span>
                        </MagneticButton>
                    </div> */}
                </div>

            </div>
            <div className="absolute bottom-0 h-screen z-10 w-full pointer-events-none opacity-30">
                <CrowdCanvas crowdLimit={45} src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/open-peeps-sheet.png' rows={15} cols={7} />
            </div>




        </div>
    )
}

export default Hero
