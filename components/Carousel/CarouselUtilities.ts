import { clamp } from "framer-motion";
import { CarouselSizing } from "./Carousel";

export const getSlideByPosition = (
  pos: number,
  totalSlides: number,
  sizes: CarouselSizing,
) => {
  const latestClamped = clamp(-sizes.totalSlidesWidth, 0, pos);
  const curSlide = Math.round(
    (-latestClamped / sizes.totalScrollWidth) * (totalSlides - 1),
  );
  return curSlide;
};

export const getPositionBySlide = (
  slide: number,
  totalSlides: number,
  sizes: CarouselSizing,
) => {
  const clampedSlide = clamp(0, totalSlides - 1, slide);
  return -clampedSlide * (sizes.slideWidth + sizes.gap);
};
