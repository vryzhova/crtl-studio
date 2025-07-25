'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MainSection, WhySection, InsideProduct, HowWeWork, WhoWeAreFor, Cases, ContactSection } from './sections';
import { Footer, Preloader } from './components';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

const ProcessSteps = dynamic(() => import('./sections/process-steps').then(mod => mod.ProcessSteps), {
  ssr: false,
});

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);

  // useEffect(() => {
  //   ScrollTrigger.normalizeScroll(true);
  // }, []);

  useEffect(() => {
    if (showPreloader) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [showPreloader]);

  return (
    <>
      <Preloader onDone={() => setShowPreloader(false)} />
      {!showPreloader && (
        <div className="animate-fade-in">
          <MainSection />
          <WhySection />
          <InsideProduct />
          <HowWeWork />
          <WhoWeAreFor />
          <ProcessSteps />
          <ContactSection />
          {/*<Cases />*/}
          <Footer />
        </div>
      )}
    </>
  );
}

// Замените <MainContent /> на ваш основной JSX страницы
