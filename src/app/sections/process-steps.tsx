'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SectionTitle } from '@/app/components/section-title';
import clsx from 'clsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';
import TimelineLineSvg from '../components/TimelineLineSvg';
import { AutoWidthTimelineLine } from '../components/TimelineLineHorizontalSvg';
import { useBreakpoints } from '@/app/hooks/use-break-points';

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

export const ProcessSteps = () => {
  const [active, setActive] = useState(0); // default: первый этап
  const { t } = useTranslation();

  const sectionRef = useRef<HTMLDivElement>(null);
  const mobileStepsRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  // const { isMobile, isTablet } = useBreakpoints();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1279px)');

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
    if (mobileStepsRef.current && svgRef.current) {
      svgRef.current.style.width = `${mobileStepsRef.current.scrollWidth}px`;
    }
  }, [steps.length]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let trigger: ScrollTrigger | null = null;

    if (!isMobile) {
      const totalSteps = steps.length;
      const stepLength = 1 / totalSteps;
      trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${window.innerHeight * totalSteps * 0.5}`,
        pin: section,
        scrub: true,
        onUpdate: self => {
          const progress = self.progress;
          const currentStep = Math.floor(progress / stepLength);
          setActive(Math.min(currentStep, totalSteps - 1));
        },
      });
    }

    return () => {
      trigger?.kill();
    };
  }, [isMobile, steps.length]);

  useEffect(() => {
    const wrapper = mobileStepsRef.current;
    const section = sectionRef.current;
    if (!wrapper || !section) return;

    let ctx: gsap.Context | null = null;

    const totalWidth = wrapper.scrollWidth;
    const scrollDistance = totalWidth - window.innerWidth;
    if (isMobile) {
      section.style.height = `${scrollDistance}px`;
      const totalSteps = steps.length;
      const stepLength = 1 / totalSteps;

      ctx = gsap.context(() => {
        gsap.to(wrapper, {
          x: () => `-${scrollDistance}px`,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${scrollDistance * 2}`,
            scrub: true,
            pin: true,
            anticipatePin: 1,
            onUpdate: self => {
              const progress = self.progress;
              const currentStep = Math.floor(progress / stepLength);
              setActive(Math.min(currentStep, totalSteps - 1));
              if (self.progress === 1 || self.progress === 0) {
                section.style.height = '';
              }
            },
            onLeave: () => {
              section.style.height = '';
            },
            onLeaveBack: () => {
              section.style.height = '';
            },
          },
        });
      }, section);
    }

    return () => {
      ctx?.revert();
    };
  }, [isMobile, steps.length]);

  return (
    <section
      id="how"
      ref={sectionRef}
      className="relative bg-black text-white flex flex-col items-center justify-center overflow-hidden sm:py-20 pointer-events-none min-h-screen xl:h-screen"
    >
      {/* Фоновое изображение — только фон, прозрачность не влияет на контент */}
      <div className="absolute inset-0 w-full h-full bg-[url('/mountain-bg.png')] bg-cover bg-center bg-no-repeat pointer-events-none z-0" />
      {/* Ваша прежняя верстка этапов — не меняю! */}
      <SectionTitle title={t('how-we-work.tag')} position="center" hasBorder />
      <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center">
        {/* Mobile: горизонтальный таймлайн без карточек */}
        <div className="block sm:hidden w-full relative py-8">
          {/* Горизонтальная линия */}
          {/* Этапы */}
          <div
            ref={mobileStepsRef}
            className="flex flex-row relative z-10 px-2.5 scroll-smooth"
            style={{ width: `${steps.length * 80}vw` }}
          >
            <AutoWidthTimelineLine targetRef={mobileStepsRef} top={8} />
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="process-mobile-step flex flex-col w-[80vw] snap-center box-border"
                style={{ scrollSnapAlign: 'center' }}
              >
                {/* Кружок-номер на линии */}
                <span
                  className={clsx(
                    'z-10 rounded-full flex items-center justify-center border-2 transition',
                    active === idx
                      ? 'bg-lime-default border-lime-default w-8 h-8 text-black scale-110 shadow-lg'
                      : 'bg-gray-elements border-gray-elements  w-4 h-4 text-lime-default'
                  )}
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
                  {active === idx && <span className="font-mono text-lg">{idx + 1}</span>}
                </span>
                {/* Заголовок */}
                <span
                  className={`text-start font-bold text-sm my-2 transition-colors duration-300 ${active === idx ? 'text-lime-default' : 'text-gray-elements'}`}
                >
                  {t(`how-we-work.step_${idx + 1}_title`)}
                </span>
                {/* Текст */}
                <span
                  className={`text-white w-[200px] h-[100px] text-xs text-start transition-opacity duration-300 ${active === idx ? 'opacity-100' : 'opacity-60'}`}
                >
                  {t(`how-we-work.step_${idx + 1}_text`)}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* Desktop: вертикальный таймлайн */}
        <div className="hidden sm:block w-full">
          <TimelineLineSvg
            className="absolute xl:left-1/2 left-20 top-0 -translate-x-1/2 z-0 select-none pointer-events-none"
            height={640}
            width={1}
          />
          {/* Этапы */}
          <div className="relative w-full h-[640px]">
            {steps.map((step, idx) => {
              // Распределение по вертикали (равномерно)
              const top = `calc(${idx * 25}% - 0px)`;
              const isRight = step.side === 'right' || isTablet;
              return (
                <div
                  key={step.label}
                  style={{ top }}
                  className={clsx(
                    'absolute flex items-center w-1/2',
                    isRight ? `${isTablet ? 'left-20' : 'right-0'} flex-row` : 'left-0 flex-row-reverse',
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
                      left: isRight ? '0' : '100%',
                      transform: 'translateX(-50%)',
                    }}
                    onClick={() => setActive(idx)}
                    aria-label={step.label}
                  >
                    {active === idx && <span className="font-mono text-lg">{idx + 1}</span>}
                  </button>
                  {/* Контент этапа */}
                  <div
                    className={clsx(
                      'transition-colors duration-300 max-w-md z-5',
                      isRight ? 'text-left ml-[70px]' : 'text-right mr-[70px]',
                      active === idx ? 'text-white' : 'text-gray-text opacity-60'
                    )}
                  >
                    <h3
                      className={clsx(
                        'font-semibold mb-2 transition-colors duration-300',
                        active === idx ? 'text-lime-default' : 'text-text',
                        isRight ? 'text-left' : 'text-right'
                      )}
                    >
                      {step.title}
                    </h3>
                    <div
                      className={clsx(
                        'text-sm leading-snug space-y-1 transition-colors duration-300',
                        isRight ? 'text-left' : 'text-right'
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
