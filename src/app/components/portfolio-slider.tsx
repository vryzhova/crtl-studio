import React, { useState } from 'react';
import Image from 'next/image';

type Case = {
  id: string;
  title: string;
  year: string;
  cover: string;
  images: string[];
  description: string;
  tags: string[];
};

type Props = {
  caseData: Case;
  onClose: () => void;
};

export const CaseCarousel = ({ caseData, onClose }: Props) => {
  const [selected, setSelected] = useState(0);
  const imagesCount = caseData.images.length;

  // Функции для переключения слайдов
  const prev = () => setSelected(prev => (prev === 0 ? imagesCount - 1 : prev - 1));
  const next = () => setSelected(prev => (prev === imagesCount - 1 ? 0 : prev + 1));

  // Примерные размеры для главного фото (можно скорректировать под ваши реальные размеры)
  const mainImgWidth = 900; // desktop
  const mainImgHeight = 540; // desktop
  const thumbWidth = 120;
  const thumbHeight = 84;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-2 sm:p-4">
      <div className="relative text-black w-full max-w-6xl max-h-[95vh] rounded-lg overflow-auto shadow-lg p-2 sm:p-6 flex flex-col items-center">
        {/* Мобильная шапка с тайтлом и кнопкой закрытия */}
        <div className="sm:hidden flex justify-between w-full">
          <span className="text-2xl font-bold bg-gradient-to-b from-white to-text-grad-dbg bg-clip-text text-transparent text-left mb-2 mt-2">
            {caseData.title}
          </span>
          <button
            className="absolute h-10 w-10 top-4 right-4 text-white border border-white z-20 rounded-md p-2 hover:bg-lime-default active:bg-lime-active"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        {/* Крупное фото + стрелки */}
        <div
          className="relative w-full flex items-center justify-center bg-black/90 rounded-md min-h-[180px] sm:min-h-[320px] lg:min-h-[480px]"
          style={{ maxHeight: '70vh' }}
        >
          {/* Левая стрелка — только на desktop */}
          <button
            onClick={prev}
            className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-70 p-2 rounded-md shadow text-black hover:bg-lime-default active:bg-lime-active"
            style={{ width: 40, height: 40 }}
            aria-label="Предыдущий слайд"
          >
            ←
          </button>{' '}
          <Image
            src={caseData.images[selected]}
            alt={`slide ${selected}`}
            className="block mx-auto w-auto max-w-full h-auto object-contain rounded-md border-lime-default"
            style={{ maxHeight: '65vh', minHeight: 120 }}
            width={mainImgWidth}
            height={mainImgHeight}
            priority
          />
          {/* Правая стрелка — только на desktop */}
          <button
            onClick={next}
            className="hidden lg:block absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-70 p-2 rounded-md shadow text-black hover:bg-lime-default active:bg-lime-active"
            style={{ width: 40, height: 40 }}
            aria-label="Следующий слайд"
          >
            →
          </button>
          {/* Кнопка закрытия для desktop — поверх фото, справа сверху, отступ 30px */}
          <button
            className="hidden sm:block absolute z-20 bg-white text-black border-black rounded-md p-2"
            style={{ top: 30, right: 30, width: 40, height: 40 }}
            onClick={onClose}
            aria-label="Закрыть"
          >
            ✕
          </button>
        </div>
        {/* Стрелки снизу — только на мобильных и tablet до 1024px */}
        <div className="flex lg:hidden w-full justify-center gap-2.5 mt-4">
          <button
            onClick={prev}
            className="bg-white bg-opacity-70 p-2 rounded-md shadow text-black"
            style={{ width: 40, height: 40 }}
            aria-label="Предыдущий слайд"
          >
            ←
          </button>
          <button
            onClick={next}
            className="bg-white bg-opacity-70 p-2 rounded-md shadow text-black"
            style={{ width: 40, height: 40 }}
            aria-label="Следующий слайд"
          >
            →
          </button>
        </div>
        {/* Превью только на desktop >=1024px (lg) */}
        <div className="hidden lg:flex flex-row gap-2 justify-center items-center w-full overflow-x-auto mt-4 pb-2">
          {caseData.images.map((src, i) => (
            <button
              key={i}
              className={`group block w-20 h-14 rounded-md border-2 transition-all cursor-pointer flex-shrink-0 ${i === selected ? 'border-lime-default' : 'border-transparent'}`}
              onClick={() => setSelected(i)}
              tabIndex={0}
              aria-label={`Показать фото ${i + 1}`}
            >
              <Image
                src={src}
                alt={`thumb ${i}`}
                className="w-full h-full object-cover rounded-md group-hover:opacity-90"
                width={thumbWidth}
                height={thumbHeight}
              />
            </button>
          ))}
        </div>
        {/* Теги и тайтл (desktop) */}
        <div className="flex justify-between flex-wrap gap-3 w-full mt-10 sm:mt-4">
          <span className="text-2xl font-bold bg-gradient-to-b from-white to-text-grad-dbg bg-clip-text text-transparent hidden md:block">
            {caseData.title}
          </span>
          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto items-center md:items-start">
            {caseData.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-black px-3 py-1 text-sm rounded-full text-lime-default border border-lime-default"
                style={{ minWidth: 160, textAlign: 'center' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
