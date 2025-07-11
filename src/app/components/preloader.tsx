'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export const Preloader = ({ onDone }: { onDone: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          onDone();
        }, 400); // чуть дольше, чтобы была видна 100%
      }
    }, 20);

    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 px-10 bg-black flex flex-col items-center justify-center z-50 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex flex-col items-center justify-center">
        <div className="mx-auto w-[64px] sm:w-[96px] md:w-[120px] lg:w-[160px] xl:w-[200px] h-[64px] sm:h-[96px] md:h-[120px] lg:h-[160px] xl:h-[200px] flex items-center justify-center relative">
          <Image src="/logo.svg" alt="logo icon" fill className="object-contain" priority />
        </div>
      </div>
      <p className="mt-1 font-inter-tight font-bold text-gray-elements text-2xl">{progress}%</p>
    </div>
  );
};
