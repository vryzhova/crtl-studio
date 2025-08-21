import { useEffect, useState } from 'react';

export function useMediaQuery(query: string) {
  // На сервере window нет → ставим дефолтное значение
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia(query);

    const listener = () => setMatches(media.matches);

    // сразу обновим, чтобы не ждать первого события
    setMatches(media.matches);

    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}
