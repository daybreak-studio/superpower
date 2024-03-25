import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { useVideoInfo } from "./useVideoInfo";
import {
  motion,
  useAnimationFrame,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useVideoSeeker } from "./useVideoSeeker";
import { useBounds } from "@/hooks/useBounds";
import { AnimationClip } from "three";
import { AnimationConfig } from "../AnimationConfig";

type Props = {
  playbackConst: number; // higher it is, the slower it plays
  children: React.ReactNode;
  onVideoReady?: () => void;
};

const ScrollVideo = ({ playbackConst, children, onVideoReady }: Props) => {
  const { videoRef, duration, isVideoReady } = useVideoInfo();
  const seek = useVideoSeeker({ videoRef, isVideoReady });

  const [containerRef, bounds] = useBounds<HTMLDivElement>([duration]);

  const { scrollY } = useScroll();

  useEffect(() => {
    onVideoReady?.();
  }, [isVideoReady]);

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
  }, [isVideoReady]);

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
        height: playbackConst * duration,
      }}
      ref={containerRef}
    >
      <video
        className="sticky top-0 h-screen w-full bg-black object-cover"
        //@ts-ignore
        autobuffer="autobuffer"
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
  );
};

export default ScrollVideo;
