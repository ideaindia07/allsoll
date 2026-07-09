'use client';
 
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';
 
// Dynamically import the Canvas subcomponent to bypass server side rendering (SSR) of WebGL
const EcosystemCanvas = dynamic(() => import('./EcosystemCanvas'), { ssr: false });
 
export default function Ecosystem3D() {
  const pinRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
 
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
 
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
 
    const scrollPin = gsap.to({}, {
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        pin: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      },
    });
 
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX((e.clientX / window.innerWidth) * 2 - 1);
      setMouseY(-((e.clientY / window.innerHeight) * 2 - 1));
    };
 
    window.addEventListener('mousemove', handleMouseMove);
 
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
 
  // Map scroll progress points to the 4 storytelling stages
  const showStage1 = scrollProgress < 0.22;
  const showStage2 = scrollProgress >= 0.22 && scrollProgress < 0.45;
  const showStage3 = scrollProgress >= 0.45 && scrollProgress < 0.82;
  const showStage4 = scrollProgress >= 0.82;
 
  const showCanvasLayout = showStage3 || scrollProgress >= 0.82;
 
  return (
    <div ref={triggerRef} className="relative w-full h-[400vh] bg-bg-primary z-20">
      <div
        ref={pinRef}
        className="w-full h-screen sticky top-0 flex items-center justify-center overflow-hidden"
      >
        {/* Stage 1 Text */}
        <div
          className={`absolute text-center max-w-[1200px] px-8 transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
            showStage1 ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
          }`}
        >
          <h2 className="font-display text-3xl md:text-5xl lg:text-[6rem] font-semibold leading-tight tracking-tight text-white">
            &ldquo;Brands don&apos;t grow through one channel.&rdquo;
          </h2>
        </div>
 
        {/* Stage 2 Text */}
        <div
          className={`absolute text-center max-w-[1200px] px-8 transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
            showStage2 ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
          }`}
        >
          <h2 className="font-display text-6xl md:text-[10rem] lg:text-[14rem] font-semibold uppercase leading-none tracking-tighter text-accent">
            Presence.
          </h2>
        </div>
 
        {/* Stage 3 Canvas Wrapper - Full Screen */}
        <div
          className={`absolute inset-0 w-full h-full transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            showCanvasLayout ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
          }`}
        >
          {showCanvasLayout && (
            <EcosystemCanvas scrollProgress={scrollProgress} mouseX={mouseX} mouseY={mouseY} />
          )}
        </div>
 
        {/* Stage 4 Text */}
        <div
          className={`absolute text-center max-w-[1200px] px-8 transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
            showStage4 ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
          }`}
        >
          <h2 className="font-display text-3xl md:text-5xl lg:text-[4.5rem] font-semibold leading-snug tracking-tight text-white">
            We don&apos;t manage channels, <br />
            <span className="text-accent">we orchestrate presence</span>
          </h2>
        </div>
      </div>
    </div>
  );
}

// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import dynamic from 'next/dynamic';

// // Dynamically import the Canvas subcomponent to bypass server side rendering (SSR) of WebGL
// const EcosystemCanvas = dynamic(() => import('./EcosystemCanvas'), { ssr: false });

// export default function Ecosystem3D() {
//   const pinRef = useRef<HTMLDivElement>(null);
//   const triggerRef = useRef<HTMLDivElement>(null);
  
//   const [scrollProgress, setScrollProgress] = useState(0);
//   const [mouseX, setMouseX] = useState(0);
//   const [mouseY, setMouseY] = useState(0);

//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);

//     const scrollPin = gsap.to({}, {
//       scrollTrigger: {
//         trigger: triggerRef.current,
//         start: 'top top',
//         end: 'bottom bottom',
//         scrub: true,
//         pin: true,
//         invalidateOnRefresh: true,
//         onUpdate: (self) => {
//           setScrollProgress(self.progress);
//         },
//       },
//     });

//     const handleMouseMove = (e: MouseEvent) => {
//       // Convert absolute cursor positions to normalized floating coordinates [-1, 1]
//       setMouseX((e.clientX / window.innerWidth) * 2 - 1);
//       setMouseY(-((e.clientY / window.innerHeight) * 2 - 1));
//     };

//     window.addEventListener('mousemove', handleMouseMove);

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);

//   // Map scroll progress points to the 4 storytelling stages
//   const showStage1 = scrollProgress < 0.22;
//   const showStage2 = scrollProgress >= 0.22 && scrollProgress < 0.45;
//   const showStage3 = scrollProgress >= 0.45 && scrollProgress < 0.82;
//   const showStage4 = scrollProgress >= 0.82;

//   const showCanvasLayout = showStage3 || scrollProgress >= 0.82;

//   return (
//     <div ref={triggerRef} className="relative w-full h-[400vh] bg-bg-primary z-20">
//       <div
//         ref={pinRef}
//         className="w-full h-screen sticky top-0 flex items-center justify-center overflow-hidden"
//       >
//         {/* Stage 1 Text */}
//         <div
//           className={`absolute text-center max-w-[1200px] px-8 transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
//             showStage1
//               ? 'opacity-100 scale-100 visible'
//               : 'opacity-0 scale-95 invisible'
//           }`}
//         >
//           <h2 className="font-display text-3xl md:text-5xl lg:text-[6rem] font-semibold leading-tight tracking-tight text-white">
//             &ldquo;Brands don&apos;t grow through one channel.&rdquo;
//           </h2>
//         </div>

//         {/* Stage 2 Text */}
//         <div
//           className={`absolute text-center max-w-[1200px] px-8 transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
//             showStage2
//               ? 'opacity-100 scale-100 visible'
//               : 'opacity-0 scale-95 invisible'
//           }`}
//         >
//           <h2 className="font-display text-6xl md:text-[10rem] lg:text-[14rem] font-semibold uppercase leading-none tracking-tighter text-accent">
//             Presence.
//           </h2>
//         </div>

//         {/* Stage 3 Canvas Wrapper - Full Screen */}
//         <div
//           className={`absolute inset-0 w-full h-full transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
//             showCanvasLayout
//               ? 'opacity-100 scale-100 visible'
//               : 'opacity-0 scale-95 invisible'
//           }`}
//         >
//           {showCanvasLayout && (
//             <EcosystemCanvas scrollProgress={scrollProgress} mouseX={mouseX} mouseY={mouseY} />
//           )}
//         </div>

//         {/* Stage 4 Text */}
//         <div
//           className={`absolute text-center max-w-[1200px] px-8 transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
//             showStage4
//               ? 'opacity-100 scale-100 visible'
//               : 'opacity-0 scale-95 invisible'
//           }`}
//         >
//           <h2 className="font-display text-3xl md:text-5xl lg:text-[4.5rem] font-semibold leading-snug tracking-tight text-white">
//             [We don&apos;t manage channels, <br />
//             <span className="text-accent">we orchestrate presence]</span>
//           </h2>
//         </div>
//       </div>
//     </div>
//   );
// }
