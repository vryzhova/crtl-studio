'use client';

import React, { useState } from 'react';

export const ContactForm: React.FC = () => {
  const [budget, setBudget] = useState(120000);
  const [name, setName] = useState('');
  const [contactType, setContactType] = useState('');
  const [phone, setPhone] = useState('');
  const [telegram, setTelegram] = useState('');
  const [email, setEmail] = useState('');
  const [agree, setAgree] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: отправка данных на сервер
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-6 bg-transparent p-0">
      <div className="flex flex-col gap-2">
        <label className="text-xs uppercase tracking-widest text-gray-400">Как вас зовут?</label>
        <input
          className="bg-transparent border-b border-gray-700 px-2 py-2 outline-none text-white"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs uppercase tracking-widest text-gray-400">Предпочтительный способ связи</label>
        <select
          className="bg-transparent border-b border-gray-700 px-2 py-2 outline-none text-white appearance-none"
          value={contactType}
          onChange={e => setContactType(e.target.value)}
          required
        >
          <option value="" disabled hidden>
            Выберите...
          </option>
          <option value="phone">Телефон</option>
          <option value="telegram">Telegram</option>
          <option value="email">Email</option>
        </select>
      </div>
      {contactType === 'phone' && (
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest text-gray-400">Ваш телефон</label>
          <input
            className="bg-transparent border-b border-gray-700 px-2 py-2 outline-none text-white"
            type="tel"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
          />
        </div>
      )}
      {contactType === 'telegram' && (
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest text-gray-400">Ваш Telegram</label>
          <input
            className="bg-transparent border-b border-gray-700 px-2 py-2 outline-none text-white"
            type="text"
            value={telegram}
            onChange={e => setTelegram(e.target.value)}
            required
          />
        </div>
      )}
      {contactType === 'email' && (
        <div className="flex flex-col gap-2">
          <label className="text-xs uppercase tracking-widest text-gray-400">Ваш Email</label>
          <input
            className="bg-transparent border-b border-gray-700 px-2 py-2 outline-none text-white"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
      )}
      <div className="flex flex-col gap-2">
        <label className="text-xs uppercase tracking-widest text-gray-400">Ориентировочный бюджет</label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={50000}
            max={1000000}
            step={10000}
            value={budget}
            onChange={e => setBudget(Number(e.target.value))}
            className="w-full accent-lime-default"
          />
          <span className="font-mono text-sm text-white min-w-[80px] text-right">{budget.toLocaleString('ru-RU')}</span>
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
          Я соглашаюсь с условиями{' '}
          <a href="/privacy" className="underline text-lime-default">
            Политики конфиденциальности
          </a>
          .
        </span>
      </div>
      <button
        type="submit"
        className="mt-4 w-full bg-lime-default text-black py-3 rounded font-semibold text-base transition hover:bg-lime-active"
        disabled={!agree}
      >
        Оставить заявку
      </button>
    </form>
  );
};
