import React, { useState, useEffect } from "react";
import { breakpoints, useBreakpoint } from "@/hooks/useBreakpoints";
import TestimonialsDesktop from "./TestimonialsDesktop";
import TestimonialsMobile from "./TestimonialsMobile";
import LineElement from "@/components/LineElement/LineElement";

type Props = {};
const interval = 2000; // interval between quotes
const clap = 600; // clap animation time

const quotes = [
  {
    quote: "Changed my life forever.",
    author: "Vinay hiremath, Co-founder of loom",
  },
  {
    quote: "The best thing since sliced bread!",
    author: "Kiran Patel",
  },
  {
    quote: "I can't live without it.",
    author: "Sara Smith",
  },
  {
    quote: "I can't believe I ever lived without it.",
    author: "John Doe",
  },
];

const TestimonialsWrapper = (props: Props) => {
  const isDesktop = useBreakpoint(breakpoints.lg);

  return (
    <section>
      <div className="absolute flex h-full w-full flex-col items-center justify-center gap-6">
        <div className="flex h-full">
          <LineElement length={"auto"} color={"#bbb"} vertical tail={16} />
        </div>

        <div className="flex w-full flex-row items-center justify-center gap-12">
          <div className="flex w-full flex-row">
            <LineElement length={"auto"} color={"#bbb"} horizontal tail={16} />
          </div>

          {isDesktop && (
            <TestimonialsDesktop
              quotesList={quotes}
              intervalTime={interval}
              clapTime={clap}
            />
          )}
          {!isDesktop && (
            <TestimonialsMobile
              quotesList={quotes}
              intervalTime={interval}
              clapTime={clap}
            />
          )}
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
