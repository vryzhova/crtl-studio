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
  const [displayed, setDisplayed] = useState<string[][]>([]);
  const [glitching, setGlitching] = useState<boolean[][]>([]);
  const timeouts = useRef<number[]>([]);

  useEffect(() => {
    // Сброс
    setDisplayed(text.split('\n').map(line => Array(line.length).fill('')));
    setGlitching(text.split('\n').map(line => Array(line.length).fill(false)));
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];

    const lines = text.split('\n');
    let globalDelay = 0;
    lines.forEach((line, i) => {
      Array.from(line).forEach((char, j) => {
        // Сначала глитч
        timeouts.current.push(
          window.setTimeout(() => {
            setGlitching(prev => {
              const arr = prev.map(row => [...row]);
              arr[i][j] = true;
              return arr;
            });
          }, globalDelay)
        );
        // Потом показываем букву
        timeouts.current.push(
          window.setTimeout(() => {
            setDisplayed(prev => {
              const arr = prev.map(row => [...row]);
              arr[i][j] = char;
              return arr;
            });
            setGlitching(prev => {
              const arr = prev.map(row => [...row]);
              arr[i][j] = false;
              return arr;
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
    <div className={className}>
      {displayed.map((line, i) => (
        <div key={i} className={lineClassName}>
          {line.map((char, j) => (
            <span key={j}>
              {glitching[i]?.[j] ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};
