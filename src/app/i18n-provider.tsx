'use client';
import { ReactNode, Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

export function I18nProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </Suspense>
  );
}
