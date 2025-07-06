import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        {/* Separator */}
        <div className="border-t border-e-gray-elements mb-12"></div>

        <div className="flex flex-col lg:flex-row justify-between gap-12">
          {/* Left side - Links */}
          <div className="flex flex-col md:flex-row gap-12">
            {/* Links Column */}
            <div>
              <h3 className="text-gray-400 text-sm font-medium mb-4">Ссылки</h3>
              <ul className="space-y-3">
                {['Почему мы', 'Наши услуги', 'Наши кейсы', 'Для кого', 'Как мы работаем'].map((item, index) => (
                  <li key={index}>
                    <Link href="#" className="hover:text-lime-400 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Documents Column */}
            <div>
              <h3 className="text-gray-400 text-sm font-medium mb-4">Документы</h3>
              <ul className="space-y-3">
                {['Документ 1', 'Документ 2'].map((item, index) => (
                  <li key={index}>
                    <Link href="#" className="hover:text-lime-400 transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right side - Contact Button */}
          <div className="lg:text-right">
            <button className="border border-white rounded-full px-8 py-3 hover:bg-white hover:text-black transition-colors mb-8 lg:mb-0">
              Связаться с нами
            </button>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo */}
          <div className="relative w-40 h-12">
            <Image src="/logo.svg" alt="CTRL Studio Logo" fill className="object-contain" />
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right text-gray-500 text-sm">
            <p>Сайт сделан Business Art</p>
            <p>{currentYear} © CTRL Studio. Все права защищены.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
