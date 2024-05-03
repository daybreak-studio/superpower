import {
  motion,
  useAnimationFrame,
  useMotionValue,
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
  // const [isTimelineActive, setIsTimelineActive] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const progress = useMotionValue(0);
  useAnimationFrame(() => {
    progress.set(scrollYProgress.get());
  });

  const fadingTextProgress = useTransform(
    progress,
    [0, 0.1, 0.9, 1],
    [0.1, 0.5, 0.5, 1],
  );

  const timelineProgress = useTransform(progress, [0.1, 0.9], [0, 1]);
  const timelineTransitionProgress = useTransform(progress, [0, 0.1], [0, 1]);

  const headerScale = useTransform(fadingTextProgress, [0, 0.5], [1, 1]);
  const headerY = useTransform(fadingTextProgress, [0, 0.5], [200, 0]);

  const opacity = useTransform(progress, [0.85, 0.92], [1, 0]);

  const [shouldScrimVisible, setShouldScrimVisible] = useState(true);

  useMotionValueEvent(opacity, "change", (latest) => {
    if (latest === 0) {
      setShouldScrimVisible(false);
      return;
    }
    setShouldScrimVisible(true);
  });

  return (
    <section className="w-full bg-black pt-24" ref={containerRef}>
      <motion.div
        style={{
          scale: headerScale,
          y: headerY,
          // transition: `transform .4s cubic-bezier(0.16, 1, 0.3, 1)`,
        }}
        className="sticky top-0 z-10 h-fit w-full bg-[rgba(0,0,0,.8)] pt-12 text-center text-white"
      >
        <h3 className="font-sans-2xl mx-auto mb-4 max-w-[18ch]">
          <FadingText progress={fadingTextProgress}>
            <div className="h-fit py-1">
              A proactive system in every stage of your life
            </div>
          </FadingText>
        </h3>
        <div style={{ visibility: shouldScrimVisible ? "visible" : "hidden" }}>
          <Scrim height={"200px"} color="rgba(0,0,0,.8)" />
        </div>
      </motion.div>
      <motion.div
        style={{
          opacity,
        }}
      >
        <Timeline
          timelineProgress={timelineProgress}
          transitionProgress={timelineTransitionProgress}
        />
      </motion.div>
    </section>
  );
};

export default TimelineSection;
