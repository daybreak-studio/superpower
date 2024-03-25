import ScrollVideo from "@/components/ScrollVideo/ScrollVideo";
import React from "react";
import SuperpowerLogo from "./SuperpowerLogo";
import CTAButton from "@/components/Button/CTAButton";
import HeroDesktopLayout from "./HeroDesktopLayout";
import { breakpoints, useBreakpoint } from "@/hooks/useBreakpoints";
import HeroMobileLayout from "./HeroMobileLayout";
import {
  StickySlide,
  StickySlideItem,
  useSlideProgress,
} from "@/components/StickySlide/StickySlide";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import Image from "next/image";
import FadingText from "@/components/FadingText/FadingText";

type Props = {};

const HeroSection = (props: Props) => {
  const windowDim = useWindowDimension();
  const isDesktop = useBreakpoint(breakpoints.md);

  return (
    <section className="relative min-h-screen bg-zinc-900 text-white">
      {isDesktop && <HeroDesktopLayout />}
      {!isDesktop && <HeroMobileLayout />}
      {/* playbackConst: higher it is, the slower it plays */}
      {isDesktop && (
        <ScrollVideo playbackConst={400}>
          <source
            type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
            src="https://www.apple.com/media/us/mac-pro/2013/16C1b6b5-1d91-4fef-891e-ff2fc1c1bb58/videos/macpro_main_desktop.mp4"
          />
        </ScrollVideo>
      )}
      {!isDesktop && (
        <StickySlide>
          <StickySlideItem scrollHeight={windowDim.height * 0.8}>
            <Image
              src={"/hero-section/hero-mobile-slide-1.jpg"}
              width={393}
              height={852}
              alt={""}
              className="fixed inset-0 h-screen w-full object-cover"
            />
          </StickySlideItem>
          <StickySlideItem scrollHeight={windowDim.height}>
            <Image
              src={"/hero-section/hero-mobile-slide-2.jpg"}
              width={393}
              height={852}
              alt={""}
              className="fixed inset-0 h-screen w-full object-cover opacity-20"
            />
          </StickySlideItem>
          <StickySlideItem scrollHeight={windowDim.height * 2}>
            <Image
              src={"/hero-section/hero-mobile-slide-3.jpg"}
              width={393}
              height={852}
              alt={""}
              className="fixed inset-0 h-screen w-full object-cover"
            />
            <SlideInText />
          </StickySlideItem>
        </StickySlide>
      )}
    </section>
  );
};

const SlideInText = () => {
  const progress = useSlideProgress();

  return (
    <div className="font-sans-3xl fixed inset-0 flex h-full w-full items-center justify-center">
      <FadingText progress={progress}>
        This is literally so crazy omg
      </FadingText>
    </div>
  );
};

export default HeroSection;
