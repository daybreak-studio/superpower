import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import React, { MutableRefObject, RefObject, useRef, useState } from "react";
import Timeline from "./Timeline";
import FadingText from "@/components/FadingText/FadingText";
import Scrim from "@/components/Scrim/Scrim";

type Props = {};

const TimelineSection = (props: Props) => {
  const containerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [isTimelineActive, setIsTimelineActive] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const fadingTextProgress = useTransform(
    scrollYProgress,
    [0, 0.1, 2, 3],
    [0.1, 0.6, 0.5, 1],
  );

  useMotionValueEvent(fadingTextProgress, "change", (latest) => {
    if (latest > 0.4) {
      setIsTimelineActive(true);
      return;
    }
    setIsTimelineActive(false);
  });

  const headerScale = useTransform(fadingTextProgress, [0, 0.5], [2, 1]);
  const headerY = useTransform(fadingTextProgress, [0, 0.5], [100, 0]);

  return (
    <div className="w-full bg-black pt-24" ref={containerRef}>
      <motion.div
        style={{
          scale: headerScale,
          y: headerY,
        }}
        className="sticky top-0 z-10 h-fit w-full bg-[rgba(0,0,0,.8)] pt-12 text-center text-white"
      >
        <h3 className="font-sans-2xl mx-auto mb-4 max-w-[18ch]">
          <FadingText progress={fadingTextProgress}>
            A proactive system in every stage of your life
          </FadingText>
        </h3>
        <Scrim height={"200px"} color="rgba(0,0,0,.8)" />
      </motion.div>
      <Timeline isActive={isTimelineActive} />
    </div>
  );
};

export default TimelineSection;
