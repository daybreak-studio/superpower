import ScrollVideo from "@/components/ScrollVideo/ScrollVideo";
import React, { useState } from "react";
import HeroDesktopLayout from "./HeroDesktopLayout";
import { breakpoints, useBreakpoint } from "@/hooks/useBreakpoints";
import HeroMobileLayout from "./HeroMobileLayout";
import {
  StickySlide,
  StickySlideItem,
} from "@/components/StickySlide/StickySlide";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import Image from "next/image";
import FadingText from "@/components/FadingText/FadingText";
import ScrollVideoAnnotation from "@/components/ScrollVideo/ScrollVideoAnnotation";
import { useProgress } from "@/components/ProgressProvider/ProgressProvider";
import { timeStringToSeconds } from "@/components/ScrollVideo/timeStringToSeconds";
import IntroVideo from "./IntroVideo";

type Props = {};

const HeroSection = (props: Props) => {
  const windowDim = useWindowDimension();
  const isDesktop = useBreakpoint(breakpoints.md);
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);
  const [hasVideoFinished, setHasVideoFinished] = useState(false);

  return (
    <section className="relative min-h-screen bg-zinc-900 text-white">
      {isDesktop && <HeroDesktopLayout />}
      {!isDesktop && <HeroMobileLayout />}
      {/* playbackConst: higher it is, the slower it plays */}
      {!isLowPowerMode && (
        <ScrollVideo
          offset={timeStringToSeconds("0:05")}
          playbackConst={400}
          onLowPowerModeDetected={() => setIsLowPowerMode(true)}
          sources={[
            // {
            //   type: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
            //   src: "https://www.apple.com/media/us/mac-pro/2013/16C1b6b5-1d91-4fef-891e-ff2fc1c1bb58/videos/macpro_main_desktop.mp4",
            // },
            {
              type: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
              src: "/hero-section/sp-wormhole-v1-720.mp4",
            },
          ]}
        >
          <ScrollVideoAnnotation enter={"0:26"} exit={"0:28"}>
            <SlideInText>Feel energized</SlideInText>
          </ScrollVideoAnnotation>
          <ScrollVideoAnnotation enter={"0:26"} exit={"0:28"}>
            <SlideInText>Feel energized</SlideInText>
          </ScrollVideoAnnotation>
          <ScrollVideoAnnotation enter={"0:28"} exit={"0:30"}>
            <SlideInText>Heal your gut</SlideInText>
          </ScrollVideoAnnotation>
          <ScrollVideoAnnotation enter={"0:30"} exit={"0:32"}>
            <SlideInText>Gain muscle</SlideInText>
          </ScrollVideoAnnotation>
          <ScrollVideoAnnotation enter={"0:32"} exit={"0:34"}>
            <SlideInText>Sleep better</SlideInText>
          </ScrollVideoAnnotation>
        </ScrollVideo>
      )}
      {!isLowPowerMode && !hasVideoFinished && (
        <IntroVideo
          src={"/hero-section/sp-wormhole-v1-720.mp4"}
          type={'video/mp4; codecs="avc1.42E01E, mp4a.40.2"'}
          endTime={timeStringToSeconds("0:05")}
          onIntroFinished={() => setHasVideoFinished(true)}
        />
      )}
      {isLowPowerMode && (
        <StickySlide>
          {/* 
            scrollHeight here deontes how much scroll 
            each slide would occupy before changing into another 
            one. 
          */}
          <StickySlideItem scrollHeight={windowDim.height * 0.5}>
            {/* 
              the slide content is deliberiately set as style 
              agnostic so that you can fit whatever slide content 
              inside it—image, text, video, other components.

              remember to style it with fixed positioning if you want
              it to remain fixed at the viewport all the time.
            */}
            <Image
              src={"/hero-section/hero-mobile-slide-1.jpg"}
              width={393}
              height={852}
              alt={""}
              className="fixed inset-0 h-screen w-full object-cover"
            />
          </StickySlideItem>
          <StickySlideItem scrollHeight={windowDim.height * 1}>
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
            {/* example for adding not only image to a slide */}
            <SlideInText>This is literally so crazy omg</SlideInText>
          </StickySlideItem>
        </StickySlide>
      )}
    </section>
  );
};

const SlideInText = ({ children }: { children: string }) => {
  // useProgress is a hook to access transition progress provided by the parent element;
  const progress = useProgress();

  return (
    <div className="font-sans-3xl fixed inset-0 flex h-full w-full items-center justify-center">
      <FadingText progress={progress}>
        <div className="leading-normal">{children}</div>
      </FadingText>
    </div>
  );
};

export default HeroSection;
