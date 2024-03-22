import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AnimationConfig } from "../AnimationConfig";
import { useCarouselItemContext } from "../Carousel/Carousel";
import { SlideInfo } from "./SuperpowerBaselineSection";
import TracyShadow from "../TracyShadow";

type Props = {
  slide: SlideInfo;
};

const BaselineCarouselItem = ({ slide }: Props) => {
  const { isCurrent, index, isPointerDown } = useCarouselItemContext();

  const pointerScaleFactor = isPointerDown ? 0.98 : 1;

  return (
    <TracyShadow color="#B9431C" elevation={isCurrent ? 1 : 0}>
      <motion.div
        className="relative mb-32 h-[100vw] max-h-[60vh] w-[60vw] overflow-hidden rounded-3xl"
        initial={{
          opacity: 0,
          scale: isCurrent ? 1 : 0.7,
        }}
        animate={{
          opacity: 1,
          scale: isCurrent ? 1 * pointerScaleFactor : 0.7 * pointerScaleFactor,
          transition: {
            duration: AnimationConfig.SLOW,
            ease: AnimationConfig.EASING,
          },
        }}
      >
        <motion.div className="h-full w-full">
          <Image
            className="h-full w-full object-cover"
            src={slide.previewSrc}
            width={282}
            height={122}
            alt={""}
          />
        </motion.div>
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: isCurrent ? 1 : 0,
            transition: {
              ease: AnimationConfig.EASING,
              duration: AnimationConfig.VERY_SLOW,
            },
          }}
        >
          <Image
            className="h-full w-full object-cover"
            src={slide.expandedSrc}
            width={282}
            height={122}
            alt={""}
          />
        </motion.div>
        <motion.div className="bg-blur absolute bottom-0 z-10 m-2 rounded-lg border border-[rgba(255,255,255,.2)] p-6 text-white backdrop-blur-lg">
          <h3 className="font-mono-xs mb-4">{slide.header}</h3>
          <p className="font-sans-sm opacity-70">{slide.description}</p>
        </motion.div>
      </motion.div>
    </TracyShadow>
  );
};

export default BaselineCarouselItem;
