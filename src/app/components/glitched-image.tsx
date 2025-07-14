'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

type Props = {
  imageSrc: string;
  intensity?: number;
  className?: string;
};

export const GlitchOverlay = ({ imageSrc, intensity = 12, className }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    if (dimensions.width === 0 || dimensions.height === 0) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = imageSrc;

    const drawGlitch = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.filter = 'grayscale(100%)';
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      for (let i = 0; i < intensity; i++) {
        const y = Math.random() * canvas.height;
        const h = Math.random() * 20 + 2;
        const dx = (Math.random() - 0.5) * 40;

        ctx.drawImage(canvas, 0, y, canvas.width, h, dx, y, canvas.width, h);
      }
      ctx.filter = 'none';
    };

    // Ждём загрузки изображения перед началом анимации
    image.onload = () => {
      drawGlitch();

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
      tl.to(
        {},
        {
          duration: 0.08,
          onUpdate: drawGlitch,
          onRepeat: drawGlitch,
        }
      );

      // Очистка при размонтировании
      return () => {
        tl.kill();
      };
    };
  }, [imageSrc, intensity, dimensions]);

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className ?? ''}`}>
      {/* Скрываем оригинальное изображение, чтобы канвас был видим */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageSrc} alt="glitched" className="w-full h-full object-cover invisible" />
      <canvas ref={canvasRef} className="absolute top-0 left-0 z-10 pointer-events-none rounded-xl" />
    </div>
  );
};
