'use client';
import React, { createContext, useContext, useRef } from 'react';
import Lenis from 'lenis';

type LenisContextType = {
  lenisRef: React.MutableRefObject<Lenis | null>;
};

const LenisContext = createContext<LenisContextType | undefined>(undefined);

export const useLenis = () => {
  const ctx = useContext(LenisContext);
  if (!ctx) throw new Error('useLenis must be used within LenisProvider');
  return ctx.lenisRef;
};

export const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);
  return (
    <LenisContext.Provider value={{ lenisRef }}>
      {children}
    </LenisContext.Provider>
  );
};
