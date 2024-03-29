import React from "react";
import LineElement from "@/components/LineElement/LineElement";
import TestimonialsSelector from "./TestimonialsSelector";
import { useState } from "react";

type Props = {};
const quotes = [
  {
    quote: "Changed my life forever.",
    author: "Vinay hiremath, Co-counder of loom"
  },
  {
    quote: "The best thing since sliced bread",
    author: "Kiran Patel"
  },
  {
    quote: "Hello there! This is a longer quote",
    author: "discwdicnwis"
  }
]

const TestimonialsWrapper = (props: Props) => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  setTimeout(() => {
    setQuoteIndex((quoteIndex + 1) % quotes.length);
  }, 2000);

  return (
    <div>
      <div className="absolute w-full h-full flex flex-col gap-6 justify-center items-center">
        <div className="flex h-full">
          <LineElement length={"auto"} color={"rgba(0,0,0,.5)"} vertical tail={16} />
        </div>

        <div className="flex flex-row w-full justify-center items-center">
          <div className="flex flex-row w-full">
            <LineElement length={"auto"} color={"rgba(0,0,0,.5)"} horizontal tail={16} />
          </div>
          <div className="flex flex-col justify-between flex-wrap items-center text-center p-4 min-h-[250px] lg:min-h-[500px] min-w-96 lg:min-w-[624px]">
            <div className="flex gap-3">
              {quotes.map((quote, index) => (
                index === quoteIndex ? <TestimonialsSelector key={index} active={true} /> : <TestimonialsSelector key={index} />
              ))}
            </div>
            <p className="font-sans-4xl mx-4 mb-6 max-w-[20ch] text-center">{quotes[quoteIndex].quote}</p>
            <p className="font-mono-sm text-center">{quotes[quoteIndex].author}</p>
          </div>
          <div className="flex flex-row w-full">
            <LineElement length={"auto"} color={"rgba(0,0,0,.5)"} horizontal head={16} />
          </div>
        </div>

        <div className="flex h-full">
          <LineElement length={"auto"} color={"rgba(0,0,0,.5)"} vertical head={16} />
        </div>
      </div>
    </div>
  );
};

export default TestimonialsWrapper;
