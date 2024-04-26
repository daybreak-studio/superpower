import React, { MutableRefObject, useEffect, useRef, useState } from "react";

import Image from "next/image";
import {
  usePointerOffset,
  usePointerOffsetNormalized,
} from "@/hooks/usePointerInfo";
import { useWindowDimension } from "@/hooks/useWindowDimension";

import { useVideoInfo } from "./useVideoInfo";
import {
  motion,
  useAnimationFrame,
  useMotionValueEvent,
  useScroll,
  MotionValue,
  useInView,
  useTransform,
} from "framer-motion";
import { useVideoSeeker } from "./useVideoSeeker";
import { useBounds } from "@/hooks/useBounds";
import { AnimationClip } from "three";
import { AnimationConfig } from "../AnimationConfig";
import { useIsLowPowerMode } from "@/hooks/useIsLowPowerMode";

type Props = {
  playbackConst: number; // higher it is, the slower it plays
  children: React.ReactNode;
  onVideoReady?: () => void;
  onLowPowerModeDetected?: () => void;
};

const FeatureScrollVideo = ({
  playbackConst,
  children,
  onVideoReady,
  onLowPowerModeDetected,
}: Props) => {
  const { videoRef, duration, isVideoReady } = useVideoInfo();
  const seek = useVideoSeeker({ videoRef, isVideoReady });

  const [containerRef, bounds] = useBounds<HTMLDivElement>([duration]);

  const { scrollY } = useScroll();

  useEffect(() => {
    onVideoReady?.();
  }, [isVideoReady, onVideoReady]);

  const isLowPowerMode = useIsLowPowerMode(videoRef);
  useEffect(() => {
    if (isLowPowerMode) onLowPowerModeDetected?.();
  }, [isLowPowerMode, onLowPowerModeDetected]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!isVideoReady) return;

    const scrolledOffset = latest - bounds.top;
    seek(duration * (scrolledOffset / bounds.height));
  });

  // This useEffect stops the video instantaneously after
  // the page is loaded. This is done to counteract the
  // necessary "autoPlay" setting on the video play.
  //
  // Autoplay is turned on to trick the browser loading
  // the video without the user interacting with the video.
  useEffect(() => {
    if (!isVideoReady) return;
    videoRef.current.pause();
    const scrolledOffset = scrollY.get() - bounds.top;
    seek(duration * (scrolledOffset / bounds.height));
  }, [
    bounds.height,
    bounds.top,
    duration,
    isVideoReady,
    scrollY,
    seek,
    videoRef,
  ]);

  //mouse interaction
  const mouseContainerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const isSectionInView = useInView(mouseContainerRef);
  const mouse = usePointerOffset(isSectionInView, mouseContainerRef);
  const offsetNorm = usePointerOffsetNormalized(mouse);

  const windowDim = useWindowDimension();

  const rotRange = 10;
  const rotHor = useTransform(offsetNorm.x, [-1, 1], [-rotRange, rotRange]);
  const rotVert = useTransform(offsetNorm.y, [-1, 1], [rotRange, -rotRange]);

  const highlightRange = windowDim.width * 0.3;
  const highlightX = useTransform(
    rotHor,
    [-rotRange, rotRange],
    [
      highlightRange - windowDim.width * 0.3,
      -highlightRange - windowDim.width * 0.3,
    ],
  );

  const highlightY = useTransform(
    rotVert,
    [-rotRange, rotRange],
    [
      -highlightRange - windowDim.height * 0.3,
      highlightRange - windowDim.height * 0.3,
    ],
  );

  return (
    <motion.div
      className={"relative flex w-full items-start"}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: isVideoReady ? 1 : 0,
      }}
      style={{
        height: playbackConst * duration * 2,
      }}
      ref={containerRef}
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center">
        <motion.div
          className="z-10 w-fit"
          style={{
            rotateY: rotHor,
            rotateX: rotVert,
            // rotateZ: 90,
            x: 0,
            transformStyle: "preserve-3d",
            transformPerspective: "2000px",
            transformOrigin: "center center",
            transition: `transform 1s cubic-bezier(0.16, 1, 0.3, 1)`,
          }}
          ref={mouseContainerRef}
        >
          <motion.div
            style={{
              y: highlightY,
              x: highlightX,
              background:
                "radial-gradient(circle closest-side, rgba(255,255,255,.4), rgba(255,255,255,0))",
              transition: `transform 1s cubic-bezier(0.16, 1, 0.3, 1)`,
            }}
            className="absolute inset-0 z-10 h-[200%] w-[200%] mix-blend-hard-light"
          />
          <div className="absolute inset-0 p-[3%] pr-[3%]">
            <Image
              src={"/ipad-section/screen-1-new.png"} //change for each screen selection
              alt={""}
              width={3000}
              height={0}
            />
          </div>
          <div className="absolute bottom-[18%] left-[50%] h-fit w-[15vw] translate-x-[-50%]">
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
          </div>
          <Image
            src={"/ipad-section/new-ipad.png"}
            className="h-fit w-[65vw]"
            alt={""}
            width={1000}
            height={1000}
          />
          {/* <TabletSVG /> */}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FeatureScrollVideo;
