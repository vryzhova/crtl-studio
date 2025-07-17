import { useMemo } from 'react';

export const useIsWebView = () => {
  return useMemo(() => {
    if (typeof navigator === 'undefined') return false;

    const ua = navigator.userAgent || '';
    // Проверяем Telegram и Instagram
    return /Telegram/i.test(ua) || /Instagram/i.test(ua);
  }, []);
};
