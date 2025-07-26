'use client';

import React from 'react';
import { ContactForm } from '../components/contact-form';
import { SectionTitle, GlitchTypewriterText } from '@/app/components';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useBreakpoints } from '@/app/hooks';

export const ContactSection: React.FC = () => {
  const { t } = useTranslation();
  const { isDesktop } = useBreakpoints();
  return (
    <section id="contact" className="relative min-h-screen w-full bg-black text-white overflow-hidden">
      <div className="own-container pb-20 grid grid-cols-1 xl:grid-cols-2 items-center">
        {/* Background pattern */}
        <div
          style={{ transform: 'translateZ(0)' }}
          className="absolute md:max-xl:block hidden h-full w-full top-30 -right-[150px] pointer-events-none z-0"
        >
          <div className="bg-[url('/ctrl-btn-bg.svg')] w-full h-full bg-no-repeat bg-top-right" />
        </div>

        <SectionTitle
          className="flex xl:hidden"
          title={t('contact-form.tag')}
          hasBorder
          position={isDesktop ? 'start' : 'center'}
        />
        {/* Левая колонка: заголовок, текст, картинка */}
        <div className="flex flex-col mb-9 h-full md:flex-row md:max-xl:justify-between xl:flex-col xl:bg-[url('/ctrl-btn-bg.svg')] xl:bg-center xl:bg-auto bg-no-repeat xl:pl-12 bg">
          <SectionTitle
            className="hidden xl:flex"
            title={t('contact-form.tag')}
            hasBorder
            position={isDesktop ? 'start' : 'center'}
          />
          <div className="flex flex-col items-start">
            <GlitchTypewriterText
              lineClassName="3xl:text-[58px] md:text-[42px] text-[28px] leading-[107%] title"
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
              className="select-none levitate justify-self-center"
              draggable={false}
              width={246}
              height={246}
            />
          </div>
        </div>
        {/* Правая колонка: форма */}
        <div className="flex justify-center items-center w-full">
          <ContactForm />
        </div>

        <div className="md:hidden bg-[url('/ctrl-btn-bg.svg')] bg-contain bg-center bg-no-repeat bg">
          <Image
            src="/ctrl-btn.png"
            alt="ctrl"
            className="w-43 h-43 mt-10 select-none levitate justify-self-end"
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
