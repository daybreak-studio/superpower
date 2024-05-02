import React, {
  MutableRefObject,
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";
import {
  MotionValue,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useIsLowPowerMode } from "@/hooks/useIsLowPowerMode";
import { useVideoScrubber } from "./useVideoScrubber";

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
  const { videoRef, duration, isVideoReady, videoProgress } =
    useVideoScrubber();

  const videoScrollHeight = playbackConst * duration;
  const currentTime = useMotionValue(0);
  const containerRef = useRef() as MutableRefObject<HTMLDivElement>;

  const { scrollYProgress } = useScroll({ target: containerRef });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    videoProgress.set(latest);
    currentTime.set(latest * duration);
  });

  useEffect(() => {
    onVideoReady?.();
  }, [isVideoReady, onVideoReady]);

  const isLowPowerMode = useIsLowPowerMode(videoRef);
  useEffect(() => {
    if (isLowPowerMode) onLowPowerModeDetected?.();
  }, [isLowPowerMode, onLowPowerModeDetected]);

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
        value={{ duration, progress: scrollYProgress, currentTime }}
      >
        {children}
      </ScrollVideoContext.Provider>
    </motion.div>
  );
};

export default ScrollVideo;
