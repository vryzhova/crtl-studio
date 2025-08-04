'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import emailjs from '@emailjs/browser';

import { BudgetSlider, Button } from '@/app/components';
import CustomSelect from '@/app/components/custom-select';
import { ThankYouModal } from './thankyou-modal';
import { useLenis } from '@/app/lenis-context';

export const ContactForm: React.FC = () => {
  const [budget, setBudget] = useState(5000);
  const [name, setName] = useState('');
  const [contactType, setContactType] = useState('');
  const [mobile, setMobile] = useState('');
  const [telegram, setTelegram] = useState('');
  const [email, setEmail] = useState('');
  const [agreePolicy, setAgree] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);
  const lang = i18n.language;
  const policyLink = lang === 'ru' ? '/Политика_конфиденциальности.pdf' : '/Privacy_Policy.pdf';

  const lenisRef = useLenis();

  useEffect(() => {
    if (!lenisRef) return;
    if (isThankYouModalOpen) {
      // @ts-ignore
      lenisRef.current.stop();
    } else {
      // @ts-ignore
      lenisRef.current.start();
    }
  }, [isThankYouModalOpen, lenisRef]);

  const { t } = useTranslation();

  // Валидация: имя (только буквы), телефон, email
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    // Имя: только буквы (рус/лат)
    if (!name.trim() || !/^[a-zA-Zа-яА-ЯёЁ\s'-]+$/.test(name)) {
      newErrors.name = t('contact-form.error_message');
    }
    // Телефон: простой паттерн, минимум 6 цифр
    if (!mobile.trim() || !/^\+?\d{6,15}$/.test(mobile.replace(/\D/g, ''))) {
      newErrors.mobile = t('contact-form.error_message');
    }
    // Email: базовая проверка
    if (!email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      newErrors.email = t('contact-form.error_message');
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      const data = {
        budget,
        name,
        contactType,
        mobile,
        telegram,
        email,
        agreePolicy,
      };

      emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        data,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      console.log(data);
      setIsThankYouModalOpen(true);
    }
  };

  const leftTopLine = 'absolute z-10 left-0 top-0 w-8 h-2.5  border-t border-l rounded-tl-[8px]';
  const leftBottomLine = 'absolute z-10 left-0 bottom-0 w-8 h-2.5 border-b border-l rounded-bl-[8px]';
  const rightTopLine = 'absolute z-10 right-0 top-0 w-8 h-2.5 border-t border-r rounded-tr-[8px]';
  const rightBottomLine = 'absolute z-10 right-0 bottom-0 w-8 h-2.5  border-b border-r rounded-br-[8px]';

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2.5 bg-transparent p-0 md:gap-4">
        {/* Имя */}
        <div className="group relative flex flex-col sm:flex-row items-center my-2 gap-0 sm:gap-2">
          <div
            className={`transition-all duration-300 ${leftTopLine} ${name ? 'border-lime-default' : 'border-white'}  group-hover:border-lime-default group-focus:border-lime-default active:border-lime-default`}
          />
          <div
            className={`transition-all duration-300 ${leftBottomLine} ${name ? 'border-lime-default' : 'border-white'}  group-hover:border-lime-default group-focus:border-lime-default active:border-lime-default`}
          />
          <div
            className={`transition-all duration-300 ${rightTopLine} ${name ? 'border-lime-default' : 'border-white'}  group-hover:border-lime-default group-focus:border-lime-default active:border-lime-default`}
          />
          <div
            className={`transition-all duration-300 ${rightBottomLine} ${name ? 'border-lime-default' : 'border-white'}  group-hover:border-lime-default group-focus:border-lime-default active:border-lime-default`}
          />
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

        <div className="relative group flex flex-col sm:flex-row items-center my-2 gap-0 sm:gap-2">
          <div
            className={`transition-all duration-300 ${leftTopLine} ${mobile ? 'border-lime-default' : 'border-white'} group-hover:border-lime-default group-focus:border-lime-default active:border-lime-default`}
          />
          <div
            className={`transition-all duration-300 ${leftBottomLine} ${mobile ? 'border-lime-default' : 'border-white'} group-hover:border-lime-default group-focus:border-lime-default active:border-lime-default`}
          />
          <div
            className={`transition-all duration-300 ${rightTopLine} ${mobile ? 'border-lime-default' : 'border-white'} group-hover:border-lime-default group-focus:border-lime-default active:border-lime-default`}
          />
          <div
            className={`transition-all duration-300 ${rightBottomLine} ${mobile ? 'border-lime-default' : 'border-white'} group-hover:border-lime-default group-focus:border-lime-default active:border-lime-default`}
          />
          <div className="flex-1 flex flex-col gap-2 pl-8 pr-8 relative bg-black">
            <input
              className={`bg-transparent outline-none font-mono text-lg py-1 h-15 w-full pr-16 ${errors.mobile ? 'text-red-error' : 'text-white'}`}
              type="tel"
              placeholder={t('contact-form.phone')}
              value={mobile}
              onChange={e => setMobile(e.target.value)}
            />
            {errors.mobile && (
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-red-error font-mono text-xs uppercase">
                {errors.mobile}
              </span>
            )}
          </div>
        </div>

        <div className="group relative flex flex-col sm:flex-row items-center my-2 gap-0 sm:gap-2">
          {/*TELEGRAM*/}
          <div
            className={`transition-all duration-300 ${leftTopLine} ${telegram ? 'border-lime-default' : 'border-white'} group-hover:border-lime-default group-focus:border-lime-default active:border-lime-default`}
          />
          <div
            className={`transition-all duration-300 ${leftBottomLine} ${telegram ? 'border-lime-default' : 'border-white'} group-hover:border-lime-default group-focus:border-lime-default active:border-lime-default`}
          />
          <div
            className={`transition-all duration-300 ${rightTopLine} ${telegram ? 'border-lime-default' : 'border-white'} group-hover:border-lime-default group-focus:border-lime-default active:border-lime-default`}
          />
          <div
            className={`transition-all duration-300 ${rightBottomLine} ${telegram ? 'border-lime-default' : 'border-white'} group-hover:border-lime-default group-focus:border-lime-default active:border-lime-default`}
          />
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

        <div className="group relative flex flex-col sm:flex-row items-center my-2 gap-0 sm:gap-2">
          {/* EMAIL */}
          <div
            className={`transition-all duration-300 ${leftTopLine} ${email ? 'border-lime-default' : 'border-white'} group-hover:border-lime-default group-focus:border-lime-default active:border-lime-default`}
          />
          <div
            className={`transition-all duration-300 ${leftBottomLine} ${email ? 'border-lime-default' : 'border-white'} group-hover:border-lime-default group-focus:border-lime-default active:border-lime-default`}
          />
          <div
            className={`transition-all duration-300 ${rightTopLine} ${email ? 'border-lime-default' : 'border-white'} group-hover:border-lime-default group-focus:border-lime-default active:border-lime-default`}
          />
          <div
            className={`transition-all duration-300 ${rightBottomLine} ${email ? 'border-lime-default' : 'border-white'} group-hover:border-lime-default group-focus:border-lime-default active:border-lime-default`}
          />
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
          <span className="text-lg font-mono tracking-widest text-gray-elements bg-transparent mb-2 px-7.5">
            {t('contact-form.budget')}
          </span>
          <BudgetSlider min={4000} max={700000} step={1000} value={budget} onChange={value => setBudget(value)} />
        </div>
        {/* Чекбокс с политикой */}
        <div className="flex gap-3 mt-4">
          <label className="relative flex cursor-pointer">
            <input
              type="checkbox"
              checked={agreePolicy}
              onChange={e => setAgree(e.target.checked)}
              className="peer sr-only"
            />
            <span
              className="w-6 h-6 rounded-sm border-1 border-white bg-black
             peer-checked:after:content-['']
             peer-checked:border-lime-default
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
            <a href={policyLink} target="_blank" rel="noopener noreferrer" className="text-lime-default">
              {t('contact-form.privacy_policy')}
            </a>
            .
          </span>
        </div>

        <Button
          onClick={handleSubmit}
          type="submit"
          className="mt-4 w-[320px] xl:w-[244px] 3xl:w-[300px]"
          disabled={!agreePolicy}
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
