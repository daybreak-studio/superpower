"use client";

import ScrollVideo from "@/components/ScrollVideo/ScrollVideo";
import SuperpowerBaselineSection from "@/components/Sections/SuperpowerBaselineSection/SuperpowerBaselineSection";
import { ReactLenis } from "@studio-freight/react-lenis";

export default function Home() {
  return (
    <main>
      <ReactLenis root>
        {/* playbackConst: higher it is, the slower it plays */}
        <ScrollVideo playbackConst={400}>
          <source
            type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
            src="https://www.apple.com/media/us/mac-pro/2013/16C1b6b5-1d91-4fef-891e-ff2fc1c1bb58/videos/macpro_main_desktop.mp4"
          />
        </ScrollVideo>
        <SuperpowerBaselineSection />
        <SuperpowerBaselineSection />
      </ReactLenis>
    </main>
  );
}
