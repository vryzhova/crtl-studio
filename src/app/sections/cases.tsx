'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { CaseGallery } from '../components';
import { useTranslation } from 'react-i18next';

export const Cases = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const initialTextRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const animationPlayedRef = useRef(false);
  const caseNumbersRef = useRef<HTMLSpanElement>(null);
  const packedTextRef = useRef<HTMLSpanElement>(null);
  const businessesTextRef = useRef<HTMLHeadingElement>(null);
  const textStyle =
    'text-2xl md:text-4xl px-5 lg:px-0 lg:text-end font-bold lg:pb-20 mb-2 bg-gradient-to-b from-white lg:from-black to-gray-gradient bg-clip-text text-transparent';

  const isDesktop = window.innerWidth > 1024;

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.set(containerRef.current, { backgroundColor: '#141414' });
    gsap.set(initialTextRef.current, { opacity: 1 });
    gsap.set(mainContentRef.current, { opacity: 0 });

    if (isDesktop) {
      // Set initial state for desktop
      gsap.set(rightPanelRef.current, { opacity: 1, x: '100%' });
    } else {
      gsap.set(caseNumbersRef.current, { opacity: 0, y: 20 });
      gsap.set(packedTextRef.current, { opacity: 0, y: 20 });
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !animationPlayedRef.current) {
            animationPlayedRef.current = true;
            playAnimation();
          }
        });
      },
      {
        threshold: 0.8, // Срабатывает когда 80% элемента видно
      }
    );

    observer.observe(containerRef.current);

    const playAnimation = () => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.inOut' } });

      if (isDesktop) {
        timeline
          .to({}, { duration: 1 })
          .to(containerRef.current, { duration: 1 })
          .to(initialTextRef.current, { x: -350, duration: 1 }, '-=0.8')
          .to(rightPanelRef.current, { opacity: 1, x: '0%', duration: 0.8 }, '-=0.8')
          .to(rightPanelRef.current, { opacity: 1, duration: 0.8, backgroundColor: '#141414' })
          .to(initialTextRef.current, { y: -300, duration: 0.8 }, '-=0.8')
          .to(
            businessesTextRef.current,
            {
              y: -300,
              duration: 0.8,
            },
            '-=0.8'
          )
          .to(mainContentRef.current, { opacity: 1, duration: 0.8 });
      } else {
        timeline
          .to({}, { duration: 1 })
          .to(caseNumbersRef.current, { y: 0, opacity: 1, duration: 1 }, '-=0.2')
          .to(packedTextRef.current, { y: 0, opacity: 1, duration: 1 }, '-=0.4')
          .to(mainContentRef.current, { opacity: 1, duration: 0.8 });
      }
    };

    return () => {
      observer.disconnect();
    };
  }, [isDesktop]);

  return (
    <section
      id="cases"
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden bg-black flex flex-col lg:flex-row items-start justify-start lg:items-center lg:justify-center z-10"
    >
      {/* Initial text */}
      <h2
        ref={initialTextRef}
        className="lg:absolute text-start lg:text-center py-10 lg:pb-20 px-5 text-white z-10 font-inter-tight font-bold leading-tight lg:text-4xl 2xl:text-6xl md:text-3xl text-[28px]"
      >
        {t('cases.title')}
      </h2>

      <div className="flex flex-col lg:hidden">
        <span ref={caseNumbersRef} className={textStyle}>
          8 кейсов
        </span>
        <span ref={packedTextRef} className={textStyle}>
          8 упакованных бизнесов
        </span>
      </div>

      <div
        ref={rightPanelRef}
        className="hidden lg:flex absolute w-1/2 h-full right-0  flex-col items-center justify-center pl-12 bg-white"
      >
        <div className="flex flex-col lg:items-end">
          <h2 ref={businessesTextRef} className={textStyle}>
            {t('cases.subtitle')}
          </h2>
        </div>
      </div>

      <div
        ref={mainContentRef}
        className="absolute w-full h-full right-0 flex flex-col items-center justify-center pl-12"
      >
        <CaseGallery />
      </div>
    </section>
  );
};
