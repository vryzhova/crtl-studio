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
  min = 50000,
  max = 1000000,
  step = 10000,
}) => {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full relative mt-6">
      {/* Tooltip */}
      <div
        className="absolute -top-8 z-10 px-2 py-1 text-sm font-mono text-black bg-white rounded shadow transition-all duration-200"
        style={{ left: `clamp(0%, calc(${percent}% - 40px), calc(100% - 80px))` }}
      >
        {value.toLocaleString()}
      </div>

      {/* Input range */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className={`
    w-full appearance-none h-0.5 rounded-lg
    bg-gray-elements
    [&::-webkit-slider-thumb]:appearance-none
    [&::-webkit-slider-thumb]:w-2.5
    [&::-webkit-slider-thumb]:h-2.5
    [&::-webkit-slider-thumb]:bg-lime-default
    [&::-webkit-slider-thumb]:rounded-full
    [&::-webkit-slider-thumb]:border-2
    [&::-webkit-slider-thumb]:border-lime-default
    [&::-webkit-slider-thumb]:cursor-pointer
  `}
        style={{
          background: `linear-gradient(to right, #CEF17B ${((value - min) / (max - min)) * 100}%, #808080 0%)`,
        }}
      />
    </div>
  );
};
