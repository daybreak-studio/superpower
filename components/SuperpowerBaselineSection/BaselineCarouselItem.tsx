import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AnimationConfig } from "../AnimationConfig";
import { useCarouselItemContext } from "../Carousel/Carousel";
import { SlideInfo } from "./SuperpowerBaselineSection";

type Props = {
  slide: SlideInfo;
};

const BaselineCarouselItem = ({ slide }: Props) => {
  const { isCurrent, index } = useCarouselItemContext();

  return (
    <motion.div
      className="h-[100vw] max-h-[60vh] w-[60vw]  overflow-hidden rounded-3xl"
      animate={{
        scale: isCurrent ? 1 : 0.7,
        transition: {
          duration: AnimationConfig.SLOW,
          ease: AnimationConfig.EASING,
        },
      }}
    >
      <Image
        className="h-full w-full object-cover"
        src={slide.previewSrc}
        width={282}
        height={122}
        alt={""}
      />
    </motion.div>
  );
};

export default BaselineCarouselItem;
