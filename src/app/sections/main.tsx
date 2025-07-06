'use client';
import { Header } from '../components/header';
import React from 'react';
import Image from 'next/image';

type TProps = {
  title?: string;
};

export const MainSection: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image src="/main-bg.png" alt="Background" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative flex flex-col min-h-screen">
        <Header />
        <div className="container mx-auto flex flex-1 justify-center items-center">
          <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Мы — Ctrl. <br />
              Студия цифровых
              <br className="hidden md:inline" /> и AI-решений
            </h1>

            <p className="text-base md:text-lg text-gray-300 mb-8">
              Создаём digital-решения и AI-продукты, в которых дизайн, бренд и технологии работают на рост, прибыль и
              масштабирование бизнеса
            </p>

            <a href="#contact" className="inline-block bg-lime-300 text-black px-6 py-3 rounded font-medium transition">
              Оставить заявку
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
