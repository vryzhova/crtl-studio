'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SectionTitle } from '@/app/components/section-title';
import clsx from 'clsx';

const steps = [
  {
    label: 'Встреча и бриф',
    title: 'Встреча и бриф',
    description: [
      'Фокусируемся на сути задачи,',
      'а не на форме. Быстро определяем,',
      'в чём настоящая ценность продукта.',
    ],
    side: 'right',
  },
  {
    label: 'Идея → дизайн',
    title: 'Идея → дизайн',
    description: [
      'Прототипируем, запускаем пилоты,',
      'собираем обратную связь.',
      'Всё ради одного — чтобы не строить лишнего.',
    ],
    side: 'left',
  },
  {
    label: 'MVP за 2-6 недель',
    title: 'MVP за 2-6 недель',
    description: [
      'Создаём MVP с потенциалом масштабирования.',
      'Продуманные интерфейсы, брендинг',
      'и AI — всё в одном решении.',
    ],
    side: 'right',
  },
  {
    label: 'Поддержка, улучшения',
    title: 'Поддержка, улучшения',
    description: ['Улучшаем. Усиливаем. Развиваем.', 'Дорабатываем. Масштабируем.'],
    side: 'left',
  },
];

export const ProcessSteps = () => {
  const [active, setActive] = useState(1); // default: второй этап активен

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
                    {step.description.map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
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

export default ProcessSteps;
