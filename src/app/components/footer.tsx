'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useBreakpoints } from '@/app/hooks';
import { SecondaryButton } from '@/app/components/secondary-btn';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  const links = [
    {
      title: t('header.about'),
      link: '#why',
    },
    {
      title: t('header.services'),
      link: '#how-we-work',
    },
    {
      title: t('header.cases'),
      link: '#cases',
    },
    {
      title: t('header.clients'),
      link: '#clients',
    },
    {
      title: t('header.how'),
      link: '#how',
    },
  ];
  const docs = ['Документ 1', 'Документ 2'];
  const { isMobile } = useBreakpoints();
  const backgroundStyle = isMobile ? 'bg-[url("/bg-footer.svg")]' : 'bg-[url(/footer-bg.svg)]';

  return (
    <footer className="bg-black text-white relative overflow-hidden mx-5 md:mx-[36px] xl:mx-25 md:border-t md:border-gray-elements">
      {/* Background pattern */}
      <div className="w-full h-full opacity-20 pointer-events-none z-0 absolute md:bottom-[-30%] xl:bottom-[-10%] bottom-0">
        <div className={`w-full h-full ${backgroundStyle} bg-contain bg-bottom bg-no-repeat`} />
      </div>
      <div className="relative z-10 flex flex-col md:flex-row md:justify-between py-12.5 xl:py-[110px] w-full gap-8 md:gap-0">
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
                      href={item.link}
                      className="hover:text-lime-default active:text-lime-active transition-colors text-base font-normal whitespace-nowrap"
                    >
                      {item.title}
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
              {t('footer.made_by')} <span className="font-semibold">Business Art</span>
            </p>
            <p className="mt-1">
              {currentYear} © CTRL Studio.
              {isMobile && <br />}
              {t('footer.rights')}
            </p>
          </div>
        </div>
        {/* Правая часть: кнопка и логотип */}
        <div className="flex flex-col gap-6 items-center md:items-end justify-end md:justify-between w-full md:w-auto mt-6 md:mt-0">
          <SecondaryButton
            className="w-[320px] xl:w-[163px] 3xl:w-[196px] h-[60px] xl:h-[37px] text-sm 3xl:h-[44px]"
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {t('contact-us')}
          </SecondaryButton>
          <div className="w-full flex justify-center md:justify-end">
            <div className="relative w-[319px] h-[53px]  md:w-[280px] md:h-[45px]  xl:w-[618px] xl:h-[102px]">
              <Image src="/logo.svg" alt="CTRL Studio Logo" fill className="object-contain" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
