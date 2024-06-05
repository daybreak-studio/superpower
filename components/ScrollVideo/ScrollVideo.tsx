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
import useResponsiveSources, { VideoSource } from "./useResponsiveSources";

type Props = {
  playbackConst: number; // higher it is, the slower it plays
  children?: React.ReactNode;
  onVideoReady?: () => void;
  onCanPlayThough?: () => void;
  onLowPowerModeDetected?: () => void;
  sources: VideoSource[];
  offset?: number;
  showDebugTimestamp?: boolean;
  defaultDuration?: number;
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
  defaultDuration,
}: Props) => {
  const { videoRef, duration, isVideoReady, videoProgress, canPlayThrough } =
    useVideoScrubber(offset, defaultDuration);

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

  const bestSource = useResponsiveSources(sources);

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
        height: videoScrollHeight / 6.6 + "vh",
      }}
      ref={containerRef}
    >
      <video
        className="pointer-events-none sticky inset-0 h-screen w-full bg-black object-cover"
        //@ts-ignore
        autobuffer="autobuffer"
        disablePictureInPicture
        ref={videoRef}
        preload="preload"
        playsInline
        loop
        muted
        autoPlay
        src={bestSource && bestSource.src}
      >
        {/* {bestSource && <source type={bestSource.type} src={bestSource.src} />} */}
        {/* {sources.map(({ type, src }, index) => (
          <source type={type} src={src} key={index} />
        ))} */}
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
