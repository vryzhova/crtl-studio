'use client';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';
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
  const circleRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lastElementRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery('(min-width: 1280px)');
  const { t } = useTranslation();
  const isTelegram = useIsWebView();

  useEffect(() => {
    if (!sectionRef.current || !circleRef.current || isTelegram) return;

    const morphElement = document.getElementById('morph');
    const circleElement = document.getElementById('circle');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: isDesktop ? sectionRef.current : lastElementRef.current,
        pin: true,
        scrub: 2,
        start: 'top top',
        end: 'bottom top',
      },
    });

    tl.to(morphElement, {
      duration: 3,
      rotation: 70,
    });
    tl.to(
      circleElement,
      {
        scale: 1,
        duration: 7,
      },
      0
    ).to(sectionRef.current, { background: '#141414', opacity: 0 });

    return () => {
      tl.kill();
    };
  }, [isDesktop, isTelegram]);

  return (
    <section
      ref={sectionRef}
      id="how-we-work"
      className="relative h-full xl:h-screen text-black bg-white overflow-hidden w-full"
    >
      {/* Ваш контент */}
      <div ref={contentRef} className="own-container h-full flex flex-col items-center relative z-10">
        {/* Чип */}
        <SectionTitle title={t('inside-focus.tag')} position="center" />

        {/* Заголовок */}
        <GlitchTypewriterText
          className="max-xl:self-start mb-10 xl:mb-15 3xl:text-[58px] md:text-[42px] text-[28px] leading-[107%]"
          lineClassName="xl:text-center title"
          text={t('inside-focus.title')}
          gradient="bg-gradient-to-b from-black to-gray-gradient bg-clip-text text-transparent"
        />

        {/* Сетка из 4 блоков desktop */}
        <div className="hidden grow-2 xl:grid relative w-full grid-cols-2 gap-x-18 gap-y-18">
          {/* Вертикальная линия (desktop only) */}
          <div className="hidden xl:block absolute left-1/2 top-0 h-[calc(50%-48px)] w-px bg-gray-elements -translate-x-1/2" />
          <div className="hidden xl:block absolute left-1/2 bottom-0 h-[calc(50%-48px)] w-px bg-gray-elements -translate-x-1/2" />

          {/* Горизонтальная линия (desktop only) */}
          <div className="hidden xl:block absolute top-1/2 left-0 w-[calc(48%-48px)] h-px bg-gray-elements -translate-y-1/2" />
          <div className="hidden xl:block absolute top-1/2 right-0 w-[calc(48%-48px)] h-px bg-gray-elements -translate-y-1/2" />

          {/* Верхний левый */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-center w-[392px]">
              <h3 className="subtitle font-bold mb-2 text-center text-lg">{t('inside-focus.creative_title')}</h3>
              <p className="text-sm font-inter xl:text-base text-black leading-none text-center">
                {t('inside-focus.creative_text')}
              </p>
            </div>
          </div>

          {/* Верхний правый */}
          <div className="flex flex-col items-center justify-center w-full">
            <div className="text-center w-[392px]">
              <h3 className="subtitle mb-2 font-bold text-center text-base xl:text-lg">{t('inside-focus.ai_title')}</h3>
              <p className="text-sm font-inter xl:text-base text-black leading-none text-center">
                {t('inside-focus.ai_text')}
              </p>
            </div>
          </div>

          {/* Нижний левый */}
          <div className="flex flex-col items-center justify-center w-full">
            <div className="text-center w-[392px]">
              <h3 className="subtitle text-center font-bold mb-2 text-base xl:text-lg">{t('inside-focus.ux_title')}</h3>
              <p className="text-sm font-inter xl:text-base text-black leading-none text-center">
                {t('inside-focus.ux_text')}
              </p>
            </div>
          </div>

          {/* Нижний правый */}
          <div className="flex flex-col items-center justify-center w-full">
            <div className="text-center w-[392px]">
              <h3 className="subtitle mb-2 font-bold text-base xl:text-lg">{t('inside-focus.blockchain_title')}</h3>
              <p className="text-sm font-inter xl:text-base text-black leading-none text-center">
                {t('inside-focus.blockchain_text')}
              </p>
            </div>
          </div>

          {/* Центральный круг с аватаркой (desktop only) */}
          {isDesktop && (
            <>
              <Image
                id="morph"
                // ref={circleRef}
                width={88}
                height={88}
                src="/circle.svg"
                alt="avatar"
                className="rounded-full border-2 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
              />
              <div id="circle" ref={circleRef} className="circle overflow-x-hidden"></div>
            </>
          )}
        </div>

        {/* Сетка из 4 блоков mobile */}
        <div className="relative w-full grid grid-cols-1 xl:hidden">
          {/* Верхний левый */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-center w-[70vw]">
              <h4 className="subtitle text-center text-base xl:text-xl mb-4">{t('inside-focus.creative_title')}</h4>
              <p className="text-sm xl:text-base text-black leading-relaxed text-center">
                {t('inside-focus.creative_text')}
              </p>
            </div>
            {/* Линия-разделитель для mobile */}
            <div ref={lastElementRef} className="w-full h-px bg-gray-elements my-7.5 xl:hidden" />
          </div>

          {/* Верхний правый */}
          <div className="flex flex-col items-center justify-center w-full">
            <div className="text-center w-[60vw]">
              <h4 className="subtitle text-center text-base xl:text-xl mb-4">{t('inside-focus.ai_title')}</h4>
              <p className="text-sm text-black leading-relaxed text-center">{t('inside-focus.ai_text')}</p>
            </div>
            {/* Линия-разделитель для mobile */}
            <div className="w-full h-px bg-gray-elements my-7.5 xl:hidden" />
          </div>

          {/* Нижний левый */}
          <div className="flex flex-col items-center justify-center w-full">
            <div className="text-center w-[70vw]">
              <h4 className="subtitle text-center xl:text-xl text-base mb-4">{t('inside-focus.ux_title')}</h4>
              <p className="text-sm text-black leading-relaxed text-center">{t('inside-focus.ux_text')}</p>
            </div>
            {/* Линия-разделитель для mobile */}
            <div className="w-full h-px bg-gray-elements my-7.5 xl:hidden" />
          </div>

          {/* Нижний правый */}
          <div className="flex flex-col items-center justify-center w-full">
            <div className="text-center w-[70vw]">
              <h4 className="subtitle text-base xl:text-xl mb-4">{t('inside-focus.blockchain_title')}</h4>
              <p className="text-sm text-black leading-relaxed text-center">{t('inside-focus.blockchain_text')}</p>
            </div>
          </div>
          <div className="w-full h-px bg-gray-elements mt-7.5 xl:hidden" />
        </div>
        {/*Круг с аватаркой для mobile, внизу, только на мобильных */}
        {!isDesktop && (
          <div className="relative w-full h-[227px] flex items-center justify-center">
            <div id="circle" ref={circleRef} className="circle overflow-x-hidden"></div>
            <Image
              id="morph"
              width={88}
              height={88}
              src="/circle.svg"
              alt="avatar"
              className="object-contain"
              style={{ borderRadius: '50%' }}
            />
          </div>
        )}
      </div>
    </section>
  );
};
