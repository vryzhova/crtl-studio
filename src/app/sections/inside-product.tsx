'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { useBreakpoints } from '@/app/hooks/use-break-points';

import { SectionTitle, GlitchTypewriterText, Button } from '../components';

export const InsideProduct = () => {
  const { t } = useTranslation();
  const { isDesktop } = useBreakpoints();
  return (
    <section className="relative flex justify-center items-center bg-black text-white overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute hidden xl:block xl:right-[-100px] xl:top-[-50px] 3xl:xl:top-0 w-[370px] xl:w-[970px] 3xl:w-[1200px]  3xl:h-screen h-full pointer-events-none z-0"
        style={{ transform: 'translateZ(0)' }}
      >
        <div className="w-full h-full bg-cube-pattern" />
      </div>

      <div className="inside-container max-sm:pb-0 relative z-10 w-full">
        <SectionTitle
          title={t('inside-product.ai_inside_product')}
          hasBorder
          position={isDesktop ? 'start' : 'center'}
        />
        <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-12 gap-6 md:gap-8.5">
          {/* Left side - Text content */}
          <div>
            <GlitchTypewriterText
              className="xl:pt-0 max-w-[100vw] 3xl:text-[58px] md:text-[42px] text-[28px] leading-[107%]"
              text={t('inside-product.title')}
              gradient="bg-gradient-to-b from-white to-text-grad-dbg bg-clip-text text-transparent"
              lineClassName="title"
            />
            <div className="space-y-4 font-inter text-base 3xl:text-[22px] text-white mt-4 md:mt-7.5 max-w-[459px] 3xl:max-w-[600px]">
              <p>{t('inside-product.main_subtitle')}</p>
              <p>{t('inside-product.main_subtitle2')}</p>
            </div>

            <div className="flex mt-7.5 md:mt-12.5 justify-center md:justify-start">
              <Button
                className="w-[320px] xl:w-[244px] 3xl:w-[300px]"
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
          <div className="relative h-90 md:h-[400px] md:w-[400px] xl:w-[500px] xl:h-[500px] w-full flex items-center justify-self-center justify-center 3xl:w-[721px] 3xl:h-[714px]">
            <Image src="/cube.png" className="levitate" alt="cube" fill loading="eager" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-[0] xl:hidden h-full w-[100vw] pointer-events-none z-0 bg-[url('/cube-bg-mobile.png')] bg-bottom bg-[length:120%] md:bg-[length:130%] bg-no-repeat" />
    </section>
  );
};
