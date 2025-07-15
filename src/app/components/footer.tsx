'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { SecondaryButton } from '@/app/components/secondary-btn';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  const links = [t('header.about'), t('header.services'), t('header.cases'), t('header.clients'), t('header.how')];
  const docs = ['Документ 1', 'Документ 2'];

  return (
    <footer className="bg-black text-white pt-8 pb-6 px-4 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 w-full h-full opacity-20 pointer-events-none z-0">
        <div
          className="w-full h-full bg-[url('/footer-bg.svg')] bg-center bg-no-repeat bg-cover"
          style={{ backgroundSize: '80%' }}
        />
      </div>
      <div className="relative z-10 flex flex-col md:flex-row md:justify-between max-w-7xl mx-auto w-full gap-8 md:gap-0">
        {/* Левая часть: ссылки и документы + копирайт */}
        <div className="flex flex-col gap-8 md:gap-12 md:w-1/2">
          {/* Ссылки и документы в одну строку */}
          <div className="flex flex-row w-full justify-between md:justify-start md:gap-5 gap-x-8">
            <div className="min-w-0">
              <h3 className="text-gray-elements text-md font-semibold mb-2 whitespace-nowrap">{t('footer.links')}</h3>
              <ul className="space-y-2">
                {links.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href="#"
                      className="hover:text-lime-default active:text-lime-active transition-colors text-base font-normal whitespace-nowrap"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="min-w-0">
              <h3 className="text-gray-elements text-md font-semibold mb-2 whitespace-nowrap">
                {t('footer.documents')}
              </h3>
              <ul className="space-y-2">
                {docs.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href="#"
                      className="hover:text-lime-default active:text-lime-active transition-colors text-base font-normal whitespace-nowrap"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Копирайт */}
          <div className="text-left text-white text-base leading-tight mt-2 md:mt-8">
            <p>
              Сайт сделан <span className="font-semibold">Business Art</span>
            </p>
            <p className="mt-1">
              {currentYear} © CTRL Studio.
              <br />
              Все права защищены.
            </p>
          </div>
        </div>
        {/* Правая часть: кнопка и логотип */}
        <div className="flex flex-col gap-6 items-center md:items-end justify-end md:justify-between w-full md:w-auto mt-6 md:mt-0">
          <SecondaryButton
            className="w-[320px] lg:w-[163px] 2xl:w-[196px] h-[60px] lg:h-[37px] text-sm 2xl:h-[44px]"
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {t('contact-us')}
          </SecondaryButton>
          <div className="w-full flex justify-center md:justify-end">
            <div className="relative w-48 h-14 md:w-60 md:h-16">
              <Image src="/logo.svg" alt="CTRL Studio Logo" fill className="object-contain" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
