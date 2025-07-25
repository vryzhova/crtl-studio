import React from 'react';

type TProps = {
  title: string;
  position?: 'start' | 'center';
  hasBorder?: boolean;
};
export const SectionTitle: React.FC<TProps> = ({ title, position = 'start', hasBorder }) => {
  const finalPosition = {
    center: 'justify-center',
    start: 'justify-start',
  };

  const finalBorder = hasBorder ? 'border border-lime-active' : '';

  return (
    <div className={`${finalPosition[position]} mb-10 lg:mb-15 container flex items-center mx-auto relative z-5`}>
      <div
        className={`${finalBorder} inline-flex  items-center justify-center  bg-black px-6 py-2  rounded-full text-lime-active text-sm md:text-base font-mono whitespace-nowrap`}
      >
        {title}
      </div>
    </div>
  );
};
