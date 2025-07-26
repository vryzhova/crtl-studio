'use client';
import React from 'react';
import { motion } from 'framer-motion';

type TProps = {
  step: any;
  idx: number;
  activeIndex: number;
  progress?: number;
  onClick?: (idx: number) => void;
  isLast: boolean;
};

export const ProgressElement: React.FC<TProps> = ({ step, idx, activeIndex, progress = 0, onClick, isLast }) => {
  const isActive = idx === activeIndex;

  return isActive ? (
    <div
      className={`rounded-xl px-5 py-6 bg-black transition-all duration-300 overflow-hidden relative shadow-3xl scale-100 z-10 h-[250px] xl:h-full`}
      onClick={() => !isActive && onClick?.(idx)}
      tabIndex={0}
      role="button"
      aria-pressed={isActive}
    >
      {/* Прогресс-бар */}
      <div className="h-1 w-full bg-black rounded mb-2.5 overflow-hidden">
        <motion.div
          className="h-1 rounded bg-lime-active"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2, ease: 'linear' }}
        />
      </div>
      <div className="font-inter font-medium mb-2 text-lg flex items-center">{step.title}</div>
      <div className="font-inter text-gray-elements text-sm mb-4">{step.description}</div>
    </div>
  ) : (
    <div
      className={`text-gray-elements font-inter font-medium transition-all duration-300 overflow-hidden relative ${isLast ? '' : 'border-b border-gray-elements'} cursor-pointer`}
      style={{ minHeight: '53px' }}
      onClick={() => onClick?.(idx)}
      tabIndex={0}
      role="button"
      aria-pressed={isActive}
    >
      <div className="pl-5 font-bold mb-2 text-lg flex items-center">{step.title}</div>
    </div>
  );
};
