import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Hero from "@/components/Hero";
import ScrollMorphSection from "@/components/sections/ScrollMorphSection";
import SelectedWork from "@/components/sections/SelectedWork";
import Touchpoints from "@/components/sections/Touchpoints";
import ImpactStats from "@/components/sections/ImpactStats";
import About from "@/components/sections/About";
import Team from "@/components/sections/Team";
import FinalCta from "@/components/sections/FinalCta";
import PresenceMosaic from "@/components/sections/PresenceMosaic";
import { DemoOne } from "@/components/sections/demo";
import AnimatedStory from "@/components/sections/animated-story/AnimatedStory";
import PurposeHero from "@/components/purpose-magic/Hero";
import PurposeGridCarousel from "@/components/purpose-magic/GridCarousel";
import PurposeServicesSection from "@/components/purpose-magic/ServicesSection";

export default function Home() {
  return (
    <SmoothScroll>
      {/* Dynamic Cursor followers */}
      <CustomCursor />

      {/* Site Navigation */}
      <Header />

      {/* Primary layout nodes */}
      <main className="relative w-full overflow-hidden bg-bg-primary">
        {/* Purpose Clone Magic Top 3 Sections */}
        <PurposeHero />
        <PurposeGridCarousel />
        {/* <PurposeServicesSection /> */}

        {/* Section 1: Hero */}
        {/* <Hero /> */}

        {/* Section 2: Presence Mosaic */}
        <PresenceMosaic />
        <ScrollMorphSection />

        {/* Section 3: Selected Work */}
        <SelectedWork />

        {/* Section 4: Animated Story */}
        {/* <AnimatedStory logoSrc="/SAS logo.png" /> */}

        {/* Section 5: Methodology Flex Column Slider */}
        <Touchpoints />

        {/* Interactive Selector Demo */}
        <div className="hidden md:block">
          <DemoOne />
        </div>

        {/* Section 7: Impact Numeric Grids */}
        <ImpactStats />

        {/* Section 8: Split Statement Timeline Progress */}
        {/* <About /> */}

        {/* Section 9: Team Cards Grayscale Hover */}
        <Team />

        {/* Section 10: Fullscreen CTA */}
        {/* <FinalCta /> */}


      </main>

      {/* Site Footer */}
      <Footer />
    </SmoothScroll>
  );
}
