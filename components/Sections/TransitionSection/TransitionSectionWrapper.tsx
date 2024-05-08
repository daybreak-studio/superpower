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
  usePointerPosition,
  usePointerOffset,
  usePointerOffsetNormalized,
} from "@/hooks/usePointerInfo";
import Image from "next/image";
import { breakpoints, useBreakpoint } from "@/hooks/useBreakpoints";
import { is } from "@react-three/fiber/dist/declarations/src/core/utils";

import { MotionValue } from "framer-motion";

type BoundingBoxInfo = {
  top: number;
  left: number;
  right: number;
  bottom: number;
};

type PointerOffsetNormalizedArgs = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  bounds: MotionValue<BoundingBoxInfo>;
  anchor: "center" | "left";
};

type Props = {};

const TransitionSectionWrapper = (props: Props) => {
  const isDesktop = useBreakpoint(breakpoints.lg);

  const containerRef = useRef() as MutableRefObject<HTMLAnchorElement>;

  const [isHovering, setIsHovering] = useState(false);

  const pointerOffset = usePointerOffset(isHovering, containerRef, "center");
  const pointerOffsetPercent = usePointerOffsetNormalized(pointerOffset);

  const offsetX1 = useTransform(pointerOffsetPercent.x, (latest) =>
    isHovering ? 1 + latest : 1,
  );

  const easedX1 = useSpring(offsetX1, { stiffness: 400, damping: 100 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // offset: ["start end", "end end"],
  });

  const easedScroll = useTransform(scrollYProgress, (t) => {
    var ts = Math.pow(0.75 * t, 3);
    return ts * 18;
  });
  // const easedScroll = useTransform(scrollYProgress, [0, 1], [0.5, 1], {
  //   ease: cubicBezier(0.16, 1, 0.3, 1),
  // });

  return (
    <section className="pointer-events-none flex h-[75vh] w-full items-end">
      <div
        onPointerEnter={() => setIsHovering(true)}
        onPointerLeave={() => setIsHovering(false)}
        ref={containerRef as unknown as MutableRefObject<HTMLDivElement>}
        className=" relative h-[225vh] w-screen"
      >
        <div className="sticky top-0 flex h-screen w-full items-end mix-blend-hard-light">
          <div className="absolute bottom-[-1px] left-0 h-auto w-full">
            <motion.div
              className=" flex origin-bottom flex-row"
              style={{ scaleY: easedScroll }}
            >
              <Image
                src="/transition-section/transition.png"
                width="0"
                height="0"
                sizes="100vw"
                className="pointer-events-none h-full grow origin-bottom-left"
                alt="transition-bg"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransitionSectionWrapper;
