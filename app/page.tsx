"use client";

import Footer from "@/components/Sections/FooterSection/Footer";
import HeroSection from "@/components/Sections/HeroSection/HeroSection";
import ProtocolSection from "@/components/Sections/ProtocolSection/ProtocolSection";
import SuperpowerBaselineSection from "@/components/Sections/SuperpowerBaselineSection/SuperpowerBaselineSection";
import FeatureOverviewSection from "@/components/Sections/FeatureOverviewSection/FeatureOverviewSection";
import TestimonialsSection from "@/components/Sections/TestimonialsSection/TestimonialsWrapper";
import TransitionSection from "@/components/Sections/TransitionSection/TransitionSectionWrapper";
import EcosystemSection from "@/components/Sections/EcosystemSection/EcosystemLayout";
import TimelineSection from "@/components/Sections/TimelineSection/TimelineSection";
import ScrollingTextLayout from "@/components/Sections/ScrollingTextSection/ScrollingTextLayout";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeatureOverviewSection />
      <SuperpowerBaselineSection />
      <ProtocolSection />
      <TestimonialsSection />
      <TransitionSection />
      {/* <TimelineSection /> */}
      <ScrollingTextLayout />
      {/* <EcosystemSection /> */}
    </main>
  );
}
