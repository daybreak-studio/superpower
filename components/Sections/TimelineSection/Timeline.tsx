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

type Props = {
  isActive: boolean;
};

const Timeline = ({ isActive }: Props) => {
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

  const cameraRotation = 70;

  const aspectRatio = windowDim.width / windowDim.height;
  const heightOffsetFactor = windowDim.height * aspectRatio * 0.8;

  const cameraZOffset = useTransform(
    progress,
    [0, 1],
    [-800, windowDim.width * -3 - heightOffsetFactor * 0.8],
  );

  const z = useTransform(cameraZOffset, (latest) => {
    if (!isActive) {
      return windowDim.height;
    }
    return latest;
  });

  const y = useTransform(
    progress,
    [0, 1],
    [windowDim.width * 0.4, windowDim.width * -0.7],
  );
  // const x = useTransform(
  //   progress,
  //   [0, 0.25, 0.6, 0.8, 1],
  //   [0, -800, 0, -600, 0],
  // );
  // const scale = useTransform(easedScrollProgress, [0, 1], [1, 2]);

  const SVGWidth = 1406;
  // scale factor x would be 1 when browser width = svg width
  const timelineScaleFactor = windowDim.width / SVGWidth;

  return (
    <div
      // mt 48 is for the timing between scroll text end and graph scroll begin
      className="mt-96 flex h-[7000px] w-full overflow-hidden bg-black"
      ref={timelineContainerRef}
    >
      <motion.div
        className="fixed top-[20vh] w-screen"
        style={{
          z,
          y,
          // x,
          transformOrigin: `center top`,
          transformStyle: "preserve-3d",
          transformPerspective: "2000px",
          rotateX: cameraRotation,
          transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1)`,
        }}
      >
        <TimelineGraphic segmentsInfo={allSegments} progress={progress} />
        {allSegments.map(({ head, tail, waypoints }, index) => (
          <motion.div
            key={index}
            className="absolute left-0 top-0 z-20 "
            style={{
              rotateX: -cameraRotation,
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
              progress={progress}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Timeline;
