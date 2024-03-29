import React from "react";

type Props = {
  active?: boolean;
};

const TestimonialsSelector = ({ active }: Props) => {
  return (
    <div>
      {active === true ? (
        <div className="bg-[#FC5F2B] h-3 w-3" />
      ) : (
        <div className="border-solid border border-[#bbb] h-3 w-3" />
      )}
      {/* <div className="border-solid border border-[#bbb] h-3 w-3" /> */}
    </div>
  );
};

export default TestimonialsSelector;
