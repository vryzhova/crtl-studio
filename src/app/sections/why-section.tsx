'use client';
import React, { useState, useEffect, useRef, useMemo, useLayoutEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { AutoGlitchText, SectionTitle } from '@/app/components';
import { ProgressElement } from '@/app/components/progress-element';
import { useTranslation } from 'react-i18next';

// Данные для шагов
const steps = [
  {
    title: 'Думаем как предприниматели, а не исполнители',
    description:
      'Ctrl — команда бизнес-визионеров, дизайнеров и разработчиков. Понимаем фаундеров с полуслова: вникаем в идею, проектируем стратегически и собираем продукт как единая команда — от логики до запуска.',
    image: '/why-1.svg',
  },
  {
    title: 'AI в реальном бизнесе',
    description:
      'Мы не просто внедряем AI — мы делаем его частью бизнес-ценности. Помогаем находить точки роста и автоматизации.',
    image: '/why-2.svg',
  },
  {
    title: 'Технологии под задачи',
    description: 'Используем современные технологии и подбираем стек под ваш продукт, а не наоборот.',
    image: '/why-3.svg',
  },
];

const PROGRESS_DURATION = 30000; // ms, длительность заполнения прогресс-бара

export const WhySection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { t } = useTranslation();

  const glitchContent = useMemo(
    () => (
      <AutoGlitchText
        lineClassName="font-inter-tight font-bold leading-tight lg:text-4xl 2xl:text-6xl md:text-3xl text-[28px] bg-gradient-to-b from-black to-gray-elements bg-clip-text text-transparent"
        text={t('why-us.subtitle')}
      />
    ),
    []
  );

  useLayoutEffect(() => {
    setProgress(0);
    if (timerRef.current) clearInterval(timerRef.current);
    let start = Date.now();
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = Math.min(100, (elapsed / PROGRESS_DURATION) * 100);
      setProgress(percent);
      if (percent >= 100) {
        clearInterval(timerRef.current!);
        setTimeout(() => {
          setActiveIndex(prev => (prev === steps.length - 1 ? 0 : prev + 1));
        }, 100);
      }
    }, 10);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeIndex]);

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
                    onClick={setActiveIndex}
                  />
                </motion.div>
              ) : (
                <div key={step.title} className="w-full">
                  <ProgressElement
                    progress={progress}
                    activeIndex={activeIndex}
                    step={step}
                    idx={idx}
                    onClick={setActiveIndex}
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
                className=" object-contain transition-all duration-500"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
