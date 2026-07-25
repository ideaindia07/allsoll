'use client';

import { useEffect, useRef } from 'react';
import webGLFluidEnhanced from 'webgl-fluid';

export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      webGLFluidEnhanced(canvasRef.current, {
        TRIGGER: 'hover',
        SPLAT_COLOR: { r: 0.957, g: 0.765, b: 0.204 }, // Matches #F4C334
        COLORFUL: false,
        TRANSPARENT: true,
        DENSITY_DISSIPATION: 1.5,
        VELOCITY_DISSIPATION: 0.5,
        PRESSURE: 0.5,
        SPLAT_RADIUS: 0.2,
        SPLAT_FORCE: 3000,
        BLOOM: false, // Turn off bloom for cleaner look
      });

      // Forward mouse events to the canvas since it has pointer-events-none
      const handleMouseMove = (e: MouseEvent) => {
        if (!canvasRef.current) return;
        const event = new MouseEvent('mousemove', {
          clientX: e.clientX,
          clientY: e.clientY,
          bubbles: true,
          cancelable: true,
        });
        canvasRef.current.dispatchEvent(event);
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ width: '100vw', height: '100vh', mixBlendMode: 'screen' }}
    />
  );
}
