import { useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import React, { MutableRefObject, RefObject, useRef } from "react";
import Timeline from "./Timeline";
import FadingText from "@/components/FadingText/FadingText";
import Scrim from "@/components/Scrim/Scrim";

type Props = {};

const TimelineSection = (props: Props) => {
  const containerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const fadingTextProgress = useTransform(
    scrollYProgress,
    [0, 0.1, 2, 3],
    [0.1, 0.6, 0.5, 1],
  );

  return (
    <div className="w-full bg-black pt-64" ref={containerRef}>
      <div className="sticky top-0 z-10 h-fit w-full bg-[rgba(0,0,0,.8)] pt-8 text-center text-white">
        <h3 className="font-sans-2xl mx-auto mb-4 max-w-[18ch]">
          <FadingText progress={fadingTextProgress}>
            Personalized healthcare for every stage of your life
          </FadingText>
        </h3>
        <Scrim height={"200px"} color="rgba(0,0,0,.8)" />
      </div>
      <Timeline />
    </div>
  );
};

export default TimelineSection;
