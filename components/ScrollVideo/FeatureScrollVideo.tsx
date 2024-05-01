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
  cubicBezier,
} from "framer-motion";
import { useVideoSeeker } from "./useVideoSeeker";
import { useBounds } from "@/hooks/useBounds";
import { AnimationClip } from "three";
import { AnimationConfig } from "../AnimationConfig";
import { useIsLowPowerMode } from "@/hooks/useIsLowPowerMode";

type Props = {
  playbackConst: number; // higher it is, the slower it plays
  children: React.ReactNode;
  headline: string;
  onVideoReady?: () => void;
  onLowPowerModeDetected?: () => void;
};

const FeatureScrollVideo = ({
  playbackConst,
  children,
  headline,
  onVideoReady,
  onLowPowerModeDetected,
}: Props) => {
  //scroll video
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
    seek(duration * 3 * (scrolledOffset / bounds.height));
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
    seek(duration * 3 * (scrolledOffset / bounds.height));
  }, [
    bounds.height,
    bounds.top,
    duration,
    isVideoReady,
    scrollY,
    seek,
    videoRef,
  ]);

  //scroll transforms

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // offset: ["start end", "end end"],
  });

  const videoScale = useTransform(scrollYProgress, [0.5, 1], [10, 1], {
    ease: cubicBezier(0.16, 1, 0.3, 1),
  });
  const videoY = useTransform(scrollYProgress, [0.5, 0.7], ["-50%", "-20%"], {
    ease: cubicBezier(0.16, 1, 0.3, 1),
  });
  const screenOpacity = useTransform(scrollYProgress, [0.7, 1], [0, 1], {
    ease: cubicBezier(0.16, 1, 0.3, 1),
  });
  const glareOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1], {
    ease: cubicBezier(0.16, 1, 0.3, 1),
  });

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
    [highlightRange - windowDim.width, -highlightRange - windowDim.width],
  );

  const highlightY = useTransform(
    rotVert,
    [-rotRange, rotRange],
    [-highlightRange - windowDim.height, highlightRange - windowDim.height],
  );

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
        <motion.div
          className="relative z-10 w-fit"
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
          <div className="absolute inset-0 grid grid-cols-1 grid-rows-1 px-[0.3%] py-[0.4%]">
            <motion.div
              className="rounded-ipad-outer md:rounded-ipad-outer-md 3xl:rounded-ipad-outer-3xl relative overflow-hidden"
              style={{ scale: videoScale }}
            >
              <motion.img
                src={"/ipad-section/glare-edges.png"}
                style={{
                  minWidth: "300%",
                  opacity: glareOpacity,
                  y: highlightY,
                  x: highlightX,
                  transition: `transform 1s cubic-bezier(0.16, 1, 0.3, 1)`,
                }}
                className="relative inset-0 left-[100%] top-[50vw]"
              />
            </motion.div>
          </div>
          <div className="absolute inset-0 z-10 overflow-hidden rounded-full p-[5%]">
            <div className="h-full w-full bg-black" />
          </div>
          <div className="absolute inset-0 grid grid-cols-1 grid-rows-1 px-[0.6%] py-[0.7%]">
            <motion.div
              className="rounded-ipad-inner md:rounded-ipad-inner-md 3xl:rounded-ipad-inner-3xl relative overflow-hidden bg-black"
              style={{ scale: videoScale }}
            ></motion.div>
          </div>
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

          <div className="absolute inset-0 grid grid-cols-1 grid-rows-1 p-[0.3%] pl-[0.5%] pt-[0.5%]">
            <motion.div
              className="rounded-ipad-inner md:rounded-ipad-inner-md 3xl:rounded-ipad-inner-3xl relative overflow-hidden"
              style={{
                scale: videoScale,
              }}
            >
              <motion.img
                src={"/ipad-section/glare.png"}
                style={{
                  minWidth: "300%",
                  opacity: glareOpacity,
                  y: highlightY,
                  x: highlightX,
                  transition: `transform 1s cubic-bezier(0.16, 1, 0.3, 1)`,
                }}
                className="relative inset-0 left-[100%] top-[50vw]"
              />
            </motion.div>
          </div>

          <motion.div
            className="3xl:w-[1450px] relative h-fit w-[70vw] md:w-[90vh]"
            style={{
              zIndex: -1,
              scale: videoScale,
            }}
          >
            <Image
              src={"/ipad-section/ipad.png"}
              className=""
              alt={""}
              width={3000}
              height={1000}
            />
          </motion.div>
          {/* <TabletSVG /> */}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FeatureScrollVideo;
