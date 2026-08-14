import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ScrollMorphSection from "@/components/sections/ScrollMorphSection";
import SelectedWork from "@/components/sections/SelectedWork";
import Touchpoints from "@/components/sections/Touchpoints";
import ImpactStats from "@/components/sections/ImpactStats";
import Team from "@/components/sections/Team";
import PresenceMosaic from "@/components/sections/PresenceMosaic";
import { DemoOne } from "@/components/sections/demo";
import PurposeHero from "@/components/purpose-magic/Hero";
import PurposeGridCarousel from "@/components/purpose-magic/GridCarousel";
import ServicesGrid from "@/components/sections/ServicesGrid";
import { HOME_SEO_DESCRIPTION, HOME_SEO_TITLE } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: HOME_SEO_TITLE,
  },
  description: HOME_SEO_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: HOME_SEO_TITLE,
    description: HOME_SEO_DESCRIPTION,
  },
  twitter: {
    title: HOME_SEO_TITLE,
    description: HOME_SEO_DESCRIPTION,
  },
};

export default function Home() {
  return (
    <SmoothScroll>
      {/* Cursor lives in root layout — avoid a second instance here */}

      {/* Site Navigation */}
      <Header />

      {/* Primary layout nodes */}
      <main className="relative w-full overflow-x-hidden bg-bg-primary">
        {/* Purpose Clone Magic Top 3 Sections */}
        <PurposeHero />

        <section className="relative z-10 w-full bg-bg-primary px-[6%] py-16 md:px-[8%] md:py-20">
          <div className="mx-auto max-w-[900px] text-center">
            <h1 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
              Branding &amp; Digital Marketing Agency in India | Allsoll
            </h1>
            <p className="mt-6 font-body text-base leading-relaxed text-text-secondary md:text-lg">
              Allsoll is a branding and digital marketing agency in India, helping brands grow with creative strategy, performance marketing, and digital solutions.
            </p>
          </div>
        </section>

        <PurposeGridCarousel />
        {/* <PurposeServicesSection /> */}

        {/* Section 1: Hero */}
        {/* <Hero /> */}

        {/* Section 2: Presence Mosaic */}
        <PresenceMosaic />
        <ServicesGrid />
        <ScrollMorphSection />

        {/* Section 3: Selected Work */}
        <SelectedWork />

        {/* Section 4: Animated Story */}
        {/* <AnimatedStory logoSrc="/SAS logo.webp" /> */}

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
