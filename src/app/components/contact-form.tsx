'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import IMask from 'imask';

import { BudgetSlider, Button } from '@/app/components';
import CustomSelect from '@/app/components/custom-select';
import { ThankYouModal } from './thankyou-modal';

export const ContactForm: React.FC = () => {
  const [budget, setBudget] = useState(120000);
  const [name, setName] = useState('');
  const [contactType, setContactType] = useState('');
  const [phone, setPhone] = useState('');
  const [telegram, setTelegram] = useState('');
  const [email, setEmail] = useState('');
  const [agree, setAgree] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { t } = useTranslation();

  // Валидация: имя (только буквы), телефон, email
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    // Имя: только буквы (рус/лат)
    if (!name.trim() || !/^[a-zA-Zа-яА-ЯёЁ\s'-]+$/.test(name)) {
      newErrors.name = 'ПРОВЕРЬТЕ ПРАВИЛЬНОСТЬ ВВОДА';
    }
    // Телефон: простой паттерн, минимум 10 цифр
    if (!phone.trim() || !/^\+?\d{10,15}$/.test(phone.replace(/\D/g, ''))) {
      newErrors.phone = 'ПРОВЕРЬТЕ ПРАВИЛЬНОСТЬ ВВОДА';
    }
    // Email: базовая проверка
    if (!email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      newErrors.email = 'ПРОВЕРЬТЕ ПРАВИЛЬНОСТЬ ВВОДА';
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setIsThankYouModalOpen(true);
      // TODO: отправка данных на сервер
    }
  };

  useEffect(() => {
    if (!inputRef.current) return;

    const mask = IMask(inputRef.current, {
      mask: '+{7} (000) 000-00-00',
    });

    return () => {
      mask.destroy();
    };
  }, []);

  const leftTopLine = 'absolute z-10 left-0 top-0 w-8 h-2.5  border-t border-l border-white rounded-tl-[8px]';
  const leftBottomLine = 'absolute z-10 left-0 bottom-0 w-8 h-2.5 border-b border-l border-white rounded-bl-[8px]';
  const rightTopLine = 'absolute z-10 right-0 top-0 w-8 h-2.5 border-t border-r border-white rounded-tr-[8px]';
  const rightBottomLine = 'absolute z-10 right-0 bottom-0 w-8 h-2.5  border-b border-r border-white rounded-br-[8px]';

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2.5 bg-transparent p-0 md:gap-4">
        {/* Имя */}
        <div className="relative flex flex-col sm:flex-row items-center my-2 gap-0 sm:gap-2">
          <div className={leftTopLine} />
          <div className={leftBottomLine} />
          <div className={rightTopLine} />
          <div className={rightBottomLine} />
          <div className="flex-1 flex flex-col gap-2 pl-8 pr-8 relative bg-black">
            <input
              className={`bg-transparent outline-none font-mono text-lg py-1 h-15 w-full pr-16 ${errors.name ? 'text-red-error' : 'text-white'}`}
              type="text"
              placeholder={t('contact-form.name')}
              value={name}
              onChange={e => setName(e.target.value)}
            />
            {errors.name && (
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-red-error font-mono text-xs uppercase">
                {errors.name}
              </span>
            )}
          </div>
        </div>

        {/* Тип связи */}
        <CustomSelect onChange={setContactType} />

        <div className="relative flex flex-col sm:flex-row items-center my-2 gap-0 sm:gap-2">
          <div className={leftTopLine} />
          <div className={leftBottomLine} />
          <div className={rightTopLine} />
          <div className={rightBottomLine} />
          <div className="flex-1 flex flex-col gap-2 pl-8 pr-8 relative bg-black">
            <input
              className={`bg-transparent outline-none font-mono text-lg py-1 h-15 w-full pr-16 ${errors.phone ? 'text-red-error' : 'text-white'}`}
              type="tel"
              ref={inputRef}
              placeholder={t('contact-form.phone')}
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
            {errors.phone && (
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-red-error font-mono text-xs uppercase">
                {errors.phone}
              </span>
            )}
          </div>
        </div>

        <div className="relative flex flex-col sm:flex-row items-center my-2 gap-0 sm:gap-2">
          {/*TELEGRAM*/}
          <div className={leftTopLine} />
          <div className={leftBottomLine} />
          <div className={rightTopLine} />
          <div className={rightBottomLine} />
          <div className="flex-1 flex flex-col gap-2 pl-8 pr-8 relative bg-black">
            <input
              className="bg-transparent outline-none text-white font-mono text-lg py-1 h-15 w-full pr-16"
              type="text"
              placeholder={t('contact-form.telegram')}
              value={telegram}
              onChange={e => setTelegram(e.target.value)}
            />
          </div>
        </div>

        <div className="relative flex flex-col sm:flex-row items-center my-2 gap-0 sm:gap-2">
          {/* EMAIL */}
          <div className={leftTopLine} />
          <div className={leftBottomLine} />
          <div className={rightTopLine} />
          <div className={rightBottomLine} />
          <div className="flex-1 flex flex-col gap-2 pl-8 pr-8 relative bg-black">
            <input
              className={`bg-transparent outline-none font-mono text-lg py-1 h-15 w-full pr-16 ${errors.email ? 'text-red-error' : 'text-white'}`}
              placeholder={t('contact-form.email')}
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            {errors.email && (
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-red-error font-mono text-xs uppercase">
                {errors.email}
              </span>
            )}
          </div>
        </div>

        {/* Бюджет — блок с input и range */}
        <div className="flex flex-col gap-2 mt-4">
          <label className="text-base font-mono tracking-widest text-gray-elements bg-transparent mb-2 px-7.5">
            {t('contact-form.budget')}
          </label>
          <BudgetSlider min={50000} max={1000000} step={10000} value={budget} onChange={value => setBudget(value)} />
        </div>
        {/* Чекбокс с политикой */}
        <div className="flex items-center gap-3 mt-4">
          <label className="relative flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={agree}
              onChange={e => setAgree(e.target.checked)}
              className="peer sr-only"
            />
            <span
              className="w-6 h-6 rounded-sm border-1 border-lime-default bg-black
             peer-checked:after:content-['']
             relative
             after:absolute
             after:inset-1/2
             after:-translate-x-1/2 after:-translate-y-1/2
             after:w-[6px] after:h-[12px]
             after:border-r-2 after:border-b-2
             after:border-lime-default
             after:rotate-45
             after:opacity-0
             peer-checked:after:opacity-100
             transition"
            />
          </label>

          <span className="text-lg text-white">
            {t('contact-form.agree')}{' '}
            <a href="/privacy" className="text-lime-default underline">
              {t('contact-form.privacy_policy')}
            </a>
            .
          </span>
        </div>

        <Button
          onClick={handleSubmit}
          type="submit"
          className="mt-4 w-[320px] xl:w-[244px] 3xl:w-[300px]"
          disabled={!agree}
        >
          {t('contact-form.submit')}
        </Button>
      </form>
      <ThankYouModal
        title={t('contact-form.thank_you_title')}
        description={t('contact-form.thank_you_description')}
        open={isThankYouModalOpen}
        onClose={() => setIsThankYouModalOpen(false)}
      />
    </>
  );
};
