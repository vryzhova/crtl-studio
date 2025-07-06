'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';

type Props = {
  lines: string[]; // массив строк
  speed?: number; // скорость печати одной буквы (мс)
  delayBetweenLines?: number; // пауза между строками (мс)
  loop?: boolean; // зациклить?
  className: string;
};

export const TypewriterLines: React.FC<Props> = ({
  lines,
  speed = 50,
  delayBetweenLines = 1000,
  loop = false,
  className,
}) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!isTyping) return;

    const interval = setInterval(() => {
      const line = lines[currentLine];
      setDisplayedText(prev => prev + line[charIndex]);
      setCharIndex(i => i + 1);

      if (charIndex + 1 === line.length) {
        clearInterval(interval);
        setIsTyping(false);
        setTimeout(() => {
          if (currentLine + 1 < lines.length) {
            setCurrentLine(i => i + 1);
            setDisplayedText('');
            setCharIndex(0);
            setIsTyping(true);
          } else if (loop) {
            setCurrentLine(0);
            setDisplayedText('');
            setCharIndex(0);
            setIsTyping(true);
          }
        }, delayBetweenLines);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [charIndex, currentLine, isTyping, lines, speed, delayBetweenLines, loop]);

  return (
    <div className={clsx(className)}>
      {lines.slice(0, currentLine).map((line, idx) => (
        <div key={idx}>{line}</div>
      ))}
      <h1 className={clsx('inline-block', className)}>
        {displayedText}
        <span className="blink ml-1 border-r-2 border-white" />
      </h1>
    </div>
  );
};
