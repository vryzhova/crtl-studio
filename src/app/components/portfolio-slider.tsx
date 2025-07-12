'use client';

import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { useState } from 'react';

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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    slides: {
      perView: 1,
      spacing: 30,
    },
  });

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-2 sm:p-4">
      <div className="relative text-black w-full max-w-6xl max-h-[95vh] rounded-lg overflow-auto shadow-lg p-2 sm:p-6 flex flex-col items-center">
        {/* Название кейса — сверху только на мобилках */}
        <div className="sm:hidden flex justify-between w-full">
          <span className=" text-2xl font-bold bg-gradient-to-b from-white to-text-grad-dbg bg-clip-text text-transparent  text-left mb-2 mt-2">
            {caseData.title}
          </span>
          {/* Кнопка закрытия */}
          <button
            className="absolute h-10 w-10  top-4 right-4  text-white border border-white z-20 rounded-md p-2"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div
          ref={sliderRef}
          className="keen-slider rounded-md overflow-hidden w-full bg-black/90 min-h-[180px] sm:min-h-[320px] flex items-center justify-center"
        >
          Кнопка закрытия
          <button
            className="absolute hidden sm:block top-4 right-4 bg-white text-black border-black z-20 rounded-md p-2"
            onClick={onClose}
          >
            ✕
          </button>
          {caseData.images.map((src, i) => (
            <div key={i} className="keen-slider__slide flex items-center justify-center">
              <img
                src={src}
                alt={`slide ${i}`}
                className="w-full h-auto object-contain rounded-md border-lime-default"
                style={{ maxHeight: '38vh', minHeight: 120 }}
              />
            </div>
          ))}
        </div>
        {/* Миниатюры — только на desktop */}
        <div className="hidden md:flex flex-wrap justify-center gap-2 my-2">
          {caseData.images.map((src, i) => (
            <button
              key={i}
              onClick={() => instanceRef.current?.moveToIdx(i)}
              className={`border-2 rounded-md overflow-hidden w-24 h-16 transition-all ${
                i === currentSlide ? 'border-red-error opacity-100' : 'border-transparent opacity-60 hover:opacity-90'
              }`}
            >
              <img src={src} alt={`thumb ${i}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
        {/* Стрелки навигации — мобильные: над тегами, desktop: по бокам */}
        <div className="flex w-full justify-center gap-4 mt-4 sm:hidden">
          <button
            onClick={() => instanceRef.current?.prev()}
            className="z-10 bg-white bg-opacity-70 p-2 rounded-md shadow text-black"
            style={{ width: 48, height: 48 }}
            aria-label="Предыдущий слайд"
          >
            ←
          </button>
          <button
            onClick={() => instanceRef.current?.next()}
            className="z-10 bg-white bg-opacity-70 p-2 rounded-md shadow text-black"
            style={{ width: 48, height: 48 }}
            aria-label="Следующий слайд"
          >
            →
          </button>
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
      {/* Desktop стрелки */}
      <button
        onClick={() => instanceRef.current?.prev()}
        className="absolute left-30 top-1/2 transform text-black -translate-y-1/2 z-10 bg-white bg-opacity-70 p-2 rounded-md shadow hidden sm:block"
      >
        ←
      </button>
      <button
        onClick={() => instanceRef.current?.next()}
        className="absolute right-30 top-1/2 transform -translate-y-1/2 z-10 bg-white text-black bg-opacity-70 p-2 rounded-md shadow hidden sm:block"
      >
        →
      </button>
    </div>
  );
};
