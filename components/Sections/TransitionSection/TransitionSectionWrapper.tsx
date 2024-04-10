import React from "react";
import { breakpoints, useBreakpoint } from "@/hooks/useBreakpoints";

type Props = {};

const Testimonial = (props: Props) => {
  const isDesktop = useBreakpoint(breakpoints.lg);

  return <div className="flex flex-col gap-6"></div>;
};

export default Testimonial;
