import React from 'react';
import { SectionTitle } from '@/app/components/section-title';
import Image from 'next/image';

type CardProps = {
  icon: string;
  title: string;
  description: string[];
};

const Card: React.FC<CardProps> = ({ icon, title, description }) => (
  <div className="relative p-8 rounded-lg h-full group">
    {/* Corner borders */}
    <div className="absolute top-0 left-0 w-14 h-14 border-t border-l border-gray-elements rounded-tl-lg" />
    <div className="absolute top-0 right-0 w-14 h-14 border-t border-r border-gray-elements rounded-tr-lg" />
    <div className="absolute bottom-0 left-0 w-14 h-14 border-b border-l border-gray-elements rounded-bl-lg" />
    <div className="absolute bottom-0 right-0 w-14 h-14 border-b border-r border-gray-elements rounded-br-lg" />

    {/* Content */}
    <div className="flex flex-col items-center text-center h-full">
      {/* Icon with background */}
      <div className="w-16 h-16 rounded-full  flex items-center justify-center mb-5 transition-colors">
        <div className="w-8 h-8 relative">
          <Image src={icon} alt={title} height={40} width={40} />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-1 text-gray-300 flex-grow flex flex-col justify-center">
        {description.map((line, index) => (
          <p key={index} className="leading-tight">
            {line}
          </p>
        ))}
      </div>
    </div>
  </div>
);

export const WhoWeAreFor = () => {
  const cards = [
    {
      icon: '/streamline.svg',
      title: 'Быстрый старт',
      description: ['Тем, у кого есть идея', 'и кому нужен', 'Быстрый,', 'уверенный старт'],
    },
    {
      icon: '/artificial-intelligence.svg',
      title: 'AI интеграция',
      description: ['Тем, кто хочет внедрить AI', 'в продукт или прокачать', 'процессы через', 'автоматизацию'],
    },
    {
      icon: '/diamond.svg',
      title: 'Уникальный дизайн',
      description: ['Тем, кто хочет', 'выделиться', 'за счёт стильного', 'дизайна и digital-решений'],
    },
  ];

  return (
    <section className="relative py-20 bg-black text-white">
      <SectionTitle title="// КОМУ МЫ ПОДХОДИМ" />

      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {cards.map((card, index) => (
            <Card key={index} icon={card.icon} title={card.title} description={card.description} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreFor;
