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
  const [activeCase, setActiveCase] = useState<Case | null>(null);
  const [activeImg, setActiveImg] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

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
      tags: ['Прототипирование', 'UX/UI-дизайн', 'Разработка сайта'],
    },
    // Добавьте другие кейсы по аналогии
  ];

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    if (!container || !wrapper) return;

    const scrollLength = container.scrollWidth - wrapper.offsetWidth;

    const ctx = gsap.context(() => {
      // Главный scroll-trigger
      gsap.to(container, {
        x: () => `-${scrollLength}px`,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: () => `+=${scrollLength}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          onUpdate: self => {
            const viewportCenter = window.innerWidth / 2;

            itemRefs.current.forEach(ref => {
              if (!ref) return;
              const rect = ref.getBoundingClientRect();
              const elementCenter = rect.left + rect.width / 2;
              const distanceToCenter = Math.abs(viewportCenter - elementCenter);

              // Чем ближе к центру — тем больше scale
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
          },
        },
      });
    }, wrapper);

    return () => ctx.revert();
  }, []);

  const openGallery = (caseItem: Case) => setActiveCase(caseItem);
  const closeGallery = () => setActiveCase(null);

  return (
    <div ref={wrapperRef} className="relative w-full h-full overflow-hidden bg-black text-white">
      {/* Горизонтальный контейнер */}
      <div ref={containerRef} className="flex h-full" style={{ width: `${cases.length * 100}vw` }}>
        {cases.map((item, index) => (
          <div
            ref={el => (itemRefs.current[index] = el)}
            key={item.id}
            className="w-max-[900px] h-full flex items-center justify-center p-10 cursor-pointer"
            onClick={() => openGallery(item)}
          >
            <Image
              src={item.cover}
              alt={item.title}
              className="rounded-xl shadow-lg object-cover"
              width={900}
              height={500}
            />
          </div>
        ))}
      </div>

      {/* Кнопки */}
      <div className="absolute right-10 bottom-10 flex gap-2 h-[70px] z-10">
        <div className="p-6 flex items-center justify-between bg-lime-default rounded-md w-[540px]">
          <span className="font-bold text-black">Get Crypto</span>
          <span className="px-3 text-black">2025</span>
        </div>
        <div className="flex items-center justify-center h-full w-[70px] bg-lime-default rounded-md">
          <img src="/arrow-btn.svg" alt="arrow" width={50} height={50} />
        </div>
      </div>

      {/* Модалка */}
      {activeCase && <CaseCarousel caseData={activeCase} onClose={closeGallery} />}
    </div>
  );
};
