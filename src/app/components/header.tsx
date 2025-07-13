'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { SecondaryButton } from '@/app/components';

export const Header = () => {
  const [locale, setLocale] = useState<'ru' | 'en'>('ru');
  const [menuOpen, setMenuOpen] = useState(false);
  const { i18n, t } = useTranslation();

  const toggleLanguage = (lang: 'ru' | 'en') => {
    console.log(lang);
    setLocale(lang);
    i18n.changeLanguage(lang);
  };

  const navItems = [
    { label: t('header.about'), href: '#why' },
    { label: t('header.services'), href: '#services' },
    { label: t('header.cases'), href: '#cases' },
    { label: t('header.clients'), href: '#clients' },
    { label: t('header.how'), href: '#how' },
  ];

  return (
    <header className="w-full bg-gradient-to-r from-black/90 to-black/55 text-white">
      {/* Desktop Header */}
      <div className="max-w-[1440px] h-[64px] mx-auto items-center justify-between px-5 xl:px-25 hidden lg:flex">
        {/* Logo + Divider + Nav */}
        <div className="flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-lg font-inter scroll-smooth">
            <Image src="./logo.svg" alt="header-logo" width={140} height={28} />
          </Link>
          {/* Вертикальная линия */}
          <div className="border-l border-white/40 h-6 mx-2" />
          {/* Navigation */}
          <nav className="flex gap-4 text-sm font-medium">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-lime-default active:text-lime-active scroll-smooth transition"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {/* Language switch */}
          <div className="flex gap-1 overflow-hidden text-sm">
            <button
              className={clsx('px-3 py-1 border border-white rounded hover:bg-lime-default h-[37px]', {
                'bg-white text-black': locale === 'ru',
                'hover:text-black': locale !== 'ru',
              })}
              onClick={() => toggleLanguage('ru')}
            >
              RU
            </button>
            <button
              className={clsx('px-3 py-1 border border-white rounded hover:bg-lime-default h-[37px]', {
                'bg-white text-black': locale === 'en',
                'hover:text-black': locale !== 'en',
              })}
              onClick={() => toggleLanguage('en')}
            >
              EN
            </button>
          </div>
          {/* Contact button */}

          <SecondaryButton
            className="w-[320px] lg:w-[163px] 2xl:w-[196px] h-[60px] lg:h-[37px] text-sm 2xl:h-[44px]"
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {t('contact-us')}
          </SecondaryButton>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="flex lg:hidden h-[84px] w-full items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <Image src="./logo.svg" alt="header-logo" width={180} height={29} />
        </Link>
        <button
          className="lg:hidden flex items-center justify-center w-16 h-16"
          onClick={() => setMenuOpen(true)}
          aria-label="Открыть меню"
        >
          <svg width="44" height="44" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="28" stroke="#E5E5E5" strokeWidth="4" />
            <line x1="22" y1="26" x2="42" y2="26" stroke="#E5E5E5" strokeWidth="4" strokeLinecap="round" />
            <line x1="22" y1="34" x2="42" y2="34" stroke="#E5E5E5" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay с макетным стилем */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Затемнение */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/80"
              onClick={() => setMenuOpen(false)}
            />
            {/* Плавающее меню */}
            <motion.div
              key="mobile-menu"
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ type: 'tween', duration: 0.38, ease: 'easeInOut' }}
              className="fixed left-0 top-0 z-50 w-full max-w-[1024px] bg-black border border-gray-elements shadow-2xl px-5 pt-5 pb-8  flex flex-col lg:hidden"
              style={{ minHeight: 'auto' }}
            >
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold hover:bg-lime-default active:bg-lime-active"
                  onClick={() => setMenuOpen(false)}
                >
                  <Image src="./logo.svg" alt="header-logo" width={180} height={30} />
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Закрыть меню"
                  className="ml-2 flex items-center justify-center w-16 h-16"
                >
                  <svg width="44" height="44" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="28" stroke="#E5E5E5" strokeWidth="4" />
                    <line x1="21" y1="21" x2="43" y2="43" stroke="#E5E5E5" strokeWidth="4" strokeLinecap="round" />
                    <line x1="43" y1="21" x2="21" y2="43" stroke="#E5E5E5" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-col lg:flex-row gap-6 w-full">
                <nav className="flex flex-col gap-4 text-base font-medium mb-6 lg:mb-0 lg:flex-1">
                  {navItems.map(item => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="hover:bg-lime-default active:bg-lime-active transition text-left"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <div className="flex flex-col items-start lg:items-end justify-center gap-4 lg:gap-6">
                  <div className="flex gap-3">
                    <button
                      className={clsx('px-4 py-2 border border-white/30 rounded text-sm', {
                        'bg-white text-black': locale === 'ru',
                        'hover:bg-white/10': locale !== 'ru',
                      })}
                      onClick={() => toggleLanguage('ru')}
                    >
                      RU
                    </button>
                    <button
                      className={clsx('px-4 py-2 border border-white/30 rounded text-sm', {
                        'bg-white text-black': locale === 'en',
                        'hover:bg-white/10': locale !== 'en',
                      })}
                      onClick={() => toggleLanguage('en')}
                    >
                      EN
                    </button>
                  </div>
                  <Link
                    href="#contact"
                    className="border border-white rounded px-6 py-2 text-sm text-center hover:bg-white hover:text-black transition self-stretch lg:self-start"
                    onClick={() => setMenuOpen(false)}
                  >
                    {t('contact-us')}
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
