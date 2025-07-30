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
  const leftTopLine = 'absolute z-10 left-0 top-0 w-8 h-2.5  border-t border-l rounded-tl-[8px]';
  const leftBottomLine = 'absolute z-10  left-0 bottom-0 w-8 h-2.5 border-b border-l  rounded-bl-[8px]';
  const rightTopLine = 'absolute z-10 right-0 top-0 w-8 h-2.5 border-t border-r rounded-tr-[8px]';
  const rightBottomLine = 'absolute z-10 right-0 bottom-0 w-8 h-2.5  border-b border-r rounded-br-[8px]';

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
    <div className="group relative flex flex-col sm:flex-row items-center my-2 gap-0 sm:gap-2" ref={selectRef}>
      {/* Декоративные линии */}
      <div
        className={`transition-all duration-300 ${leftTopLine}  ${selectedOption ? 'border-lime-default' : 'border-white'} group-hover:border-lime-default group-focus:border-lime-default active:border-lime-default`}
      />
      <div
        className={`transition-all duration-300 ${leftBottomLine} ${selectedOption ? 'border-lime-default' : 'border-white'} group-hover:border-lime-default group-focus:border-lime-default active:border-lime-default`}
      />
      <div
        className={`transition-all duration-300 ${rightTopLine} ${selectedOption ? 'border-lime-default' : 'border-white'} group-hover:border-lime-default group-focus:border-lime-default active:border-lime-default`}
      />
      <div
        className={`transition-all duration-300 ${rightBottomLine} ${selectedOption ? 'border-lime-default' : 'border-white'} group-hover:border-lime-default group-focus:border-lime-default active:border-lime-default`}
      />

      {/* Основной селект */}
      <div className={`flex-1 flex flex-col gap-2 pl-8 pr-8 w-full cursor-pointer bg-black`} onClick={toggleDropdown}>
        <div className="relative py-3 border-e-gray-elements">
          <span className="text-lg font-mono text-white">
            {selectedOption ? selectedOption.label : t('contact-form.contact_method')}
          </span>
        </div>
      </div>

      {/* Стрелка (как в вашей верстке) */}
      <svg
        className={`absolute right-4 top-1/2 -translate-y-1/2 w-4.5 h-4 text-lime-default pointer-events-none transition-transform ${isOpen ? 'rotate-180' : ''}`}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M6 9L12 15L18 9H6Z" />
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
