import React, { useState, useRef } from 'react';
import { CaseCarousel } from './portfolio-slider';
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

// Пример данных для кейсов. Подключите свои изображения и описания.
const cases: Case[] = [
  {
    id: 'get-crypto',
    title: 'Get Crypto',
    year: '2025',
    cover: '/cases/case1.png', // замените на свой путь
    images: [
      '/cases/RS.png',
      '/cases/RS2.jpg',
      // ...
    ],
    description: 'Описание кейса...',
    tags: ['// Прототипирование', '// UX/UI-дизайн', '// Разработка сайта'],
  },
  {
    id: 'get-crypto2',
    title: 'Get Crypto2',
    year: '2025',
    cover: '/cases/case2.png', // замените на свой путь
    images: [
      '/cases/RS.png',
      '/cases/RS2.jpg',
      // ...
    ],
    description: 'Описание кейса...',
    tags: ['Прототипирование', 'UX/UI-дизайн', 'Разработка сайта'],
  },
  // Добавьте другие кейсы по аналогии
];

export const CaseGallery: React.FC = () => {
  const [activeCase, setActiveCase] = useState<Case | null>(null); // выбранный кейс для попапа
  const [activeImg, setActiveImg] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

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
