'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { SectionTitle, GlitchTypewriterText } from '../components';

export const InsideProduct = () => {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      <SectionTitle title={t('inside-product.ai_inside_product')} />

      {/* Background pattern */}
      <div className="absolute bottom-[-300px] right-0 lg:right-[-100px] lg:top-[-40px] w-[370px] lg:w-[970px] h-full pointer-events-none z-0">
        <div className="w-full h-full bg-[url('/cube-bg.svg')] bg-center bg-no-repeat bg-contain" />
      </div>

      <div className="container mx-auto px-4 lg:pb-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-6">
            <GlitchTypewriterText
              text={t('inside-product.title')}
              lineClassName="font-inter-tight font-bold leading-tight mb-4 lg:text-4xl 2xl:text-6xl md:text-3xl text-[28px] bg-gradient-to-b from-white to-text-grad-dbg bg-clip-text text-transparent"
            />
            <div className="space-y-4 font-inter text-base text-gray-300">
              <p>{t('inside-product.main_subtitle')}</p>
              <p>{t('inside-product.main_subtitle2')}</p>
            </div>

            <Link
              href="#contact"
              className="inline-block bg-lime-default hover:bg-lime-active active:bg-lime-active active:border-white text-black font-inter font-medium px-8 py-3 rounded-md transition-colors duration-200"
            >
              {t('inside-product.main_cta')}
            </Link>
          </div>

          {/* Right side - 3D Cube */}
          <div className="relative h-96 lg:h-[32rem] w-full mt-6 lg:mt-0">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative lg:w-140 lg:h-140">
                <Image src="./cube.svg" className="levitate" alt="cube" width={500} height={500} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
