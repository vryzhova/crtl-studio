'use client';
import React, { useState, useEffect, useRef, useMemo, useLayoutEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { GlitchTypewriterText, SectionTitle } from '../components';
import { ProgressElement } from '@/app/components/progress-element';
import { useTranslation } from 'react-i18next';

const PROGRESS_DURATION = 10000; // ms, длительность заполнения прогресс-бара

export const WhySection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState<number>();
  const frameIdRef = useRef<number | null>(null);
  const { t } = useTranslation();
  const elementWrapperRef = useRef<HTMLDivElement>(null);
  const [minHeight, setMinHeight] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    if (elementWrapperRef.current) {
      const height = elementWrapperRef.current.offsetHeight;
      setMinHeight(height);
    }
  }, [activeIndex]);

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
    <section id="why" className="relative w-full bg-white text-white overflow-hidden flex flex-col items-center">
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
          {/* Правая колонка — динамичная картинка */}
          <div className="w-full max-w-x">
            <div className="flex justify-center items-center w-full h-[500px] relative">
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
                    width={400}
                    height={400}
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
