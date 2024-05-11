import {
  usePointerOffset,
  usePointerOffsetNormalized,
} from "@/hooks/usePointerInfo";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import { MotionValue, motion, useInView, useTransform } from "framer-motion";
import React, { MutableRefObject, useRef } from "react";
import Image from "next/image";
import { useInactiveMotionValue } from "@/hooks/useInactiveMotionValue";
import { isSafari } from "react-device-detect";

type Props = {
  children: React.ReactNode;
  scale: MotionValue;
  glareOpacity: MotionValue;
  canInteract: boolean;
};

const RotatingTablet = ({
  children,
  scale,
  glareOpacity,
  canInteract,
}: Props) => {
  //mouse interaction
  const mouseContainerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const isSectionInView = useInView(mouseContainerRef);
  const mouse = usePointerOffset(isSectionInView, mouseContainerRef);
  const offsetNorm = usePointerOffsetNormalized(mouse);

  const windowDim = useWindowDimension();

  const offsetNormX = useInactiveMotionValue(offsetNorm.x, canInteract, 0);
  const offsetNormY = useInactiveMotionValue(offsetNorm.y, canInteract, 0);

  const rotRange = 10;
  const rotHor = useTransform(offsetNormX, [-1, 1], [-rotRange, rotRange]);
  const rotVert = useTransform(offsetNormY, [-1, 1], [rotRange, -rotRange]);

  const highlightRange = windowDim.width * 0.3;
  const highlightX = useTransform(
    rotHor,
    [-rotRange, rotRange],
    [highlightRange - windowDim.width, -highlightRange - windowDim.width],
  );

  const highlightY = useTransform(
    rotVert,
    [-rotRange, rotRange],
    [-highlightRange - windowDim.height, highlightRange - windowDim.height],
  );

  return (
    <motion.div
      className="relative z-10 w-fit"
      style={{
        rotateY: isSafari ? "0" : rotHor,
        rotateX: isSafari ? "0" : rotVert,
        // rotateZ: 90,
        x: 0,
        transformStyle: isSafari ? "flat" : "preserve-3d",
        transformPerspective: isSafari ? 0 : "2000px",
        transformOrigin: "center center",
        transition: `transform 1s cubic-bezier(0.16, 1, 0.3, 1)`,
      }}
      ref={mouseContainerRef}
    >
      <div className="absolute inset-0 grid grid-cols-1 grid-rows-1 px-[0.3%] py-[0.4%]">
        <motion.div
          className="relative overflow-hidden rounded-ipad-outer md:rounded-ipad-outer-md 3xl:rounded-ipad-outer-3xl"
          style={{ scale: scale }}
        >
          <motion.div
            style={{
              minWidth: "300%",
              opacity: glareOpacity,
              y: isSafari ? "0" : highlightY,
              x: isSafari ? "0" : highlightX,
              transition: `transform 1s cubic-bezier(0.16, 1, 0.3, 1)`,
            }}
            className="relative inset-0 left-[100%] top-[50vw]"
          >
            <Image
              className="w-full"
              src={"/ipad-section/glare-edges.png"}
              width={4000}
              height={3000}
              alt={""}
            />
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute inset-0 z-10 overflow-hidden rounded-full p-[5%]">
        <div className="h-full w-full bg-black" />
      </div>
      <div className="absolute inset-0 grid grid-cols-1 grid-rows-1 px-[0.6%] py-[0.7%]">
        <motion.div
          className="relative overflow-hidden rounded-ipad-inner bg-black md:rounded-ipad-inner-md 3xl:rounded-ipad-inner-3xl"
          style={{ scale: scale }}
        ></motion.div>
      </div>
      {children}
      <div className="absolute inset-0 grid grid-cols-1 grid-rows-1 p-[0.3%] pl-[0.5%] pt-[0.5%]">
        <motion.div
          className="relative z-20 overflow-hidden rounded-ipad-inner md:rounded-ipad-inner-md 3xl:rounded-ipad-inner-3xl"
          style={{
            scale: scale,
          }}
        >
          <motion.div
            style={{
              minWidth: "300%",
              opacity: glareOpacity,
              y: isSafari ? "0" : highlightY,
              x: isSafari ? "0" : highlightX,
              transition: `transform 1s cubic-bezier(0.16, 1, 0.3, 1)`,
            }}
            className="relative inset-0 left-[100%] top-[50vw]"
          >
            <Image
              alt={""}
              className="w-full"
              src={"/ipad-section/glare.png"}
              width={4000}
              height={3000}
            />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="relative h-fit w-[70vw] max-w-[calc(90vw-5em)] md:w-[90vh]"
        style={{
          zIndex: -1,
          scale: scale,
        }}
      >
        <Image
          src={"/ipad-section/ipad.png"}
          className=""
          alt={""}
          width={3000}
          height={1000}
        />
      </motion.div>
    </motion.div>
  );
};

export default RotatingTablet;
