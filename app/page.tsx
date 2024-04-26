"use client";

import ScrollVideo from "@/components/ScrollVideo/ScrollVideo";
import HeroSection from "@/components/Sections/HeroSection/HeroSection";
import ProtocolSection from "@/components/Sections/ProtocolSection/ProtocolSection";
import ScrollingTextLayout from "@/components/Sections/ScrollingTextSection/ScrollingTextLayout";
import SuperpowerBaselineSection from "@/components/Sections/SuperpowerBaselineSection/SuperpowerBaselineSection";
import TestimonialsSection from "@/components/Sections/TestimonialsSection/TestimonialsWrapper";
import TransitionSection from "@/components/Sections/TransitionSection/TransitionSectionWrapper";
import TimelineSection from "@/components/Sections/TimelineSection/TimelineSection";

export default function Home() {
  return (
    <main>
        <HeroSection />
        <SuperpowerBaselineSection />
        <ProtocolSection />
        <TestimonialsSection />
        <TransitionSection />
        <TimelineSection />
        <ScrollingTextLayout/>
    </main>
  );
}
