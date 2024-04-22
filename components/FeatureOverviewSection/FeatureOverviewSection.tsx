"use client";

import React, { MutableRefObject, useRef } from "react";

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

  const windowDim = useWindowDimension();

  const rotRange = 10;
  const rotHor = useTransform(offsetNorm.x, [-1, 1], [-rotRange, rotRange]);
  const rotVert = useTransform(offsetNorm.y, [-1, 1], [rotRange, -rotRange]);

  const highlightRange = windowDim.width * 0.3;
  const highlightX = useTransform(
    rotHor,
    [-rotRange, rotRange],
    [
      -highlightRange - windowDim.width * 0.3,
      highlightRange - windowDim.width * 0.3,
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
          rotateZ: 90,
          x: 0,
          transformStyle: "preserve-3d",
          transformPerspective: "2000px",
          transformOrigin: "center center",
          transition: `transform 1s cubic-bezier(0.16, 1, 0.3, 1)`,
        }}
      >
        <motion.div
          style={{
            y: highlightX,
            x: highlightY,
            background:
              "radial-gradient(circle closest-side, rgba(255,255,255,.4), rgba(255,255,255,0))",
            transition: `transform 1s cubic-bezier(0.16, 1, 0.3, 1)`,
          }}
          className="absolute inset-0 h-[200%] w-[200%] mix-blend-hard-light"
        />
        <TabletSVG />
      </motion.div>
    </section>
  );
};

export default FeatureOverviewSection;
