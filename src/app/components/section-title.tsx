import React from 'react';

type TProps = {
  title: string;
  position?: 'start' | 'center';
  hasBorder?: boolean;
  className?: string;
};
export const SectionTitle: React.FC<TProps> = ({ title, position = 'start', hasBorder, className }) => {
  const finalPosition = {
    center: 'justify-center',
    start: 'justify-start',
  };

  const finalBorder = hasBorder ? 'border border-lime-active' : '';

  return (
    <div
      className={`${finalPosition[position]} ${className} mb-10 xl:mb-15 container flex items-center mx-auto relative z-5`}
    >
      <div
        className={`${finalBorder} inline-flex  items-center justify-center  bg-black px-6 py-2  rounded-full text-lime-active text-sm md:text-base font-mono whitespace-nowrap`}
      >
        {title}
      </div>
    </div>
  );
};
