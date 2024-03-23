import ScrollVideo from "@/components/ScrollVideo/ScrollVideo";
import React from "react";
import SuperpowerLogo from "./SuperpowerLogo";
import CTAButton from "@/components/Button/CTAButton";
import HeroDesktopLayout from "./HeroDesktopLayout";
import { breakpoints, useBreakpoint } from "@/hooks/useBreakpoints";
import HeroMobileLayout from "./HeroMobileLayout";

type Props = {};

const HeroSection = (props: Props) => {
  const isDesktop = useBreakpoint(breakpoints.md);

  return (
    <section className="relative min-h-screen bg-zinc-900 text-white">
      {isDesktop && <HeroDesktopLayout />}
      {!isDesktop && <HeroMobileLayout />}
      {/* playbackConst: higher it is, the slower it plays */}
      <ScrollVideo playbackConst={400}>
        <source
          type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
          src="https://www.apple.com/media/us/mac-pro/2013/16C1b6b5-1d91-4fef-891e-ff2fc1c1bb58/videos/macpro_main_desktop.mp4"
        />
      </ScrollVideo>
    </section>
  );
};

export default HeroSection;
