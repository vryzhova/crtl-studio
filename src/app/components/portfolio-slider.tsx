import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

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

  const thumbWidth = 120;
  const thumbHeight = 84;

  const portalRoot = document.getElementById('modal-root');
  if (!portalRoot) return null;

  return createPortal(
    <div className="fixed h-full w-full inset-0 z-50 bg-black/95 flex items-center justify-center">
      <div className="relative text-black w-full max-h-[95vh] mx-5 md:mx-[36px] xl:mx-[170px] rounded-lg shadow-lg p-2 sm:p-0 flex flex-col items-center max-w-[1100px]">
        {/* Мобильная шапка с тайтлом и кнопкой закрытия */}
        <div className="sm:hidden flex justify-between w-full pb-4">
          <span className="text-3xl font-bold bg-gradient-to-b from-white to-text-grad-dbg bg-clip-text text-transparent text-left mb-2 mt-2">
            {caseData.title}
          </span>
          <button
            className="absolute h-10 w-10 right-4 text-white border border-white z-20 rounded-md p-2 hover:bg-lime-default active:bg-lime-active flex items-center justify-center"
            onClick={onClose}
          >
            <svg width="26.43" height="26.43" viewBox="0 0 26.43 26.43" fill="none">
              <line x1="4" y1="4" x2="22.43" y2="22.43" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="22.43" y1="4" x2="4" y2="22.43" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="hidden md:flex md:flex-row gap-2 w-full md:w-auto md:m-5 items-center md:items-start xl:hidden">
          {caseData.tags.map((tag, i) => (
            <div
              key={i}
              className="bg-black px-3 flex justify-center items-center py-1 text-sm rounded-full h-[44px]  text-lime-default border border-lime-default"
              style={{ minWidth: 160, textAlign: 'center' }}
            >
              {tag}
            </div>
          ))}
        </div>
        <div
          className="relative flex w-full rounded-md min-h-[180px] sm:min-h-[320px] xl:min-h-[480px]"
          style={{ maxHeight: '70vh' }}
        >
          {/* Левая стрелка — только на desktop */}
          <button
            onClick={prev}
            className="hidden xl:block absolute left-[-70px] top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-70 p-2 rounded-md shadow text-black hover:bg-lime-default active:bg-lime-active"
            style={{ width: 40, height: 40 }}
            aria-label="Предыдущий слайд"
          >
            ←
          </button>{' '}
          <Image
            src={caseData.images[selected]}
            alt={`slide ${selected}`}
            fill
            className=" h-utoa object-cover rounded-md border-lime-default"
            priority
          />
          {/*Правая стрелка — только на desktop */}
          <button
            onClick={next}
            className="hidden xl:block absolute right-[-70px] top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-70 p-2 rounded-md shadow text-black hover:bg-lime-default active:bg-lime-active"
            style={{ width: 40, height: 40 }}
            aria-label="Следующий слайд"
          >
            →
          </button>
          {/*Кнопка закрытия для desktop — поверх фото, справа сверху, отступ 30px */}
          <button
            className="hidden sm:flex items-center justify-center right-5 absolute z-20 bg-white active:text-white text-black border border-black rounded-md p-2 hover:bg-lime-default active:bg-lime-active"
            style={{ top: 20, width: 40, height: 40 }}
            onClick={onClose}
            aria-label="Закрыть"
          >
            <svg width="26.43" height="26.43" viewBox="0 0 26.43 26.43" fill="none">
              <line x1="4" y1="4" x2="22.43" y2="22.43" stroke="#141414" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="22.43" y1="4" x2="4" y2="22.43" stroke="#141414" strokeWidth="3.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        {/* Стрелки снизу — только на мобильных и tablet до 1280px */}
        <div className="xl:hidden flex flex-row justify-between items-center w-full">
          <span className="text-3xl font-bold bg-gradient-to-b from-white to-text-grad-dbg bg-clip-text text-transparent hidden md:block">
            {caseData.title}
          </span>
          <div className="flex w-full md:w-auto justify-center gap-2.5 mt-4">
            <button
              onClick={prev}
              className="bg-white bg-opacity-70 p-2 rounded-md shadow text-black hover:bg-lime-default active:bg-lime-active"
              style={{ width: 40, height: 40 }}
              aria-label="Предыдущий слайд"
            >
              ←
            </button>
            <button
              onClick={next}
              className="bg-white bg-opacity-70 p-2 rounded-md shadow text-black hover:bg-lime-default active:bg-lime-active"
              style={{ width: 40, height: 40 }}
              aria-label="Следующий слайд"
            >
              →
            </button>
          </div>
        </div>
        {/* Превью только на desktop >=1280px (xl) */}
        <div className="hidden xl:flex flex-row gap-2 justify-center items-center w-full overflow-x-auto mt-4 pb-2">
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
        <div className="md:hidden xl:flex flex justify-between flex-wrap gap-3 w-full mt-10 sm:mt-4">
          <span className="text-3xl font-bold bg-gradient-to-b from-white to-text-grad-dbg bg-clip-text text-transparent hidden md:block">
            {caseData.title}
          </span>
          <div className="flex flex-col xl:flex-row gap-2 w-full md:w-auto items-center md:items-start">
            {caseData.tags.map((tag, i) => (
              <div
                key={i}
                className="bg-black flex justify-center items-center px-3 py-1 text-sm rounded-full text-lime-default border border-lime-default"
                style={{ minWidth: 160, textAlign: 'center' }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    portalRoot
  );
};
