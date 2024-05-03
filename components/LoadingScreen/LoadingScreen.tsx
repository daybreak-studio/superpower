"use client";

import { motion } from "framer-motion";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Logo from "../Sections/HeroSection/SuperpowerLogo";

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
    <>
      <style>
        {`.glowing-pulse {
            z-index: 0;
            position:absolute;
            inset: 0px;
            width: 100%;
            height: 100%;
            background: radial-gradient(farthest-side, #2e120d, transparent) center no-repeat;
            animation:pulse 2s linear infinite alternate;
          }
          @keyframes pulse{
            from {
              background-size:50% 50%;
              opacity: 1;
            }
            to {
              background-size:100% 100%;
              opacity: 1;
            }
          }

          @keyframes pulse-opacity {
            from {
              opacity:0;
            }
            to {
              opacity:.5;
            }
          }

          .pulsing-text {
            animation:pulse-opacity .2s linear infinite alternate;
          }
          
          .spinner {
            z-index: 10;
            width:8px;
            height:1px;
            opacity:.5;
            background-color: #fff; 
          }

          .spinner-anim-1 {
            animation:spinner-rotation-anim-1 5s cubic-bezier(0.16, 1, 0.3, 1) infinite alternate;
          }
          .spinner-anim-2 {
            animation:spinner-rotation-anim-2 3s cubic-bezier(0.16, 1, 0.3, 1) infinite alternate;
          }
          .spinner-anim-3 {
            animation:spinner-rotation-anim-3 5s cubic-bezier(0.16, 1, 0.3, 1) infinite alternate;
          }

          @keyframes spinner-rotation-anim-1 {
            0% {
              transform: rotate(0deg);
            }
            20% {
              transform: rotate(49deg);
            }
            69% {
              transform: rotate(200deg);
            }
            100% {
              transform: rotate(365deg);
            }
          }
          @keyframes spinner-rotation-anim-2 {
            0% {
              transform: rotate(0deg);
            }
            10% {
              transform: rotate(365deg);
            }
            60% {
              transform: rotate(49deg);
            }
            100% {
              transform: rotate(200deg);
            }
          }

          @keyframes spinner-rotation-anim-3 {
            0% {
              transform: rotate(0deg);
            }
            40% {
              transform: rotate(365deg);
            }
            69% {
              transform: rotate(49deg);
            }
            100% {
              transform: rotate(300deg);
            }
          }
          
          `}
      </style>
      <motion.div
        className="fixed inset-0 z-[9999999] flex items-center justify-center  bg-black"
        initial={{
          opacity: 1,
        }}
        animate={{
          opacity: isLoaded ? 0 : 1,
        }}
      >
        <div className="glowing-pulse" />
        <div className="flex items-center justify-center gap-4">
          <div className="spinner spinner-anim-1" />
          <div className="spinner spinner-anim-2" />
          <div className="spinner spinner-anim-3" />
          <div className="pulsing-text font-mono-xs z-10">Loading</div>
          <div className="spinner spinner-anim-3" />
          <div className="spinner spinner-anim-1" />
          <div className="spinner spinner-anim-2" />
        </div>
      </motion.div>
    </>
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
