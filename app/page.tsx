"use client";

import ScrollVideo from "@/components/ScrollVideo/ScrollVideo";
import HeroSection from "@/components/Sections/HeroSection/HeroSection";
import ProtocolSection from "@/components/Sections/ProtocolSection/ProtocolSection";
import SuperpowerBaselineSection from "@/components/Sections/SuperpowerBaselineSection/SuperpowerBaselineSection";
import TestimonialsSection from "@/components/Sections/TestimonialsSection/TestimonialsWrapper";
import TransitionSection from "@/components/Sections/TransitionSection/TransitionSectionWrapper";
import EcosystemSection from "@/components/Sections/EcosystemSection/EcosystemLayout";

import { ReactLenis } from "@studio-freight/react-lenis";

export default function Home() {
  return (
    <main>
      <ReactLenis root>
        <EcosystemSection />
      </ReactLenis>
    </main>
  );
}
