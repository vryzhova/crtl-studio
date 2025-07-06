'use client';
import React from 'react';
import Image from 'next/image';
import { SectionTitle } from '@/app/components';

type TProps = {
  title?: string;
};

export const WhySection: React.FC = () => {
  return (
    <section className="relative min-h-screen text-white overflow-hidden flex flex-col items-center h-full">
      <SectionTitle title="// ПОЧЕМУ CTRL" />
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center justify-items-center">
          <div>
            <div className="space-y-6">
              <h2 className="font-bold leading-tight mb-6 lg:text-3xl 2xl:text-6xl md:text-xl bg-gradient-to-b from-black to-gray-elements bg-clip-text text-transparent ">
                Мы не агентство. <br />
                Мы — партнёр с бизнес-мышлением, технологиями <br />
                и умным подходом к AI <br />
              </h2>
            </div>
          </div>
          <div>Картинки</div>
        </div>
      </div>
    </section>
  );
};
