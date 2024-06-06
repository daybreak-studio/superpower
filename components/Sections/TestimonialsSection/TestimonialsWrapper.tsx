import React, { useState, useEffect, MutableRefObject, useRef } from "react";
import { breakpoints, useBreakpoint } from "@/hooks/useBreakpoints";
import TestimonialsDesktop from "./TestimonialsDesktop";
import TestimonialsMobile from "./TestimonialsMobile";
import LineElement from "@/components/LineElement/LineElement";
import { useInView } from "framer-motion";

type Props = {};
const interval = 4000; // interval between quotes
const clap = 800; // clap animation time

const quotes = [
  {
    quote: "Exactly what healthcare should be.",
    name: "Erin Sharoni",
    title: "Harvard Medical School",
    photo: "/testimonials-section/erin-sharoni.png",
  },
  {
    quote: "Superpower put me on the road to feeling great.",
    name: "Vinay Hiremath",
    title: "Founder of Loom",
    photo: "/testimonials-section/vinay-hiremath.png",
  },
  {
    quote: "Becoming a healthier dad for my kids - priceless.",
    name: "Jordi Hays",
    title: "Founder of Capital",
    photo: "/testimonials-section/jordi-hays.png",
  },
];

const TestimonialsWrapper = (props: Props) => {
  const isDesktop = useBreakpoint(breakpoints.lg);
  const quoteContainerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const isButtonInView = useInView(quoteContainerRef);

  return (
    <section className="relative z-10 h-screen overflow-hidden bg-white">
      <div className="absolute flex h-full w-full flex-col items-center justify-center gap-6">
        <div className="flex h-full"></div>

        <div className="flex w-full flex-row items-center justify-center gap-12">
          <div className="flex w-full flex-row">
            <LineElement length={"auto"} color={"#bbb"} horizontal tail={16} />
          </div>

          <div ref={quoteContainerRef}>
            {isDesktop && (
              <TestimonialsDesktop
                isVisible={isButtonInView}
                quotesList={quotes}
                intervalTime={interval}
                clapTime={clap}
              />
            )}
            {!isDesktop && (
              <TestimonialsMobile
                isVisible={isButtonInView}
                quotesList={quotes}
                intervalTime={interval}
                clapTime={clap}
              />
            )}
          </div>
          <div className="flex w-full flex-row">
            <LineElement length={"auto"} color={"#bbb"} horizontal head={16} />
          </div>
        </div>

        <div className="flex h-full">
          <LineElement length={"auto"} color={"#bbb"} vertical head={16} />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsWrapper;
