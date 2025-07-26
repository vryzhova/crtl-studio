'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { GlitchTypewriterText, SectionTitle } from '../components';
import { ProgressElement } from '@/app/components/progress-element';
import { useTranslation } from 'react-i18next';
import { useBreakpoints } from '@/app/hooks';

const PROGRESS_DURATION = 10000; // ms, длительность заполнения прогресс-бара

export const WhySection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState<number>();
  const frameIdRef = useRef<number | null>(null);
  const { t } = useTranslation();
  const { isDesktop } = useBreakpoints();
  const titlePosition = isDesktop ? 'start' : 'center';

  const steps = [
    {
      title: t('why-us.card-title'),
      description: t('why-us.card-description'),
      image: '/why-1.webp',
    },
    {
      title: t('why-us.card-title2'),
      description: t('why-us.card-description2'),
      image: '/why-2.webp',
    },
    {
      title: t('why-us.card-title3'),
      description: t('why-us.card-description3'),
      image: '/why-3.webp',
    },
  ];

  useEffect(() => {
    setProgress(0);
    let progress = 0;

    const interval = setInterval(() => {
      progress += 100 / (PROGRESS_DURATION / 100);
      setProgress(Math.min(100, progress));
    }, 100);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setActiveIndex(prev => (prev + 1) % steps.length);
    }, PROGRESS_DURATION);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      setProgress(undefined);
    };
  }, [activeIndex, steps.length]);

  const handleManualSwitch = (idx: number) => {
    if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
    setProgress(undefined);
    setActiveIndex(idx);
  };

  return (
    <section id="why" className="relative w-full bg-white text-white overflow-hidden flex flex-col items-center">
      <div className="relative z-10 own-container">
        {/* Заголовок и описание секции */}
        <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-[112px]  3xl:gap-[50px]">
          {/* Левая колонка — плашки с прогресс баром */}
          <div className="flex flex-col w-full">
            <SectionTitle title={t('why-us.title')} position={titlePosition} />
            <GlitchTypewriterText
              className="text-black mb-6.5 md:mb-12.5 xl:mb-[97px] 3xl:mb-[57px] 3xl:text-[58px]  md:text-[42px] text-[28px] leading-[107%]"
              lineClassName="title"
              text={t('why-us.subtitle')}
              gradient="bg-gradient-to-b from-black to-gray-gradient bg-clip-text text-transparent"
            />
            <div className="flex flex-col gap-6 h-[404px] xl:h-[310px]">
              {steps.map((step, idx) => {
                const isActive = idx === activeIndex;

                return isActive ? (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                  >
                    <ProgressElement
                      progress={progress}
                      activeIndex={activeIndex}
                      step={step}
                      idx={idx}
                      isLast={idx === steps.length - 1}
                      onClick={() => handleManualSwitch(idx)}
                    />
                  </motion.div>
                ) : (
                  <div key={step.title} className="w-full">
                    <ProgressElement
                      activeIndex={activeIndex}
                      step={step}
                      idx={idx}
                      isLast={idx === steps.length - 1}
                      onClick={() => handleManualSwitch(idx)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          {/* Правая колонка — динамичная картинка */}
          <div className="w-full max-w-x">
            <div className="flex justify-center items-center w-full h-[500px] 3xl:h-[800px] 3xl:w-[586px]  xl:h-[630px] xl:w-[512px] relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={steps[activeIndex].image}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex justify-center items-center"
                >
                  <Image
                    src={steps[activeIndex].image}
                    alt={steps[activeIndex].title}
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
