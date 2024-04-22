"use client";

import ScrollVideo from "@/components/ScrollVideo/ScrollVideo";
import HeroSection from "@/components/Sections/HeroSection/HeroSection";
import ProtocolSection from "@/components/Sections/ProtocolSection/ProtocolSection";
import SuperpowerBaselineSection from "@/components/Sections/SuperpowerBaselineSection/SuperpowerBaselineSection";
import TestimonialsWrapper from "@/components/Sections/TestimonialsSection/TestimonialsWrapper";
import FeatureOverviewSection from "@/components/FeatureOverviewSection/FeatureOverviewSection";
import { ReactLenis } from "@studio-freight/react-lenis";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeatureOverviewSection />
      <SuperpowerBaselineSection />
      <ProtocolSection />
      <TestimonialsWrapper />
    </main>
  );
}
