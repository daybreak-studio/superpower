import React, {
  MutableRefObject,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useVideoInfo } from "./useVideoInfo";
import {
  MotionValue,
  motion,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useVideoSeeker } from "./useVideoSeeker";
import { useBounds } from "@/hooks/useBounds";
import { AnimationClip } from "three";
import { AnimationConfig } from "../AnimationConfig";
import { useIsLowPowerMode } from "@/hooks/useIsLowPowerMode";

type Props = {
  playbackConst: number; // higher it is, the slower it plays
  children?: React.ReactNode;
  onVideoReady?: () => void;
  onLowPowerModeDetected?: () => void;
  sources: { type: string; src: string }[];
};

const ScrollVideoContext = createContext({
  duration: 0,
  progress: new MotionValue(),
  currentTime: new MotionValue(),
});

export const useScrollVideoInfo = () => useContext(ScrollVideoContext);

const ScrollVideo = ({
  playbackConst,
  children,
  sources,
  onVideoReady,
  onLowPowerModeDetected,
}: Props) => {
  const { videoRef, duration, isVideoReady } = useVideoInfo();
  const seek = useVideoSeeker({ videoRef, isVideoReady });

  const videoScrollHeight = playbackConst * duration;
  const currentTime = useMotionValue(0);
  const videoProgress = useTransform(
    currentTime,
    (latest) => latest / duration,
  );

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
    const targetTimecode = duration * (scrolledOffset / bounds.height);
    seek(targetTimecode);
    currentTime.set(targetTimecode);
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

  return (
    <motion.div
      className={"relative flex items-start"}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: isVideoReady ? 1 : 0,
      }}
      style={{
        height: videoScrollHeight,
      }}
      ref={containerRef}
    >
      <video
        className="sticky top-0 h-screen w-full bg-black object-cover"
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
        {sources.map(({ type, src }, index) => (
          <source type={type} src={src} key={index} />
        ))}
      </video>
      <ScrollVideoContext.Provider
        value={{ duration, progress: videoProgress, currentTime }}
      >
        {children}
      </ScrollVideoContext.Provider>
    </motion.div>
  );
};

export default ScrollVideo;
