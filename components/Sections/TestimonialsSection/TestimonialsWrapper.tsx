import React, { useState, useEffect, MutableRefObject, useRef } from "react";
import { breakpoints, useBreakpoint } from "@/hooks/useBreakpoints";
import TestimonialsDesktop from "./TestimonialsDesktop";
import TestimonialsMobile from "./TestimonialsMobile";
import LineElement from "@/components/LineElement/LineElement";
import { useInView } from "framer-motion";

type Props = {};
const interval = 3500; // interval between quotes
const clap = 800; // clap animation time

const quotes = [
  {
    quote: "Superpower is exactly what medicine should be.",
    name: "Erin Sharoni",
    title: "Harvard Medical School",
    photo: "/testimonials-section/erin-sharoni.png",
  },
  {
    quote: "Went from in the dark to fully in control.",
    name: "Brett Goldstein",
    title: "Founder Micro",
    photo: "/testimonials-section/brett-goldstein.png",
  },
  {
    quote: "Regular doctors don’t test for inflammation or hormones.",
    name: "Marc Baghadjan",
    title: "CEO Hypercard",
    photo: "/testimonials-section/marc-baghadjan.png",
  },
];

const TestimonialsWrapper = (props: Props) => {
  const isDesktop = useBreakpoint(breakpoints.lg);
  const quoteContainerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const isButtonInView = useInView(quoteContainerRef);

  return (
    <section className="relative z-10 h-svh overflow-hidden bg-white">
      <div className="absolute flex h-full w-full flex-col items-center justify-center gap-6">
        <div className="flex h-full">
          <LineElement length={"auto"} color={"#bbb"} vertical tail={16} />
        </div>

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
