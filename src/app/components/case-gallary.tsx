'use client';

import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Case = {
  id: string;
  title: string;
  year: string;
  cover: string;
  images: string[];
  description: string;
  tags: string[];
};

const CaseCarousel = dynamic(() => import('./portfolio-slider').then(mod => mod.CaseCarousel), { ssr: false });

export const CaseGallery: React.FC = () => {
  const { t } = useTranslation();

  const cases: Case[] = [
    {
      id: 'right-side',
      title: 'Right Side',
      year: '2025',
      cover: '/cases/RS_cover.png',
      images: ['/cases/RS.png', '/cases/RS2.png', '/cases/RS3.png', '/cases/RS_4.png', '/cases/RS5.png'],
      description: 'Описание кейса...',
      tags: [t('cases.case_2_tag_1'), t('cases.case_2_tag_2'), t('cases.case_2_tag_3')],
    },
    {
      id: 'seven-senses',
      title: 'SEVEN SENSES',
      year: '2025',
      cover: '/cases/7S_cover.png',
      images: ['/cases/S7_1.png', '/cases/S7_2.png', '/cases/S7_3.png', '/cases/S7_4.png', '/cases/S7_5.png'],
      description: 'Описание кейса...',
      tags: [t('cases.case_2_tag_1'), t('cases.case_2_tag_2'), t('cases.case_2_tag_3')],
    },
    {
      id: 'pay-killa',
      title: 'PayKilla',
      year: '2025',
      cover: '/cases/PAYK_cover.png',
      images: ['/cases/PK_1.png', '/cases/PK_2.png', '/cases/PK_3.png', '/cases/PK_4.png', '/cases/PK_5.png'],
      description: 'Описание кейса...',
      tags: [t('cases.case_3_tag_1'), t('cases.case_3_tag_2'), t('cases.case_3_tag_3')],
    },
    {
      id: 'aim',
      title: 'AIM',
      year: '2025',
      cover: '/cases/AIM_cover.png',
      images: ['/cases/AIM.png', '/cases/AIM_1.png', '/cases/AIM_2.png', '/cases/AIM_3.png', '/cases/AIM_4.png'],
      description: 'Описание кейса...',
      tags: [t('cases.case_4_tag_1')],
    },
    {
      id: 'pythia',
      title: 'PYTHIA',
      year: '2025',
      cover: '/cases/PYTHIA_cover.png',
      images: ['/cases/PYTHIA.png', '/cases/PYTHIA_5.png', '/cases/PYTHIA_3.png', '/cases/PYTHIA_4.png'],
      description: 'Описание кейса...',
      tags: [t('cases.case_5_tag_1')],
    },
    {
      id: '3d',
      title: t('cases.case_6_name'),
      year: '2025',
      cover: '/cases/3D_game_cover.png',
      images: ['/cases/3D_игра.png', '/cases/3D_игра_2.png', '/cases/3D_игра_3.png', '/cases/3D_игра_4.png'],
      description: 'Описание кейса...',
      tags: [t('cases.case_5_tag_1')],
    },
    {
      id: 'mini-app',
      title: t('cases.case_7_name'),
      year: '2025',
      cover: '/cases/club_cover.png',
      images: [
        '/cases/Инвестиционный_клуб_1.png',
        '/cases/Инвестиционный_клуб_2.png',
        '/cases/Инвестиционный_клуб_3.png',
        '/cases/Инвестиционный_клуб_4.png',
      ],
      description: 'Описание кейса...',
      tags: [t('cases.case_5_tag_1')],
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeCase, setActiveCase] = useState<Case | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    if (!container || !wrapper) return;

    const totalWidth = container.scrollWidth;
    const scrollDistance = totalWidth - window.innerWidth;

    // Высота wrapper — длина прокрутки + высота окна,
    // чтобы ScrollTrigger мог прокрутить весь горизонтальный контент
    wrapper.style.height = `${scrollDistance + window.innerHeight}px`;

    const ctx = gsap.context(() => {
      gsap.to(container, {
        x: () => `-${scrollDistance}px`,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top+=20%',
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
              wrapper.style.height = '';
            }
          },
          onLeave: () => {
            wrapper.style.height = '';
          },
          onLeaveBack: () => {
            wrapper.style.height = '';
          },
        },
      });
    }, wrapper);

    return () => {
      ctx.revert();
      if (wrapper) wrapper.style.height = '';
    };
  }, [cases.length]);

  const openGallery = (caseItem: Case) => setActiveCase(caseItem);
  const closeGallery = () => setActiveCase(null);

  return (
    <section ref={wrapperRef} className="relative overflow-hidden bg-black text-white select-none">
      <div id="gallery" ref={contentRef} className="relative h-screen overflow-hidden">
        {/* Заголовки секции */}
        <div className="absolute top-0 left-0 w-full flex justify-between items-start px-10 pt-12 z-20 pointer-events-none">
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
        {/* Горизонтальный контейнер */}
        <div ref={containerRef} className="flex items-center" style={{ width: `${cases.length * 70}vw` }}>
          {cases.map((item, index) => {
            const getRef = (el: HTMLDivElement) => (itemRefs.current[index] = el);

            return (
              <div
                // @ts-ignore
                ref={getRef}
                key={item.id}
                className="w-[70vw] h-[70vh] flex items-center justify-center p-10 cursor-pointer"
                onClick={() => openGallery(item)}
              >
                <Image
                  src={item.cover}
                  alt={item.title}
                  className="rounded-xl shadow-lg object-cover"
                  width={900}
                  height={500}
                  priority={index === 0} // можно префетчить первый для скорости
                />
              </div>
            );
          })}
        </div>

        <div
          className="sticky bottom-10 right-10 flex gap-2 h-[70px] z-30"
          style={{ position: 'sticky', marginLeft: 'auto', width: 'fit-content' }}
        >
          <div className="p-6 flex items-center justify-between bg-lime-default rounded-md w-[540px] cursor-default select-none">
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

        {/* Модалка с кейсом */}
        {activeCase && <CaseCarousel caseData={activeCase} onClose={closeGallery} />}
      </div>
    </section>
  );
};
