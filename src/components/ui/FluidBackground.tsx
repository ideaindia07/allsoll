'use client';

import { useEffect, useRef } from 'react';
import webGLFluidEnhanced from 'webgl-fluid';

export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Skip on touch / reduced-motion / low-end — continuous WebGL sim is expensive
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const saveData =
      'connection' in navigator &&
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    const lowCores = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4;

    if (coarse || reduced || saveData || lowCores) {
      canvas.style.display = 'none';
      return;
    }

    webGLFluidEnhanced(canvas, {
      TRIGGER: 'hover',
      SPLAT_COLOR: { r: 0.957, g: 0.765, b: 0.204 },
      COLORFUL: false,
      TRANSPARENT: true,
      DENSITY_DISSIPATION: 2.2,
      VELOCITY_DISSIPATION: 1.2,
      PRESSURE: 0.4,
      PRESSURE_ITERATIONS: 12,
      SPLAT_RADIUS: 0.15,
      SPLAT_FORCE: 1800,
      BLOOM: false,
      SUNRAYS: false,
      SHADING: false,
      // Lower sim resolution = much less GPU per frame
      SIM_RESOLUTION: 64,
      DYE_RESOLUTION: 512,
    });

    let raf = 0;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!canvasRef.current) return;
        canvasRef.current.dispatchEvent(
          new MouseEvent('mousemove', {
            clientX: e.clientX,
            clientY: e.clientY,
            bubbles: true,
            cancelable: true,
          }),
        );
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ width: '100vw', height: '100vh', mixBlendMode: 'screen', contain: 'strict' }}
      aria-hidden
    />
  );
}
