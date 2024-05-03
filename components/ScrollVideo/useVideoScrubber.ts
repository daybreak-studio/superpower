import {
  MotionValue,
  clamp,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import { useVideoInfo } from "./useVideoInfo";
import { useVideoSeeker } from "./useVideoSeeker";
import { useEffect, useMemo } from "react";

/**
 * This hook allows scrubbing a video based on a motion value;
 * startAt determines the frames when beginning of the video is.
 * @returns
 */
export function useVideoScrubber(startAt: number = 0) {
  //scroll video
  const videoProgress = useMotionValue(0);

  const { videoRef, duration, isVideoReady, canPlayThrough } = useVideoInfo();

  const durationClamped = useMemo(
    () => duration - startAt,
    [duration, startAt],
  );

  const seek = useVideoSeeker({ videoRef, isVideoReady });
  useMotionValueEvent(videoProgress, "change", (latest) => {
    if (!isVideoReady) return;
    const targetTime = (durationClamped - startAt) * latest + startAt;
    const clampedTargetTime = clamp(0, durationClamped - 1, targetTime);
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
    const targetTime = durationClamped * videoProgress.get() + startAt;
    const clampedTargetTime = clamp(0, durationClamped - 1, targetTime);
    seek(clampedTargetTime);
  }, [durationClamped, isVideoReady, videoProgress, seek, videoRef, startAt]);

  return { videoRef, duration, isVideoReady, videoProgress, canPlayThrough };
}
