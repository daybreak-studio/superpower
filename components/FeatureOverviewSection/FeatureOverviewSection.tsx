"use client";

import React, { MutableRefObject, useRef } from "react";

import { motion, useInView, useTransform } from "framer-motion";
import TabletSVG from "./TabletSVG";
import {
  usePointerOffset,
  usePointerOffsetNormalized,
} from "@/hooks/usePointerInfo";

type Props = {};

const FeatureOverviewSection = (props: Props) => {
  const containerRef = useRef() as MutableRefObject<HTMLElement>;
  const isSectionInView = useInView(containerRef);
  const mouse = usePointerOffset(isSectionInView, containerRef);
  const offsetNorm = usePointerOffsetNormalized(mouse);

  const rotRange = 10;
  const rotHor = useTransform(offsetNorm.x, [-1, 1], [-rotRange, rotRange]);
  const rotVert = useTransform(offsetNorm.y, [-1, 1], [rotRange, -rotRange]);

  return (
    <section className="flex h-screen w-full" ref={containerRef}>
      <motion.div
        className="m-auto h-fit w-fit"
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
        <TabletSVG />
      </motion.div>
    </section>
  );
};

export default FeatureOverviewSection;
