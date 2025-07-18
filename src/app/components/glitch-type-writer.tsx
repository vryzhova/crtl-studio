'use client';

import { useEffect, useRef, useState } from 'react';

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
  const [displayed, setDisplayed] = useState<string[][]>([]);
  const [glitching, setGlitching] = useState<boolean[][]>([]);
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const timeouts = useRef<number[]>([]);

  // Рассчитываем высоту контейнера на основе количества строк
  useEffect(() => {
    if (!containerRef.current) return;

    const linesCount = text.split('\n').length;
    const lineHeight = parseFloat(getComputedStyle(containerRef.current).lineHeight) || 24; // fallback 24px
    const spaceY = parseFloat(className.match(/space-y-(\d+)/)?.[1] || '2') * 4; // преобразуем tailwind space-y-2 в px

    const calculatedHeight = linesCount * lineHeight + (linesCount - 1) * spaceY;
    setContainerHeight(calculatedHeight);
  }, [text, className]);

  useEffect(() => {
    // Инициализация с пустыми массивами
    const lines = text.split('\n');
    setDisplayed(lines.map(line => Array(line.length).fill('')));
    setGlitching(lines.map(line => Array(line.length).fill(false)));

    // Очистка предыдущих таймаутов
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];

    let globalDelay = 0;
    lines.forEach((line, i) => {
      Array.from(line).forEach((char, j) => {
        // Анимация глитча
        timeouts.current.push(
          window.setTimeout(() => {
            setGlitching(prev => {
              const newGlitching = prev.map(row => [...row]);
              newGlitching[i][j] = true;
              return newGlitching;
            });
          }, globalDelay)
        );

        // Показ финального символа
        timeouts.current.push(
          window.setTimeout(() => {
            setDisplayed(prev => {
              const newDisplayed = prev.map(row => [...row]);
              newDisplayed[i][j] = char;
              return newDisplayed;
            });
            setGlitching(prev => {
              const newGlitching = prev.map(row => [...row]);
              newGlitching[i][j] = false;
              return newGlitching;
            });
          }, globalDelay + glitchDuration)
        );

        globalDelay += delayPerChar;
      });
    });

    return () => {
      timeouts.current.forEach(clearTimeout);
    };
  }, [text, glitchDuration, delayPerChar]);

  return (
    <div ref={containerRef} className={`${className} relative`} style={{ minHeight: `${containerHeight}px` }}>
      {displayed.map((line, i) => (
        <div key={i} className={`${lineClassName} whitespace-pre`}>
          {line.map((char, j) => (
            <span key={j} className="inline-block">
              {glitching[i]?.[j] ? (
                <span className="opacity-80">{glitchChars[Math.floor(Math.random() * glitchChars.length)]}</span>
              ) : (
                char
              )}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};
