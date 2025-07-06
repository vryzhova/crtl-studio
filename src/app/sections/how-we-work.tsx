import React from 'react';
import { SectionTitle } from '@/app/components/section-title';

const steps = [
  {
    number: '01',
    title: 'Анализ',
    description: 'Проводим глубокий анализ вашего бизнеса и выявляем ключевые точки роста',
  },
  {
    number: '02',
    title: 'Стратегия',
    description: 'Разрабатываем индивидуальную стратегию внедрения AI-решений',
  },
  {
    number: '03',
    title: 'Внедрение',
    description: 'Интегрируем и настраиваем AI-инструменты под ваши задачи',
  },
  {
    number: '04',
    title: 'Обучение',
    description: 'Обучаем вашу команду работе с новыми инструментами',
  },
];

export const HowWeWork = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-black py-20 overflow-hidden">
      <div className="w-full max-w-7xl px-4 mx-auto">
        {/* Чип */}
        <div className="text-sm font-mono uppercase text-center mb-6">
          <span className="inline-block bg-black text-lime-400 px-3 py-1 rounded-full tracking-widest">
            Full-cycle-разработка
          </span>
        </div>

        {/* Заголовок */}
        <h2 className="text-center text-3xl md:text-5xl font-semibold mb-20 bg-gradient-to-b from-black to-gray-gradient bg-clip-text text-transparent ">
          Наш фокус — скорость, <br /> кастом и результат
        </h2>

        {/* Сетка из 4 блоков */}
        <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
          {/* Вертикальная линия (до центра и после центра) */}
          <div className="absolute left-1/2 top-0 h-[calc(50%-48px)] w-px bg-gray-300 -translate-x-1/2" />
          <div className="absolute left-1/2 bottom-0 h-[calc(50%-48px)] w-px bg-gray-300 -translate-x-1/2" />

          {/* Горизонтальная линия (до центра и после центра) */}
          <div className="absolute top-1/2 left-0 w-[calc(50%-48px)] h-px bg-gray-300 -translate-y-1/2" />
          <div className="absolute top-1/2 right-0 w-[calc(50%-48px)] h-px bg-gray-300 -translate-y-1/2" />

          {/* Верхний левый */}
          <div className="flex items-center justify-center md:justify-end">
            <div className="text-center md:text-right">
              <h3 className="font-semibold mb-2 text-center">Креативные и визуальные системы</h3>
              <p className="text-sm text-gray-700 leading-relaxed text-center">
                Логотипы и бренд-айдентика AI-поддержка <br /> и визуальные генерации изображений <br />
                Креативные коммуникации Геймификация <br /> сервисов и программ лояльности (Telegram, HTML5/WebGL и др.)
              </p>
            </div>
          </div>

          {/* Верхний правый */}
          <div className="text-center md:text-left">
            <h3 className="font-semibold mb-2 text-center">AI-инструменты и автоматизация</h3>
            <p className="text-sm text-center text-gray-700 leading-relaxed">
              AI-чаты, персонализация, аналитика <br />
              Автоматизация бизнес-процессов <br />
              Внедрение моделей в продукт (AI-консьержи, ассистенты, промпт-интерфейсы)
            </p>
          </div>

          {/* Нижний левый */}
          <div className="flex items-center justify-center md:justify-end">
            <div className="text-center md:text-right">
              <h3 className="font-semibold text-center mb-2">UX/UI и кастомные платформы</h3>
              <p className="text-sm text-center text-gray-700 leading-relaxed">
                Лендинги и промо-сайты SaaS-интерфейсы, платёжные сценарии <br />
                Личные кабинеты, панели администратора <br />
                Telegram Mini Apps и web-адаптации (игры, сервисы)
              </p>
            </div>
          </div>

          {/* Нижний правый */}
          <div className="flex items-center justify-center md:justify-start">
            <div className="text-center md:text-left">
              <h3 className="font-semibold mb-2">Блокчейн-технологии</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Разработка смарт-контрактов (Ethereum, TON, Solana) <br />
                NFT-проекты и токенизация активов <br />
                Децентрализованные приложения (DApps)
              </p>
            </div>
          </div>

          {/* Центральный круг с аватаркой */}
          <div className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <div className="relative w-16 h-16 bg-black rounded-full flex items-center justify-center">
              {/*<img*/}
              {/*  src="/your-avatar.jpg" // ← замени на реальный путь или компонент <Image />*/}
              {/*  alt="avatar"*/}
              {/*  className="w-10 h-10 rounded-full border-2 border-white absolute -bottom-2 -right-2"*/}
              {/*/>*/}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
