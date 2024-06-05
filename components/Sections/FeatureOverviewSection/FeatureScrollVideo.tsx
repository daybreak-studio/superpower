import React, {
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import Image from "next-image-export-optimizer";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  cubicBezier,
  useMotionValue,
  clamp,
} from "framer-motion";
import { useIsLowPowerMode } from "@/hooks/useIsLowPowerMode";
import FeatureOverviewNav from "./FeatureOverviewNav";
import RotatingTablet from "./RotatingTablet";
import { useVideoScrubber } from "@/components/ScrollVideo/useVideoScrubber";
import { useMotionValueSwitch } from "@/hooks/useMotionValueSwitch";
import { AnimationConfig } from "@/components/AnimationConfig";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import useResponsiveSources from "@/components/ScrollVideo/useResponsiveSources";
import { usePageBounds } from "@/hooks/useBounds";

type Props = {
  playbackConst: number; // higher it is, the slower it plays
  // children: React.ReactNode;
  headline: string;
  onLowPowerModeDetected?: () => void;
};

const SCREENS = [
  { src: "/ipad-section/screen-1.png" },
  { src: "/ipad-section/screen-2.png" },
  { src: "/ipad-section/screen-3.png" },
  { src: "/ipad-section/screen-4.png" },
  { src: "/ipad-section/screen-5.png" },
];

