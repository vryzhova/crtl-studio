import React from 'react';
import { ContactForm } from '../components/contact-form';

const year = new Date().getFullYear();

export const ContactSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black text-white overflow-hidden px-4 py-20">
      <div className="absolute left-0 top-0 z-0 w-1/2 h-full flex flex-col justify-between pointer-events-none select-none">
        {/* Левая часть: заголовок, текст, картинка */}
        <div className="mt-12 ml-8">
          <button className="border border-lime-default rounded-full px-6 py-2 text-lime-default text-sm font-mono mb-10">
            Оставьте заявку
          </button>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-white underline underline-offset-4 decoration-lime-default decoration-4">
            Запустим классный <br /> продукт вместе?
          </h2>
          <p className="text-sm text-gray-300 mb-8 mt-4">
            Мы отвечаем быстро.
            <br />
            Сначала поймём, а потом сделаем.
          </p>
          <img src="/cube.svg" alt="ctrl cube" className="w-40 h-40 mt-8" draggable={false} />
        </div>
        <span className="text-xs text-gray-600 mb-6 ml-8">© {year} CTRL Studio</span>
      </div>

      {/* Правая часть: форма */}
      <div className="relative z-10 ml-auto w-full max-w-xl flex justify-end items-center">
        <ContactForm />
      </div>
    </section>
  );
};

export default ContactSection;
