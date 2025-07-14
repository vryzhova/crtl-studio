import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const getCornerSVG = (cornerOffset: number, cornerLength: number, cornerRadius: number, svgSize: number) => (
  <>
    {/* Top-right */}
    <svg
      className="absolute right-0 top-0"
      width={svgSize}
      height={svgSize}
      viewBox={`0 0 ${svgSize} ${svgSize}`}
      fill="none"
    >
      <path
        d={`M${svgSize - cornerLength - cornerOffset} ${cornerOffset} H${svgSize - cornerRadius - cornerOffset} Q${svgSize - cornerOffset} ${cornerOffset},${svgSize - cornerOffset} ${cornerRadius + cornerOffset} V${cornerLength + cornerOffset}`}
        stroke="black"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
    {/* Bottom-right */}
    <svg
      className="absolute right-0 bottom-0"
      width={svgSize}
      height={svgSize}
      viewBox={`0 0 ${svgSize} ${svgSize}`}
      fill="none"
    >
      <path
        d={`M${svgSize - cornerOffset} ${svgSize - cornerLength - cornerOffset} V${svgSize - cornerRadius - cornerOffset} Q${svgSize - cornerOffset} ${svgSize - cornerOffset},${svgSize - cornerRadius - cornerOffset} ${svgSize - cornerOffset} H${svgSize - cornerLength - cornerOffset}`}
        stroke="black"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
    {/* Bottom-left */}
    <svg
      className="absolute left-0 bottom-0"
      width={svgSize}
      height={svgSize}
      viewBox={`0 0 ${svgSize} ${svgSize}`}
      fill="none"
    >
      <path
        d={`M${cornerLength + cornerOffset} ${svgSize - cornerOffset} H${cornerRadius + cornerOffset} Q${cornerOffset} ${svgSize - cornerOffset},${cornerOffset} ${svgSize - cornerRadius - cornerOffset} V${svgSize - cornerLength - cornerOffset}`}
        stroke="black"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
    {/* Top-left */}
    <svg
      className="absolute left-0 top-0"
      width={svgSize}
      height={svgSize}
      viewBox={`0 0 ${svgSize} ${svgSize}`}
      fill="none"
    >
      <path
        d={`M${cornerOffset} ${cornerLength + cornerOffset} V${cornerRadius + cornerOffset} Q${cornerOffset} ${cornerOffset},${cornerRadius + cornerOffset} ${cornerOffset} H${cornerLength + cornerOffset}`}
        stroke="black"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  </>
);

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, disabled, className = '', variant, ...props }, ref) => {
    const base =
      'relative flex items-center justify-center w-[320px] lg:w-[244px] 2xl:w-[300px]  h-[60px] py-2 px-5 rounded-md text-black text-base xl:text-lg font-medium transition-all duration-200 outline-none group';

    const enabled = 'bg-lime-default hover:bg-lime-active focus:bg-lime-active focus:border-2 focus:border-white';
    const disabledStyle = 'bg-[#B9B9B9] cursor-not-allowed';

    const CORNER_OFFSET = 5; // отступ от краёв
    const CORNER_LENGTH = 19; // уменьшено на 5px
    const CORNER_RADIUS = 11; // уменьшено на 5px
    const SVG_SIZE = 40;

    const CornerSVG = getCornerSVG(CORNER_OFFSET, CORNER_LENGTH, CORNER_RADIUS, SVG_SIZE);

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={[base, disabled ? disabledStyle : enabled, 'focus:z-10', className].join(' ')}
        {...props}
      >
        {/* SVG corners только на hover, не на focus-visible */}
        {!disabled && (
          <span className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-150 group-focus-visible:opacity-0">
            {CornerSVG}
          </span>
        )}
        <span className="relative z-20">{children}</span>
      </button>
    );
  }
);
Button.displayName = 'Button';
