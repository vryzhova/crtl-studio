import React from 'react';

/**
 * Тонкая длинная вертикальная линия с градиентом и закруглёнными концами для таймлайна.
 * Высота и ширина задаются через props (по умолчанию 2x640).
 */
// Define props type to ensure width and height are numbers
export type TimelineLineSvgProps = {
  height?: number;
  width?: number;
  className?: string;
  style?: React.CSSProperties;
};

export const TimelineLineSvg: React.FC<TimelineLineSvgProps> = ({ height = 640, width = 2, className = '', style }) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ height, width, ...style }}
  >
    <defs>
      <linearGradient
        id="timelineLineGradient"
        x1={width / 2}
        y1="0"
        x2={width / 2}
        y2={height}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="#A3A3A3" stopOpacity="0.2" />
        <stop offset="15%" stopColor="#A3A3A3" stopOpacity="1" />
        <stop offset="85%" stopColor="#A3A3A3" stopOpacity="1" />
        <stop offset="100%" stopColor="#A3A3A3" stopOpacity="0.2" />
      </linearGradient>
    </defs>
    <line
      x1={width / 2}
      y1="0"
      x2={width / 2}
      y2={height}
      stroke="url(#timelineLineGradient)"
      strokeWidth={width}
      strokeLinecap="round"
    />
  </svg>
);

export default TimelineLineSvg;
