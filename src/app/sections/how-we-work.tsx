'use client';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionTitle, GlitchTypewriterText } from '../components';
import Image from 'next/image';

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

// Регистрируем плагин ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export const HowWeWork = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lastElementRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const { t } = useTranslation();

  const scrollStart = isDesktop ? 'center center+=20%' : 'top center';

  useEffect(() => {
    if (!sectionRef.current || !circleRef.current) return;

    // Создаем временную шкалу для анимации
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: isDesktop ? sectionRef.current : lastElementRef.current,
        scrub: 1,
        start: scrollStart,
        end: 'bottom top-=20%',
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
      sectionRef.current,
      {
        backgroundColor: '#141414',
        duration: 1,
        ease: 'power3.inOut',
      },
      '0'
    ).to(
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
  }, [isDesktop, scrollStart]);

  return (
    <section ref={sectionRef} id="main" className="relative h-full lg:h-[150vh] text-black overflow-hidden w-full">
      {/* Ваш контент */}
      <div ref={contentRef} className="container mx-auto px-4 py-20 relative z-10">
        {/* Чип */}
        <SectionTitle title={t('inside-focus.tag')} position="center" />

        {/* Заголовок */}
        <GlitchTypewriterText
          className="mb-20"
          lineClassName="text-center font-inter-tight font-bold leading-tight lg:text-4xl 2xl:text-6xl md:text-3xl text-[28px] bg-gradient-to-b from-black to-gray-gradient bg-clip-text text-transparent"
          text={t('inside-focus.title')}
        />

        {/* Сетка из 4 блоков desktop */}
        <div className="hidden lg:grid relative w-full grid-cols-2 gap-20">
          {/* Вертикальная линия (desktop only) */}
          <div className="hidden lg:block absolute left-1/2 top-0 h-[calc(50%-48px)] w-px bg-gray-300 -translate-x-1/2" />
          <div className="hidden lg:block absolute left-1/2 bottom-0 h-[calc(50%-48px)] w-px bg-gray-300 -translate-x-1/2" />

          {/* Горизонтальная линия (desktop only) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-[calc(50%-48px)] h-px bg-gray-300 -translate-y-1/2" />
          <div className="hidden lg:block absolute top-1/2 right-0 w-[calc(50%-48px)] h-px bg-gray-300 -translate-y-1/2" />

          {/* Верхний левый */}
          <div className="flex flex-col items-center justify-center ">
            <div className="text-center w-full">
              <h3 className="font-semibold mb-2 text-center text-base lg:text-lg">
                {t('inside-focus.creative_title')}
              </h3>
              <p className="text-sm lg:text-base text-gray-700 leading-relaxed text-center">
                {t('inside-focus.creative_text')}
              </p>
            </div>
          </div>

          {/* Верхний правый */}
          <div className="flex flex-col items-center justify-center w-full">
            <div className="text-center w-full">
              <h3 className="font-semibold mb-2 text-center text-base lg:text-lg">{t('inside-focus.ai_title')}</h3>
              <p className="text-sm lg:text-base text-gray-700 leading-relaxed text-center">
                {t('inside-focus.ai_text')}
              </p>
            </div>
          </div>

          {/* Нижний левый */}
          <div className="flex flex-col items-center justify-center w-full">
            <div className="text-center w-full">
              <h3 className="font-semibold text-center mb-2 text-base lg:text-lg">{t('inside-focus.ux_title')}</h3>
              <p className="text-sm lg:text-base text-gray-700 leading-relaxed text-center">
                {t('inside-focus.ux_text')}
              </p>
            </div>
          </div>

          {/* Нижний правый */}
          <div className="flex flex-col items-center justify-center w-full">
            <div className="text-center w-full">
              <h3 className="font-semibold mb-2 text-base lg:text-lg">{t('inside-focus.blockchain_title')}</h3>
              <p className="text-sm lg:text-base text-gray-700 leading-relaxed text-center">
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

        <div className="relative w-full grid grid-cols-1 gap-8 lg:hidden">
          {/* Верхний левый */}
          <div className="flex flex-col items-center justify-center ">
            <div className="text-center w-full">
              <h3 className="font-semibold mb-2 text-center text-base lg:text-lg">
                {t('inside-focus.creative_title')}
              </h3>
              <p className="text-sm lg:text-base text-gray-700 leading-relaxed text-center">
                {t('inside-focus.creative_text')}
              </p>
            </div>
            {/* Линия-разделитель для mobile */}
            <div className="h-px bg-gray-300 my-6 lg:hidden" />
          </div>

          {/* Верхний правый */}
          <div className="flex flex-col items-center justify-center w-full">
            <div className="text-center w-full">
              <h3 className="font-semibold mb-2 text-center text-base lg:text-lg">{t('inside-focus.ai_title')}</h3>
              <p className="text-sm lg:text-base text-gray-700 leading-relaxed text-center">
                {t('inside-focus.ai_text')}
              </p>
            </div>
            {/* Линия-разделитель для mobile */}
            <div className="w-full h-px bg-gray-300 my-6 lg:hidden" />
          </div>

          {/* Нижний левый */}
          <div className="flex flex-col items-center justify-center w-full">
            <div className="text-center w-full">
              <h3 className="font-semibold text-center mb-2 text-base lg:text-lg">{t('inside-focus.ux_title')}</h3>
              <p className="text-sm lg:text-base text-gray-700 leading-relaxed text-center">
                {t('inside-focus.ux_text')}
              </p>
            </div>
            {/* Линия-разделитель для mobile */}
            <div className="w-full h-px bg-gray-300 my-6 lg:hidden" />
          </div>

          {/* Нижний правый */}
          <div ref={lastElementRef} className="flex flex-col items-center justify-center w-full">
            <div className="text-center w-full">
              <h3 className="font-semibold mb-2 text-base lg:text-lg">{t('inside-focus.blockchain_title')}</h3>
              <p className="text-sm lg:text-base text-gray-700 leading-relaxed text-center">
                {t('inside-focus.blockchain_text')}
              </p>
            </div>
          </div>
        </div>
        {/*Круг с аватаркой для mobile, внизу, только на мобильных */}
        {!isDesktop && (
          <div ref={circleRef} className="z-20 flex lg:hidden w-full justify-center mt-8">
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
    </section>
  );
};
