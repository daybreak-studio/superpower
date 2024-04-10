import React from "react";
import { breakpoints, useBreakpoint } from "@/hooks/useBreakpoints";

type Props = {};

const TransitionSectionWrapper = (props: Props) => {
  const isDesktop = useBreakpoint(breakpoints.lg);

  return (
    <section className="flex h-0 w-full items-end">
      <div className="flex h-screen w-screen">
        <div className="flex flex-col justify-center gap-6">
          <div className="flex h-full">
            <div className="h-1 w-1 bg-black"></div>
          </div>

          <div className="flex w-full flex-row items-center justify-center gap-12">
            <div className="flex w-full flex-row">
              <div className="h-1 w-1 bg-black"></div>
            </div>

            <div>
              <div className="h-1 w-1 bg-black"></div>
            </div>
            <div className="flex w-full flex-row">
              <div className="h-1 w-1 bg-black"></div>
            </div>
          </div>

          <div className="flex h-full">
            <div className="h-1 w-1 bg-black"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransitionSectionWrapper;
