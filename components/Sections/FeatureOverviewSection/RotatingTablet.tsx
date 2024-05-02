import {
  usePointerOffset,
  usePointerOffsetNormalized,
} from "@/hooks/usePointerInfo";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import { MotionValue, motion, useInView, useTransform } from "framer-motion";
import React, { MutableRefObject, useRef } from "react";
import Image from "next/image";

type Props = {
  children: React.ReactNode;
  scale: MotionValue;
  glareOpacity: MotionValue;
};

const RotatingTablet = ({ children, scale, glareOpacity }: Props) => {
  //mouse interaction
  const mouseContainerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const isSectionInView = useInView(mouseContainerRef);
  const mouse = usePointerOffset(isSectionInView, mouseContainerRef);
  const offsetNorm = usePointerOffsetNormalized(mouse);

  const windowDim = useWindowDimension();

  const rotRange = 10;
  const rotHor = useTransform(offsetNorm.x, [-1, 1], [-rotRange, rotRange]);
  const rotVert = useTransform(offsetNorm.y, [-1, 1], [rotRange, -rotRange]);

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
        rotateY: rotHor,
        rotateX: rotVert,
        // rotateZ: 90,
        x: 0,
        transformStyle: "preserve-3d",
        transformPerspective: "2000px",
        transformOrigin: "center center",
        transition: `transform 1s cubic-bezier(0.16, 1, 0.3, 1)`,
      }}
      ref={mouseContainerRef}
    >
      <div className="absolute inset-0 grid grid-cols-1 grid-rows-1 px-[0.3%] py-[0.4%]">
        <motion.div
          className="rounded-ipad-outer md:rounded-ipad-outer-md 3xl:rounded-ipad-outer-3xl relative overflow-hidden"
          style={{ scale: scale }}
        >
          <motion.img
            src={"/ipad-section/glare-edges.png"}
            style={{
              minWidth: "300%",
              opacity: glareOpacity,
              y: highlightY,
              x: highlightX,
              transition: `transform 1s cubic-bezier(0.16, 1, 0.3, 1)`,
            }}
            className="relative inset-0 left-[100%] top-[50vw]"
          />
        </motion.div>
      </div>

      <div className="absolute inset-0 z-10 overflow-hidden rounded-full p-[5%]">
        <div className="h-full w-full bg-black" />
      </div>
      <div className="absolute inset-0 grid grid-cols-1 grid-rows-1 px-[0.6%] py-[0.7%]">
        <motion.div
          className="rounded-ipad-inner md:rounded-ipad-inner-md 3xl:rounded-ipad-inner-3xl relative overflow-hidden bg-black"
          style={{ scale: scale }}
        ></motion.div>
      </div>
      {children}
      <div className="absolute inset-0 grid grid-cols-1 grid-rows-1 p-[0.3%] pl-[0.5%] pt-[0.5%]">
        <motion.div
          className="rounded-ipad-inner md:rounded-ipad-inner-md 3xl:rounded-ipad-inner-3xl relative overflow-hidden"
          style={{
            scale: scale,
          }}
        >
          <motion.img
            src={"/ipad-section/glare.png"}
            style={{
              minWidth: "300%",
              opacity: glareOpacity,
              y: highlightY,
              x: highlightX,
              transition: `transform 1s cubic-bezier(0.16, 1, 0.3, 1)`,
            }}
            className="relative inset-0 left-[100%] top-[50vw]"
          />
        </motion.div>
      </div>

      <motion.div
        className="3xl:w-[1450px] relative h-fit w-[70vw] md:w-[90vh]"
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
