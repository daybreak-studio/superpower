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
    videoRef.current.currentTime = currentTimeRef.current;

    console.log(currentTimeRef.current);

    // round current frame to 0.0
    const currentFrameRounded = Math.round(currentTimeRef.current * 10) / 10;
    const updateThreshold = 0.1;

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
