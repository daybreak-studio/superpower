import {
  MotionValue,
  cubicBezier,
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import React, {
  MutableRefObject,
  RefObject,
  createContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import TimelineGraphic from "./TimelineGraphic";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import { segments } from "./TimelineData";
import { getSegmentInfo } from "./Segments";
import Waypoint from "./Waypoint";

type Props = {};

const Timeline = (props: Props) => {
  const timelineContainerRef = useRef() as RefObject<HTMLDivElement>;
  const windowDim = useWindowDimension();

  const allSegments = useMemo(() => segments.map((s) => getSegmentInfo(s)), []);
  const [currentWaypoint, setCurrentWaypoint] = useState(0);

  const { scrollYProgress } = useScroll({
    target: timelineContainerRef,
    offset: ["start start", "end end"],
  });

  const progress = useMotionValue(0);
  useAnimationFrame(() => {
    progress.set(scrollYProgress.get());
  });
  // const progress = scrollYProgress;

  useMotionValueEvent(progress, "change", (latest) => {
    const segmentProgressLength = 1 / allSegments.length;
    const waypoint = Math.floor(latest / segmentProgressLength);
    setCurrentWaypoint(waypoint);
  });

  // const easedScrollProgress = useTransform(progress, [0, 1], [0, 1], {
  //   // ease: cubicBezier(0.76, 0, 0.24, 1),
  // });
  const easedScrollProgress = progress;

  const z = useTransform(
    easedScrollProgress,
    [0, 1],
    [-600, windowDim.width * -3],
  );

  const y = useTransform(
    easedScrollProgress,
    [0, 1],
    [windowDim.width * 0.4, windowDim.width * -0.7],
  );

  // const x = useTransform(
  //   easedScrollProgress,
  //   [0, 0.25, 0.6, 0.8, 1],
  //   [0, -800, 0, -600, 0],
  // );
  // const scale = useTransform(easedScrollProgress, [0, 1], [1, 2]);

  const SVGWidth = 1406;
  // scale factor x would be 1 when browser width = svg width
  const timelineScaleFactor = windowDim.width / SVGWidth;

  return (
    <div
      className="flex h-[7000px] w-full overflow-hidden bg-black"
      ref={timelineContainerRef}
    >
      <motion.div
        className="fixed top-48 w-screen"
        style={{
          z,
          y,
          transformOrigin: `center top`,
          transformStyle: "preserve-3d",
          transformPerspective: "2000px",
          rotateX: 70,
          transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1)`,
        }}
      >
        <TimelineGraphic
          segmentsInfo={allSegments}
          progress={easedScrollProgress}
        />
        {allSegments.map(({ head, tail, waypoints }, index) => (
          <motion.div
            key={index}
            className="absolute left-0 top-0 z-20 "
            style={{
              rotateX: -70,
              transformOrigin: "center bottom",
              height: 100,
              x: head.x * timelineScaleFactor,
              y: head.y * timelineScaleFactor - 100,
            }}
          >
            <Waypoint
              inverted={head.x > SVGWidth * 0.7}
              waypoint={waypoints[0]}
              isActive={currentWaypoint === index}
              index={index}
              totalWaypointsCount={allSegments.length + 1}
              progress={easedScrollProgress}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Timeline;
