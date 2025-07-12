import React from 'react';

type TProps = {
  step: any;
  idx: number;
  activeIndex: number;
  progress?: number;
  onClick?: (idx: number) => void;
};

export const ProgressElement: React.FC<TProps> = ({ step, idx, activeIndex, progress, onClick }) => {
  const isActive = idx === activeIndex;
  return isActive ? (
    <div
      key={step.title}
      className={`rounded-xl p-6 bg-black transition-all duration-300 overflow-hidden relative ${isActive ? 'shadow-2xl scale-105 z-10' : 'opacity-60 cursor-pointer'} ${isActive ? '' : 'pointer-events-auto'}`}
      style={{ minHeight: '88px' }}
      onClick={() => !isActive && onClick?.(idx)}
      tabIndex={0}
      role="button"
      aria-pressed={isActive}
    >
      {/* Прогресс-бар */}
      <div className="h-1 w-full bg-black rounded mb-2.5">
        <div className="h-1 rounded bg-lime-active transition-all" style={{ width: `${progress}%` }} />
      </div>
      <div className="font-inter font-medium mb-2 text-lg flex items-center">{step.title}</div>
      <div className="font-inter text-gray-elements text-sm mb-4 transition-opacity duration-300 opacity-100">
        {step.description}
      </div>
    </div>
  ) : (
    <div
      key={step.title}
      className={`text-gray-elements font-inter font-medium transition-all duration-300 overflow-hidden relative border-b border-gray-elements`}
      style={{ minHeight: '53px' }}
      onClick={() => !isActive && onClick?.(idx)}
      tabIndex={0}
      role="button"
      aria-pressed={isActive}
    >
      <div className="font-bold mb-2 text-lg flex items-center">{step.title}</div>
    </div>
  );
};
