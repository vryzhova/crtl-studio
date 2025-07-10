'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SectionTitle } from '@/app/components/section-title';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

export const ProcessSteps = () => {
  const [active, setActive] = useState(1); // default: второй этап
  const { t } = useTranslation();

  const steps = [
    {
      label: t('how-we-work.step_1_title'),
      title: t('how-we-work.step_1_title'),
      description: t('how-we-work.step_1_text'),
      side: 'right',
    },
    {
      label: t('how-we-work.step_2_title'),
      title: t('how-we-work.step_2_title'),
      description: t('how-we-work.step_2_text'),
      side: 'left',
    },
    {
      label: t('how-we-work.step_3_title'),
      title: t('how-we-work.step_3_title'),
      description: t('how-we-work.step_3_text'),
      side: 'right',
    },
    {
      label: t('how-we-work.step_4_title'),
      title: t('how-we-work.step_4_title'),
      description: t('how-we-work.step_4_text'),
      side: 'left',
    },
  ];

  return (
    <section className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center overflow-hidden py-20">
      <SectionTitle title="// КАК МЫ РАБОТАЕМ" position="center" />

      {/* Фоновое изображение */}
      <div className="absolute inset-0 w-full h-full  pointer-events-none z-0">
        <div className="w-full h-full bg-[url('/mountain-bg.svg')] bg-center bg-no-repeat bg-contain" />
      </div>

      <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center mt-16">
        {/* Линия по центру */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[520px] w-[2px] bg-gray-700/60 z-0" />
        {/* Этапы */}
        <div className="relative w-full h-[520px]">
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
                      : 'bg-gray-elements border-gray-elements  w-4 h-4 text-lime-default opacity-60'
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
                    'transition-colors duration-300 max-w-md',
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
    </section>
  );
};
