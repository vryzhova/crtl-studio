'use client';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionTitle, GlitchTypewriterText } from '../components';
import Image from 'next/image';
import { useIsWebView } from '@/app/hooks';

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

export const HowWeWork = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lastElementRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const { t } = useTranslation();
  const isTelegram = useIsWebView();

  useEffect(() => {
    if (!sectionRef.current || !circleRef.current || isTelegram) return;

    // Создаем временную шкалу для анимации
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: isDesktop ? sectionRef.current : lastElementRef.current,
        // pin: sectionRef.current,
        scrub: true,
        start: 'top top',
        end: '+=1000',
        anticipatePin: 1,
      },
    });

    // Анимация увеличения круга
    tl.to(
      circleRef.current,
      {
        width: 2000,
        height: 2000,
        // ease: 'sine.inOut',
      },
      0
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isDesktop, isTelegram]);

  return (
    <section
      ref={sectionRef}
      id="how-we-work"
      className="relative h-full lg:h-screen text-black bg-white overflow-hidden w-full mb-[100px] lg:mb-0 lg:pb-20"
    >
      {/* Ваш контент */}
      <div
        ref={contentRef}
        className="flex flex-col justify-center items-center container h-full mx-auto px-4 relative z-10"
      >
        {/* Чип */}
        <SectionTitle title={t('inside-focus.tag')} position="center" />

        {/* Заголовок */}
        <GlitchTypewriterText
          className="mb-10"
          lineClassName="text-center title lg:text-4xl 2xl:text-6xl md:text-3xl text-[28px]"
          text={t('inside-focus.title')}
          gradient="bg-gradient-to-b from-black to-gray-gradient bg-clip-text text-transparent"
        />

        {/* Сетка из 4 блоков desktop */}
        <div className="hidden lg:grid relative w-full grid-cols-2 gap-x-40 gap-y-30">
          {/* Вертикальная линия (desktop only) */}
          <div className="hidden lg:block absolute left-1/2 top-0 h-[calc(50%-48px)] w-px bg-gray-elements -translate-x-1/2" />
          <div className="hidden lg:block absolute left-1/2 bottom-0 h-[calc(50%-48px)] w-px bg-gray-elements -translate-x-1/2" />

          {/* Горизонтальная линия (desktop only) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-[calc(48%-48px)] h-px bg-gray-elements -translate-y-1/2" />
          <div className="hidden lg:block absolute top-1/2 right-0 w-[calc(48%-48px)] h-px bg-gray-elements -translate-y-1/2" />

          {/* Верхний левый */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-center w-full mx-auto">
              <h3 className="subtitle font-bold mb-2 text-center text-lg">{t('inside-focus.creative_title')}</h3>
              <p className="text-sm lg:text-base text-black leading-relaxed text-center">
                {t('inside-focus.creative_text')}
              </p>
            </div>
          </div>

          {/* Верхний правый */}
          <div className="flex flex-col items-center justify-center w-full">
            <div className="text-center w-full">
              <h3 className="subtitle mb-2 font-bold text-center text-base lg:text-lg">{t('inside-focus.ai_title')}</h3>
              <p className="text-sm lg:text-base text-black leading-relaxed text-center">{t('inside-focus.ai_text')}</p>
            </div>
          </div>

          {/* Нижний левый */}
          <div className="flex flex-col items-center justify-center w-full">
            <div className="text-center w-full">
              <h3 className="subtitle text-center font-bold mb-2 text-base lg:text-lg">{t('inside-focus.ux_title')}</h3>
              <p className="text-sm lg:text-base text-black leading-relaxed text-center">{t('inside-focus.ux_text')}</p>
            </div>
          </div>

          {/* Нижний правый */}
          <div className="flex flex-col items-center justify-center w-full">
            <div className="text-center w-full">
              <h3 className="subtitle mb-2 font-bold text-base lg:text-lg">{t('inside-focus.blockchain_title')}</h3>
              <p className="text-sm lg:text-base text-black leading-relaxed text-center">
                {t('inside-focus.blockchain_text')}
              </p>
            </div>
          </div>

          {/* Центральный круг с аватаркой (desktop only) */}
          {isDesktop && (
            <div
              ref={circleRef}
              className="hidden lg:block absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
              style={{ width: 88, height: 88, borderRadius: '50%', overflow: 'hidden' }}
            >
              <Image
                fill
                src="/circle.svg"
                alt="avatar"
                className="z-20 w-full h-full rounded-full border-2 absolute -bottom-2 -right-2"
              />
            </div>
          )}
        </div>

        <div className="relative w-full grid grid-cols-1 gap-8 lg:hidden">
          {/* Верхний левый */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-center w-[80vw]">
              <h3 className="subtitle mb-2 text-center text-base lg:text-lg">{t('inside-focus.creative_title')}</h3>
              <p className="text-sm lg:text-base text-black leading-relaxed text-center">
                {t('inside-focus.creative_text')}
              </p>
            </div>
            {/* Линия-разделитель для mobile */}
            <div className="w-full h-px bg-gray-elements my-6 lg:hidden" />
          </div>

          {/* Верхний правый */}
          <div className="flex flex-col items-center justify-center w-full">
            <div className="text-center w-[80vw]">
              <h3 className="subtitle mb-2 text-center text-base lg:text-lg">{t('inside-focus.ai_title')}</h3>
              <p className="text-sm lg:text-base text-black leading-relaxed text-center">{t('inside-focus.ai_text')}</p>
            </div>
            {/* Линия-разделитель для mobile */}
            <div className="w-full h-px bg-gray-elements my-6 lg:hidden" />
          </div>

          {/* Нижний левый */}
          <div ref={lastElementRef} className="flex flex-col items-center justify-center w-full">
            <div className="text-center w-[80vw]">
              <h3 className="subtitle text-center mb-2 text-base lg:text-lg">{t('inside-focus.ux_title')}</h3>
              <p className="text-sm lg:text-base text-black leading-relaxed text-center">{t('inside-focus.ux_text')}</p>
            </div>
            {/* Линия-разделитель для mobile */}
            <div className="w-full h-px bg-gray-elements my-6 lg:hidden" />
          </div>

          {/* Нижний правый */}
          <div className="flex flex-col items-center justify-center w-full">
            <div className="text-center w-[80vw]">
              <h3 className="subtitle mb-2 text-base lg:text-lg">{t('inside-focus.blockchain_title')}</h3>
              <p className="text-sm lg:text-base text-black leading-relaxed text-center">
                {t('inside-focus.blockchain_text')}
              </p>
            </div>
          </div>
          <div className="w-full h-px bg-gray-elements my-6 lg:hidden" />
        </div>
        {/*Круг с аватаркой для mobile, внизу, только на мобильных */}
        {!isDesktop && (
          <div className="relative w-full h-[227px] flex items-center justify-center">
            <div
              ref={circleRef}
              className="z-20 flex lg:hidden"
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translate(-50%, 10%)',
                width: 88,
                height: 88,
                borderRadius: '50%',
                overflow: 'hidden',
                willChange: 'width, height, transform',
              }}
            >
              <Image
                fill
                src="/circle.svg"
                alt="avatar"
                className="w-full h-full object-cover"
                style={{ borderRadius: '50%' }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
