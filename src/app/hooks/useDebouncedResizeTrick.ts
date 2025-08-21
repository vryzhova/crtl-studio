// hooks/useDebouncedResizeTick.ts
import { useEffect, useRef, useState } from 'react';

export function useDebouncedResizeTick(delay = 500) {
  const [tick, setTick] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number>(0);
  const wRef = useRef<number>(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const scheduleLoop = () => {
      rafRef.current = window.requestAnimationFrame(() => {
        const now = Date.now();
        if (lastTsRef.current !== 0 && now - lastTsRef.current >= delay) {
          lastTsRef.current = 0;
          const id = rafRef.current;
          rafRef.current = null;
          if (id != null) window.cancelAnimationFrame(id);
          setTick(n => n + 1);
          return;
        }
        scheduleLoop();
      });
    };

    const onResize = () => {
      const w = window.innerWidth;
      if (w === wRef.current) return;
      wRef.current = w;

      lastTsRef.current = Date.now();
      if (rafRef.current == null) scheduleLoop();
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [delay]);

  return tick;
}
