"use client";

import ScrollVideo from "@/components/ScrollVideo/ScrollVideo";
import Footer from "@/components/Sections/FooterSection/Footer";
import HeroSection from "@/components/Sections/HeroSection/HeroSection";
import ProtocolSection from "@/components/Sections/ProtocolSection/ProtocolSection";
import SuperpowerBaselineSection from "@/components/Sections/SuperpowerBaselineSection/SuperpowerBaselineSection";
import { ReactLenis } from "@studio-freight/react-lenis";

export default function Home() {
  return (
    <main>
      <ReactLenis root>
        {/* <HeroSection /> */}
        <SuperpowerBaselineSection />
        <ProtocolSection />
        <SuperpowerBaselineSection />
        <Footer />

      </ReactLenis>
    </main>
  );
}
