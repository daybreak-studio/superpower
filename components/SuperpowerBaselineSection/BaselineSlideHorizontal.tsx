"use client";

import React, {
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SlideInfo } from "./SuperpowerBaselineSection";
import BaselineSlideHorizontalItem from "./BaselineSlideHorizontalItem";
import {
  clamp,
  motion,
  useDragControls,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
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

  const slideCount = slides.length;

  const cardWidth = scrollContentBound.width;
  const gapSize = 0;
  const totalCardWidth = cardWidth * (slideCount - 1);
  const totalGapSpacing = gapSize * (slideCount - 1);
  const totalScrollWidth = totalCardWidth + totalGapSpacing;

  const [scrubContainerRef, pos, posTarget, isScrubbing] = useScrub({
    maxDistance: totalScrollWidth,
    canUseMouseWheel: true,
    responsiveness: 0.17,
    dampingConst: 6,
  });

  const containerWidth = useMemo(
    () =>
      scrubContainerRef.current
        ? scrubContainerRef.current.getBoundingClientRect().width
        : 0,
    [windowDim.width, scrubContainerRef.current],
  );
  // margin to make it center align
  const initialPadding = useMemo(
    () => (containerWidth - cardWidth) / 2,
    [containerWidth, cardWidth],
  );

  const getSlideByPosition = (pos: number) => {
    const latestClamped = clamp(-totalCardWidth, 0, pos);
    const curSlide = Math.round(
      (-latestClamped / totalScrollWidth) * (slideCount - 1),
    );
    return curSlide;
  };
  const getPosiitonBySlide = (slide: number) => {
    return -slide * (cardWidth + gapSize);
  };

  // snap to a item base on current slide value when it is not scrubbing
  useEffect(() => {
    if (!isScrubbing) {
      posTarget.set(getPosiitonBySlide(currentSlide));
    }
  }, [currentSlide, isScrubbing, cardWidth]);

  // detecting a flick
  const flickMomentum = 0.2;

  useEffect(() => {
    if (isPointerDown || !isScrubbing) return;
    // initate homing when the pointer up
    const direction = pos.getVelocity() > 0 ? 1 : -1;
    const projectedPosition =
      pos.get() + direction * Math.abs(pos.getVelocity() * flickMomentum);

    const projectedSlide = getSlideByPosition(projectedPosition);
    posTarget.set(getPosiitonBySlide(projectedSlide));
  }, [isPointerDown, isScrubbing, pos]);

  useMotionValueEvent(pos, "change", (latest) => {
    const slide = getSlideByPosition(latest);
    setCurrentSlide(slide);
  });

  const xOffset = useTransform(pos, (latest) => initialPadding + latest);

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
          x: xOffset,
          gap: gapSize,
        }}
        className="pointer-events-none mt-12 flex select-none flex-row items-center  pb-24"
      >
        {slides.map((slide, index) => (
          <div className="flex-shrink-0" key={index} ref={scrollContentRef}>
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
