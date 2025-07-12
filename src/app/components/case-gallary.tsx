'use client';

import React, { useState, useRef } from 'react';
import { CaseCarousel } from './portfolio-slider';
import { useTranslation } from 'react-i18next';
// Тип для кейса
type Case = {
  id: string;
  title: string;
  year: string;
  cover: string;
  images: string[];
  description: string;
  tags: string[];
};

export const CaseGallery: React.FC = () => {
  const [activeCase, setActiveCase] = useState<Case | null>(null); // выбранный кейс для попапа
  const [activeImg, setActiveImg] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const cases: Case[] = [
    {
      id: 'right-side',
      title: 'Right Side',
      year: '2025',
      cover: '/cases/case1.png',
      images: ['/cases/RS.png', '/cases/RS2.png', '/cases/RS3.png', '/cases/RS_4.png', '/cases/RS5.png'],
      description: 'Описание кейса...',
      tags: [t('cases.case_2_tag_1'), t('cases.case_2_tag_2'), t('cases.case_2_tag_3')],
    },
    {
      id: 'seven-senses',
      title: 'SEVEN SENSES',
      year: '2025',
      cover: '/cases/case2.png',
      images: ['/cases/S7_1.png', '/cases/S7_2.png', '/cases/S7_3.png', '/cases/S7_4.png', '/cases/S7_5.png'],
      description: 'Описание кейса...',
      tags: [t('cases.case_2_tag_1'), t('cases.case_2_tag_2'), t('cases.case_2_tag_3')],
    },
    {
      id: 'pay-killa',
      title: 'PayKilla',
      year: '2025',
      cover: '/cases/case3.png',
      images: ['/cases/PK_1.png', '/cases/PK_2.png', '/cases/PK_3.png', '/cases/PK_4.png', '/cases/PK_5.png'],
      description: 'Описание кейса...',
      tags: [t('cases.case_3_tag_1'), t('cases.case_3_tag_2'), t('cases.case_3_tag_3')],
    },
    {
      id: 'aim',
      title: 'AIM',
      year: '2025',
      cover: '/cases/case4.png',
      images: ['/cases/AIM.png', '/cases/AIM_1.png', '/cases/AIM_2.png', '/cases/AIM_3.png', '/cases/AIM_4.png'],
      description: 'Описание кейса...',
      tags: [t('cases.case_4_tag_1')],
    },
    {
      id: 'aim',
      title: 'AIM',
      year: '2025',
      cover: '/cases/case4.png',
      images: ['/cases/PYTHIA.png', '/cases/PYTHIA_5.png', '/cases/PYTHIA_3.png', '/cases/PYTHIA_4.png'],
      description: 'Описание кейса...',
      tags: [t('cases.case_5_tag_1')],
    },
    {
      id: 'aim',
      title: 'AIM',
      year: '2025',
      cover: '/cases/case5.png',
      images: ['/cases/PYTHIA.png', '/cases/PYTHIA_5.png', '/cases/PYTHIA_3.png', '/cases/PYTHIA_4.png'],
      description: 'Описание кейса...',
      tags: [t('cases.case_5_tag_1')],
    },
    {
      id: 'aim',
      title: 'AIM',
      year: '2025',
      cover: '/cases/case6.png',
      images: ['/cases/3D_игра.png', '/cases/3D_игра_2.png', '/cases/3D_игра_3.png', '/cases/3D_игра_4.png'],
      description: 'Описание кейса...',
      tags: [t('cases.case_5_tag_1')],
    },
    {
      id: 'aim',
      title: 'AIM',
      year: '2025',
      cover: '/cases/case7.png', // замените на свой путь
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

  // Горизонтальный скролл колесиком
  const handleWheel = (e: React.WheelEvent) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += e.deltaY;
    }
  };

  // Открыть попап
  const openGallery = (caseItem: Case) => {
    setActiveCase(caseItem);
    setActiveImg(0);
  };

  // Закрыть попап
  const closeGallery = () => setActiveCase(null);

  // Листать фото в попапе
  const prevImg = () => setActiveImg(i => (i > 0 ? i - 1 : 0));
  const nextImg = () => setActiveImg(i => (activeCase ? Math.min(i + 1, activeCase.images.length - 1) : 0));

  return (
    <div className="relative w-full">
      {/* Галерея кейсов (горизонтальный скролл) */}
      <div
        ref={containerRef}
        onWheel={handleWheel}
        className="flex overflow-x-auto space-x-6 py-8 snap-x"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {cases.map(item => (
          <div key={item.id} className="min-w-[600px] cursor-pointer snap-start" onClick={() => openGallery(item)}>
            <img src={item.cover} alt={item.title} className="rounded-xl shadow-lg w-full object-cover" />
            <div className="mt-4 flex items-center justify-between">
              <span className="font-bold text-lg">{item.title}</span>
              <span className="bg-lime-200 px-3 py-1 rounded text-black">{item.year}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Попап-галерея выбранного кейса */}
      {activeCase && <CaseCarousel caseData={activeCase} onClose={closeGallery} />}
    </div>
  );
};
