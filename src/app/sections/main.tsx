'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Header, Button, GlitchTypewriterText } from '../components';

export const MainSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="relative w-full min-h-screen text-white overflow-hidden">
      <div className="absolute inset-0 w-full h-full bg-black z-0 flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/main-bg.png" alt="Loading..." className="object-cover w-full h-full" />
      </div>
      {/* Видео на фоне */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0 scale-150 md:scale-110"
        autoPlay
        muted
        loop
        playsInline
        poster="/main-bg.png"
      >
        <source src="/bg-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <div className="relative flex flex-col min-h-screen">
        <Header />
        <div className="container mx-auto flex flex-1 justify-center items-center">
          <div className="relative z-10 text-center px-6 max-w-3xl mx-auto flex flex-col justify-center items-center ">
            <GlitchTypewriterText text={t('main.title')} lineClassName="title text-4xl md:text-6xl font-bold" />

            <p className="text-base md:text-lg text-white mt-4 mb-[30px] lg:mt-5 lg:mb-9 font-inter">
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
