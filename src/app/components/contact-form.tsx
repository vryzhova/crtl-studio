'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const ContactForm: React.FC = () => {
  const [budget, setBudget] = useState(120000);
  const [name, setName] = useState('');
  const [contactType, setContactType] = useState('');
  const [phone, setPhone] = useState('');
  const [telegram, setTelegram] = useState('');
  const [email, setEmail] = useState('');
  const [agree, setAgree] = useState(false);

  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: отправка данных на сервер
  };

  const leftTopLine = 'absolute left-0 top-0 w-8 h-2.5  border-t border-l border-gray-400 rounded-tl-[8px]';
  const leftBottomLine = 'absolute left-0 bottom-0 w-8 h-2.5 border-b border-l border-gray-400 rounded-bl-[8px]';
  const rightTopLine = 'absolute right-0 top-0 w-8 h-2.5 border-t border-r border-gray-400 rounded-tr-[8px]';
  const rightBottomLine = 'absolute right-0 bottom-0 w-8 h-2.5  border-b border-r border-gray-400 rounded-br-[8px]';

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-2.5 bg-transparent p-0">
      {/* Имя */}
      <div className="relative flex items-center my-2">
        <div className={leftTopLine} />
        <div className={leftBottomLine} />
        <div className={rightTopLine} />
        <div className={rightBottomLine} />
        <div className="flex-1 flex flex-col gap-2 pl-8 pr-8">
          <input
            className="bg-transparent outline-none text-white font-mono text-lg py-1 h-15"
            type="text"
            placeholder={t('contact-form.name')}
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Тип связи */}
      <div className="relative flex items-center my-2">
        <div className={leftTopLine} />
        <div className={leftBottomLine} />
        <div className={rightTopLine} />
        <div className={rightBottomLine} />

        <svg
          className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-lime-default pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        <div className="flex-1 flex flex-col gap-2 pl-8 pr-8">
          <label className="text-base font-mono tracking-widest text-gray-400 bg-transparent">
            {t('contact-form.contact_method')}
          </label>
          <select
            className="bg-transparent outline-none text-white font-mono text-lg py-1 appearance-none pr-8"
            value={contactType}
            onChange={e => setContactType(e.target.value)}
            required
          >
            <option value="" disabled hidden>
              {t('contact-form.contact_method_placeholder')}
            </option>
            <option value="phone">{t('contact-form.contact_method_phone')}</option>
            <option value="telegram">{t('contact-form.contact_method_telegram')}</option>
            <option value="email">{t('contact-form.contact_method_email')}</option>
          </select>
        </div>
      </div>
      <div className="relative flex items-center my-2">
        <div className={leftTopLine} />
        <div className={leftBottomLine} />
        <div className={rightTopLine} />
        <div className={rightTopLine} />

        <div className="flex-1 flex flex-col gap-2 pl-8 pr-8">
          <input
            className="bg-transparent outline-none text-white font-mono text-lg py-1 h-15"
            type="tel"
            placeholder={t('contact-form.phone')}
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="relative flex items-center my-2">
        {/*TELEGRAM*/}
        <div className={leftTopLine} />
        <div className={leftBottomLine} />
        <div className={rightTopLine} />
        <div className={rightBottomLine} />
        <div className="flex-1 flex flex-col gap-2 pl-8 pr-8">
          <input
            className="bg-transparent outline-none text-white font-mono text-lg py-1 h-15"
            type="text"
            placeholder={t('contact-form.telegram')}
            value={telegram}
            onChange={e => setTelegram(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="relative flex items-center my-2">
        {/* EMAIL */}
        <div className={leftTopLine} />
        <div className={leftBottomLine} />
        <div className={rightTopLine} />
        <div className={rightBottomLine} />
        <div className="flex-1 flex flex-col gap-2 pl-8 pr-8">
          <input
            className="bg-transparent outline-none text-white font-mono text-lg py-1 h-15"
            placeholder={t('contact-form.email')}
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="relative flex items-center my-2">
        {/* Бюджет */}
        <div className="flex-1 flex flex-col gap-2 ">
          <label className="text-base font-mono tracking-widest text-gray-400 bg-transparent">
            {t('contact-form.budget')}
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={50000}
              max={1000000}
              step={10000}
              value={budget}
              onChange={e => setBudget(Number(e.target.value))}
              className="range-input w-full accent-lime-default"
            />
            <span className="font-mono text-sm text-white min-w-[80px] text-right">
              {budget.toLocaleString('ru-RU')}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <input
          type="checkbox"
          checked={agree}
          onChange={e => setAgree(e.target.checked)}
          required
          className="accent-lime-default"
        />
        <span className="text-xs text-gray-400">
          {t('contact-form.agree')}{' '}
          <a href="/privacy" className="underline text-lime-default">
            {t('contact-form.privacy_policy')}
          </a>
          .
        </span>
      </div>
      <button
        type="submit"
        className="mt-4 w-full bg-lime-default text-black py-3 rounded font-semibold text-base transition hover:bg-lime-active"
        disabled={!agree}
      >
        {t('contact-form.submit')}
      </button>
    </form>
  );
};
