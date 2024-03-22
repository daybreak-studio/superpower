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
  const renderTime = useRef(0);
  const handleClick = () => {
    console.log(renderTime.current);
    controls.next();
  };

  return (
    <div className="w-full">
      <button onClick={handleClick}>next</button>
      <Carousel controls={controls}>
        {slides.map((slide, index) => (
          <BaselineCarouselItem key={index} slide={slide} />
        ))}
      </Carousel>
    </div>
  );
};

export default BaselineCarousel;
