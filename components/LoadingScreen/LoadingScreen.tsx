"use client";

import { motion } from "framer-motion";
import React, { useEffect, useLayoutEffect, useState } from "react";

type Props = {
  isLoaded: boolean;
};

const LoadingScreen = ({ isLoaded = false }: Props) => {
  useLayoutEffect(() => {
    if (isLoaded) return;
    // reset to zero
    window.scrollTo(0, 0);

    // prevent user scroll when the page is not loaded
    const cleanup = disableScroll();
    return () => cleanup();
  }, [isLoaded]);
  return (
    <motion.div
      className="fixed inset-0 z-[9999999] bg-zinc-900"
      initial={{
        opacity: 1,
      }}
      animate={{
        opacity: isLoaded ? 0 : 1,
      }}
    ></motion.div>
  );
};

export default LoadingScreen;

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
