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
      <button
        onClick={() => instanceRef.current?.prev()}
        className="absolute left-30 top-1/2 transform text-black -translate-y-1/2 z-10 bg-white bg-opacity-70 p-2 rounded-md shadow"
      >
        ←
      </button>

      <div className="relative  text-black w-full max-w-6xl max-h-[95vh] rounded-lg overflow-auto shadow-lg p-6">
        <div ref={sliderRef} className="keen-slider rounded-md overflow-hidden">
          {/* Кнопка закрытия */}
          <button
            className="absolute top-4 right-4 bg-white text-black border-black z-20 rounded-md p-2"
            onClick={onClose}
          >
            ✕
          </button>

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

        {/* Миниатюры */}
        <div className="flex flex-wrap justify-center gap-2 my-2">
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

        {/* Теги */}
        <div className="flex justify-between flex-wrap gap-3">
          <span className="text-2xl font-bold bg-gradient-to-b from-white to-text-grad-dbg bg-clip-text text-transparent">
            {caseData.title}
          </span>
          <div className="flex gap-2">
            {caseData.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-black px-3 py-1 text-sm rounded-full text-lime-default border border-lime-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* → Стрелка */}
      <button
        onClick={() => instanceRef.current?.next()}
        className="absolute right-30 top-1/2 transform -translate-y-1/2 z-10 bg-white text-black bg-opacity-70 p-2 rounded-md shadow"
      >
        →
      </button>
    </div>
  );
};
