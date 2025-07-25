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
      isMobile: window.matchMedia('(max-width: 767px)'),
      isTablet: window.matchMedia('(min-width: 768px) and (max-width: 1279px)'),
      isDesktop: window.matchMedia('(min-width: 1280px)'),
    };

    const update = () => {
      const newBreakpoints = {
        isMobile: queries.isMobile.matches,
        isTablet: queries.isTablet.matches,
        isDesktop: queries.isDesktop.matches,
      };

      // Обновляем только если изменилось
      setBreakpoints(prev => {
        if (
          prev.isMobile !== newBreakpoints.isMobile ||
          prev.isTablet !== newBreakpoints.isTablet ||
          prev.isDesktop !== newBreakpoints.isDesktop
        ) {
          return newBreakpoints;
        }
        return prev;
      });
    };

    update();

    Object.values(queries).forEach(q => q.addEventListener('change', update));

    return () => {
      Object.values(queries).forEach(q => q.removeEventListener('change', update));
    };
  }, []);

  return breakpoints;
}
