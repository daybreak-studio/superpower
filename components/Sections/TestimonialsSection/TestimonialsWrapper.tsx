import React, { useState, useEffect } from "react";
import { breakpoints, useBreakpoint } from "@/hooks/useBreakpoints";
import TestimonialsDesktop from "./TestimonialsDesktop";
import TestimonialsMobile from "./TestimonialsMobile";

const TestimonialsWrapper = () => {
  const isDesktop = useBreakpoint(breakpoints.desktop);

  return (
    <section>
      {isDesktop && <TestimonialsDesktop />}
      {!isDesktop && <TestimonialsMobile />}
    </section>
  );
};

export default TestimonialsWrapper;
