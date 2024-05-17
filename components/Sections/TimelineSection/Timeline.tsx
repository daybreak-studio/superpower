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
import Waypoint, { ArrowMarkerSVG } from "./Waypoint";
import { breakpoints, useBreakpoint } from "@/hooks/useBreakpoints";
import { usePerformanceProfile } from "@/hooks/usePerformanceProfile";
import { AnimationConfig } from "@/components/AnimationConfig";
import { useMotionValueSwitch } from "@/hooks/useMotionValueSwitch";
import WaypointInfoMobile from "./WaypointInfoMobile";

type Props = {
  timelineProgress: MotionValue<number>;
  transitionProgress: MotionValue<number>;
};

const Timeline = ({ timelineProgress, transitionProgress }: Props) => {
  const timelineContainerRef = useRef() as RefObject<HTMLDivElement>;
  const windowDim = useWindowDimension();
  const isDesktop = useBreakpoint(breakpoints.sm);

  const allSegments = useMemo(() => segments.map((s) => getSegmentInfo(s)), []);
  const allWaypointPositions = useMemo(() => {
    return allSegments.map((info) => {
      return info.head;
    });
  }, [allSegments]);

  const movementXPoints = useMemo(() => {
    return allWaypointPositions.map(({ x }) => -x * 0.25);
  }, [allWaypointPositions]);

  const movementTimlineProgres = useMemo(() => {
    return allWaypointPositions.map((_, index) => {
      return index / (allWaypointPositions.length - 1);
    });
  }, [allWaypointPositions]);

  const movementZPoints = useMemo(() => {
    return allWaypointPositions.map(({ y }) => {
      const speed = isDesktop ? 0.0008 : 0.0009;

      return -y * (windowDim.width * speed) + -700;
    });
  }, [allWaypointPositions, windowDim.width, isDesktop]);
  const movementYPoints = useMemo(() => {
    const offsetFactor = isDesktop ? 0 : 0;
    const speed = isDesktop ? 0.35 : 0.7;

    return movementZPoints.map((z) => z * speed + 800 - offsetFactor);
  }, [movementZPoints, isDesktop]);

  const [currentWaypoint, setCurrentWaypoint] = useState(0);

  const { isLowPerformance } = usePerformanceProfile();

  const progress = timelineProgress;
  // const progress = scrollYProgress;

  useMotionValueEvent(progress, "change", (latest) => {
    const segmentProgressLength = 1 / allSegments.length;
    const waypoint = Math.floor(latest / segmentProgressLength);
    setCurrentWaypoint(waypoint);
  });

  const cameraRotation = isDesktop ? 70 : 60;

  const SVGWidth = 1406;
  const minSVGWidth = 800;

  // scale factor x would be 1 when browser width = svg width
  const timelineScaleFactor =
    windowDim.width < minSVGWidth
      ? minSVGWidth / SVGWidth
      : windowDim.width / SVGWidth;

  // handle movement Z of the graph
  const movementZ = useTransform(
    progress,
    movementTimlineProgres,
    movementZPoints,
  );

  const transitionZoomOffset = useTransform(
    transitionProgress,
    [0, 0.5, 0.5, 1],
    [windowDim.height * 3, 0, 0, -windowDim.height * 6],
    { ease: cubicBezier(0.7, 0, 0.84, 0) },
  );

  const z = useTransform(
    [movementZ, transitionZoomOffset],
    ([movementZ, transitionZoomOffset]: any) => {
      return movementZ + transitionZoomOffset;
    },
  );

  // handle movement Y of the graph
  const transitionVerticalOffset = useTransform(
    transitionProgress,
    [0, 0.5, 0.5, 1],
    [0, 0, 0, windowDim.height * 2],
    { ease: cubicBezier(0.7, 0, 0.84, 0) },
  );

  const movementY = useTransform(
    progress,
    movementTimlineProgres,
    movementYPoints,
  );

  const y = useTransform(
    [movementY, transitionVerticalOffset],
    ([movmentY, transitionVerticalOffset]: any) => {
      if (isDesktop) {
        return movmentY + transitionVerticalOffset;
      }
      return movmentY + transitionVerticalOffset;
    },
  );

  // handle movement X of the graph
  const movementX = useTransform(
    progress,
    movementTimlineProgres,
    movementXPoints,
  );
  // const movementX = useTransform(
  //   progress,
  //   [0, 0.25, 0.6, 0.8, 1],
  //   [0, -windowDim.width * 0.8, 0, -windowDim.width * 0.5, 0],
  // );
  const x = useTransform(movementX, (latest) => {
    if (isDesktop) {
      return 0;
    }
    return latest;
  });

  const isTimelineActive = useMotionValueSwitch(
    timelineProgress,
    (latest) => latest > 0 && latest < 1,
  );

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
          transition: `transform .8s cubic-bezier(0.16, 1, 0.3, 1)`,
          willChange: "transform",
        }}
      >
        {/* <motion.div
          className="absolute left-0 top-0 h-0 w-0"
          style={{
            rotateX: -cameraRotation,
          }}
        >
          <div className="relative z-30 h-[100vw] w-[1px] bg-white" />
        </motion.div> */}
        <TimelineGraphic
          segmentsInfo={allSegments}
          progress={progress}
          graphScale={timelineScaleFactor}
          isLowPerformanceMode={isLowPerformance}
          cameraRotation={cameraRotation}
        />

        {/* graph-anchored waypoints */}
        {allSegments.map(({ head, tail, waypoints }, index) => {
          const offsetHeight = isDesktop ? 180 : 70;
          return (
            <>
              <motion.div
                key={index}
                className="absolute left-0 top-0 z-20"
                style={{
                  rotateX: -cameraRotation,
                  transformOrigin: "center bottom",
                  height: offsetHeight,
                  x: head.x * timelineScaleFactor,
                  y: head.y * timelineScaleFactor - offsetHeight,
                }}
              >
                <Waypoint
                  // inverted={head.x > SVGWidth * 0.5}
                  waypoint={waypoints[0]}
                  isActive={currentWaypoint === index}
                  index={index}
                  totalWaypointsCount={allSegments.length + 1}
                  progress={progress}
                  isLowPerformanceMode={isLowPerformance}
                  withDetails={isDesktop}
                  offsetHeight={offsetHeight}
                />
              </motion.div>
            </>
          );
        })}
      </motion.div>

      {/* fixed mobile waypoint info */}
      {!isDesktop && (
        <motion.div
          animate={{
            opacity: isTimelineActive ? 1 : 0,
          }}
          className="pointer-events-none fixed bottom-0 left-0 right-0 z-50 h-80 bg-gradient-to-t from-black to-transparent text-white"
        >
          {allSegments.map(({ head, tail, waypoints }, index) => {
            return (
              <WaypointInfoMobile
                key={index}
                isActive={currentWaypoint === index}
                waypoint={waypoints[0]}
              />
            );
          })}
        </motion.div>
      )}
    </div>
  );
};

export default Timeline;
