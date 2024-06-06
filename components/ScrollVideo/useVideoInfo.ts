import { debounce } from "@/app/utils/debounce";
import useStateRef from "@/hooks/useStateRef";
import { MutableRefObject, useEffect, useRef, useState } from "react";

const MAX_LOAD_TIME = 5000;
const MIN_LOAD_TIME = 1000;

export function useVideoInfo(defautlDuration?: number) {
  const [duration, setDuration] = useState(defautlDuration || 0);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [canPlayThrough, setCanPlayThrough, canPlayThroughRef] =
    useStateRef(false);

  const videoRef = useRef() as MutableRefObject<HTMLVideoElement>;

  const beginLoadTimeRef = useRef(Date.now());

  useEffect(() => {
    // have enough info
    // Ready state
    // 0 - HAVE_NOTHING
    // 1 - HAVE_METADATA;
    // 2 - HAVE_CURRENT_DATA;
    // 3 - HAVE_FUTURE_DATA;
    // 4 - HAVE_ENOUGH_DATA;

    beginLoadTimeRef.current = Date.now();

    const timeout = setTimeout(() => {
      setIsVideoReady(true);
      setCanPlayThrough(true);
    }, MAX_LOAD_TIME);

    if (videoRef.current.readyState > 0) {
      setDuration(videoRef.current.duration);
      setIsVideoReady(true);
    }

    const handleLoadedMetadata = () => {
      const video = videoRef.current;
      if (!video) return;

      setDuration(video.duration);
      setIsVideoReady(true);
      console.log(`The video is ${video.duration} seconds long.`);
    };

    const setCanPlayThroughDebounced = debounce((canPlayThrough: boolean) => {
      if (canPlayThroughRef.current !== canPlayThrough) {
        setIsVideoReady(true);
        setCanPlayThrough(canPlayThrough);
      }
    }, 500);

    const handleCanPlay = () => {
      setCanPlayThroughDebounced(true);
    };
    const handleSeeking = () => {
      setCanPlayThroughDebounced(false);
    };

    videoRef.current.addEventListener("canplaythrough", handleCanPlay);
    videoRef.current.addEventListener("seeking", handleSeeking);
    videoRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      if (!videoRef.current) return;

      clearTimeout(timeout);

      videoRef.current.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata,
      );
      videoRef.current.removeEventListener("seeking", handleSeeking);
      videoRef.current.removeEventListener("canplaythrough", handleCanPlay);

      setCanPlayThroughDebounced.abort();
    };
  }, []);

  return { videoRef, duration, isVideoReady, canPlayThrough };
}
