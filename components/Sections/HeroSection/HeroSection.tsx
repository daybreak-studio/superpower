import ScrollVideo from "@/components/ScrollVideo/ScrollVideo";
import React, { useEffect, useMemo, useState } from "react";
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
import IntroVideo from "./IntroVideoDeprecated";
import {
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useFollowMotionValue } from "@/hooks/useFollowMotionValue";
import { debounce } from "@/app/utils/debounce";
import { useMotionValueSwitch } from "@/hooks/useMotionValueSwitch";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";

type Props = {};

const secondsToScrollPosition = (second: number, playbackConst: number) => {
  return second * playbackConst;
};

const HeroSection = (props: Props) => {
  const windowDim = useWindowDimension();
  const isDesktop = useBreakpoint(breakpoints.md);
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);

  const introLastFrame = timeStringToSeconds("0:06");
  const introLastFrameScrollPos = useMemo(
    () => secondsToScrollPosition(introLastFrame, 400),
    [introLastFrame],
  );

  const { scrollY } = useScroll();

  const targetScroll = useMotionValue(0);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(false);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const autoScrollSpeed = 5;
  const [followingScroll, isMoving] = useFollowMotionValue(targetScroll, {
    responsiveness: 0.03,
  });

  useMotionValueEvent(followingScroll, "change", (latest) => {
    if (isUserScrolling) {
      // give the agency back to the user, match the scroll to the target scroll
      followingScroll.set(scrollY.get());
      targetScroll.set(scrollY.get());
      return;
    }
    window.scrollTo(0, followingScroll.get());
  });

  useMotionValueEvent(scrollY, "change", (latest) =>
    followingScroll.set(latest),
  );

  useAnimationFrame(() => {
    if (!shouldAutoScroll) return;
    // targetScroll.set(targetScroll.get() + autoScrollSpeed);
  });

  useEffect(() => {
    const resetScrollingStateDebounced = debounce(() => {
      setIsUserScrolling(false);
    });
    const handleWheel = (e: WheelEvent) => {
      // wheel event
      setIsUserScrolling(true);
      resetScrollingStateDebounced();
    };

    window.addEventListener("wheel", handleWheel);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      resetScrollingStateDebounced.abort();
    };
  }, []);

  // always start the site at scroll 0
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const scrollYPos = scrollY.get();
    if (!isMoving && scrollYPos < introLastFrameScrollPos) {
      setShouldAutoScroll(true);
    }
  }, [isMoving, scrollY, introLastFrameScrollPos]);

  // reset scroll once user scroll to zero
  useEffect(() => {
    const scrollYPos = scrollY.get();
    if (!isUserScrolling && scrollYPos < introLastFrameScrollPos) {
      targetScroll.set(introLastFrameScrollPos);
      return;
    }

    // start auto scrolling
    if (!isUserScrolling) {
      setShouldAutoScroll(true);
      return;
    }
    setShouldAutoScroll(false);
  }, [
    introLastFrameScrollPos,
    scrollY,
    isUserScrolling,
    targetScroll,
    followingScroll,
  ]);

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <section className="relative min-h-screen bg-zinc-900 text-white">
      <LoadingScreen isLoaded={isVideoLoaded} />
      {/* playbackConst: higher it is, the slower it plays */}
      {!isLowPowerMode && (
        <ScrollVideo
          offset={timeStringToSeconds("0:0")}
          playbackConst={400}
          onVideoReady={() => setIsVideoLoaded(true)}
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
          <ScrollVideoAnnotation enter={"0:00"} exit={"0:18"}>
            {isDesktop && <HeroDesktopLayout shouldShowContent={true} />}
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
      {!isDesktop && (
        <HeroMobileLayout scrollTopOffset={introLastFrameScrollPos} />
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
