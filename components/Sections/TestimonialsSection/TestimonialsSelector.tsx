import React from "react";

type Props = {
  active?: boolean;
  size?: number;
};

const TestimonialsSelector = ({ active, size }: Props) => {
  return (
    <div>
      {active === true ? (
        <div
          className="h-3 w-3 bg-[#FC5F2B]"
          style={{ width: size, height: size }}
        />
      ) : (
        <div
          className="h-3 w-3 border border-solid border-[#bbb]"
          style={{ width: size, height: size }}
        />
      )}
      {/* <div className="border-solid border border-[#bbb] h-3 w-3" /> */}
    </div>
  );
};

export default TestimonialsSelector;
