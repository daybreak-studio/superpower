import { useAnimationFrame } from "framer-motion";
import { MutableRefObject, useRef } from "react";

export function useVideoSeeker({
  videoRef,
  isVideoReady,
}: {
  videoRef: MutableRefObject<HTMLVideoElement>;
  isVideoReady: boolean;
}) {
  const currentTimeRef = useRef(0);
  const hasFrameUpdateRef = useRef(false);

  const seek = (time: number) => {
    currentTimeRef.current = time;
    hasFrameUpdateRef.current = true;
  };

  // attempt only change frame in animation frame in order to
  // reduce uncessary refersh of the frame
  const prevTimeRoundedRef = useRef(0);
  useAnimationFrame(() => {
    if (!isVideoReady) return;
    if (!hasFrameUpdateRef.current) return;
    if (isNaN(currentTimeRef.current)) return;

    videoRef.current.currentTime = currentTimeRef.current;

    // round current frame to 0.000
    const currentFrameRounded =
      Math.round(currentTimeRef.current * 1000) / 1000;
    const updateThreshold = 0.05;

    // only update frame when it is more than a specific delta
    if (
      Math.abs(currentFrameRounded - prevTimeRoundedRef.current) >
      updateThreshold
    ) {
      videoRef.current.currentTime = currentFrameRounded;
    }
    currentTimeRef.current = currentFrameRounded;

    hasFrameUpdateRef.current = false;
  });

  return seek;
}
