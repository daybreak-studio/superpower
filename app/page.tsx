"use client";

import ScrollVideo from "@/components/ScrollVideo/ScrollVideo";
import HeroSection from "@/components/Sections/HeroSection/HeroSection";
import SuperpowerBaselineSection from "@/components/Sections/SuperpowerBaselineSection/SuperpowerBaselineSection";
import TestimonialsSection from "@/components/Sections/TestimonialsSection/TestimonialsWrapper"; // Import the missing component

import { ReactLenis } from "@studio-freight/react-lenis";

export default function Home() {
  return (
    <div>
      <TestimonialsSection /> {/* Use the imported component */}
    </div>
  );
}
