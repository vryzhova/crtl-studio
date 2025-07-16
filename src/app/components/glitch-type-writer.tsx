'use client';

import { useEffect, useRef } from 'react';
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

    container.innerHTML = '';

    const lines = text.split('\n');
    const glitchSet = glitchChars.length ? glitchChars : '/|\\';
    const activeIntervals: NodeJS.Timeout[] = [];

    lines.forEach((line, lineIndex) => {
      const lineEl = document.createElement('div');
      lineEl.className = lineClassName;

      [...line].forEach(char => {
        const span = document.createElement('span');

        if (char === ' ') {
          span.innerHTML = '&nbsp;'; // сохрани пробел в визуальном виде
          span.style.display = 'inline-block';
          lineEl.appendChild(span);
          return;
        }

        span.textContent = ''; // начальное состояние
        span.style.opacity = '1';
        span.style.display = 'inline-block';
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
        const finalChar = chars[charIndex];

        if (finalChar === ' ') {
          // Пробелы не анимируются
          return;
        }

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
      activeIntervals.forEach(clearInterval);
    };
  }, [text, glitchChars, glitchDuration, delayPerChar, lineClassName]);

  return <div ref={containerRef} className={className} />;
};
