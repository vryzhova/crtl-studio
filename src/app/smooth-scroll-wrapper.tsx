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
      duration: 1,
      wheelMultiplier: 0.6,
      // easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1,
      // infinite: false, // Отключаем бесконечный скролл
      gestureOrientation: 'vertical', // Ограничиваем скролл только по вертикали
      smoothWheel: true, // Оставляем плавность
      syncTouch: true,
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
