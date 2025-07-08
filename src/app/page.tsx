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
import { Footer } from './components';

export default function Home() {
  return (
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
  );
}
