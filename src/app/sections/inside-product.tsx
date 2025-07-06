import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SectionTitle } from '../components';

export const InsideProduct = () => {
  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      <SectionTitle title="// AI ВНУТРИ ПРОДУКТА" />

      {/* Background pattern */}
      <div className="absolute right-0 top-0 w-[970px] h-full opacity-80 pointer-events-none z-0">
        <div className="w-full h-full bg-[url('/cube-bg.svg')] bg-center bg-no-repeat bg-contain" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-6">
            <h1 className="md:text-4xl lg:text-4xl font-bold leading-tight bg-gradient-to-b from-white to-text-grad-dbg bg-clip-text text-transparent">
              Используем и внедряем AI осознанно — с фокусом на пользу, а не ради трендов
            </h1>

            <div className="space-y-4 text-base text-gray-300">
              <p>
                Мы интегрируем искусственный интеллект в ваш бизнес таким образом, чтобы он приносил реальную пользу и
                помогал достигать поставленных целей.
              </p>
              <p>
                Наш подход основан на глубоком анализе ваших процессов и подборе оптимальных AI-решений, которые
                действительно работают на ваш бизнес.
              </p>
            </div>

            <Link
              href="#contact"
              className="inline-block bg-lime-default hover:bg-lime-active text-black font-medium px-8 py-3 rounded-md transition-colors duration-200"
            >
              Оставить заявку
            </Link>
          </div>

          {/* Right side - 3D Cube */}
          <div className="relative h-96 lg:h-[32rem] w-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-140 h-140">
                <Image src="./cube.svg" className="levitate" alt="cube" width={500} height={500} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
