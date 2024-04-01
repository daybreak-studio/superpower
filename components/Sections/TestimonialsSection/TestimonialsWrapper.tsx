import React, { useState, useEffect, MutableRefObject, useRef } from "react";
import { breakpoints, useBreakpoint } from "@/hooks/useBreakpoints";
import TestimonialsDesktop from "./TestimonialsDesktop";
import TestimonialsMobile from "./TestimonialsMobile";
import LineElement from "@/components/LineElement/LineElement";
import { useInView } from "framer-motion";

type Props = {};
const interval = 2500; // interval between quotes
const clap = 800; // clap animation time

const quotes = [
  {
    quote: "Changed my life forever.",
    name: "Vinay hiremath",
    title: "Co-founder of Loom",
  },
  {
    quote: "The best thing since sliced bread!",
    name: "Kiran Patel",
    title: "Developer at Daybreak",
  },
  {
    quote: "I can't live without it.",
    name: "Sara Smith",
    title: "Designer at Meta",
  },
  {
    quote: "I can't believe I ever lived without it.",
    name: "John Doe",
    title: "CEO of Apple",
  },
];

const TestimonialsWrapper = (props: Props) => {
  const isDesktop = useBreakpoint(breakpoints.lg);
  const quoteContainerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const isButtonInView = useInView(quoteContainerRef);

  return (
    <section>
      <div className="relative flex h-svh w-svw flex-col items-center justify-center gap-6">
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
