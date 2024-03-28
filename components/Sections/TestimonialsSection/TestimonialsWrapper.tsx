import React from "react";
import LineElement from "@/components/LineElement/LineElement";
import TestimonialsSelector from "./TestimonialsSelector";

type Props = {};

const TestimonialsWrapper = (props: Props) => {
  return (
    <div>
      <div className="absolute w-full flex flex-col gap-10 justify-center items-center">
        <div className="flex h-8">
          <LineElement length={100} color={"rgba(0,0,0,.5)"} vertical tail={16} />
        </div>

        <div className="flex flex-col justify-between flex-wrap text-center h-[400px]">
          <div className="flex gap-3">
            <TestimonialsSelector />
            <TestimonialsSelector />
            <TestimonialsSelector />
          </div>
          <p className="font-sans-xl mb-3 leading-tight">The</p>
          <p className="font-sans-xl mb-3 leading-tight">The</p>
          <p className="font-sans-xl mb-3 leading-tight">The</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsWrapper;
