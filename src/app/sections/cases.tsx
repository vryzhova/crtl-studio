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
  const caseNumbersRef = useRef<HTMLSpanElement>(null);
  const packedTextRef = useRef<HTMLSpanElement>(null);
  const businessesTextRef = useRef<HTMLHeadingElement>(null);

  const [activeCase, setActiveCase] = useState<Case | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerAnimationDone, setContainerAnimationDone] = useState(false);
  const [shouldInitScrollTrigger, setShouldInitScrollTrigger] = useState(false);
  const animationPlayedRef = useRef(false);
  console.log('Cases rendered', containerAnimationDone);

  const cases = useMemo(() => getCases(t), [t]);
  const isDesktop = typeof window !== 'undefined' && window.innerWidth > 1024;
  console.log(isDesktop);

  const textStyle =
    'text-2xl md:text-4xl px-5 lg:px-0 lg:text-end font-bold lg:pb-20 mb-2 bg-gradient-to-b from-white lg:from-black to-gray-gradient bg-clip-text text-transparent';

  useEffect(() => {
    if (!containerRef.current || containerAnimationDone || !contentRef.current) return;
    gsap.set(initialTextRef.current, { opacity: 1 });
    gsap.set(contentRef.current, { opacity: 0 });

    if (isDesktop) {
      // Set initial state for desktop
      gsap.set(rightPanelRef.current, { opacity: 1, x: '100%' });
    } else {
      // gsap.set(caseNumbersRef.current, { opacity: 0, y: 20 });
      // gsap.set(packedTextRef.current, { opacity: 0, y: 20 });
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
          .to(initialTextRef.current, { opacity: 0, duration: 1 })
          .to(contentRef.current, { opacity: 1, duration: 0.8 });

        console.log('here1');

        setContainerAnimationDone(true);
      } else {
        timeline
          .to({}, { duration: 1 })
          .to(containerRef.current, { duration: 1 })
          .to(initialTextRef.current, { opacity: 0, duration: 1 })
          .to(contentRef.current, { opacity: 1, duration: 0.8 });

        console.log('here');

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
    const start = isDesktop ? 'top top+=20%' : 'top top';

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

            itemRefs.current.forEach(ref => {
              if (!ref) return;
              const rect = ref.getBoundingClientRect();
              const elementCenter = rect.left + rect.width / 2;
              const distanceToCenter = Math.abs(viewportCenter - elementCenter);

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
      <h2
        ref={initialTextRef}
        className="lg:absolute lg:top-1/2 lg:left-1/2 text-start lg:text-center py-10 lg:pb-20 px-5 text-white z-20 font-inter-tight font-bold leading-tight lg:text-4xl 2xl:text-6xl md:text-3xl text-[28px]"
      >
        {t('cases.title')}
      </h2>

      {/*<div className="flex flex-col lg:hidden">*/}
      {/*  <span ref={caseNumbersRef} className={textStyle}>*/}
      {/*    8 кейсов*/}
      {/*  </span>*/}
      {/*  <span ref={packedTextRef} className={textStyle}>*/}
      {/*    8 упакованных бизнесов*/}
      {/*  </span>*/}
      {/*</div>*/}

      <div
        ref={rightPanelRef}
        className="hidden lg:flex absolute w-1/2 h-full right-0 flex-col items-center justify-center pl-12 bg-white"
      >
        <div className="flex flex-col lg:items-end">
          <h2 ref={businessesTextRef} className={textStyle}>
            {t('cases.subtitle')}
          </h2>
        </div>
      </div>

      <div id="gallery" ref={contentRef} className="relative h-screen overflow-hidden z-10">
        {/* Header */}
        <div className="absolute top-[-50px] left-0 w-full justify-between flex items-start px-10 pt-12 z-20 pointer-events-none display-none lg:display">
          <h2 className="text-2xl md:text-3xl font-bold text-[#CFCFCF]">Наши кейсы</h2>
          <div className="text-right">
            <div className="text-2xl md:text-3xl font-bold text-white">8 кейсов</div>
            <div className="text-xl md:text-2xl font-bold text-[#979797] leading-tight">
              8 упакованных
              <br />
              бизнесов
            </div>
          </div>
        </div>

        {/* Horizontal scroll */}
        <div ref={wrapperRef} className="flex items-center" style={{ width: `${cases.length * 80}vw` }}>
          {cases.map((item, index) => {
            const setRef = (el: HTMLDivElement) => (itemRefs.current[index] = el);
            return (
              <div
                key={item.id}
                // @ts-ignore
                ref={setRef}
                className="w-[80vw] lg:h-[70vh] flex items-center justify-center p-2.5 cursor-pointer"
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
          className="sticky bottom-10 right-10 flex gap-2 h-[70px] z-30"
          style={{ position: 'sticky', marginLeft: 'auto', width: 'fit-content' }}
        >
          <div className="p-6 flex items-center justify-between bg-lime-default rounded-md w-fulllg:w-[540px] cursor-default select-none">
            <span className="font-bold text-black truncate">{cases[activeIndex]?.title}</span>
            <span className="px-3 text-black">{cases[activeIndex]?.year}</span>
          </div>
          <div
            className="flex items-center justify-center h-full w-[70px] bg-lime-default rounded-md cursor-pointer"
            onClick={() => setActiveCase(cases[activeIndex])}
          >
            <img src="/arrow-btn.svg" alt="arrow" width={50} height={50} />
          </div>
        </div>

        {/* Modal */}
        {activeCase && <CaseCarousel caseData={activeCase} onClose={closeGallery} />}
      </div>
    </section>
  );
};
