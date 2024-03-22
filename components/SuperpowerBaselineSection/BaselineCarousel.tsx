"use client";

import React, { useRef, useState } from "react";
import { SlideInfo } from "./SuperpowerBaselineSection";
import Carousel, { useCarouselControls } from "../Carousel/Carousel";
import BaselineCarouselItem from "./BaselineCarouselItem";
import { motion } from "framer-motion";
import { useBoundingClientRect } from "@/hooks/useBoundingClientRect";
import { AnimationConfig } from "../AnimationConfig";
import { CarouselPageIndicator } from "./CarouselPageIndicator";

type Props = {
  slides: Array<SlideInfo>;
};

const BaselineCarousel = ({ slides }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const controls = useCarouselControls();
  const handleNextClick = () => {
    controls.next();
  };
  const handlePrevClick = () => {
    controls.prev();
  };

  return (
    <div className="flex w-full flex-col pt-12">
      <Carousel controls={controls} onSlideChange={setCurrentSlide}>
        {slides.map((slide, index) => (
          <BaselineCarouselItem key={index} slide={slide} />
        ))}
      </Carousel>

      <div className="mx-auto -mt-24 flex flex-col items-center">
        <div className="mb-4 h-8 w-[1px] bg-[#FC5F2B] opacity-40" />
        <CarouselPageIndicator currentSlide={currentSlide} slides={slides} />
      </div>
    </div>
  );
};

export default BaselineCarousel;
