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
  const mobileStepsRef = useRef<HTMLDivElement>(null);

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

    const isMobile = window.innerWidth < 768;
    let trigger: ScrollTrigger | null = null;

    if (!isMobile) {
      const totalSteps = steps.length;
      const stepLength = 1 / totalSteps;
      trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top-=20%',
        end: `+=${window.innerHeight * totalSteps * 0.5}`,
        pin: true,
        scrub: true,
        onUpdate: self => {
          const progress = self.progress;
          const currentStep = Math.floor(progress / stepLength);
          setActive(Math.min(currentStep, totalSteps - 1));
        },
      });
    }
    // На мобильных pin не нужен

    return () => {
      trigger?.kill();
    };
  }, [steps.length]);

  // Мобильная анимация: появление справа при смене active
  // useEffect(() => {
  //   if (typeof window === 'undefined' || window.innerWidth >= 768) return;
  //   const nodes = mobileStepsRef.current?.querySelectorAll('.process-mobile-step');
  //   if (!nodes) return;
  //   nodes.forEach((el, idx) => {
  //     if (idx === active) {
  //       gsap.fromTo(el, { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: 'power2.out' });
  //     } else {
  //       gsap.set(el, { x: 0, opacity: 0.6 });
  //     }
  //   });
  // }, [active]);

  // Синхронизация вертикального скролла с горизонтальным на мобильных
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth >= 768) return;
    let lastScrollY = window.scrollY;
    const container = mobileStepsRef.current;
    if (!container) return;
    const onScroll = () => {
      const deltaY = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      // Скроллим вправо при прокрутке вниз, влево при прокрутке вверх
      container.scrollLeft += deltaY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section
      id="how"
      ref={sectionRef}
      className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center overflow-hidden lg:py-20"
    >
      {/* Фоновое изображение — только фон, прозрачность не влияет на контент */}
      <div className="absolute inset-0 w-full h-full bg-[url('/mountain-bg.svg')] bg-cover bg-center bg-no-repeat pointer-events-none z-0" />
      <SectionTitle title={t('how-we-work.tag')} position="center" />
      {/* Ваша прежняя верстка этапов — не меняю! */}
      <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center mt-16">
        {/* Mobile: горизонтальный таймлайн без карточек */}
        <div className="block md:hidden w-full relative py-8">
          {/* Горизонтальная линия */}
          <div
            className="absolute top-8 left-0 right-0 h-0.5 from-gray-elements/70 via-gray-elements to-gray-elements/70 z-0"
            style={{ minWidth: '600px' }}
          />
          {/* Этапы */}
          <div
            ref={mobileStepsRef}
            className="flex flex-row gap-10 overflow-x-auto no-scrollbar px-4 relative z-10 w-full scroll-smooth"
            style={{ scrollSnapType: 'x mandatory' }}
            onScroll={e => {
              const container = e.currentTarget;
              const children = Array.from(container.children);
              const containerRect = container.getBoundingClientRect();
              let minDiff = Infinity;
              let activeIdx = 0;
              children.forEach((child, idx) => {
                const rect = child.getBoundingClientRect();
                const diff = Math.abs(rect.left + rect.width / 2 - (containerRect.left + containerRect.width / 2));
                if (diff < minDiff) {
                  minDiff = diff;
                  activeIdx = idx;
                }
              });
              setActive(activeIdx);
            }}
          >
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="process-mobile-step flex flex-col items-center min-w-[80vw] max-w-[380px] snap-center"
                style={{ scrollSnapAlign: 'center' }}
              >
                {/* Кружок-номер на линии */}
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-base mb-2 shadow transition-all duration-300 ${active === idx ? 'bg-lime-default text-black scale-110' : 'bg-gray-elements text-black opacity-60'}`}
                  onClick={() => {
                    // Прокрутка к этапу по клику
                    const container = mobileStepsRef.current;
                    const el = container?.children[idx] as HTMLElement;
                    if (el && container) {
                      const offset = el.offsetLeft - container.offsetWidth / 2 + el.offsetWidth / 2;
                      container.scrollTo({ left: offset, behavior: 'smooth' });
                    }
                  }}
                >
                  {idx + 1}
                </span>
                {/* Заголовок */}
                <span
                  className={`text-center font-bold text-sm mb-2 transition-colors duration-300 ${active === idx ? 'text-lime-default' : 'text-gray-elements'}`}
                >
                  {t(`how-we-work.step_${idx + 1}_title`)}
                </span>
                {/* Текст */}
                <span
                  className={`text-white text-xs text-center whitespace-pre-line transition-opacity duration-300 ${active === idx ? 'opacity-100' : 'opacity-60'}`}
                >
                  {t(`how-we-work.step_${idx + 1}_text`)}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* Desktop: вертикальный таймлайн */}
        <div className="hidden md:block w-full">
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
                      isLeft ? 'text-right mr-[70px]' : 'text-left ml-[70px]',
                      active === idx ? 'text-white' : 'text-gray-text opacity-60'
                    )}
                  >
                    <h3
                      className={clsx(
                        'font-semibold mb-2 transition-colors duration-300',
                        active === idx ? 'text-lime-default' : 'text-text',
                        isLeft ? 'text-right' : 'text-left'
                      )}
                    >
                      {step.title}
                    </h3>
                    <div
                      className={clsx(
                        'text-sm leading-snug space-y-1 transition-colors duration-300',
                        isLeft ? 'text-right' : 'text-left'
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
