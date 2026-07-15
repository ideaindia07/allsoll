'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for high-end inertia mouse lag
  const springConfig = { damping: 30, stiffness: 350, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch/pointer-coarse devices — skip cursor entirely on mobile
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
      
      // Update global CSS document variable to animate background ambient light gradients
      const pctX = (e.clientX / window.innerWidth) * 100;
      const pctY = (e.clientY / window.innerHeight) * 100;
      document.documentElement.style.setProperty('--mouse-x', `${pctX}%`);
      document.documentElement.style.setProperty('--mouse-y', `${pctY}%`);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Event Delegation for hover binds (handles static & dynamic routing trees)
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverable = target.closest('a, button, [data-hover-text], .work-item, .team-card');
      
      if (hoverable) {
        setIsHovered(true);
        const text = hoverable.getAttribute('data-hover-text') || '';
        
        if (hoverable.classList.contains('work-item')) {
          setCursorText('VIEW');
        } else if (hoverable.classList.contains('team-card')) {
          setCursorText('BIO');
        } else {
          setCursorText(text);
        }
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverable = target.closest('a, button, [data-hover-text], .work-item, .team-card');
      if (hoverable) {
        setIsHovered(false);
        setCursorText('');
      }
    };

    document.addEventListener('mouseover', handleMouseEnter, true);
    document.addEventListener('mouseout', handleMouseLeave, true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseEnter, true);
      document.removeEventListener('mouseout', handleMouseLeave, true);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Outer trailing ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full z-[10000] pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center justify-center mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          width: isHovered ? (cursorText ? 80 : 40) : 32,
          height: isHovered ? (cursorText ? 80 : 40) : 32,
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
          border: isHovered ? '1px solid rgba(255, 255, 255, 0.35)' : '1.5px solid #FFD43B',
          backdropFilter: isHovered ? 'blur(3px)' : 'none',
        }}
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      >
        {cursorText && (
          <span className="text-white text-[11px] font-display font-semibold tracking-wider text-center select-none uppercase">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Inner instant solid yellow dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full z-[10000] pointer-events-none -translate-x-1/2 -translate-y-1/2 mix-blend-difference bg-[#FFD43B]"
        style={{
          x: mouseX,
          y: mouseY,
          width: 8,
          height: 8,
        }}
        animate={{
          scale: isHovered ? 0 : 1,
          opacity: isHovered ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
