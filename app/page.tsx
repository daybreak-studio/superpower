"use client";

import Container from "@/components/R3F/Container";
import ScrollVideo from "@/components/ScrollVideo/ScrollVideo";
import HeroSection from "@/components/Sections/HeroSection/HeroSection";
import ProtocolSection from "@/components/Sections/ProtocolSection/ProtocolSection";
import SuperpowerBaselineSection from "@/components/Sections/SuperpowerBaselineSection/SuperpowerBaselineSection";
import TestimonialsWrapper from "@/components/Sections/TestimonialsSection/TestimonialsWrapper";
import { ReactLenis } from "@studio-freight/react-lenis";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Container />
      <SuperpowerBaselineSection />
      <ProtocolSection />
      <TestimonialsWrapper />
    </main>
  );
}
