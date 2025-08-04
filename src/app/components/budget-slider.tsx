import { useState } from 'react';
import Slider from 'antd/es/slider';
import 'antd/es/slider/style';

type BudgetSliderProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
};

export const BudgetSlider: React.FC<BudgetSliderProps> = ({
  value,
  onChange,
  min = 4000,
  max = 700000,
  step = 1000,
}) => {
  const formatCurrencyShort = (num: number) => {
    if (num === max) return `$${Math.round(max / 1000)}k+`; // Special case for max value
    if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(1)}M`;
    if (num >= 1_000) return `$${Math.round(num / 1000)}k`;
    return `$${num}`;
  };

  return (
    <div className="w-[97%] md:w-full mt-6 mx-auto">
      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="budget-slider"
        styles={{
          rail: {
            backgroundColor: '#808080',
            height: 2,
          },
        }}
        tooltip={{
          formatter: (num?: number) => (num !== undefined ? formatCurrencyShort(num) : null),
          open: true,
          placement: 'top',
          autoAdjustOverflow: false,
        }}
      />
    </div>
  );
};
