import React from 'react';

type TProps = {
  title: string;
  position?: 'start' | 'center';
};
export const SectionTitle: React.FC<TProps> = ({ title, position = 'start' }) => {
  const finalPosition = {
    center: 'justify-center',
    start: 'justify-start',
  };

  return (
    <div
      className={`${finalPosition[position]} mb-10 lg:mb-15 container flex items-center mx-auto px-4 pt-10 relative z-5`}
    >
      <div className="inline-flex  items-center justify-center  bg-black px-6 py-2 border border-lime-active rounded-full text-lime-active text-sm md:text-base font-mono whitespace-nowrap">
        {title}
      </div>
    </div>
  );
};
