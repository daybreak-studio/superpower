"use client";

import React, { useState } from "react";
import { SlideInfo } from "./SuperpowerBaselineSection";
import BaselineSlideVerticalItem from "./BaselineSlideVerticalItem";

type Props = {
  slides: Array<SlideInfo>;
};

const BaselineSlideVertical = ({ slides }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="mt-12 flex w-full flex-col items-center gap-3 overflow-x-hidden">
      {slides.map((slide, index) => (
        <BaselineSlideVerticalItem
          key={index}
          index={`${index + 1}`}
          {...slide}
          isExpanded={currentSlide === index}
          onSelect={() => setCurrentSlide(index)}
        />
      ))}
    </div>
  );
};

export default BaselineSlideVertical;
