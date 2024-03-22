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

export interface CarouselItemInfo {
  index: number;
  isCurrent: boolean;
  currentSlide: number;
  isPointerDown: boolean;
}

const CarouselItemContext = createContext<CarouselItemInfo>({
  index: 0,
  isCurrent: false,
  currentSlide: 0,
  isPointerDown: false,
});

/**
 * Provide information about the current item.
 * Used in the children component of the carousel.
 * @returns
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

const Carousel = ({ children, controls }: Props) => {
  const [currentSlide, setCurrentSlide, currentSlideRef] = useStateRef(0);
  const [isPointerDown, setIsPointerDown] = useState(false);

  const windowDim = useWindowDimension();
  const [scrollContentRef, scrollContentBound] =
    useBoundingClientRect<HTMLDivElement>([]);

  const childrenArray = React.Children.toArray(children);
  const slideCount = childrenArray.length;

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
  const getSlideByPosition = (pos: number) => {
    const latestClamped = clamp(-totalCardWidth, 0, pos);
    const curSlide = Math.round(
      (-latestClamped / totalScrollWidth) * (slideCount - 1),
    );
    return curSlide;
  };
  const getPosiitonBySlide = (slide: number) => {
    const clampedSlide = clamp(0, slideCount - 1, slide);
    return -clampedSlide * (cardWidth + gapSize);
  };

  // carousel control
  useEffect(() => {
    if (!controls) return;
    controls.exposeInternalFunctions({
      next: () => {
        posTarget.set(getPosiitonBySlide(currentSlide + 1));
      },
      prev: () => {
        posTarget.set(getPosiitonBySlide(currentSlide - 1));
      },
      goto: (slide: number) => {
        posTarget.set(getPosiitonBySlide(slide));
      },
    });
  }, [controls, currentSlide, slideCount]);

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

  // match the current slide with the position
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
