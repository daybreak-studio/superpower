"use client";

import ScrollVideo from "@/components/ScrollVideo/ScrollVideo";
import HeroSection from "@/components/Sections/HeroSection/HeroSection";
import ProtocolSection from "@/components/Sections/ProtocolSection/ProtocolSection";
import ScrollingTextLayout from "@/components/Sections/ScrollingTextSection/ScrollingTextLayout";
import SuperpowerBaselineSection from "@/components/Sections/SuperpowerBaselineSection/SuperpowerBaselineSection";
import TimelineSection from "@/components/Sections/TimelineSection/TimelineSection";
import { ReactLenis } from "@studio-freight/react-lenis";

export default function Home() {
  return (
    <main>
      {/* <ReactLenis root> */}
      {/* <HeroSection /> */}
      <SuperpowerBaselineSection />
      <ProtocolSection />
      <TimelineSection />
      <ScrollingTextLayout />
      {/* </ReactLenis> */}
    </main>
  );
}
