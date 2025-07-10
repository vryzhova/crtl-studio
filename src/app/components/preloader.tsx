'use client';

import { useEffect, useState } from 'react';

export const Preloader = ({ onDone }: { onDone: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev < 100) return prev + 1;
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          onDone(); // уведомляем родителя
        }, 300);
        return prev;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 bg-black flex flex-col items-center justify-center z-50 transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="flex items-center space-x-2 text-white text-2xl font-semibold">
        <div className="w-6 h-6 bg-white rounded-full" />
        <span>Ctrl Studio</span>
      </div>
      <p className="mt-4 text-gray-400 text-lg">{progress}%</p>
    </div>
  );
};
