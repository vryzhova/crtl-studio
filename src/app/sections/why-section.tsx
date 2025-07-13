'use client';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { GlitchTypewriterText, SectionTitle } from '../components';
import { ProgressElement } from '@/app/components/progress-element';
import { useTranslation } from 'react-i18next';

const PROGRESS_DURATION = 10000; // ms, длительность заполнения прогресс-бара

export const WhySection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState<number>();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const frameIdRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const { t } = useTranslation();

  const steps = [
    {
      title: t('why-us.card-title'),
      description: t('why-us.card-description'),
      image: '/why-1.svg',
    },
    {
      title: t('why-us.card-title2'),
      description: t('why-us.card-description2'),
      image: '/why-2.svg',
    },
    {
      title: t('why-us.card-title3'),
      description: t('why-us.card-description3'),
      image: '/why-3.svg',
    },
  ];

  const glitchContent = useMemo(
    () => (
      <GlitchTypewriterText
        lineClassName="title leading-tight lg:text-4xl 2xl:text-6xl md:text-3xl text-[28px] bg-gradient-to-b from-black to-gray-elements bg-clip-text text-transparent"
        text={t('why-us.subtitle')}
      />
    ),
    [t]
  );

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
    <section id="why" className="relative min-h-screen text-white overflow-hidden flex flex-col items-center h-full">
      <SectionTitle title={t('why-us.title')} />
      <div className="container mx-auto px-4 pb-20 relative z-10">
        {/* Заголовок и описание секции */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center justify-items-center">
          {/* Левая колонка — плашки с прогресс баром */}
          <div className="flex flex-col gap-6 w-full max-w-xl">
            <div className="mb-12 max-w-[647]">{glitchContent}</div>
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
                    onClick={() => handleManualSwitch(idx)}
                  />
                </motion.div>
              ) : (
                <div key={step.title} className="w-full">
                  <ProgressElement
                    activeIndex={activeIndex}
                    step={step}
                    idx={idx}
                    onClick={() => handleManualSwitch(idx)}
                  />
                </div>
              );
            })}
          </div>
          {/* Правая колонка — динамичная картинка */}
          <div className="w-full max-w-x">
            <div className="flex justify-center items-center w-full h-full min-h-[320px]">
              <Image
                key={steps[activeIndex].title}
                src={steps[activeIndex].image}
                alt={steps[activeIndex].title}
                width={400}
                height={400}
                className="object-contain transition-all duration-500"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
