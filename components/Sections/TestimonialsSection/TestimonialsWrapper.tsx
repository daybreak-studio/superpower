import React from "react";
import LineElement from "@/components/LineElement/LineElement";

type Props = {};

const TestimonialsWrapper = (props: Props) => {
  return (
    <div>
      <div className="absolute mt-12 flex h-4">
        <LineElement length={100} color={"rgba(0,0,0,.5)"} vertical tail={32} />
      </div>

      <div className="my-24 max-w-[24ch] text-center">
        <p className="font-sans-xl mb-3 leading-tight">The</p>
        <p className="font-sans-xl mb-3 leading-tight">The</p>
        <p className="font-sans-xl mb-3 leading-tight">The</p>
      </div>
    </div>
  );
};

export default TestimonialsWrapper;
