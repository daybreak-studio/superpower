import React, {
  useState,
  useEffect,
  MutableRefObject,
  useRef,
  RefObject,
} from "react";
import {
  cubicBezier,
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  usePointerOffset,
  usePointerOffsetNormalized,
} from "@/hooks/usePointerInfo";
import Image from "next/image";
import { breakpoints, useBreakpoint } from "@/hooks/useBreakpoints";

type Props = {};

const TransitionSectionWrapper = (props: Props) => {
  const isDesktop = useBreakpoint(breakpoints.lg);

  const fuckthisshit = useRef() as MutableRefObject<HTMLAnchorElement>;

  const inViewDelay = 0.3;
  const [isHovering, setIsHovering] = useState(false);

  const pointerOffset = usePointerOffset(isHovering, fuckthisshit, "center");
  const pointerOffsetPercent = usePointerOffsetNormalized(pointerOffset);

  const offsetX = useTransform(pointerOffsetPercent.x, (latest) =>
    isHovering ? latest * 15 : 0,
  );
  const offsetY = useTransform(pointerOffsetPercent.y, (latest) =>
    isHovering ? latest * 4 : 0,
  );

  const textX = useSpring(offsetX, { stiffness: 300, damping: 50 });
  const textY = useSpring(offsetY, { stiffness: 300, damping: 50 });

  const containerRef = useRef() as RefObject<HTMLElement>;
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // offset: ["start end", "end end"],
  });

  const easedScroll = useTransform(scrollYProgress, (t) => {
    var ts = t * t;
    return (1 - ts) * 5;
  });
  // const easedScroll = useTransform(scrollYProgress, [0, 1], [0.5, 1], {
  //   ease: cubicBezier(0.16, 1, 0.3, 1),
  // });

  return (
    <section ref={containerRef} className="flex h-0 w-full items-end">
      <div
        ref={fuckthisshit as unknown as MutableRefObject<HTMLDivElement>}
        className="pointer-events-none relative h-screen w-screen"
      >
        <div className="absolute bottom-0 left-0 h-auto w-full">
          <motion.div
            className="flex origin-bottom flex-row  mix-blend-hard-light"
            style={{ scaleY: easedScroll }}
          >
            <Image
              src="/transition-section/left.png"
              width="0"
              height="0"
              sizes="100vw"
              className="grow"
              alt="transition-bg"
            />
            <Image
              src="/transition-section/right.png"
              width="0"
              height="0"
              sizes="100vw"
              className="grow"
              alt="transition-bg"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TransitionSectionWrapper;
