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
  const [isLoaded, setIsLoaded] = useState(false);

  // Блокировка скролла при прелоадере
  useEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isLoaded]);

  // Callback для прелоадера
  const handlePreloaderDone = () => {
    setIsLoaded(true);
  };

  return !isLoaded ? (
    <Preloader onDone={handlePreloaderDone} />
  ) : (
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
  );
}
