"use client";

import Footer from "@/components/Sections/FooterSection/Footer";
import HeroSection from "@/components/Sections/HeroSection/HeroSection";
import ProtocolSection from "@/components/Sections/ProtocolSection/ProtocolSection";
import SuperpowerBaselineSection from "@/components/Sections/SuperpowerBaselineSection/SuperpowerBaselineSection";
import FeatureOverviewSection from "@/components/Sections/FeatureOverviewSection/FeatureOverviewSection";
import TestimonialsSection from "@/components/Sections/TestimonialsSection/TestimonialsWrapper";
import TransitionSectionUp from "@/components/Sections/TransitionSection/TransitionSectionUp";
import TransitionSectionDown from "@/components/Sections/TransitionSection/TransitionSectionDown";
import EcosystemSection from "@/components/Sections/EcosystemSection/EcosystemLayout";
import TimelineSection from "@/components/Sections/TimelineSection/TimelineSection";
import AdvisorsSection from "@/components/Sections/AdvisorsSection/AdvisorsSection";
import ScrollingTextLayout from "@/components/Sections/ScrollingTextSection/ScrollingTextLayout";
import Navigation from "@/components/Navigation/Navigation";
import { Lenis } from "@studio-freight/react-lenis";
import { ReactLenis } from "@studio-freight/react-lenis";

export default function Home() {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
      <main className="bg-white">
        <Navigation />
        <HeroSection />
        <FeatureOverviewSection />
        <SuperpowerBaselineSection />
        <ProtocolSection />
        <TestimonialsSection />
        <TransitionSectionUp />
        <TimelineSection />
        <TransitionSectionDown />
        <EcosystemSection />
        <AdvisorsSection />
        <ScrollingTextLayout />
        <Footer />
      </main>
    </ReactLenis>
  );
}
