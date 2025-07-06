'use client';

import Link from 'next/link';
import { useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';

const navItems = [
  { label: 'Почему мы', href: '#why' },
  { label: 'Наши услуги', href: '#services' },
  { label: 'Наши кейсы', href: '#cases' },
  { label: 'Для кого', href: '#clients' },
  { label: 'Как мы работаем', href: '#how' },
];

export const Header = () => {
  const [locale, setLocale] = useState<'RU' | 'EN'>('RU');

  return (
    <header className="w-full bg-gradient-to-r from-header-800/100 to-header-800/55 text-white">
      <div className="max-w-[1440px] h-[69px] mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <Image src="./logo.svg" alt="header-logo" width={200} height={33} />
        </Link>

        {/* Navigation */}
        <nav className="flex gap-6 text-sm font-medium">
          {navItems.map(item => (
            <Link key={item.href} href={item.href} className="hover:text-purple-400 transition">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* Language switch */}
          <div className="flex gap-2.5 overflow-hidden text-sm">
            <button
              className={clsx('px-3 py-1 border border-white/30 rounded', {
                'bg-white text-black': locale === 'RU',
                'hover:bg-white/10': locale !== 'RU',
              })}
              onClick={() => setLocale('RU')}
            >
              RU
            </button>
            <button
              className={clsx('px-3 py-1 border border-white/30 rounded', {
                'bg-white text-black': locale === 'EN',
                'hover:bg-white/10': locale !== 'EN',
              })}
              onClick={() => setLocale('EN')}
            >
              EN
            </button>
          </div>

          {/* Contact Button */}
          <Link
            href="#contact"
            className="border border-white px-4 py-1 rounded hover:bg-white hover:text-black transition text-sm"
          >
            Связаться с нами
          </Link>
        </div>
      </div>
    </header>
  );
};
