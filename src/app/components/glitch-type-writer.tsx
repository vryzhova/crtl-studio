'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  text: string; // передаём обычную строку с \n
  className?: string;
  lineClassName?: string;
  glitchChars?: string; // Символы для глитча
  glitchDuration?: number; // Время глитча для каждой буквы (мс)
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
          // Начинаем глитч - быстро меняем символы
          const glitchInterval = setInterval(() => {
            span.textContent = glitchChars[Math.floor(Math.random() * glitchChars.length)];
          }, 20);

          // Через glitchDuration мс ставим финальный символ
          setTimeout(() => {
            clearInterval(glitchInterval);
            span.textContent = chars[charIndex];
          }, glitchDuration);
        });

        totalDelay += delayPerChar;
      });
    });
  }, [text, glitchChars, glitchDuration, delayPerChar, lineClassName]);

  return <div ref={containerRef} className={className} />;
};
