import React, { MutableRefObject, useEffect, useRef, useState } from "react";

import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  cubicBezier,
} from "framer-motion";
import { useIsLowPowerMode } from "@/hooks/useIsLowPowerMode";
import FeatureOverviewNav from "./FeatureOverviewNav";
import RotatingTablet from "./RotatingTablet";
import { useVideoScrubber } from "@/components/ScrollVideo/useVideoScrubber";
import { useMotionValueSwitch } from "@/hooks/useMotionValueSwitch";
import { AnimationConfig } from "@/components/AnimationConfig";

type Props = {
  playbackConst: number; // higher it is, the slower it plays
  children: React.ReactNode;
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
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    videoProgress.set(latest * 2.3);
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

  const sectionOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);

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

  return (
    <motion.div
      className={"relative mt-[-200vh] flex w-full items-start bg-[#F5F5F7]"}
      initial={{
        opacity: 0,
      }}
      // animate={{
      //   opacity: isVideoReady ? 1 : 0,
      // }}
      style={{
        opacity: sectionOpacity,
        height: playbackConst * duration * 1,
      }}
      ref={containerRef}
    >
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center">
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
          className="] font-sans-2xl absolute mx-4 my-12 max-w-[20ch] translate-y-[-30vw] text-center md:translate-y-[-40vh]"
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
                        height={0}
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
          <motion.div
            className="absolute left-[50%] top-[50%] z-10 h-fit w-[50%]"
            animate={{
              // only exist on home page
              opacity: currentPage === 0 ? 1 : 0,
            }}
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
        <motion.div
          className="absolute bottom-16 z-[50]"
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
          <FeatureOverviewNav
            currentPage={currentPage}
            onChange={setCurrentPage}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FeatureScrollVideo;
