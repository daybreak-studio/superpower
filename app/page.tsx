"use client";

import ScrollVideo from "@/components/ScrollVideo/ScrollVideo";
import SuperpowerBaselineSection from "@/components/SuperpowerBaselineSection/SuperpowerBaselineSection";
import { ReactLenis } from "@studio-freight/react-lenis";

export default function Home() {
  return (
    <main>
      <ReactLenis root>
        {/* playbackConst: higher it is, the slower it plays */}
        <ScrollVideo playbackConst={400} />
        <SuperpowerBaselineSection />
        <SuperpowerBaselineSection />
      </ReactLenis>
    </main>
  );
}
