"use client";

import { useBounds } from "@/hooks/useBounds";
import { SlideInfo } from "./SuperpowerBaselineSection";
import { motion } from "framer-motion";
import { AnimationConfig } from "../AnimationConfig";

interface CarouselPageIndicatorProps {
  currentSlide: number;
  slides: Array<SlideInfo>;
}

export const CarouselPageIndicator = ({
  currentSlide,
  slides,
}: CarouselPageIndicatorProps) => {
  const [containerRef, bounds] = useBounds<HTMLDivElement>([]);

  return (
    <motion.div
      className="relative left-1/2 flex flex-row items-center justify-center gap-10"
      animate={{
        x: (-currentSlide * bounds.width) / (slides.length - 1),
        transition: {
          duration: AnimationConfig.FAST,
          ease: AnimationConfig.EASING,
        },
      }}
      ref={containerRef}
    >
      {slides.map((slide, index) => (
        <CarouselPageIndicatorItem
          isCurrent={currentSlide === index}
          index={index}
          key={index}
        />
      ))}
    </motion.div>
  );
};

const CarouselPageIndicatorItem = ({
  isCurrent,
  index,
}: {
  isCurrent: boolean;
  index: number;
}) => (
  <div className="h-0 w-0 -translate-x-4">
    <motion.div
      className="flex h-8 w-8 items-center justify-center rounded-lg border p-2"
      initial={{
        borderWidth: isCurrent ? 1 : 3,
        opacity: 0,
      }}
      animate={{
        borderColor: isCurrent ? "#FC5F2B" : "#18181B",
        color: isCurrent ? "#FC5F2B" : "#18181B",
        borderWidth: isCurrent ? 1 : 3,
        scale: isCurrent ? 1 : 0.3,
        opacity: 1,
        transition: {
          duration: AnimationConfig.NORMAL,
          ease: AnimationConfig.EASING,
        },
      }}
    >
      <motion.div
        className="font-mono-sm leading-none"
        animate={{
          opacity: isCurrent ? 1 : 0,
        }}
      >
        {index + 1}
      </motion.div>
    </motion.div>
  </div>
);
