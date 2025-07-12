'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BudgetSlider } from '@/app/components/budget-slider';
import CustomSelect from '@/app/components/custom-select';

export const ContactForm: React.FC = () => {
  const [budget, setBudget] = useState(120000);
  const [name, setName] = useState('');
  const [contactType, setContactType] = useState('');
  const [phone, setPhone] = useState('');
  const [telegram, setTelegram] = useState('');
  const [email, setEmail] = useState('');
  const [agree, setAgree] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
      // TODO: отправка данных на сервер
    }
  };

  const leftTopLine = 'absolute left-0 top-0 w-8 h-2.5  border-t border-l border-gray-400 rounded-tl-[8px]';
  const leftBottomLine = 'absolute left-0 bottom-0 w-8 h-2.5 border-b border-l border-gray-400 rounded-bl-[8px]';
  const rightTopLine = 'absolute right-0 top-0 w-8 h-2.5 border-t border-r border-gray-400 rounded-tr-[8px]';
  const rightBottomLine = 'absolute right-0 bottom-0 w-8 h-2.5  border-b border-r border-gray-400 rounded-br-[8px]';

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md flex flex-col gap-2.5 bg-transparent p-0 md:gap-4 md:max-w-lg lg:max-w-xl xl:max-w-2xl"
    >
      {/* Имя */}
      <div className="relative flex flex-col sm:flex-row items-center my-2 gap-0 sm:gap-2">
        <div className={leftTopLine} />
        <div className={leftBottomLine} />
        <div className={rightTopLine} />
        <div className={rightBottomLine} />
        <div className="flex-1 flex flex-col gap-2 pl-8 pr-8 relative">
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
        <div className="flex-1 flex flex-col gap-2 pl-8 pr-8 relative">
          <input
            className={`bg-transparent outline-none font-mono text-lg py-1 h-15 w-full pr-16 ${errors.phone ? 'text-red-error' : 'text-white'}`}
            type="tel"
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
        <div className="flex-1 flex flex-col gap-2 pl-8 pr-8">
          <input
            className="bg-transparent outline-none text-white font-mono text-lg py-1 h-15 w-full"
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
        <div className="flex-1 flex flex-col gap-2 pl-8 pr-8 relative">
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
        <label className="text-base font-mono tracking-widest text-gray-elements bg-transparent mb-2">
          {t('contact-form.budget')}
        </label>
        <BudgetSlider min={50000} max={1000000} step={10000} value={budget} onChange={value => setBudget(value)} />
      </div>
      {/* Чекбокс с политикой */}
      <div className="flex items-center gap-3 mt-4">
        <input
          type="checkbox"
          checked={agree}
          onChange={e => setAgree(e.target.checked)}
          className="accent-lime-default w-6 h-6 rounded border-2 border-lime-default"
        />
        <span className="text-lg text-white">
          {t('contact-form.agree')}{' '}
          <a href="/privacy" className="text-lime-default underline">
            {t('contact-form.privacy_policy')}
          </a>
          .
        </span>
      </div>
      <button
        type="submit"
        className="mt-4 w-full bg-lime-default hover:bg-lime-active active:bg-lime-active active:border-white text-black py-3 rounded font-semibold text-base transition "
        disabled={!agree}
      >
        {t('contact-form.submit')}
      </button>
    </form>
  );
};
