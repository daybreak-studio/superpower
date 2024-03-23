import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { useVideoInfo } from "./useVideoInfo";
import { useBoundingClientRect } from "@/hooks/useBoundingClientRect";
import {
  useAnimationFrame,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useVideoSeeker } from "./useVideoSeeker";

type Props = {
  playbackConst: number;
};

const ScrollVideo = ({ playbackConst }: Props) => {
  const { videoRef, duration, isVideoReady } = useVideoInfo();
  const seek = useVideoSeeker({ videoRef, isVideoReady });

  const [containerRef, bounds] = useBoundingClientRect<HTMLDivElement>([
    duration,
  ]);

  const { scrollY } = useScroll();

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
        className="sticky top-0 h-screen object-cover"
        //@ts-ignore
        autobuffer="autobuffer"
        ref={videoRef}
        preload="preload"
        playsInline
        loop
        muted
      >
        <source
          type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
          src="https://www.apple.com/media/us/mac-pro/2013/16C1b6b5-1d91-4fef-891e-ff2fc1c1bb58/videos/macpro_main_desktop.mp4"
        ></source>
      </video>
    </div>
  );
};

export default ScrollVideo;
