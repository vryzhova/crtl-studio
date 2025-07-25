'use client';

import React from 'react';
import { ContactForm } from '../components/contact-form';
import { SectionTitle, GlitchTypewriterText } from '@/app/components';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export const ContactSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section id="contact" className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      <div className="own-container pb-20 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Левая колонка: заголовок, текст, картинка */}
        <div className="flex flex-col h-full md:flex-row lg:flex-col md:bg-[url('/ctrl-btn-bg.svg')] bg-right lg:bg-center md:bg-auto bg-no-repeat lg:pl-12 bg">
          <SectionTitle title={t('contact-form.tag')} hasBorder />

          <div className="flex flex-col items-start">
            <GlitchTypewriterText
              lineClassName="2xl:text-[58px] md:text-[42px] text-[28px] leading-[107%] title"
              text={t('contact-form.title')}
              gradient="bg-gradient-to-b from-white to-text-grad-dbg bg-clip-text text-transparent"
            />
            <div className="space-y-4 text-base text-white mt-6">
              <p className="whitespace-pre-line">{t('contact-form.subtitle')}</p>
            </div>
          </div>
          <div className="justify-center hidden md:flex">
            <Image
              src="/ctrl-btn.png"
              alt="ctrl"
              className="mt-10 select-none levitate justify-self-center"
              draggable={false}
              width={246}
              height={246}
            />
          </div>
        </div>
        {/* Правая колонка: форма */}
        <div className="flex justify-center items-center w-full max-w-xl mx-auto">
          <ContactForm />
        </div>

        <div className="md:hidden bg-[url('/ctrl-btn-bg.svg')] bg-contain bg-center bg-no-repeat bg">
          <Image
            src="/ctrl-btn.png"
            alt="ctrl"
            className="w-40 h-40 mt-10 select-none levitate justify-self-end"
            draggable={false}
            width={218}
            height={260}
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
