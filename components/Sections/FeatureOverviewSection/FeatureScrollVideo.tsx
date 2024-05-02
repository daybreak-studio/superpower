import React, { MutableRefObject, useEffect, useRef, useState } from "react";

import Image from "next/image";
import {
  usePointerOffset,
  usePointerOffsetNormalized,
} from "@/hooks/usePointerInfo";
import { useWindowDimension } from "@/hooks/useWindowDimension";

import { useVideoInfo } from "../../ScrollVideo/useVideoInfo";
import {
  motion,
  useAnimationFrame,
  useMotionValueEvent,
  useScroll,
  MotionValue,
  useInView,
  useTransform,
  cubicBezier,
} from "framer-motion";
import { useVideoSeeker } from "../../ScrollVideo/useVideoSeeker";
import { useBounds } from "@/hooks/useBounds";
import { AnimationClip } from "three";
import { AnimationConfig } from "../../AnimationConfig";
import { useIsLowPowerMode } from "@/hooks/useIsLowPowerMode";
import { clamp } from "three/src/math/MathUtils.js";
import FeatureOverviewNav from "./FeatureOverviewNav";
import RotatingTablet from "./RotatingTablet";
import { useVideoScrubber } from "@/components/ScrollVideo/useVideoScrubber";

type Props = {
  playbackConst: number; // higher it is, the slower it plays
  children: React.ReactNode;
  headline: string;
  onLowPowerModeDetected?: () => void;
};

const FeatureScrollVideo = ({
  playbackConst,
  children,
  headline,
  onLowPowerModeDetected,
}: Props) => {
  // const [containerRef, bounds] = useBounds<HTMLDivElement>([duration]);

  const containerRef = useRef() as MutableRefObject<HTMLDivElement>;

  const { videoRef, videoProgress, isVideoReady, duration } =
    useVideoScrubber();

  const isLowPowerMode = useIsLowPowerMode(videoRef);
  useEffect(() => {
    if (isLowPowerMode) onLowPowerModeDetected?.();
  }, [isLowPowerMode, onLowPowerModeDetected]);

  //scroll transforms

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // offset: ["start end", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    videoProgress.set(latest * 3);
  });

  const videoScale = useTransform(scrollYProgress, [0.4, 1], [10, 1], {
    ease: cubicBezier(0.16, 1, 0.3, 1),
  });
  const videoY = useTransform(scrollYProgress, [0.4, 0.7], ["-50%", "-20%"], {
    ease: cubicBezier(0.16, 1, 0.3, 1),
  });
  const screenOpacity = useTransform(scrollYProgress, [0.7, 1], [0, 1], {
    ease: cubicBezier(0.16, 1, 0.3, 1),
  });
  const glareOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1], {
    ease: cubicBezier(0.16, 1, 0.3, 1),
  });

  return (
    <motion.div
      className={"relative flex w-full items-start bg-[#F5F5F7]"}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: isVideoReady ? 1 : 0,
      }}
      style={{
        height: playbackConst * duration * 1,
      }}
      ref={containerRef}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center">
        <h2 className="3xl:font-sans-3xl 3xl:translate-y-[-600px] font-sans-2xl absolute mx-4 max-w-[20ch] translate-y-[-30vw] text-center md:translate-y-[-40vh]">
          {headline}
        </h2>
        <RotatingTablet scale={videoScale} glareOpacity={glareOpacity}>
          <motion.div
            className="absolute inset-0 z-20 p-[3%] pr-[3%]"
            style={{ opacity: screenOpacity, scale: videoScale }}
          >
            <Image
              src={"/ipad-section/screen-1.png"} //change for each screen selection
              alt={""}
              width={3000}
              height={0}
            />
          </motion.div>
          <motion.div
            className="absolute left-[50%] top-[50%] z-10 h-fit w-[50%]"
            style={{
              x: "-50%",
              y: videoY,
              scale: videoScale,
            }}
          >
            <video
              className="w-fullobject-cover h-full"
              //@ts-ignore
              autobuffer="autobuffer"
              disablePictureInPicture
              ref={videoRef}
              preload="preload"
              playsInline
              loop
              muted
              autoPlay
            >
              {children}
            </video>
          </motion.div>
        </RotatingTablet>
        <div className="mt-12">
          <FeatureOverviewNav />
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureScrollVideo;
