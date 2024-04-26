"use client";

import ScrollVideo from "@/components/ScrollVideo/ScrollVideo";
import React, { MutableRefObject, useRef, useState } from "react";

import Image from "next/image";
import { MotionValue, motion, useInView, useTransform } from "framer-motion";
import TabletSVG from "./TabletSVG";
import {
  usePointerOffset,
  usePointerOffsetNormalized,
} from "@/hooks/usePointerInfo";
import { useWindowDimension } from "@/hooks/useWindowDimension";

type Props = {};

const FeatureOverviewSection = (props: Props) => {
  const containerRef = useRef() as MutableRefObject<HTMLElement>;
  const isSectionInView = useInView(containerRef);
  const mouse = usePointerOffset(isSectionInView, containerRef);
  const offsetNorm = usePointerOffsetNormalized(mouse);
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);

  const windowDim = useWindowDimension();

  const rotRange = 10;
  const rotHor = useTransform(offsetNorm.x, [-1, 1], [-rotRange, rotRange]);
  const rotVert = useTransform(offsetNorm.y, [-1, 1], [rotRange, -rotRange]);

  const highlightRange = windowDim.width * 0.3;
  const highlightX = useTransform(
    rotHor,
    [-rotRange, rotRange],
    [
      highlightRange - windowDim.width * 0.3,
      -highlightRange - windowDim.width * 0.3,
    ],
  );

  const highlightY = useTransform(
    rotVert,
    [-rotRange, rotRange],
    [
      -highlightRange - windowDim.height * 0.3,
      highlightRange - windowDim.height * 0.3,
    ],
  );

  return (
    <section
      className="flex h-screen w-full overflow-hidden"
      ref={containerRef}
    >
      <motion.div
        className="relative z-10 m-auto h-fit w-fit"
        style={{
          rotateY: rotHor,
          rotateX: rotVert,
          // rotateZ: 90,
          x: 0,
          transformStyle: "preserve-3d",
          transformPerspective: "2000px",
          transformOrigin: "center center",
          transition: `transform 1s cubic-bezier(0.16, 1, 0.3, 1)`,
        }}
      >
        <motion.div
          style={{
            y: highlightY,
            x: highlightX,
            background:
              "radial-gradient(circle closest-side, rgba(255,255,255,.4), rgba(255,255,255,0))",
            transition: `transform 1s cubic-bezier(0.16, 1, 0.3, 1)`,
          }}
          className="absolute inset-0 z-10 h-[200%] w-[200%] mix-blend-hard-light"
        />
        <div className="absolute inset-0 p-[3%] pr-[3%] opacity-0">
          <Image
            src={"/ipad-section/screen-1-new.png"}
            alt={""}
            width={1569}
            height={986}
          />
        </div>
        <div className="absolute bottom-[18%] left-[50%] h-fit w-[15vw] translate-x-[-50%]">
          <ScrollVideo
            playbackConst={400}
            onLowPowerModeDetected={() => setIsLowPowerMode(true)}
          >
            <source
              type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
              src="/ipad-section/test-transition.mp4"
            />
          </ScrollVideo>
        </div>
        <Image
          src={"/ipad-section/new-ipad.png"}
          className="h-fit w-[65vw]"
          alt={""}
          width={1000}
          height={1000}
        />
        {/* <TabletSVG /> */}
      </motion.div>
    </section>
  );
};

export default FeatureOverviewSection;
