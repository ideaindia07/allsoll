import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Hero from "@/components/sections/Hero";
import ScrollMorphSection from "@/components/sections/ScrollMorphSection";
import SelectedWork from "@/components/sections/SelectedWork";
import Touchpoints from "@/components/sections/Touchpoints";
import TrustedBrands from "@/components/sections/TrustedBrands";
import ImpactStats from "@/components/sections/ImpactStats";
import About from "@/components/sections/About";
import Team from "@/components/sections/Team";
import FinalCta from "@/components/sections/FinalCta";
import ValueCards from "@/components/sections/ValueCards";
import { DemoOne } from "@/components/sections/demo";

export default function Home() {
  return (
    <SmoothScroll>
      {/* Dynamic Cursor followers */}
      <CustomCursor />
      
      {/* Site Navigation */}
      <Header />
      
      {/* Primary layout nodes */}
      <main className="relative w-full overflow-hidden bg-bg-primary">
        {/* Section 1: Hero */}
        <Hero />
        
        {/* Section 2: Scroll Morph Portfolio Showcase */}
        <ScrollMorphSection />

        {/* Section: Core Values Cards */}
        <ValueCards />

        {/* Section 3: Selected Work */}
        <SelectedWork />
        
        {/* Section 5: Methodology Flex Column Slider */}
        <Touchpoints />
        
        {/* Interactive Selector Demo */}
        <DemoOne />
        
        {/* Section 6: Trusted Synergies Marquees */}
        <TrustedBrands />
        
        {/* Section 7: Impact Numeric Grids */}
        <ImpactStats />
        
        {/* Section 8: Split Statement Timeline Progress */}
        <About />
        
        {/* Section 9: Team Cards Grayscale Hover */}
        <Team />
        
        {/* Section 10: Fullscreen CTA */}
        <FinalCta />
      </main>
      
      {/* Site Footer */}
      <Footer />
    </SmoothScroll>
  );
}
