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
import { breakpoints, useBreakpoint } from "@/hooks/useBreakpoints";
import { usePerformanceProfile } from "@/hooks/usePerformanceProfile";

type Props = {
  timelineProgress: MotionValue<number>;
  transitionProgress: MotionValue<number>;
};

const Timeline = ({ timelineProgress, transitionProgress }: Props) => {
  const timelineContainerRef = useRef() as RefObject<HTMLDivElement>;
  const windowDim = useWindowDimension();

  const allSegments = useMemo(() => segments.map((s) => getSegmentInfo(s)), []);
  const [currentWaypoint, setCurrentWaypoint] = useState(0);

  const { isLowPerformance } = usePerformanceProfile();

  const progress = timelineProgress;
  // const progress = scrollYProgress;

  useMotionValueEvent(progress, "change", (latest) => {
    const segmentProgressLength = 1 / allSegments.length;
    const waypoint = Math.floor(latest / segmentProgressLength);
    setCurrentWaypoint(waypoint);
  });

  const isDesktop = useBreakpoint(breakpoints.sm);

  const cameraRotation = isDesktop ? 70 : 60;

  const SVGWidth = 1406;
  const minSVGWidth = 800;

  // scale factor x would be 1 when browser width = svg width
  const timelineScaleFactor =
    windowDim.width < minSVGWidth
      ? minSVGWidth / SVGWidth
      : windowDim.width / SVGWidth;

  const SVGHeightScaled = 4639 * timelineScaleFactor;

  // handle movement Z of the graph
  const movementZ = useTransform(
    progress,
    [0, 1],
    [isDesktop ? -800 : -500, isDesktop ? windowDim.width * -3.3 : -2000],
  );

  const z = useTransform(
    [movementZ, transitionProgress],
    ([movementZ, transitionProgress]: any) => {
      return movementZ + (1 - transitionProgress) * windowDim.height * 3;
    },
  );

  // handle movement Y of the graph
  const movementY = useTransform(
    progress,
    [0, 1],
    [
      windowDim.width * 0.4,
      isDesktop ? windowDim.width * -0.7 : windowDim.width * -1.5,
    ],
  );
  const y = useTransform(movementY, (latest) => {
    if (isDesktop) {
      return latest;
    }
    return latest;
  });

  // handle movement X of the graph
  const movementX = useTransform(
    progress,
    [0, 0.25, 0.6, 0.8, 1],
    [0, -windowDim.width * 0.8, 0, -windowDim.width * 0.5, 0],
  );
  const x = useTransform(movementX, (latest) => {
    if (isDesktop) {
      return 0;
    }
    return latest;
  });

  return (
    <div
      // mt-40vh is for the timing between scroll text end and graph scroll begin
      className="mt-[800px] flex h-[7000px] w-full overflow-hidden bg-black"
      ref={timelineContainerRef}
    >
      <motion.div
        className="fixed top-[30vh] w-screen sm:top-[20vh] "
        style={{
          minWidth: minSVGWidth,
          z,
          x,
          y,
          scale: isDesktop ? 1 : 0.9,
          transformOrigin: `center top`,
          transformStyle: "preserve-3d",
          transformPerspective: "2000px",
          rotateX: cameraRotation,
          transition: `transform 1s cubic-bezier(0.16, 1, 0.3, 1)`,
          // willChange: "transform",
        }}
      >
        <TimelineGraphic
          segmentsInfo={allSegments}
          progress={progress}
          graphScale={timelineScaleFactor}
          isLowPerformanceMode={isLowPerformance}
        />
        {allSegments.map(({ head, tail, waypoints }, index) => (
          <motion.div
            key={index}
            className="absolute left-0 top-0  z-20"
            // animate={{
            //   opacity: isActive ? 1 : 0,
            //   transition: { duration: 1 },
            // }}
            style={{
              rotateX: -cameraRotation,
              transformOrigin: "center bottom",
              height: 100,
              x: head.x * timelineScaleFactor,
              y: head.y * timelineScaleFactor - 100,
            }}
          >
            <Waypoint
              inverted={head.x > SVGWidth * 0.5}
              waypoint={waypoints[0]}
              isActive={currentWaypoint === index}
              index={index}
              totalWaypointsCount={allSegments.length + 1}
              progress={progress}
              isLowPerformanceMode={isLowPerformance}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Timeline;
