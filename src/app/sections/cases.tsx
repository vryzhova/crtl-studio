'use client';
import React, { useRef, useEffect, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getCases } from '../sections/helpers';
import { useTranslation } from 'react-i18next';
import dynamic from 'next/dynamic';

const GlitchImageSwitch = dynamic(
  () => import('../components/glitch-image-switch').then(mod => mod.GlitchImageSwitch),
  {
    ssr: false,
  }
);

const CaseCarousel = dynamic(() => import('../components/portfolio-slider').then(mod => mod.CaseCarousel), {
  ssr: false,
});

type Case = {
  id: string;
  title: string;
  year: string;
  cover: string;
  images: string[];
  task?: string;
  taskTitle?: string;
  description: string[];
  tags: string[];
};

export const Cases = () => {
  const { t, i18n } = useTranslation();

  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const initialTextRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const initialTextContainerRef = useRef<HTMLDivElement>(null);
  const caseNumbersRef = useRef<HTMLHeadingElement>(null);
  const businessesTextRef = useRef<HTMLHeadingElement>(null);
  const caseInfoRef = useRef<HTMLDivElement>(null);

  const [activeCase, setActiveCase] = useState<Case | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const lang = i18n.language;

  const cases = useMemo(() => getCases(t, lang), [t, lang]);
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
  const textStyle =
    '2xl:text-[58px] md:text-[42px] text-[28px] text-center md:text-left px-5 lg:px-0 lg:text-end font-bold bg-gradient-to-b from-white lg:from-black to-gray-gradient bg-clip-text text-transparent';

  useEffect(() => {
    if (
      !containerRef.current ||
      !wrapperRef.current ||
      !contentRef.current ||
      !initialTextRef.current ||
      !initialTextContainerRef.current ||
      !rightPanelRef.current
    )
      return;

    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    const introText = initialTextRef.current;
    const introTextContainer = initialTextContainerRef.current;
    const rightPanel = rightPanelRef.current;

    // Сброс всех свойств перед анимацией
    gsap.set([introText, rightPanel, content], { clearProps: 'all' });

    if (isDesktop) {
      gsap.set(introText, { opacity: 1, x: 0 });
      gsap.set(rightPanel, { opacity: 1, x: '100%' });
      gsap.set(content, { opacity: 0 });
    } else {
      gsap.set(content, { opacity: 1 });
      gsap.set(wrapper, { opacity: 0 });
      gsap.set(caseInfoRef.current, { opacity: 0 });
      gsap.set(caseNumbersRef.current, { opacity: 0 });
    }

    // === 1. Intro Timeline (без scrub) ===
    const introTimeline = gsap.timeline({ paused: true });

    if (isDesktop) {
      introTimeline
        .to(introText, { x: -350, duration: 2, ease: 'power3.inOut' })
        .to(rightPanel, { x: '0%', duration: 2, ease: 'power3.inOut' }, '<')
        .to([introText, rightPanel], { opacity: 0, duration: 1, ease: 'power3.out' }, '+=0.2')
        .set([introTextContainer, rightPanel], { display: 'none' })
        .to(content, { opacity: 1, duration: 1 });
    } else {
      introTimeline
        .to(caseNumbersRef.current, { opacity: 1, duration: 0.5 })
        .add('simultaneous')
        .to(wrapper, { opacity: 1, duration: 0.5 }, 'simultaneous')
        .to(caseInfoRef.current, { opacity: 1, duration: 1 }, 'simultaneous');
    }

    // Запускаем introTimeline только при прокрутке вниз
    ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=300',
      onEnter: () => introTimeline.play(),
    });

    // === 2. Scroll Timeline (горизонтальный scroll + масштаб) ===
    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: true,
        start: 'top top',
        end: `bottom+=500%`,
        scrub: true,
        anticipatePin: 1,
        onUpdate: self => {
          const center = window.innerWidth / 2;
          let closestIdx = 0;
          let minDist = Infinity;

          itemRefs.current.forEach((ref, idx) => {
            if (!ref) return;
            const rect = ref.getBoundingClientRect();
            const itemCenter = rect.left + rect.width / 2;
            const dist = Math.abs(center - itemCenter);

            if (dist < minDist) {
              minDist = dist;
              closestIdx = idx;
            }

            const max = 1;
            const min = 0.8;
            const maxDist = window.innerWidth / 2;
            const scale = max - (dist / maxDist) * (max - min);

            gsap.to(ref, {
              scale: Math.max(min, Math.min(max, scale)),
              duration: 0.2,
              ease: 'power2.out',
            });
          });

          setActiveIndex(closestIdx);
        },
      },
    });

    // Перемещаем wrapper влево
    scrollTimeline.to(wrapper, {
      x: () => `-${wrapper.scrollWidth - window.innerWidth}px`,
      ease: 'none',
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [cases.length, isDesktop]);

  const openGallery = (caseItem: Case) => setActiveCase(caseItem);
  const closeGallery = () => setActiveCase(null);

  return (
    <section id="cases" ref={containerRef} className="relative overflow-hidden bg-black z-10">
      <div
        ref={initialTextContainerRef}
        className="hidden lg:flex absolute w-screen h-screen flex-col items-center justify-center z-20"
      >
        <div ref={initialTextRef} className="flex flex-col lg:items-end justify-center items-center">
          <h2 className="text-start lg:text-center z-20 font-inter-tight font-bold leading-none 2xl:text-[58px] md:text-[42px] text-[28px] bg-gradient-to-b from-white to-text-grad-dbg bg-clip-text text-transparent">
            {t('cases.title')}
          </h2>
        </div>
      </div>

      <div
        ref={rightPanelRef}
        className="hidden lg:flex absolute w-1/2 h-screen right-0 flex-col items-center justify-center pl-12 bg-white z-20"
      >
        <div className="flex flex-col lg:items-end items-center">
          <h2 ref={businessesTextRef} className={`${textStyle} whitespace-pre-line`}>
            {t('cases.subtitle')}
          </h2>
        </div>
      </div>

      <div
        id="gallery"
        ref={contentRef}
        className="relative h-screen overflow-hidden z-10 flex flex-col lg:justify-center "
      >
        {/* Header */}
        <div className="w-full flex lg:justify-between flex-col lg:flex-row items-start lg:px-25 px-4 gap-5 pt-12 z-20 pointer-events-none">
          <h2 className="2xl:text-[58px] md:text-[42px] text-[28px] leading-[100%] font-bold bg-gradient-to-b from-white to-text-grad-dbg bg-clip-text text-transparent">
            {t('cases.title')}
          </h2>
          <div className="lg:text-right">
            <span
              ref={caseNumbersRef}
              className="whitespace-pre-line leading-[100%] 2xl:text-[58px] md:text-[42px] text-[28px] font-bold bg-gradient-to-b from-white to-text-grad-dbg bg-clip-text text-transparent"
            >
              {t('cases.subtitle')}
            </span>
          </div>
        </div>

        {/* Horizontal scroll */}
        <div
          ref={wrapperRef}
          className="flex lg:mt-0 mt-30 justify-center items-center"
          style={{ width: `${cases.length * 80}vw` }}
        >
          {cases.map((item, index) => {
            const setRef = (el: HTMLDivElement) => (itemRefs.current[index] = el);
            return (
              <div
                key={item.id}
                // @ts-ignore
                ref={setRef}
                className="w-[80vw] sm:h-[60vh] h-[30vh] flex items-center justify-center cursor-pointer"
                onClick={() => openGallery(item)}
              >
                <GlitchImageSwitch
                  active={index === activeIndex}
                  imageSrc={item.cover}
                  className="rounded-xl shadow-lg object-cover"
                  priority={index === 0}
                  alt={item.title}
                />
              </div>
            );
          })}
        </div>

        {/* Case info + arrow */}
        <div
          ref={caseInfoRef}
          className="sticky mt-6.5 lg:right-20 bottom-20 flex justify-center gap-2 h-[70px] z-30 mx-auto lg:mx-0"
          style={{ position: 'sticky', marginLeft: 'auto', width: 'fit-content' }}
        >
          <div className="p-6 flex items-center justify-between bg-lime-default rounded-md lg:w-[540px] md:w-[620px] w-[250px] cursor-default select-none">
            <span className="font-bold text-black truncate">{cases[activeIndex]?.title}</span>
            <span className="px-3 text-black">{cases[activeIndex]?.year}</span>
          </div>
          <div
            className="flex items-center justify-center h-full w-[70px] bg-lime-default rounded-md cursor-pointer"
            onClick={() => setActiveCase(cases[activeIndex])}
          >
            <svg width="70" height="70" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="56" height="56" rx="12" fill="#D1F48C" />
              <rect x="2" y="2" width="56" height="56" rx="12" stroke="none" />
              <path d="M10 10 V18 M10 10 H18" stroke="#222" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M50 10 V18 M50 10 H42" stroke="#222" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M10 50 V42 M10 50 H18" stroke="#222" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M50 50 V42 M50 50 H42" stroke="#222" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M23 23 L37 37" stroke="#222" strokeWidth="1" strokeLinecap="round" />
              <path d="M37 37 H30" stroke="#222" strokeWidth="1" strokeLinecap="round" />
              <path d="M37 37 V30" stroke="#222" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Modal */}
        {activeCase && <CaseCarousel caseData={activeCase} onClose={closeGallery} />}
      </div>
    </section>
  );
};
