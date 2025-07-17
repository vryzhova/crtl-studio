'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Header, Button, GlitchTypewriterText } from '../components';

export const MainSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="relative w-full text-white overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full bg-black z-0 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: 'url("/bg-image.jpg")' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/bg-video.webp" alt="Animated background" className="object-cover w-full h-full" />
      </div>
      {/* Content */}
      <div className="relative flex flex-col lg:min-h-screen">
        <Header />
        <div className="container mx-auto flex flex-1 justify-center items-center pt-[160px] pb-[120px] lg:pt-20 lg:pb-0">
          <div className="relative z-10 text-center px-6 max-w-3xl mx-auto flex flex-col justify-center items-center ">
            <GlitchTypewriterText
              className="h-[150px] pt-[30px] lg:pt-0"
              text={t('main.title')}
              lineClassName="title text-4xl md:text-6xl font-bold"
            />

            <p className="text-base md:text-lg text-white mt-2 mb-[30px] lg:mt-5 lg:mb-9 font-inter">
              {t('main.description')}
            </p>

            <Button
              className="w-[320px] lg:w-[244px] 2xl:w-[300px]"
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {t('contact-btn')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
