'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';

type Props = {
  imageSrc: string;
  intensity?: number;
  className?: string;
};

export const GlitchOverlay = ({ imageSrc, intensity = 12, className }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Оптимизация: мемоизация функции обработки ресайза
  const handleResize = useCallback((entries: ResizeObserverEntry[]) => {
    const { width, height } = entries[0].contentRect;
    setDimensions({ width, height });
  }, []);

  // Оптимизация: единый эффект для ресайза и загрузки изображения
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      animationRef.current?.kill();
    };
  }, [handleResize]);

  // Оптимизация: мемоизация функции рисования глитча
  const drawGlitch = useCallback(
    (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, image: HTMLImageElement) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Быстрое обесцвечивание через композитный режим
      ctx.globalCompositeOperation = 'color';
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'source-over';

      // Глитч-эффект с оптимизированными операциями
      const glitchCount = Math.min(intensity, 20); // Ограничение максимальной интенсивности
      for (let i = 0; i < glitchCount; i++) {
        const y = Math.random() * canvas.height;
        const h = Math.random() * 20 + 2;
        const dx = (Math.random() - 0.5) * 40;

        ctx.drawImage(canvas, 0, y, canvas.width, h, dx, y, canvas.width, h);
      }
    },
    [intensity]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || dimensions.width === 0 || dimensions.height === 0) return;

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = imageSrc;

    const handleLoad = () => {
      // Убиваем предыдущую анимацию, если она есть
      animationRef.current?.kill();

      const animate = () => {
        drawGlitch(ctx, canvas, image);
      };

      // Оптимизация: используем requestAnimationFrame вместо GSAP для простой анимации
      let lastTime = 0;
      const interval = 80; // 12 FPS (примерно)
      let frameId: number;

      const loop = (time: number) => {
        if (time - lastTime > interval) {
          animate();
          lastTime = time;
        }
        frameId = requestAnimationFrame(loop);
      };

      frameId = requestAnimationFrame(loop);

      return () => {
        cancelAnimationFrame(frameId);
      };
    };

    if (image.complete) {
      handleLoad();
    } else {
      image.onload = handleLoad;
    }

    return () => {
      animationRef.current?.kill();
    };
  }, [imageSrc, dimensions, drawGlitch]);

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className ?? ''}`}>
      {/* Предзагрузка изображения без отображения */}
      <img
        src={imageSrc}
        alt=""
        className="absolute opacity-0 w-full h-full object-cover"
        aria-hidden="true"
        loading="lazy"
      />
      <canvas ref={canvasRef} className="absolute top-0 left-0 z-10 pointer-events-none rounded-xl w-full h-full" />
    </div>
  );
};
