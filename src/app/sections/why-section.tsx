'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { SectionTitle } from '@/app/components';
import { ProgressElement } from '@/app/components/progress-element';

// Данные для шагов
const steps = [
  {
    title: 'Думаем как предприниматели, а не исполнители',
    description:
      'Ctrl — команда бизнес-визионеров, дизайнеров и разработчиков. Понимаем фаундеров с полуслова: вникаем в идею, проектируем стратегически и собираем продукт как единая команда — от логики до запуска.',
  },
  {
    title: 'AI в реальном бизнесе',
    description:
      'Мы не просто внедряем AI — мы делаем его частью бизнес-ценности. Помогаем находить точки роста и автоматизации.',
  },
  {
    title: 'Технологии под задачи',
    description: 'Используем современные технологии и подбираем стек под ваш продукт, а не наоборот.',
  },
];

const PROGRESS_DURATION = 30000; // ms, длительность заполнения прогресс-бара

export const WhySection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
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
        }, 400);
      }
    }, 20);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeIndex]);

  return (
    <section className="relative min-h-screen text-white overflow-hidden flex flex-col items-center h-full">
      <SectionTitle title="// ПОЧЕМУ CTRL" />
      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Заголовок и описание секции */}
        <div className="mb-12 max-w-2xl">
          <h2 className="font-bold leading-tight mb-4 lg:text-4xl 2xl:text-6xl md:text-3xl bg-gradient-to-b from-black to-gray-elements bg-clip-text text-transparent">
            Мы не агентство.
            <br />
            Мы — партнёр с бизнес-мышлением, технологиями
            <br />и умным подходом к AI
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center justify-items-center">
          {/* Левая колонка — плашки с прогресс баром */}
          <div className="flex flex-col gap-6 w-full max-w-xl">
            {steps.map((step, idx) => (
              <ProgressElement
                progress={progress}
                activeIndex={activeIndex}
                key={step.title}
                step={step}
                idx={idx}
                onClick={setActiveIndex}
              />
            ))}
          </div>
          {/* Правая колонка — динамичная картинка */}
          <div className="flex justify-center items-center w-full h-full min-h-[320px]">
            {/*<Image*/}
            {/*  key={steps[activeIndex].title}}*/}
            {/*  src={steps[activeIndex].image}*/}
            {/*  alt={steps[activeIndex].title}*/}
            {/*  width={400}*/}
            {/*  height={400}*/}
            {/*  className="rounded-2xl object-contain shadow-xl transition-all duration-500"*/}
            {/*  priority*/}
            {/*/>*/}
          </div>
        </div>
      </div>
    </section>
  );
};
