import { useMemo } from 'react';

export const useIsWebView = () => {
  return useMemo(() => {
    if (typeof navigator === 'undefined') return false;
    return /Instagram|Telegram/i.test(navigator.userAgent);
  }, []);
};
