import {
  MainSection,
  WhySection,
  InsideProduct,
  HowWeWork,
  WhoWeAreFor,
  ProcessSteps,
  ContactSection,
} from './sections';
import { Footer } from './components';

export default function Home() {
  return (
    <div>
      <MainSection />
      <WhySection />
      <InsideProduct />
      <HowWeWork />
      <WhoWeAreFor />
      <ProcessSteps />
      <ContactSection />
      <Footer />
    </div>
  );
}
