'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionTitle } from '@/app/components/section-title';
import Image from 'next/image';

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

// Регистрируем плагин ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export const HowWeWork = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const morphRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isDesktop = window.innerWidth > 1024;

  useEffect(() => {
    if (!sectionRef.current || !circleRef.current) return;

    // Создаем временную шкалу для анимации
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        pinSpacing: false,
        scrub: 1,
        start: 'center center+=20%',
        end: 'bottom top-=20%',
        markers: true, // Для отладки
        anticipatePin: 1,
      },
    });

    // Анимация морфинга элемента
    tl.to(circleRef.current, {
      scale: 1.5,
      duration: 2,
      rotation: 30,
      ease: 'power2.inOut',
    });

    // Анимация увеличения круга
    tl.to(
      circleRef.current,
      {
        scale: 2000,
        duration: 5,
        transformOrigin: '50% 50%',
        ease: 'power3.inOut',
      },
      0
    );

    // Анимация исчезновения контента
    tl.to(
      contentRef.current,
      {
        opacity: 0,
        duration: 1,
        ease: 'power1.out',
      },
      '-=1'
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="main"
      className="relative min-h-screen lg:h-[150vh] flex flex-col items-center justify-start text-black overflow-hidden"
    >
      <div className="w-full max-w-7xl px-4 mx-auto h-screen flex flex-col justify-center">
        {/* Ваш контент */}
        <div ref={contentRef} className="relative z-30">
          <div className="w-full max-w-7xl px-4 mx-auto">
            {/* Чип */}
            <SectionTitle title="//Full-cycle-разработка" />

            {/* Заголовок */}
            <h2 className="text-center text-3xl lg:text-5xl font-semibold mb-20 bg-gradient-to-b from-black to-gray-gradient bg-clip-text text-transparent">
              Наш фокус — скорость, <br /> кастом и результат
            </h2>

            {/* Сетка из 4 блоков */}
            <div ref={contentRef} className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20">
              {/* Вертикальная линия (desktop only) */}
              <div className="hidden lg:block absolute left-1/2 top-0 h-[calc(50%-48px)] w-px bg-gray-300 -translate-x-1/2" />
              <div className="hidden lg:block absolute left-1/2 bottom-0 h-[calc(50%-48px)] w-px bg-gray-300 -translate-x-1/2" />

              {/* Горизонтальная линия (desktop only) */}
              <div className="hidden lg:block absolute top-1/2 left-0 w-[calc(50%-48px)] h-px bg-gray-300 -translate-y-1/2" />
              <div className="hidden lg:block absolute top-1/2 right-0 w-[calc(50%-48px)] h-px bg-gray-300 -translate-y-1/2" />

              {/* Верхний левый */}
              <div className="flex flex-col items-center lg:items-end justify-center lg:justify-end w-full">
                <div className="text-center lg:text-right w-full">
                  <h3 className="font-semibold mb-2 text-center text-base lg:text-lg">
                    Креативные и визуальные системы
                  </h3>
                  <p className="text-sm lg:text-base text-gray-700 leading-relaxed text-center lg:text-right">
                    Логотипы и бренд-айдентика AI-поддержка <br /> и визуальные генерации изображений <br />
                    Креативные коммуникации Геймификация <br /> сервисов и программ лояльности (Telegram, HTML5/WebGL и
                    др.)
                  </p>
                </div>
                {/* Линия-разделитель для mobile */}
                <div className="w-full h-px bg-gray-300 my-6 lg:hidden" />
              </div>

              {/* Верхний правый */}
              <div className="flex flex-col items-center lg:items-start justify-center lg:justify-start w-full">
                <div className="text-center lg:text-left w-full">
                  <h3 className="font-semibold mb-2 text-center text-base lg:text-lg">
                    AI-инструменты и автоматизация
                  </h3>
                  <p className="text-sm lg:text-base text-gray-700 leading-relaxed text-center lg:text-left">
                    AI-чаты, персонализация, аналитика <br />
                    Автоматизация бизнес-процессов <br />
                    Внедрение моделей в продукт (AI-консьержи, ассистенты, промпт-интерфейсы)
                  </p>
                </div>
                {/* Линия-разделитель для mobile */}
                <div className="w-full h-px bg-gray-300 my-6 lg:hidden" />
              </div>

              {/* Нижний левый */}
              <div className="flex flex-col items-center lg:items-end justify-center lg:justify-end w-full">
                <div className="text-center lg:text-right w-full">
                  <h3 className="font-semibold text-center mb-2 text-base lg:text-lg">UX/UI и кастомные платформы</h3>
                  <p className="text-sm lg:text-base text-gray-700 leading-relaxed text-center lg:text-right">
                    Лендинги и промо-сайты SaaS-интерфейсы, платёжные сценарии <br />
                    Личные кабинеты, панели администратора <br />
                    Telegram Mini Apps и web-адаптации (игры, сервисы)
                  </p>
                </div>
                {/* Линия-разделитель для mobile */}
                <div className="w-full h-px bg-gray-300 my-6 lg:hidden" />
              </div>

              {/* Нижний правый */}
              <div className="flex flex-col items-center lg:items-start justify-center lg:justify-start w-full">
                <div className="text-center lg:text-left w-full">
                  <h3 className="font-semibold mb-2 text-base lg:text-lg">Блокчейн-технологии</h3>
                  <p className="text-sm lg:text-base text-gray-700 leading-relaxed text-center lg:text-left">
                    Разработка смарт-контрактов (Ethereum, TON, Solana) <br />
                    NFT-проекты и токенизация активов <br />
                    Децентрализованные приложения (DApps)
                  </p>
                </div>
              </div>

              {/* Центральный круг с аватаркой (desktop only) */}
              {isDesktop && (
                <div
                  ref={circleRef}
                  className="hidden lg:block absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="relative w-22 h-22 flex items-center justify-center">
                    <Image
                      fill
                      src="/circle.svg"
                      alt="avatar"
                      className="z-10 w-10 h-10 rounded-full border-2 absolute -bottom-2 -right-2"
                    />
                  </div>
                </div>
              )}
            </div>
            {/*Круг с аватаркой для mobile, внизу, только на мобильных */}
            {!isDesktop && (
              <div ref={circleRef} className="z-20 flex lg:hidden w-full justify-center mt-8 ">
                <div className="relative w-22 h-22 flex items-center justify-center">
                  <Image
                    fill
                    src="/circle.svg"
                    alt="avatar"
                    className="w-10 h-10 rounded-full border-2  absolute -bottom-2 -right-2"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
