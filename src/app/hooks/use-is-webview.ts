import { useMemo } from 'react';

export const useIsWebView = () => {
  return useMemo(() => {
    if (typeof navigator === 'undefined') return false;
    // @ts-ignore
    if (navigator.userAgent.includes('Android') && typeof window.TelegramWebview !== 'undefined') {
      return true;
    }

    // @ts-ignore
    if (
      navigator.userAgent.includes('iPhone') &&
      // @ts-ignore
      typeof window.TelegramWebviewProxy !== 'undefined' &&
      // @ts-ignore
      typeof window.TelegramWebviewProxyProto !== 'undefined'
    ) {
      return 'Found Telegram Webview IOS';
    }
  }, []);
};
