'use client';

import React from 'react';
import { ContactForm } from '../components/contact-form';
import { SectionTitle } from '@/app/components';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export const ContactSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section id="contact" className="relative min-h-screen w-full bg-black text-white overflow-hidden px-4">
      <SectionTitle title={t('contact-form.tag')} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl mx-auto items-center">
        {/* Левая колонка: заголовок, текст, картинка */}
        <div className="flex flex-col h-full justify-center md:pl-12">
          <h1 className="md:text-4xl lg:text-4xl font-bold leading-tight bg-gradient-to-b from-white to-text-grad-dbg bg-clip-text text-transparent mt-8">
            {t('contact-form.title')}
          </h1>
          <div className="space-y-4 text-base text-gray-300 mt-6">
            <p>{t('contact-form.subtitle')}</p>
          </div>
          <Image
            src="/ctrl-btn.svg"
            alt="ctrl"
            className="w-40 h-40 mt-10 select-none levitate"
            draggable={false}
            width={160}
            height={160}
          />
        </div>
        {/* Правая колонка: форма */}
        <div className="flex justify-center items-center w-full max-w-xl mx-auto">
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
