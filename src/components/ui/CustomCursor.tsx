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
    };

    // Throttle CSS ambient glow vars — don't write to DOM every pointer event
    let glowRaf = 0;
    let lastX = 0;
    let lastY = 0;
    const handleGlowMove = (e: MouseEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
      if (glowRaf) return;
      glowRaf = requestAnimationFrame(() => {
        glowRaf = 0;
        document.documentElement.style.setProperty(
          '--mouse-x',
          `${(lastX / window.innerWidth) * 100}%`,
        );
        document.documentElement.style.setProperty(
          '--mouse-y',
          `${(lastY / window.innerHeight) * 100}%`,
        );
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousemove', handleGlowMove, { passive: true });

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
      cancelAnimationFrame(glowRaf);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleGlowMove);
      document.removeEventListener('mouseover', handleMouseEnter, true);
      document.removeEventListener('mouseout', handleMouseLeave, true);
    };
  }, [mouseX, mouseY, isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Outer trailing ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full z-[99999] pointer-events-none -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
          width: isHovered ? (cursorText ? 80 : 40) : 32,
          height: isHovered ? (cursorText ? 80 : 40) : 32,
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
          border: isHovered ? '1px solid rgba(255, 255, 255, 0.35)' : '1.5px solid #FFD43B',
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
        className="fixed top-0 left-0 rounded-full z-[99999] pointer-events-none -translate-x-1/2 -translate-y-1/2 bg-accent"
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
