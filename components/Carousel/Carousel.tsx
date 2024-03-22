import { useBoundingClientRect } from "@/hooks/useBoundingClientRect";
import { useScrub } from "@/hooks/useScrub";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import {
  clamp,
  motion,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import React, {
  MutableRefObject,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ComponentControls,
  useComponentControls,
} from "@/hooks/useComponentControls";
import useStateRef from "@/hooks/useStateRef";
import { getPositionBySlide, getSlideByPosition } from "./CarouselUtilities";

export type CarouselItemInfo = {
  index: number;
  isCurrent: boolean;
  currentSlide: number;
  isPointerDown: boolean;
};

const CarouselItemContext = createContext<CarouselItemInfo>({
  index: 0,
  isCurrent: false,
  currentSlide: 0,
  isPointerDown: false,
});

/**
 * Provide information about the current carousel item.
 * Used in the children component of the carousel.
 *
 * @returns index, isCurrent, currentSlide, isPointerDown
 */
export const useCarouselItemContext = () => useContext(CarouselItemContext);

type CarouselComponentControls = {
  next: () => void;
  prev: () => void;
  goto: (slide: number) => void;
};

export const useCarouselControls = () =>
  useComponentControls<CarouselComponentControls>();

type Props = {
  children: React.ReactNode;
  controls?: ComponentControls<CarouselComponentControls>;
};

export interface CarouselSizing {
  slideWidth: number;
  gap: number;
  totalSlidesWidth: number;
  totalGapSpacing: number;
  totalScrollWidth: number;
}

const Carousel = ({ children, controls }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPointerDown, setIsPointerDown] = useState(false);

  const windowDim = useWindowDimension();
  const [scrollContentRef, scrollContentBound] =
    useBoundingClientRect<HTMLDivElement>([]);

  const childrenArray = React.Children.toArray(children);
  const slideCount = childrenArray.length;

  const sizes: CarouselSizing = useMemo(() => {
    const slideWidth = scrollContentBound.width;
    const gap = 0;
    const totalSlidesWidth = slideWidth * (slideCount - 1);
    const totalGapSpacing = gap * (slideCount - 1);
    const totalScrollWidth = totalSlidesWidth + totalGapSpacing;

    return {
      slideWidth,
      gap,
      totalSlidesWidth,
      totalGapSpacing,
      totalScrollWidth,
    };
  }, [scrollContentBound.width, slideCount]);

  const [scrubContainerRef, pos, posTarget, isScrubbing] = useScrub({
    maxDistance: sizes.totalScrollWidth,
    canUseMouseWheel: true,
    responsiveness: 0.17,
    dampingConst: 6,
  });

  // carousel control
  const [isUsingCarouselControl, setIsUsingCarouselControl] = useState(false);
  useEffect(() => {
    if (isScrubbing) setIsUsingCarouselControl(false);
  }, [isScrubbing]);

  useEffect(() => {
    if (!controls) return;

    const goto = (slide: number) => {
      posTarget.set(getPositionBySlide(slide, slideCount, sizes));
      setIsUsingCarouselControl(true);
    };
    const next = () => goto(currentSlide + 1);
    const prev = () => goto(currentSlide - 1);

    controls.exposeInternalFunctions({
      next,
      prev,
      goto,
    });
  }, [controls, currentSlide, slideCount]);

  const containerWidth = useMemo(
    () =>
      scrubContainerRef.current
        ? scrubContainerRef.current.getBoundingClientRect().width
        : 0,
    [windowDim.width, scrubContainerRef.current],
  );

  // left margin to make it center align
  const initialPadding = useMemo(
    () => (containerWidth - sizes.slideWidth) / 2,
    [containerWidth, sizes.slideWidth],
  );

  // snap to a item base on current slide value when it is not scrubbing
  const shouldSnapToSlide = !isScrubbing && !isUsingCarouselControl;
  useEffect(() => {
    if (shouldSnapToSlide) {
      posTarget.set(getPositionBySlide(currentSlide, slideCount, sizes));
    }
  }, [currentSlide, shouldSnapToSlide, slideCount, sizes]);

  // detecting a flick
  const flickMomentum = 0.2;
  useEffect(() => {
    if (isPointerDown || !isScrubbing) return;
    // initate homing when the pointer up
    const direction = pos.getVelocity() > 0 ? 1 : -1;
    const projectedPosition =
      pos.get() + direction * Math.abs(pos.getVelocity() * flickMomentum);

    const projectedSlide = getSlideByPosition(
      projectedPosition,
      slideCount,
      sizes,
    );
    posTarget.set(getPositionBySlide(projectedSlide, slideCount, sizes));
  }, [isPointerDown, isScrubbing, pos, slideCount, sizes]);

  // match the current slide with the position
  useMotionValueEvent(pos, "change", (latest) => {
    const slide = getSlideByPosition(latest, slideCount, sizes);
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
          gap: sizes.gap,
        }}
        className="pointer-events-none mt-12 flex select-none flex-row items-center  pb-24"
      >
        {childrenArray.map((slide, index) => (
          <div className="flex-shrink-0" key={index} ref={scrollContentRef}>
            <CarouselItemContext.Provider
              value={{
                index,
                isCurrent: currentSlide === index,
                currentSlide,
                isPointerDown,
              }}
            >
              {slide}
            </CarouselItemContext.Provider>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Carousel;
