import Navbar from "../components/Navbar";
import HiringPartners from "../components/HiringPartners";
import Footer from "../components/Footer";
import FloatingCTA from "../components/FloatingCTA";
import HeroSection from "./sections/HeroSection";
import TickerSection from "./sections/TickerSection";
import CoursesSection from "./sections/CoursesSection";
import WhySection from "./sections/WhySection";
import ProcessSection from "./sections/ProcessSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import CTASection from "./sections/CTASection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TickerSection />
        <CoursesSection />
        <HiringPartners />
        <WhySection />
        <ProcessSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
