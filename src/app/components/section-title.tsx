import React from 'react';

type TProps = {
  title: string;
  position?: 'left' | 'center';
};
export const SectionTitle: React.FC<TProps> = ({ title, position = 'left' }) => {
  const finalPosition = {
    center: 'text-center',
    left: 'text-left',
  };

  return (
    <div className="container mx-auto px-4 pt-20 relative z-10">
      <div className="inline-flex  items-center justify-center  bg-black px-6 py-2 border border-lime-active rounded-full text-lime-active text-sm md:text-base font-mono whitespace-nowrap">
        {title}
      </div>
    </div>
  );
};
