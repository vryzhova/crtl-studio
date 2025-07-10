'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionTitle } from '@/app/components/section-title';
import Image from 'next/image';

const steps = [
  {
    number: '01',
    title: 'Анализ',
    description: 'Проводим глубокий анализ вашего бизнеса и выявляем ключевые точки роста',
  },
  {
    number: '02',
    title: 'Стратегия',
    description: 'Разрабатываем индивидуальную стратегию внедрения AI-решений',
  },
  {
    number: '03',
    title: 'Внедрение',
    description: 'Интегрируем и настраиваем AI-инструменты под ваши задачи',
  },
  {
    number: '04',
    title: 'Обучение',
    description: 'Обучаем вашу команду работе с новыми инструментами',
  },
];

// Регистрируем плагин ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export const HowWeWork = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isDesktop = window.innerWidth > 1024;
  const { t } = useTranslation();

  useEffect(() => {
    if (!sectionRef.current || !circleRef.current) return;

    // Создаем временную шкалу для анимации
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        pinSpacing: false,
        scrub: 1,
        start: 'center center+=20%',
        end: 'bottom top-=20%',
        markers: true, // Для отладки
        anticipatePin: 1,
      },
    });

    // Анимация увеличения круга
    tl.to(
      circleRef.current,
      {
        scale: 2000,
        duration: 5,
        transformOrigin: '50% 50%',
        ease: 'power3.inOut',
      },
      0
    );

    // Анимация исчезновения контента
    tl.to(
      contentRef.current,
      {
        opacity: 0,
        duration: 1,
        ease: 'power1.out',
      },
      '-=1'
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="main"
      className="relative w-full min-h-screen lg:h-[150vh] flex flex-col items-center justify-start text-black overflow-hidden"
    >
      <div className="w-full max-w-7xl px-4 mx-auto h-screen flex flex-col justify-center">
        {/* Ваш контент */}
        <div ref={contentRef} className="relative z-10 w-full">
          <div className="w-full max-w-7xl px-4 mx-auto">
            {/* Чип */}
            <SectionTitle title={t('inside-focus.tag')} />

            {/* Заголовок */}
            <h2 className="text-center font-inter-tight font-bold leading-tight lg:text-4xl 2xl:text-6xl md:text-3xl text-[28px] mb-20 bg-gradient-to-b from-black to-gray-gradient bg-clip-text text-transparent">
              {t('inside-focus.title')}
            </h2>

            {/* Сетка из 4 блоков */}
            <div ref={contentRef} className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20">
              {/* Вертикальная линия (desktop only) */}
              <div className="hidden lg:block absolute left-1/2 top-0 h-[calc(50%-48px)] w-px bg-gray-300 -translate-x-1/2" />
              <div className="hidden lg:block absolute left-1/2 bottom-0 h-[calc(50%-48px)] w-px bg-gray-300 -translate-x-1/2" />

              {/* Горизонтальная линия (desktop only) */}
              <div className="hidden lg:block absolute top-1/2 left-0 w-[calc(50%-48px)] h-px bg-gray-300 -translate-y-1/2" />
              <div className="hidden lg:block absolute top-1/2 right-0 w-[calc(50%-48px)] h-px bg-gray-300 -translate-y-1/2" />

              {/* Верхний левый */}
              <div className="flex flex-col items-center lg:items-end justify-center lg:justify-end w-full">
                <div className="text-center lg:text-right w-full">
                  <h3 className="font-semibold mb-2 text-center text-base lg:text-lg">
                    {t('inside-focus.creative_title')}
                  </h3>
                  <p className="text-sm lg:text-base text-gray-700 leading-relaxed text-center lg:text-right">
                    {t('inside-focus.creative_text')}
                  </p>
                </div>
                {/* Линия-разделитель для mobile */}
                <div className="w-full h-px bg-gray-300 my-6 lg:hidden" />
              </div>

              {/* Верхний правый */}
              <div className="flex flex-col items-center lg:items-start justify-center lg:justify-start w-full">
                <div className="text-center lg:text-left w-full">
                  <h3 className="font-semibold mb-2 text-center text-base lg:text-lg">{t('inside-focus.ai_title')}</h3>
                  <p className="text-sm lg:text-base text-gray-700 leading-relaxed text-center lg:text-left">
                    {t('inside-focus.ai_text')}
                  </p>
                </div>
                {/* Линия-разделитель для mobile */}
                <div className="w-full h-px bg-gray-300 my-6 lg:hidden" />
              </div>

              {/* Нижний левый */}
              <div className="flex flex-col items-center lg:items-end justify-center lg:justify-end w-full">
                <div className="text-center lg:text-right w-full">
                  <h3 className="font-semibold text-center mb-2 text-base lg:text-lg">{t('inside-focus.ux_title')}</h3>
                  <p className="text-sm lg:text-base text-gray-700 leading-relaxed text-center lg:text-right">
                    {t('inside-focus.ux_text')}
                  </p>
                </div>
                {/* Линия-разделитель для mobile */}
                <div className="w-full h-px bg-gray-300 my-6 lg:hidden" />
              </div>

              {/* Нижний правый */}
              <div className="flex flex-col items-center lg:items-start justify-center lg:justify-start w-full">
                <div className="text-center lg:text-left w-full">
                  <h3 className="font-semibold mb-2 text-base lg:text-lg">{t('inside-focus.blockchain_title')}</h3>
                  <p className="text-sm lg:text-base text-gray-700 leading-relaxed text-center lg:text-left">
                    {t('inside-focus.blockchain_text')}
                  </p>
                </div>
              </div>

              {/* Центральный круг с аватаркой (desktop only) */}
              {isDesktop && (
                <div
                  ref={circleRef}
                  className="hidden lg:block absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="relative w-22 h-22 flex items-center justify-center">
                    <Image
                      fill
                      src="/circle.svg"
                      alt="avatar"
                      className="z-20 w-10 h-10 rounded-full border-2 absolute -bottom-2 -right-2"
                    />
                  </div>
                </div>
              )}
            </div>
            {/*Круг с аватаркой для mobile, внизу, только на мобильных */}
            {!isDesktop && (
              <div ref={circleRef} className="z-20 flex lg:hidden w-full justify-center mt-8 ">
                <div className="relative w-22 h-22 flex items-center justify-center">
                  <Image
                    fill
                    src="/circle.svg"
                    alt="avatar"
                    className="z-20 w-10 h-10 rounded-full border-2  absolute -bottom-2 -right-2"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
