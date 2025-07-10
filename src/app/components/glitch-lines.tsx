'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/|\\!@#$%^&*()_+-=[]{};:,<>?';

type Props = {
  text: string;
  className?: string;
  lineClassName?: string;
  delay?: number;
};

export const AutoGlitchText: React.FC<Props> = ({
  text,
  className = '',
  lineClassName = 'text-white text-4xl font-bold',
  delay = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '';

    const lines = text.split('\n');
    const timeline = gsap.timeline({ delay });

    const charDelay = 0.04; // задержка между буквами
    const glitchCount = 3;
    const glitchInterval = 0.06;

    lines.forEach(lineText => {
      const lineSpan = document.createElement('span');
      lineSpan.className = 'glitch-line';
      lineSpan.style.display = 'block';
      lineSpan.classList.add(...lineClassName.split(' '));

      const letters = Array.from(lineText);

      letters.forEach((char, i) => {
        const charSpan = document.createElement('span');
        charSpan.textContent = char === ' ' ? '\u00A0' : char;
        charSpan.style.display = 'inline-block';
        lineSpan.appendChild(charSpan);

        if (char === ' ') return;

        timeline.to(
          {},
          {
            repeat: glitchCount - 1,
            repeatDelay: glitchInterval,
            onRepeat: () => {
              charSpan.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
            },
            onComplete: () => {
              charSpan.textContent = char;
            },
          },
          i * charDelay // ⬅️ одновременное поведение всех строк
        );
      });

      container.appendChild(lineSpan);
    });

    setReady(true);
  }, [text, delay, lineClassName]);

  return (
    <div className={`whitespace-pre-wrap break-keep ${className}`} style={{ whiteSpace: 'pre-wrap' }}>
      <div
        className="whitespace-pre-wrap break-keep"
        ref={textRef}
        style={{ visibility: 'hidden', position: 'absolute', pointerEvents: 'none' }}
      >
        {text}
      </div>
      <div ref={containerRef} />
    </div>
  );
};
