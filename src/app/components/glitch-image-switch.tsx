'use client';
import React from 'react';
import { useIsWebView } from '@/app/hooks/use-is-webview';
import { useBreakpoints } from '@/app/hooks/use-break-points';
import clsx from 'clsx';
import Image from 'next/image';
import { GlitchOverlay } from '@/app/components/glitched-image';

type Props = {
  imageSrc: string;
  alt: string;
  active: boolean;
  priority?: boolean;
  className?: string;
};

export const GlitchImageSwitch: React.FC<Props> = ({ imageSrc, alt, active, priority = false, className = '' }) => {
  const isWebView = useIsWebView();
  const { isMobile } = useBreakpoints();

  const disableGlitch = isWebView || isMobile;

  const wrapperClass = clsx('relative overflow-hidden w-full h-full', className);
  const imageClass = 'absolute inset-0 transition-opacity duration-700 ease-in-out w-[65vw] lg:h-[60vh] h-[25vh]';
  const visible = 'opacity-100 z-10';
  const hidden = 'opacity-0 z-0';

  return (
    <div className={wrapperClass}>
      {disableGlitch ? (
        <Image src={imageSrc} alt={alt} fill priority={priority} className="object-cover rounded-xl shadow-md" />
      ) : (
        <>
          {/* Glitch Image (если inactive) */}
          <div className={clsx(imageClass, !active ? visible : hidden)}>
            <GlitchOverlay imageSrc={imageSrc} />
          </div>

          {/* Обычное изображение (если active) */}
          <div className={clsx(imageClass, active ? visible : hidden)}>
            <Image src={imageSrc} alt={alt} fill priority={priority} className="object-cover rounded-xl" />
          </div>
        </>
      )}
    </div>
  );
};
