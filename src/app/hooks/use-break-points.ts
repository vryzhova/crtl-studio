import { useEffect, useState } from 'react';

export function useBreakpoints() {
  const [breakpoints, setBreakpoints] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const queries = {
      isMobile: window.matchMedia('(max-width: 768px)'),
      isTablet: window.matchMedia('(min-width: 769px) and (max-width: 1023px)'),
      isDesktop: window.matchMedia('(min-width: 1024px)'),
    };

    const update = () => {
      setBreakpoints({
        isMobile: queries.isMobile.matches,
        isTablet: queries.isTablet.matches,
        isDesktop: queries.isDesktop.matches,
      });
    };

    update(); // установить начальные значения

    // Добавляем слушателей
    Object.values(queries).forEach(q => q.addEventListener('change', update));

    return () => {
      Object.values(queries).forEach(q => q.removeEventListener('change', update));
    };
  }, []);

  return breakpoints;
}
