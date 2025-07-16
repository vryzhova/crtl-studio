'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

type Props = {
  text: string;
  className?: string;
  lineClassName?: string;
  glitchChars?: string;
  glitchDuration?: number;
  delayPerChar?: number;
};

export const GlitchTypewriterText: React.FC<Props> = ({
  text,
  className = 'text-2xl font-mono text-white space-y-2',
  lineClassName = '',
  glitchChars = '/|\\',
  glitchDuration = 80,
  delayPerChar = 50,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const [reservedHeight, setReservedHeight] = useState<number | undefined>(undefined);

  // 📏 Высота до запуска анимации
  useEffect(() => {
    if (ghostRef.current) {
      setReservedHeight(ghostRef.current.offsetHeight);
    }
  }, [text]);

  // 🎞️ Глитч-анимация
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '';

    const lines = text.split('\n');

    lines.forEach(line => {
      const lineEl = document.createElement('div');
      lineEl.className = lineClassName;
      [...line].forEach(() => {
        const span = document.createElement('span');
        span.textContent = '';
        lineEl.appendChild(span);
      });
      container.appendChild(lineEl);
    });

    const lineEls = Array.from(container.children) as HTMLElement[];

    let totalDelay = 0;

    lineEls.forEach((lineEl, lineIndex) => {
      const chars = lines[lineIndex];
      const spans = Array.from(lineEl.children) as HTMLElement[];

      spans.forEach((span, charIndex) => {
        gsap.delayedCall(totalDelay / 1000, () => {
          const glitchInterval = setInterval(() => {
            span.textContent = glitchChars[Math.floor(Math.random() * glitchChars.length)];
          }, 20);

          setTimeout(() => {
            clearInterval(glitchInterval);
            span.textContent = chars[charIndex];
          }, glitchDuration);
        });

        totalDelay += delayPerChar;
      });
    });
  }, [text, glitchChars, glitchDuration, delayPerChar, lineClassName]);

  return (
    <>
      {/* Видимый контейнер с глитчем */}
      <div ref={containerRef} className={className} style={{ minHeight: reservedHeight }} />

      {/* Призрачный (невидимый) контейнер для расчёта высоты */}
      <div
        ref={ghostRef}
        className={className}
        style={{
          visibility: 'hidden',
          position: 'absolute',
          pointerEvents: 'none',
          zIndex: -1,
          whiteSpace: 'pre-line',
        }}
        aria-hidden
      >
        {text}
      </div>
    </>
  );
};
