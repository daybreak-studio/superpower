import React, { useState, useEffect } from "react";
import { breakpoints, useBreakpoint } from "@/hooks/useBreakpoints";
import TestimonialsDesktop from "./TestimonialsDesktop";
import TestimonialsMobile from "./TestimonialsMobile";
import LineElement from "@/components/LineElement/LineElement";

type Props = {};

const quotes = [
  {
    quote: "Changed my life forever.",
    author: "Vinay hiremath, Co-founder of loom",
  },
  {
    quote: "The best thing since sliced bread",
    author: "Kiran Patel",
  },
  {
    quote: "Hello there! This is a longer quote",
    author: "discwdicnwis",
  },
];

const TestimonialsWrapper = (props: Props) => {
  const isDesktop = useBreakpoint(breakpoints.lg);
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section>
      <div className="absolute flex h-full w-full flex-col items-center justify-center gap-6">
        <div className="flex h-full">
          <LineElement length={"auto"} color={"#bbb"} vertical tail={16} />
        </div>

        <div className="flex w-full flex-row items-center justify-center gap-12">
          <div className="flex grow-0 flex-row">
            <LineElement length={"auto"} color={"#bbb"} horizontal tail={16} />
          </div>

          {isDesktop && (
            <TestimonialsDesktop
              quoteInfo={quotes}
              quoteInfoIndex={quoteIndex}
            />
          )}
          {!isDesktop && (
            <TestimonialsMobile
              quoteInfo={quotes}
              quoteInfoIndex={quoteIndex}
            />
          )}
          <div className="flex grow-0 flex-row">
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
