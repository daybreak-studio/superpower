import ScrollVideo from "@/components/ScrollVideo/ScrollVideo";
import React, { useEffect, useMemo, useRef, useState } from "react";
import HeroDesktopLayout from "./HeroDesktopLayout";
import { breakpoints, useBreakpoint } from "@/hooks/useBreakpoints";
import HeroMobileLayout from "./HeroMobileLayout";
import {
  StickySlide,
  StickySlideItem,
} from "@/components/StickySlide/StickySlide";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import FadingText from "@/components/FadingText/FadingText";
import ScrollVideoAnnotation from "@/components/ScrollVideo/ScrollVideoAnnotation";
import { useProgress } from "@/components/ProgressProvider/ProgressProvider";
import { timeStringToSeconds } from "@/components/ScrollVideo/timeStringToSeconds";
import IntroVideo from "./IntroVideoDeprecated";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useFollowMotionValue } from "@/hooks/useFollowMotionValue";
import { debounce } from "@/app/utils/debounce";
import { useMotionValueSwitch } from "@/hooks/useMotionValueSwitch";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import { secondsToTimeString } from "@/components/ScrollVideo/secondsToTimestring";
import { isSafari } from "react-device-detect";

type Props = {};

const secondsToScrollPosition = (second: number, playbackConst: number) => {
  return second * playbackConst;
};

const HeroSection = (props: Props) => {
  const windowDim = useWindowDimension();
  const isDesktop = useBreakpoint(breakpoints.md);
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const introLastFrame = timeStringToSeconds("0:02");
  const introLastFrameScrollPos = useMemo(
    () => secondsToScrollPosition(introLastFrame, 400),
    [introLastFrame],
  );

  const { scrollY } = useScroll();

  const targetScroll = useMotionValue(0);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
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

  useEffect(() => {
    const resetScrollingStateDebounced = debounce(() => {
      setIsUserScrolling(false);
    }, 100);
    const handleWheel = (e: WheelEvent) => {
      // wheel event
      setIsUserScrolling(true);
      resetScrollingStateDebounced();
    };

    const handleTouchEnd = () => {
      // setIsUserScrolling(false);
    };
    const handleTouchStart = () => {
      setIsUserScrolling(true);
    };

    window.addEventListener("wheel", handleWheel);
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchstart", handleTouchStart);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.addEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      resetScrollingStateDebounced.abort();
    };
  }, []);

  // reset scroll once user scroll to zero
  useEffect(() => {
    const scrollYPos = scrollY.get();
    if (
      !isUserScrolling &&
      isVideoLoaded &&
      scrollYPos < introLastFrameScrollPos
    ) {
      targetScroll.set(introLastFrameScrollPos);
      return;
    }
  }, [
    introLastFrameScrollPos,
    scrollY,
    isUserScrolling,
    targetScroll,
    followingScroll,
    isVideoLoaded,
  ]);

  const pageLoadTime = useRef(Date.now());
  useEffect(() => {
    if (!isVideoLoaded) return;

    const loadedVideoIn = Date.now() - pageLoadTime.current;
    console.log(`Video loaded in ${secondsToTimeString(loadedVideoIn / 1000)}`);
    window.scrollTo(0, 0);
  }, [isVideoLoaded]);

  return (
    <section className="relative z-10 min-h-screen bg-zinc-900 text-white">
      <LoadingScreen isLoaded={isVideoLoaded} />
      {/* playbackConst: higher it is, the slower it plays */}
      {!isLowPowerMode && (
        <ScrollVideo
          offset={timeStringToSeconds("0:0")}
          playbackConst={400}
          onVideoReady={() => {
            // safari would not fire onPlayThrough event after seek it ended up in
            // a forever loop of false value when it seek after video loaded.
            // so we handle it different with safari here
            if (!isSafari) return;
            setIsVideoLoaded(true);
          }}
          onCanPlayThough={() => {
            // other browser will use onplaythrough event to detect the readiness of the video
            if (isSafari) return;
            setIsVideoLoaded(true);
          }}
          onLowPowerModeDetected={() => setIsLowPowerMode(true)}
          sources={[
            // {
            //   type: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
            //   src: "https://www.apple.com/media/us/mac-pro/2013/16C1b6b5-1d91-4fef-891e-ff2fc1c1bb58/videos/macpro_main_desktop.mp4",
            // },
            {
              type: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
              src: "/hero-section/sp-wormhole-final.mp4",
            },
          ]}
        >
          <ScrollVideoAnnotation enter={"0:00"} exit={"0:06"}>
            {isDesktop && <HeroDesktopLayout shouldShowContent={true} />}
          </ScrollVideoAnnotation>
          {/* <ScrollVideoAnnotation enter={"0:20"} exit={"0:22"}>
            <SlideInText>Slow aging</SlideInText>
          </ScrollVideoAnnotation>
          <ScrollVideoAnnotation enter={"0:22"} exit={"0:24"}>
            <SlideInText>Feel energized</SlideInText>
          </ScrollVideoAnnotation>
          <ScrollVideoAnnotation enter={"0:24"} exit={"0:26"}>
            <SlideInText>Heal your gut</SlideInText>
          </ScrollVideoAnnotation>
          <ScrollVideoAnnotation enter={"0:26"} exit={"0:28"}>
            <SlideInText>Gain muscle</SlideInText>
          </ScrollVideoAnnotation>
          <ScrollVideoAnnotation enter={"0:28"} exit={"0:30"}>
            <SlideInText>Sleep better</SlideInText>
          </ScrollVideoAnnotation>
          <ScrollVideoAnnotation enter={"0:30"} exit={"0:32"}>
            <SlideInText>Live longer</SlideInText>
          </ScrollVideoAnnotation> */}
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
            <img
              src={"/hero-section/hero-mobile-slide-1.jpg"}
              width={393}
              height={852}
              alt={""}
              className="fixed inset-0 h-screen w-full object-cover"
            />
          </StickySlideItem>
          <StickySlideItem scrollHeight={windowDim.height * 1}>
            <img
              src={"/hero-section/hero-mobile-slide-2.jpg"}
              width={393}
              height={852}
              alt={""}
              className="fixed inset-0 h-screen w-full object-cover opacity-20"
            />
          </StickySlideItem>
          <StickySlideItem scrollHeight={windowDim.height * 2}>
            <img
              src={"/hero-section/hero-mobile-slide-3.jpg"}
              width={393}
              height={852}
              alt={""}
              className="fixed inset-0 h-screen w-full object-cover"
            />
            {/* example for adding not only image to a slide */}
            <SlideInText>Slow aging. Feel energized.</SlideInText>
          </StickySlideItem>
        </StickySlide>
      )}
      {!isDesktop && (
        <HeroMobileLayout scrollTopOffset={introLastFrameScrollPos - 140} />
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
