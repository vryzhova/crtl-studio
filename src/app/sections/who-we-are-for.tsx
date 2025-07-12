'use client';
import React from 'react';
import { SectionTitle } from '@/app/components/section-title';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

type CardProps = {
  icon: string;
  title: string;
  description: string;
};

const Card: React.FC<CardProps> = ({ icon, title, description }) => (
  <div className="relative p-8 rounded-lg h-full group">
    {/* Corner borders */}
    <div className="absolute top-0 left-0 w-14 h-14 border-t border-l border-gray-elements rounded-tl-lg group-hover:border-lime-default transition-colors duration-300" />
    <div className="absolute top-0 right-0 w-14 h-14 border-t border-r border-gray-elements rounded-tr-lg group-hover:border-lime-default transition-colors duration-300" />
    <div className="absolute bottom-0 left-0 w-14 h-14 border-b border-l border-gray-elements rounded-bl-lg group-hover:border-lime-default transition-colors duration-300" />
    <div className="absolute bottom-0 right-0 w-14 h-14 border-b border-r border-gray-elements rounded-br-lg group-hover:border-lime-default transition-colors duration-300" />
    <div className="flex flex-col items-center text-center h-full">
      <div className="w-16 h-16 rounded-full  flex items-center justify-center mb-5 transition-colors">
        <div className="w-8 h-8 relative">
          <Image src={icon} alt={title} height={40} width={40} />
        </div>
      </div>
      <div className="space-y-1 text-white font-inter text-base lg:text-[22px] flex-grow flex flex-col justify-center">
        {description}
      </div>
    </div>
  </div>
);

export const WhoWeAreFor = () => {
  const { t } = useTranslation();
  const cards = [
    {
      icon: '/streamline.svg',
      title: 'Быстрый старт',
      description: t('who-we-are-for.card_1'),
    },
    {
      icon: '/artificial-intelligence.svg',
      title: 'AI интеграция',
      description: t('who-we-are-for.card_2'),
    },
    {
      icon: '/diamond.svg',
      title: 'Уникальный дизайн',
      description: t('who-we-are-for.card_3'),
    },
  ];

  return (
    <section id="clients" className="min-h-screen relative py-20 bg-black text-white">
      <SectionTitle title={t('who-we-are-for.tag')} position="center" />

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
