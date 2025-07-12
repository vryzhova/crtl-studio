'use client';

import { useEffect, useState } from 'react';
import {
  MainSection,
  WhySection,
  InsideProduct,
  HowWeWork,
  WhoWeAreFor,
  Cases,
  ProcessSteps,
  ContactSection,
} from './sections';
import { Footer, Preloader } from './components';

export default function Home() {
  const [showPreloader, setShowPreloader] = useState(true);

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
          <Cases />
          <WhoWeAreFor />
          <ProcessSteps />
          <ContactSection />
          <Footer />
        </div>
      )}
    </>
  );
}

// Замените <MainContent /> на ваш основной JSX страницы
