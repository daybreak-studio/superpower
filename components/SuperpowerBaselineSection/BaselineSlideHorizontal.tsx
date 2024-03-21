"use client";

import React, { MutableRefObject, useMemo, useRef, useState } from "react";
import { SlideInfo } from "./SuperpowerBaselineSection";
import BaselineSlideHorizontalItem from "./BaselineSlideHorizontalItem";
import { motion, useDragControls } from "framer-motion";
import { useScrub } from "@/hooks/useScrub";
import { useBoundingClientRect } from "@/hooks/useBoundingClientRect";
import { useWindowDimension } from "@/hooks/useWindowDimension";

type Props = {
  slides: Array<SlideInfo>;
};

const BaselineSlideHorizontal = ({ slides }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPointerDown, setIsPointerDown] = useState(false);

  const windowDim = useWindowDimension();
  const [scrollContentRef, scrollContentBound] =
    useBoundingClientRect<HTMLDivElement>([]);

  const containerWidth = useMemo(() => windowDim.width, [windowDim.width]);
  const totalCardWidth = scrollContentBound.width * (slides.length - 1);
  const totalGapSpacing = 12 * (slides.length - 1);

  const [scrubContainerRef, pos, posTarget, isScrubbing] = useScrub({
    maxDistance: totalCardWidth + totalGapSpacing,
    canUseMouseWheel: true,
    responsiveness: 0.25,
    dampingConst: 4,
  });

  return (
    <div
      onPointerDown={(e) => {
        setIsPointerDown(true);
      }}
      onPointerUp={() => {
        setIsPointerDown(false);
      }}
      ref={scrubContainerRef}
      className="h-screen w-full overflow-x-hidden"
      style={{
        cursor: isPointerDown ? "grabbing" : "grab",
      }}
    >
      <motion.div
        style={{
          x: pos,
        }}
        className="pointer-events-none mt-12 flex select-none flex-row items-center gap-3 pb-24"
      >
        {slides.map((slide, index) => (
          <div
            className="h-[100vw] max-h-[60vh] w-[60vw] flex-shrink-0"
            key={index}
            ref={scrollContentRef}
          >
            <BaselineSlideHorizontalItem
              index={`${index + 1}`}
              {...slide}
              isCurrent={currentSlide === index}
              onSelect={() => setCurrentSlide(index)}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default BaselineSlideHorizontal;
