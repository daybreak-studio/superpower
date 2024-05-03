import { useVideoInfo } from "@/components/ScrollVideo/useVideoInfo";
import { useAnimationFrame } from "framer-motion";
import React, {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

type Props = {
  src: string;
  type: string;
  endTime: number;
  onIntroFinished: () => void;
};

const IntroVideo = ({ src, type, endTime, onIntroFinished }: Props) => {
  const { videoRef, isVideoReady } = useVideoInfo();

  const [hasVideoFinished, setHasVideoFinished] = useState(false);
  const restoreScroll = useRef(() => {});

  useLayoutEffect(() => {
    restoreScroll.current = disableScroll();

    return () => {
      restoreScroll.current();
    };
  }, []);

  useEffect(() => {
    if (!isVideoReady) return;

    videoRef.current.pause();
    videoRef.current.currentTime = 0;

    videoRef.current.play();
  }, [isVideoReady, videoRef]);

  useEffect(() => {
    if (hasVideoFinished) {
      restoreScroll.current();
      videoRef.current.pause();
      onIntroFinished();
    }
  }, [hasVideoFinished, videoRef, onIntroFinished]);

  useAnimationFrame(() => {
    if (hasVideoFinished) return false;
    window.scrollTo(0, 0);
    if (videoRef.current.currentTime >= endTime) {
      setHasVideoFinished(true);
      return;
    }
  });

  return (
    <video
      className="absolute left-0 right-0 top-0 h-screen w-full object-cover"
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
      <source type={type} src={src} />
    </video>
  );
};

export default IntroVideo;

// call this to Disable
function disableScroll() {
  // left: 37, up: 38, right: 39, down: 40,
  // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  var keys: any = { 37: 1, 38: 1, 39: 1, 40: 1 };

  function preventDefault(e: Event) {
    e.preventDefault();
  }

  function preventDefaultForScrollKeys(e: KeyboardEvent) {
    if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
    }
  }

  var wheelEvent =
    "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

  // window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
  window.addEventListener("wheel", preventDefault, { passive: false }); // modern desktop
  window.addEventListener("touchmove", preventDefault, { passive: false }); // mobile
  window.addEventListener("keydown", preventDefaultForScrollKeys, false);

  return () => {
    // window.removeEventListener("DOMMouseScroll", preventDefault, false); // older FF
    //@ts-ignore
    window.removeEventListener("wheel", preventDefault, { passive: false }); // modern desktop
    //@ts-ignore
    window.removeEventListener("touchmove", preventDefault, { passive: false }); // mobile
    window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
  };
}
