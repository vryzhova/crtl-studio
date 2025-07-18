'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  text: string;
  className?: string;
  lineClassName?: string;
  glitchChars?: string;
  glitchDuration?: number;
  delayPerChar?: number;
  triggerOnce?: boolean;
  gradient?: string;
};

export const GlitchTypewriterText: React.FC<Props> = ({
  text,
  className = 'text-2xl font-mono text-white space-y-2',
  lineClassName = '',
  glitchChars = '/|\\',
  glitchDuration = 50,
  delayPerChar = 20,
  triggerOnce = true,
  gradient,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayed, setDisplayed] = useState<string[][]>([]);
  const [glitching, setGlitching] = useState<boolean[][]>([]);
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const timeouts = useRef<number[]>([]);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Рассчитываем высоту контейнера (оставляем без изменений)
  useEffect(() => {
    if (!containerRef.current) return;

    const linesCount = text.split('\n').length;
    const lineHeight = parseFloat(getComputedStyle(containerRef.current).lineHeight) || 24;
    const spaceY = parseFloat(className.match(/space-y-(\d+)/)?.[1] || '2') * 4;

    const calculatedHeight = linesCount * lineHeight + (linesCount - 1) * spaceY;
    setContainerHeight(calculatedHeight);
  }, [text, className]);

  // Настройка Intersection Observer
  useEffect(() => {
    if (!containerRef.current) return;

    const observerCallback: IntersectionObserverCallback = entries => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (triggerOnce) {
          observerRef.current?.disconnect();
        }
      } else if (!triggerOnce) {
        setIsVisible(false);
      }
    };

    observerRef.current = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    });

    observerRef.current.observe(containerRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [triggerOnce]);

  // Запуск анимации только при isVisible
  useEffect(() => {
    if (!isVisible) return;

    const lines = text.split('\n');
    setDisplayed(lines.map(line => Array(line.length).fill('')));
    setGlitching(lines.map(line => Array(line.length).fill(false)));

    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];

    let globalDelay = 0;
    lines.forEach((line, i) => {
      Array.from(line).forEach((char, j) => {
        timeouts.current.push(
          window.setTimeout(() => {
            setGlitching(prev => {
              const newGlitching = prev.map(row => [...row]);
              newGlitching[i][j] = true;
              return newGlitching;
            });
          }, globalDelay)
        );

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
  }, [isVisible, text, glitchDuration, delayPerChar]);

  return (
    <div
      ref={containerRef}
      className={`${className}`}
      style={{ minHeight: isVisible ? undefined : `${containerHeight}px` }}
    >
      {isVisible
        ? displayed.map((line, i) => (
            <div key={i} className={`${lineClassName} whitespace-pre`}>
              {line.map((char, j) => (
                <span key={j} className={`inline-block`}>
                  {glitching[i]?.[j] ? (
                    <span className="opacity-80">
                      {glitchChars[(i + j + Math.floor(performance.now() / 100)) % glitchChars.length]}
                    </span>
                  ) : (
                    <span className={`${gradient}`}>{char}</span>
                  )}
                </span>
              ))}
            </div>
          ))
        : text.split('\n').map((line, i) => (
            <div key={i} className={`${lineClassName} whitespace-pre invisible`}>
              {line}
            </div>
          ))}
    </div>
  );
};
