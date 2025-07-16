'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

type Props = {
  text: string;
  className?: string;
  lineClassName?: string;
  glitchChars?: string;
  glitchDuration?: number; // общее время глича на символ
  delayPerChar?: number; // задержка между символами
};

export const GlitchTypewriterText: React.FC<Props> = ({
  text,
  className = 'text-white',
  lineClassName = '',
  glitchChars = '/|\\',
  glitchDuration = 80,
  delayPerChar = 50,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Очистка контейнера
    container.innerHTML = '';

    const lines = text.split('\n');
    const glitchSet = glitchChars.length ? glitchChars : '/|\\';
    const activeIntervals: NodeJS.Timeout[] = [];

    // Создание DOM-элементов
    lines.forEach((line, lineIndex) => {
      const lineEl = document.createElement('div');
      lineEl.className = lineClassName;

      [...line].forEach(() => {
        const span = document.createElement('span');
        span.textContent = ''; // начально пустой
        span.style.opacity = '1';
        span.style.display = 'inline-block'; // чтобы не прыгал текст
        lineEl.appendChild(span);
      });

      container.appendChild(lineEl);
    });

    // Анимация появления
    const lineEls = Array.from(container.children) as HTMLElement[];
    let totalDelay = 0;

    lineEls.forEach((lineEl, lineIndex) => {
      const chars = lines[lineIndex];
      const spans = Array.from(lineEl.children) as HTMLElement[];

      spans.forEach((span, charIndex) => {
        const finalChar = chars[charIndex];

        // Запускаем с задержкой через gsap
        gsap.delayedCall(totalDelay / 1000, () => {
          let glitchCount = 0;
          const maxGlitches = Math.ceil(glitchDuration / 20);

          const interval = setInterval(() => {
            if (glitchCount >= maxGlitches) {
              clearInterval(interval);
              span.textContent = finalChar;
            } else {
              span.textContent = glitchSet[Math.floor(Math.random() * glitchSet.length)];
              glitchCount++;
            }
          }, 20);

          activeIntervals.push(interval);
        });

        totalDelay += delayPerChar;
      });
    });

    return () => {
      activeIntervals.forEach(interval => clearInterval(interval));
    };
  }, [text, glitchChars, glitchDuration, delayPerChar, lineClassName]);

  return <div ref={containerRef} className={className} />;
};
