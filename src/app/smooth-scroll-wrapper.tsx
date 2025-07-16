'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function SmoothScrollWrapper({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number>(null);

  useEffect(() => {
    // SSR guard
    if (typeof window === 'undefined') return;

    lenisRef.current = new Lenis({
      duration: 1.8,
      // easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.4,
      lerp: 0.01,
      syncTouch: false,
      syncTouchLerp: 0.01,
      touchInertiaExponent: 0.2,
      autoRaf: true,
      autoResize: true,
    });

    const animate = (time: number) => {
      lenisRef.current?.raf(time);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
