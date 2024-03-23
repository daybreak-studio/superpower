import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { useVideoInfo } from "./useVideoInfo";
import {
  useAnimationFrame,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useVideoSeeker } from "./useVideoSeeker";
import { useBounds } from "@/hooks/useBounds";

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

  return (
    <div
      className={"relative flex items-start"}
      style={{
        height: playbackConst * duration,
      }}
      ref={containerRef}
    >
      <video
        className="sticky top-0 h-screen w-full object-cover"
        //@ts-ignore
        autobuffer="autobuffer"
        ref={videoRef}
        preload="preload"
        playsInline
        loop
        muted
      >
        {children}
      </video>
    </div>
  );
};

export default ScrollVideo;
