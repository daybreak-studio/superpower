import React, {
  MutableRefObject,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  MotionValue,
  motion,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useIsLowPowerMode } from "@/hooks/useIsLowPowerMode";
import { useVideoScrubber } from "./useVideoScrubber";
import { secondsToTimeString } from "./secondsToTimestring";

type Props = {
  playbackConst: number; // higher it is, the slower it plays
  children?: React.ReactNode;
  onVideoReady?: () => void;
  onCanPlayThough?: () => void;
  onLowPowerModeDetected?: () => void;
  sources: { type: string; src: string }[];
  offset?: number;
  showDebugTimestamp?: boolean;
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
  onCanPlayThough,
  onLowPowerModeDetected,
  offset = 0,
  showDebugTimestamp,
}: Props) => {
  const { videoRef, duration, isVideoReady, videoProgress, canPlayThrough } =
    useVideoScrubber(offset);

  const videoScrollHeight = playbackConst * duration;
  const currentTime = useMotionValue(0);
  const containerRef = useRef() as MutableRefObject<HTMLDivElement>;

  const { scrollYProgress } = useScroll({ target: containerRef });

  const [debugSeconds, setDebugSeconds] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    videoProgress.set(latest);
    currentTime.set(latest * duration);

    if (showDebugTimestamp) {
      setDebugSeconds(latest * duration);
    }
  });

  useEffect(() => {
    isVideoReady && onVideoReady?.();
  }, [isVideoReady]);

  useEffect(() => {
    canPlayThrough && onCanPlayThough?.();
  }, [canPlayThrough]);

  const isLowPowerMode = useIsLowPowerMode(videoRef);
  useEffect(() => {
    if (isLowPowerMode) onLowPowerModeDetected?.();
  }, [isLowPowerMode]);

  return (
    <motion.div
      className={"pointer-events-none relative flex items-start"}
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
      {showDebugTimestamp && (
        <div className="fixed bottom-0 left-0 z-50">
          <span className="ml-r">{secondsToTimeString(debugSeconds)}</span>:
          <span className="ml-1 opacity-50">
            {secondsToTimeString(duration)}
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default ScrollVideo;
