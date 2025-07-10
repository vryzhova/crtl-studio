'use client';
import { useState } from 'react';
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

  return isLoaded ? (
    <div>
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
  ) : (
    <Preloader onDone={() => setIsLoaded(true)} />
  );
}
