"use client";

import React, { useRef } from "react";
import { SlideInfo } from "./SuperpowerBaselineSection";
import Carousel, { useCarouselControls } from "../Carousel/Carousel";
import BaselineCarouselItem from "./BaselineCarouselItem";

type Props = {
  slides: Array<SlideInfo>;
};

const BaselineCarousel = ({ slides }: Props) => {
  const controls = useCarouselControls();
  const handleNextClick = () => {
    controls.next();
  };
  const handlePrevClick = () => {
    controls.prev();
  };

  return (
    <div className="w-full">
      <button onClick={handlePrevClick}>prev</button>
      <button onClick={handleNextClick}>next</button>
      <Carousel controls={controls}>
        {slides.map((slide, index) => (
          <BaselineCarouselItem key={index} slide={slide} />
        ))}
      </Carousel>
    </div>
  );
};

export default BaselineCarousel;
