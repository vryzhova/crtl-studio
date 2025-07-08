'use client';

import { Header } from '../components/header';
import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { TypewriterLines } from '@/app/components/typed-written-lines';

type TProps = {
  title?: string;
};

export const MainSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="relative w-full min-h-screen text-white overflow-hidden">
      {/* Видео на фоне */}
      <video className="absolute inset-0 w-full h-full object-cover z-0 scale-150" autoPlay muted loop playsInline>
        <source src="/bg-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <div className="relative flex flex-col min-h-screen">
        <Header />
        <div className="container mx-auto flex flex-1 justify-center items-center">
          <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
            <TypewriterLines
              lines={[t('main.title'), t('main.subtitle'), t('main.subtitle2')]}
              className="text-4xl md:text-6xl font-bold leading-tight mb-6"
              speed={60}
              delayBetweenLines={1000}
              loop={false}
            />

            <p className="text-base md:text-lg text-gray-300 mb-8">{t('main.description')}</p>

            <a href="#contact" className="inline-block bg-lime-300 text-black px-6 py-3 rounded font-medium transition">
              {t('contact-btn')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
