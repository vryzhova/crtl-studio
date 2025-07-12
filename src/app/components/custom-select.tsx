'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface SelectOption {
  value: string;
  label: string;
}

type TProps = {
  onChange: (selectedOption: string) => void;
};

const CustomSelect: React.FC<TProps> = ({ onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const options: SelectOption[] = [
    { value: 'telegram', label: 'TELEGRAM' },
    { value: 'email', label: 'EMAIL' },
    { value: 'phone', label: 'ТЕЛЕФОН' },
  ];

  // Стили для линий (замените на ваши реальные классы)
  const leftTopLine = 'absolute left-0 top-0 w-8 h-2.5  border-t border-l border-gray-400 rounded-tl-[8px]';
  const leftBottomLine = 'absolute left-0 bottom-0 w-8 h-2.5 border-b border-l border-gray-400 rounded-bl-[8px]';
  const rightTopLine = 'absolute right-0 top-0 w-8 h-2.5 border-t border-r border-gray-400 rounded-tr-[8px]';
  const rightBottomLine = 'absolute right-0 bottom-0 w-8 h-2.5  border-b border-r border-gray-400 rounded-br-[8px]';

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: SelectOption) => {
    onChange(option.value);
    setSelectedOption(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative flex flex-col sm:flex-row items-center my-2 gap-0 sm:gap-2" ref={selectRef}>
      {/* Декоративные линии */}
      <div className={leftTopLine} />
      <div className={leftBottomLine} />
      <div className={rightTopLine} />
      <div className={rightBottomLine} />

      {/* Основной селект */}
      <div
        className={`flex-1 flex flex-col gap-2 pl-8 pr-8 w-full cursor-pointer bg-transparent`}
        onClick={toggleDropdown}
      >
        <div className="relative py-3 border-e-gray-elements">
          <span className={`text-lg font-mono ${selectedOption ? 'text-white' : 'text-gray-elements'}`}>
            {selectedOption ? selectedOption.label : t('contact-form.contact_method')}
          </span>
        </div>
      </div>

      {/* Стрелка (как в вашей верстке) */}
      <svg
        className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-lime-default pointer-events-none transition-transform ${isOpen ? 'rotate-180' : ''}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>

      {/* Выпадающее меню */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-10 mt-1 text-black ">
          {options.map(option => (
            <div
              key={option.value}
              className={`px-8 py-3 text-lg font-mono  rounded-md border-3 bg-white text-black cursor-pointer hover:bg-gray-elements ${
                selectedOption?.value === option.value ? 'bg-gray-elements' : ''
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
