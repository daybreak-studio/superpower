import {
  MotionValue,
  clamp,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import { useVideoInfo } from "./useVideoInfo";
import { useVideoSeeker } from "./useVideoSeeker";
import { useEffect } from "react";

/**
 * This hook allows scrubbing a video based on a motion value;
 * @returns
 */
export function useVideoScrubber() {
  //scroll video
  const videoProgress = useMotionValue(0);

  const { videoRef, duration, isVideoReady } = useVideoInfo();

  const seek = useVideoSeeker({ videoRef, isVideoReady });
  useMotionValueEvent(videoProgress, "change", (latest) => {
    if (!isVideoReady) return;
    const targetTime = duration * latest;
    const clampedTargetTime = clamp(0, duration - 1, targetTime);
    seek(clampedTargetTime);
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
    const targetTime = duration * videoProgress.get();
    const clampedTargetTime = clamp(0, duration - 1, targetTime);
    seek(clampedTargetTime);
  }, [duration, isVideoReady, videoProgress, seek, videoRef]);

  return { videoRef, duration, isVideoReady, videoProgress };
}