const FeatureScrollVideo = ({
  playbackConst,
  headline,
  onLowPowerModeDetected,
}: Props) => {
  // const [containerRef, bounds] = useBounds<HTMLDivElement>([duration]);
  //

  const { width } = useWindowDimension();

  const containerRef = useRef() as MutableRefObject<HTMLDivElement>;

  const { videoRef, videoProgress, isVideoReady, duration } =
    useVideoScrubber();

  const isSectionVisible = useMotionValueSwitch(
    videoProgress,
    (latest) => latest > 0,
  );

  const isLowPowerMode = useIsLowPowerMode(videoRef);
  useEffect(() => {
    if (isLowPowerMode) onLowPowerModeDetected?.();
  }, [isLowPowerMode, onLowPowerModeDetected]);

  //scroll transforms
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // const bounds = usePageBounds(containerRef, []);
  // const scrollYProgress = useTransform(scrollY, (latest) =>
  //   clamp(0, 1, (latest - bounds.top) / bounds.height),
  // );

  // const scrollYProgress = useTransform(
  //   scrollYProgressInverted,
  //   (latest) => 1 - latest,
  // );

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    videoProgress.set(latest);
  });

  const exitTransitionBeginPoint = 0.66;
  let videoScale = useTransform(
    scrollYProgress,
    [exitTransitionBeginPoint, 1],
    [10, 1],
    {
      ease: cubicBezier(0.16, 1, 0.3, 1),
    },
  );

  // if (width < 768) {
  //   videoScale = useTransform(scrollYProgress, [0.6, 1], [10, 1], {
  //     ease: cubicBezier(0.16, 1, 0.3, 1),
  //   });
  // }

  const videoY = useTransform(
    scrollYProgress,
    [exitTransitionBeginPoint, 0.7],
    ["-50%", "-20%"],
    {
      ease: cubicBezier(0.16, 1, 0.3, 1),
    },
  );
  const screenOpacity = useTransform(
    scrollYProgress,
    [exitTransitionBeginPoint + 0.2, 1],
    [0, 1],
    {
      ease: cubicBezier(0.16, 1, 0.3, 1),
    },
  );
  const glareOpacity = useTransform(
    scrollYProgress,
    [exitTransitionBeginPoint + 0.3, 1],
    [0, 1],
    {
      ease: cubicBezier(0.16, 1, 0.3, 1),
    },
  );

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const canInteractWithTablet = useMotionValueSwitch(
    screenOpacity,
    (latest) => latest >= 0.8,
  );

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (!canInteractWithTablet) {
      setCurrentPage(0);
    }
  }, [canInteractWithTablet]);

  const currentSource = useResponsiveSources([
    {
      type: "video/mp4",
      src: "/ipad-section/transition-short_720p.mp4",
      width: 1280,
      height: 720,
    },
    {
      type: "video/mp4",
      src: "/ipad-section/transition-short_480p.mp4",
      width: 854,
      height: 480,
    },
    {
      type: "video/mp4",
      src: "/ipad-section/transition-short_mobile.mp4",
      width: 406,
      height: 720,
    },
  ]);

  const isMobileSource = useMemo(
    () => currentSource.src.includes("mobile"),
    [currentSource],
  );

  return (
    <motion.div
      className={"relative mt-[-200vh] flex w-full items-start bg-white"}
      initial={{
        opacity: 0,
      }}
      style={{
        opacity: sectionOpacity,
        height: playbackConst * duration,
        pointerEvents: isSectionVisible ? "all" : "none",
      }}
      ref={containerRef}
    >
      <div className="sticky top-0 -mb-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden lg:mb-0">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{
            opacity: canInteractWithTablet ? 1 : 0,
            transition: {
              duration: canInteractWithTablet
                ? AnimationConfig.VERY_SLOW
                : AnimationConfig.NORMAL,
              ease: "linear",
            },
          }}
          className="font-sans-3xl absolute mx-4 my-12 mb-32 max-w-[20ch] translate-y-[-35vw] text-center lg:font-sans-2xl md:translate-y-[-40vh] lg:mb-0"
        >
          {headline}
        </motion.h2>

        <RotatingTablet
          scale={videoScale}
          glareOpacity={glareOpacity}
          canInteract={canInteractWithTablet}
        >
          <motion.div
            className="absolute inset-0 z-20 overflow-hidden p-[3%] pr-[3%]"
            style={{ opacity: screenOpacity, scale: videoScale }}
          >
            <div className="relative">
              {SCREENS.map(({ src }, index) => {
                return (
                  <motion.div key={index} className="absolute inset-0">
                    <motion.div
                      animate={{
                        opacity: currentPage === index ? 1 : 0,
                      }}
                    >
                      <Image
                        className=""
                        src={src} //change for each screen selection
                        alt={""}
                        width={3000}
                        height={1500}
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
          <motion.div
            className="absolute left-[50%] top-[50%] z-10"
            animate={{
              // only exist on home page
              opacity: currentPage === 0 ? 1 : 0,
            }}
            style={{
              x: "-50%",
              y: videoY,
              scale: videoScale,
              width: isMobileSource ? "15%" : "50%",
            }}
          >
            <video
              className="w-full object-cover"
              //@ts-ignore
              autobuffer="autobuffer"
              disablePictureInPicture
              ref={videoRef}
              preload="preload"
              playsInline
              loop
              muted
              autoPlay
              src={currentSource.src}
            />
          </motion.div>
        </RotatingTablet>
        <motion.div
          className="absolute bottom-[15%] z-[50] flex translate-y-[30vw] flex-col items-center gap-[3vh] lg:bottom-[3vh] lg:top-auto lg:translate-y-0"
          initial={{ opacity: 0 }}
          animate={{
            opacity: canInteractWithTablet ? 1 : 0,
            y: canInteractWithTablet ? 0 : 30,
            transition: {
              duration: canInteractWithTablet
                ? AnimationConfig.VERY_SLOW
                : AnimationConfig.NORMAL,
              ease: AnimationConfig.EASING,
              delay: canInteractWithTablet ? AnimationConfig.NORMAL : 0,
            },
          }}
        >
          <div>
            <FeatureOverviewNav
              currentPage={currentPage}
              onChange={setCurrentPage}
            />
          </div>
          <p className="font-sans-lg mx-4 max-w-[32ch] text-center opacity-50">
            Combining whole-body testing, leading doctors and personalized
            health programs.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FeatureScrollVideo;
