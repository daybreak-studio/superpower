import { MutableRefObject, useEffect, useRef, useState } from "react";

export function useVideoInfo() {
  const [duration, setDuration] = useState(0);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const videoRef = useRef() as MutableRefObject<HTMLVideoElement>;

  useEffect(() => {
    // have enough info
    // Ready state
    // 0 - HAVE_NOTHING
    // 1 - HAVE_METADATA;
    // 2 - HAVE_CURRENT_DATA;
    // 3 - HAVE_FUTURE_DATA;
    // 4 - HAVE_ENOUGH_DATA;

    if (videoRef.current.readyState > 0) {
      setDuration(videoRef.current.duration);
      setIsVideoReady(true);
    }

    const handleLoadedMetadata = () => {
      console.log("fuck you");

      const video = videoRef.current;
      if (!video) return;

      setDuration(duration);
      console.log(`The video is ${video.duration} seconds long.`);
    };

    videoRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      videoRef.current.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata,
      );
    };
  }, []);

  return { videoRef, duration, isVideoReady };
}
