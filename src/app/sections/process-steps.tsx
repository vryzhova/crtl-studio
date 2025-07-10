'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SectionTitle } from '@/app/components/section-title';
import clsx from 'clsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import TimelineLineSvg from '../components/TimelineLineSvg';

// Регистрируем плагин ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export const ProcessSteps = () => {
  const [active, setActive] = useState(0); // default: первый этап
  const { t } = useTranslation();

  const sectionRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      label: t('how-we-work.step_1_title'),
      side: 'left',
      title: t('how-we-work.step_1_title'),
      description: t('how-we-work.step_1_text'),
    },
    {
      label: t('how-we-work.step_2_title'),
      side: 'right',
      title: t('how-we-work.step_2_title'),
      description: t('how-we-work.step_2_text'),
    },
    {
      label: t('how-we-work.step_3_title'),
      side: 'left',
      title: t('how-we-work.step_3_title'),
      description: t('how-we-work.step_3_text'),
    },
    {
      label: t('how-we-work.step_4_title'),
      side: 'right',
      title: t('how-we-work.step_4_title'),
      description: t('how-we-work.step_4_text'),
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const totalSteps = steps.length;
    const stepLength = 1 / totalSteps;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top-=20%',
      end: `+=${window.innerHeight * totalSteps * 0.5}`,
      pin: true,
      scrub: true,
      markers: true,
      onUpdate: self => {
        const progress = self.progress;
        const currentStep = Math.floor(progress / stepLength);
        setActive(Math.min(currentStep, totalSteps - 1));
      },
    });

    return () => {
      trigger.kill();
    };
  }, [steps.length]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center overflow-hidden py-20"
    >
      <SectionTitle title={t('how-we-work.tag')} position="center" />
      {/* Фоновое изображение */}
      <div className="absolute inset-0 w-full h-full  pointer-events-none z-0">
        <div className="w-full h-full bg-[url('/mountain-bg.svg')] bg-center opacity-80 bg-no-repeat lg:bg-contain" />
      </div>
      {/* Ваша прежняя верстка этапов — не меняю! */}
      <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center mt-16">
        {/* Mobile: горизонтальный таймлайн без карточек */}
        <div className="block lg:hidden w-full relative py-8">
          {/* Горизонтальная линия */}
          <div
            className="absolute top-8 left-0 right-0 h-0.5 from-gray-elements/70 via-gray-elements to-gray-elements/70 z-0"
            style={{ minWidth: '600px' }}
          />
          {/* Этапы */}
          <div className="flex flex-row gap-10 overflow-x-auto no-scrollbar px-4 relative z-10 w-full">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center min-w-[180px]">
                {/* Кружок-номер на линии */}
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-base mb-2 shadow transition-all duration-300 ${active === idx ? 'bg-lime-default text-black scale-110' : 'bg-gray-700 text-lime-default opacity-60'}`}
                >
                  {idx + 1}
                </span>
                {/* Заголовок */}
                <span
                  className={`text-center font-bold text-sm mb-2 transition-colors duration-300 ${active === idx ? 'text-lime-default' : 'text-gray-400'}`}
                >
                  {t(`how-we-work.step${idx + 1}.title`)}
                </span>
                {/* Текст */}
                <span
                  className={`text-white text-xs text-center whitespace-pre-line transition-opacity duration-300 ${active === idx ? 'opacity-100' : 'opacity-60'}`}
                >
                  {t(`how-we-work.step${idx + 1}.description`)}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* Desktop: вертикальный таймлайн */}
        <div className="hidden lg:block w-full">
          {/* Линия по центру (TimelineLineSvg, ещё тоньше) */}
          <TimelineLineSvg
            className="absolute left-1/2 top-0 -translate-x-1/2 z-0 select-none pointer-events-none"
            height={640}
            width={1}
          />
          {/* Этапы */}
          <div className="relative w-full h-[640px]">
            {steps.map((step, idx) => {
              // Распределение по вертикали (равномерно)
              const top = `calc(${idx * 25}% - 0px)`;
              const isLeft = step.side === 'left';
              return (
                <div
                  key={step.label}
                  style={{ top }}
                  className={clsx(
                    'absolute flex items-center w-1/2',
                    isLeft ? 'left-0 flex-row-reverse' : 'right-0 flex-row',
                    'group'
                  )}
                >
                  {/* Точка и линия */}
                  <button
                    className={clsx(
                      'z-10 rounded-full flex items-center justify-center border-2 transition',
                      active === idx
                        ? 'bg-lime-default border-lime-default w-8 h-8 text-black scale-110 shadow-lg'
                        : 'bg-gray-elements border-gray-elements  w-4 h-4 text-lime-default'
                    )}
                    style={{
                      position: 'absolute',
                      left: isLeft ? '100%' : '0',
                      transform: 'translateX(-50%)',
                    }}
                    onClick={() => setActive(idx)}
                    aria-label={step.label}
                  >
                    {active === idx && <span className="font-mono font-bold text-lg">{idx + 1}</span>}
                  </button>
                  {/* Контент этапа */}
                  <div
                    className={clsx(
                      'transition-colors duration-300 max-w-md z-5',
                      isLeft ? 'text-left mr-[70px]' : 'text-right ml-[70px]',
                      active === idx ? 'text-white' : 'text-gray-text opacity-60'
                    )}
                  >
                    <h3
                      className={clsx(
                        'font-semibold mb-2 transition-colors duration-300',
                        active === idx ? 'text-lime-default' : 'text-text',
                        isLeft ? 'text-left' : 'text-right'
                      )}
                    >
                      {step.title}
                    </h3>
                    <div
                      className={clsx(
                        'text-sm leading-snug space-y-1 transition-colors duration-300',
                        isLeft ? 'text-left' : 'text-right'
                      )}
                    >
                      {step.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
