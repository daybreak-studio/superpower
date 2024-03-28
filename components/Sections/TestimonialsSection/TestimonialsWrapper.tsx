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
    author: "Vinay hiremath, Co-counder of loom"
  },
  {
    quote: "I can't believe it's not butter",
    author: "Vinay hiremath, Co-counder of loom"
  }
]

const TestimonialsWrapper = (props: Props) => {
  const [quoteIndex, setQuoteIndex] = useState(0);

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
              <TestimonialsSelector />
              <TestimonialsSelector />
              <TestimonialsSelector />
            </div>
            <p className="font-sans-4xl mx-4 mb-6 max-w-[20ch] text-center">“Changed my life forever.”</p>
            <p className="font-mono-sm text-center">Vinay hiremath, Co-counder of loom</p>
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
