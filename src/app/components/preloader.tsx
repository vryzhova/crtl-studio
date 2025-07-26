'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

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
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="fixed inset-0 px-10 bg-black flex flex-col items-center justify-center z-50"
        >
          <div className="flex flex-col items-center justify-center">
            <div className="mx-auto w-[130px] md:w-[120px] xl:w-[270px] xl:w-[300px] h-[64px] sm:h-[96px] md:h-[200px] xl:h-[160px] xl:h-[200px] flex items-center justify-center relative">
              <Image src="/logo.svg" alt="logo icon" fill className="object-contain" priority />
            </div>
          </div>
          <p className="mt-1 font-inter-tight font-bold text-gray-elements text-3xl">{progress}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
