'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

import { SectionTitle, GlitchTypewriterText, Button } from '../components';

export const InsideProduct = () => {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-screen flex justify-center items-center bg-black text-white overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute hidden lg:block lg:right-[-100px] lg:top-[-50px] 2xl:lg:top-0 w-[370px] lg:w-[970px] 2xl:w-[1200px]  2xl:h-screen h-full pointer-events-none z-0"
        style={{ transform: 'translateZ(0)' }}
      >
        <div className="w-full h-full bg-cube-pattern" />
      </div>

      <div className="own-container h-min-screen relative z-10">
        <SectionTitle title={t('inside-product.ai_inside_product')} hasBorder />
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 gap-6 md:gap-8.5 items-center">
          {/* Left side - Text content */}
          <div className="space-y-6">
            <GlitchTypewriterText
              className="pt-[30px] lg:pt-0 max-w-[100vw] 2xl:text-[58px] md:text-[42px] text-[28px] leading-[107%]"
              text={t('inside-product.title')}
              gradient="bg-gradient-to-b from-white to-text-grad-dbg bg-clip-text text-transparent"
              lineClassName="title"
            />
            <div className="space-y-4 font-inter text-base 2xl:text-[22px] text-white">
              <p>{t('inside-product.main_subtitle')}</p>
              <p>{t('inside-product.main_subtitle2')}</p>
            </div>

            <div className="flex">
              <Button
                className="w-[320px] lg:w-[244px] 2xl:w-[300px]"
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {t('inside-product.main_cta')}
              </Button>
            </div>
          </div>

          {/* Right side - 3D Cube */}
          <div className="relative h-90 lg:w-[500px] lg:h-[500px] w-full flex items-center justify-center 2xl:w-[721px] 2xl:h-[714px]">
            {/*<div className="relative lg:w-140 lg:h-140">*/}
            <Image src="/cube.png" className="levitate" alt="cube" fill loading="eager" />
            {/*</div>*/}
          </div>
        </div>
      </div>

      <div className="absolute bottom-[0] lg:hidden h-full w-[100vw] pointer-events-none z-0 bg-[url('/cube-bg-mobile.png')] bg-bottom bg-[length:120%] md:bg-[length:130%] bg-no-repeat" />
    </section>
  );
};
