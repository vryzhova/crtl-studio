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
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4">
      <div className="relative  text-black w-full max-w-6xl max-h-[95vh] rounded-lg overflow-auto shadow-lg p-6">
        {/* Кнопка закрытия */}
        <button className="absolute top-4 right-4 text-2xl text-black" onClick={onClose}>
          ✕
        </button>

        <button
          onClick={() => instanceRef.current?.prev()}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-70 p-2 rounded-full shadow"
        >
          ←
        </button>

        <div ref={sliderRef} className="keen-slider rounded-md overflow-hidden">
          {caseData.images.map((src, i) => (
            <div key={i} className="keen-slider__slide">
              <img
                src={src}
                alt={`slide ${i}`}
                className="w-full h-auto object-contain rounded-md border-lime-default"
              />
            </div>
          ))}
        </div>

        {/* → Стрелка */}
        <button
          onClick={() => instanceRef.current?.next()}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-70 p-2 rounded-full shadow"
        >
          →
        </button>

        {/* Миниатюры */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {caseData.images.map((src, i) => (
            <button
              key={i}
              onClick={() => instanceRef.current?.moveToIdx(i)}
              className={`border-2 rounded-md overflow-hidden w-24 h-16 transition-all ${
                i === currentSlide ? 'border-red-500 opacity-100' : 'border-transparent opacity-60 hover:opacity-90'
              }`}
            >
              <img src={src} alt={`thumb ${i}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* Описание */}
        <p className="text-base mb-4">{caseData.description}</p>

        {/* Теги */}
        <div className="flex justify-between flex-wrap gap-3 text-sm  text-lime-default">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold">{caseData.title}</h2>
            <p className="text-sm text-gray-500">{caseData.year}</p>
          </div>
          <div>
            {caseData.tags.map((tag, i) => (
              <span key={i} className="bg-black px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
