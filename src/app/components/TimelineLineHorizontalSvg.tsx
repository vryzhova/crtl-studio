'use client';

import React, { useState, useEffect } from 'react';

/**
 * Тонкая длинная горизонтальная линия с градиентом и закруглёнными концами для таймлайна.
 * Ширина и высота задаются через props (по умолчанию 640x2).
 */
export type TimelineLineHorizontalSvgProps = {
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
};

export const TimelineLineHorizontalSvg: React.FC<TimelineLineHorizontalSvgProps> = ({
  width = 640,
  height = 2,
  className = '',
  style,
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width, height, ...style }}
  >
    <defs>
      <linearGradient
        id="timelineLineHorizontalGradient"
        x1="0"
        y1={height / 2}
        x2={width}
        y2={height / 2}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="#A3A3A3" stopOpacity="0.2" />
        <stop offset="15%" stopColor="#A3A3A3" stopOpacity="1" />
        <stop offset="85%" stopColor="#A3A3A3" stopOpacity="1" />
        <stop offset="100%" stopColor="#A3A3A3" stopOpacity="0.2" />
      </linearGradient>
    </defs>
    <line
      x1="0"
      y1={height / 2}
      x2={width}
      y2={height / 2}
      stroke="url(#timelineLineHorizontalGradient)"
      strokeWidth={height}
      strokeLinecap="round"
    />
  </svg>
);

export default TimelineLineHorizontalSvg;

type Props = {
  targetRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
  top?: number | string;
};

export const AutoWidthTimelineLine = ({ targetRef, className, top = 40 }: Props) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!targetRef.current) return;
    const update = () => {
      setWidth(targetRef.current!.scrollWidth);
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [targetRef]);

  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        top,
        left: 0,
        zIndex: 0,
        width,
        pointerEvents: 'none',
      }}
    >
      <TimelineLineHorizontalSvg width={width} height={2} />
    </div>
  );
};
