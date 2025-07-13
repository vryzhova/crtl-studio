'use client';
import React, { useRef, useEffect, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getCases } from '../sections/helpers';
import { useTranslation } from 'react-i18next';
import dynamic from 'next/dynamic';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const CaseCarousel = dynamic(() => import('../components/portfolio-slider').then(mod => mod.CaseCarousel), {
  ssr: false,
});

type Case = {
  id: string;
  title: string;
  year: string;
  cover: string;
  images: string[];
  description: string;
  tags: string[];
};

export const Cases = () => {
  const { t } = useTranslation();

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
  const [containerAnimationDone, setContainerAnimationDone] = useState(false);
  const animationPlayedRef = useRef(false);

  const cases = useMemo(() => getCases(t), [t]);
  const isDesktop = typeof window !== 'undefined' && window.innerWidth > 1024;
  const textStyle =
    'text-center md:text-left text-2xl md:text-4xl px-5 lg:px-0 lg:text-end font-bold bg-gradient-to-b from-white lg:from-black to-gray-gradient bg-clip-text text-transparent';

  useEffect(() => {
    if (!containerRef.current || containerAnimationDone || !contentRef.current) return;

    if (isDesktop) {
      gsap.set(initialTextRef.current, { opacity: 1 });
      gsap.set(contentRef.current, { opacity: 0 });
      gsap.set(rightPanelRef.current, { opacity: 1, x: '100%' });
    } else {
      gsap.set(contentRef.current, { opacity: 1 });
      gsap.set(wrapperRef.current, { opacity: 0 });
      gsap.set(caseInfoRef.current, { opacity: 0 });
      gsap.set(caseNumbersRef.current, { opacity: 0 });
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
          .to({}, { duration: 2 })
          .to(containerRef.current, { duration: 1 })
          .to(initialTextRef.current, { x: -350, duration: 1 }, '-=0.8')
          .to(rightPanelRef.current, { opacity: 1, x: '0%', duration: 0.8 }, '-=0.8')
          .to(initialTextRef.current, { opacity: 0, duration: 1 })
          .to(rightPanelRef.current, { opacity: 0, duration: 0.8 })
          .add('simultaneous')
          .to(initialTextRef.current, { display: 'none', duration: 0.5 }, 'simultaneous')
          .to(rightPanelRef.current, { display: 'none', duration: 0.5 }, 'simultaneous')
          .to(initialTextContainerRef.current, { display: 'none', duration: 0.5 }, 'simultaneous')
          .to(contentRef.current, { opacity: 1, duration: 0.8 });

        setContainerAnimationDone(true);
      } else {
        timeline
          .to({}, { duration: 1 })
          .to(caseNumbersRef.current, { opacity: 1, duration: 1 })
          .add('simultaneous')
          .to(wrapperRef.current, { opacity: 1, duration: 0.8 }, 'simultaneous')
          .to(caseInfoRef.current, { opacity: 1, duration: 0.8 }, 'simultaneous');

        setContainerAnimationDone(true);
      }
    };

    return () => {
      observer.disconnect();
    };
  }, [containerAnimationDone, isDesktop]);

  // ScrollTrigger после вступительной анимации
  useEffect(() => {
    if (!containerAnimationDone) return;

    const container = containerRef.current;
    const wrapper = wrapperRef.current;

    console.log(!container || !wrapper);
    if (!container || !wrapper) return;

    const totalWidth = wrapper.scrollWidth;
    const scrollDistance = totalWidth - window.innerWidth;
    const start = isDesktop ? 'top top+=10%' : 'top top';

    // Высота wrapper — длина прокрутки + высота окна,
    // чтобы ScrollTrigger мог прокрутить весь горизонтальный контент
    container.style.height = `${scrollDistance + window.innerHeight}px`;

    const ctx = gsap.context(() => {
      gsap.to(wrapper, {
        x: () => `-${scrollDistance}px`,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: start,
          end: () => `+=${scrollDistance}`,
          scrub: true,
          pin: contentRef.current,
          anticipatePin: 1,
          onUpdate: self => {
            const viewportCenter = window.innerWidth / 2;
            let closestIdx = 0;
            let minDistance = Infinity;

            itemRefs.current.forEach((ref, idx) => {
              if (!ref) return;
              const rect = ref.getBoundingClientRect();
              const elementCenter = rect.left + rect.width / 2;
              const distanceToCenter = Math.abs(viewportCenter - elementCenter);

              // Найти ближайший элемент
              if (distanceToCenter < minDistance) {
                minDistance = distanceToCenter;
                closestIdx = idx;
              }
              const maxScale = 1;
              const minScale = 0.8;
              const maxDistance = window.innerWidth / 2;

              const scale = maxScale - (distanceToCenter / maxDistance) * (maxScale - minScale);

              gsap.to(ref, {
                scale: Math.max(minScale, Math.min(maxScale, scale)),
                duration: 0.2,
                ease: 'power2.out',
              });
            });

            setActiveIndex(closestIdx);
            // 🔥 Сбросить wrapper высоту, если достигли конца
            if (self.progress === 1 || self.progress === 0) {
              container.style.height = '';
            }
          },
          onLeave: () => {
            container.style.height = '';
          },
          onLeaveBack: () => {
            container.style.height = '';
          },
        },
      });
    }, container);

    return () => {
      ctx.revert();
      if (container) container.style.height = '';
    };
  }, [containerAnimationDone, isDesktop]);

  const openGallery = (caseItem: Case) => setActiveCase(caseItem);
  const closeGallery = () => setActiveCase(null);

  return (
    <section id="cases" ref={containerRef} className="relative overflow-hidden bg-black z-10">
      {/* Initial title */}
      {/*<div className="relative h-screen w-full" ref={initialTextContainerRef}>*/}

      <div
        ref={initialTextContainerRef}
        className="hidden lg:flex absolute w-screen h-screen flex-col items-center justify-center z-20"
      >
        <div ref={initialTextRef} className="flex flex-col lg:items-end justify-center items-center">
          <h2 className="text-start lg:text-center z-20 font-inter-tight font-bold leading-tight lg:text-4xl 2xl:text-6xl md:text-3xl text-[28px] bg-gradient-to-b from-white to-text-grad-dbg bg-clip-text text-transparent">
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
        className="relative h-screen overflow-hidden z-10 flex flex-col justify-center"
      >
        {/* Header */}
        <div className="absolute top-[-30px] left-0 w-full flex lg:justify-between flex-col lg:flex-row items-start lg:px-25 px-4 gap-5 pt-12 z-20 pointer-events-none">
          <h2 className="text-[28px] sm:text-[44px] font-bold bg-gradient-to-b from-white to-text-grad-dbg bg-clip-text text-transparent">
            {t('cases.title')}
          </h2>
          <div className="lg:text-right">
            <span
              ref={caseNumbersRef}
              className="whitespace-pre-line sm:text-[44px] text-[28px] font-bold bg-gradient-to-b from-white to-text-grad-dbg bg-clip-text text-transparent"
            >
              {t('cases.subtitle')}
            </span>
          </div>
        </div>

        {/* Horizontal scroll */}
        <div ref={wrapperRef} className="flex lg:mt-0 mt-30 items-center" style={{ width: `${cases.length * 60}vw` }}>
          {cases.map((item, index) => {
            const setRef = (el: HTMLDivElement) => (itemRefs.current[index] = el);
            return (
              <div
                key={item.id}
                // @ts-ignore
                ref={setRef}
                className="w-[60vw] sm:h-[55vh] h-[20vh] flex items-center justify-center p-2.5 cursor-pointer"
                onClick={() => openGallery(item)}
              >
                <Image
                  src={item.cover}
                  alt={item.title}
                  className="rounded-xl shadow-lg object-cover"
                  fill
                  priority={index === 0}
                />
              </div>
            );
          })}
        </div>

        {/* Case info + arrow */}
        <div
          ref={caseInfoRef}
          className="sticky mt-6.5 lg:right-20 flex gap-2 h-[70px] z-30"
          style={{ position: 'sticky', marginLeft: 'auto', width: 'fit-content' }}
        >
          <div className="p-6 flex items-center justify-between bg-lime-default rounded-md lg:w-[540px] w-[250px] cursor-default select-none">
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
