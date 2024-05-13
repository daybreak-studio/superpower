import {
  MotionValue,
  motion,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import React, {
  MutableRefObject,
  RefObject,
  useMemo,
  useRef,
  useState,
} from "react";
import { segments } from "./TimelineData";
import { TimlineSegment, TimlineSegmentInfo, getSegmentInfo } from "./Segments";
import { isSafari } from "react-device-detect";

type Props = {
  progress: MotionValue<number>;
  segmentsInfo: TimlineSegmentInfo[];
  graphScale: number;
  isLowPerformanceMode: boolean;
  cameraRotation: number;
};

const TimelineGraphic = ({
  progress,
  segmentsInfo,
  graphScale,
  isLowPerformanceMode,
  cameraRotation,
}: Props) => {
  return (
    // the whole graphic is 1406x4639
    <>
      <FullJourneyCurve />
      {segmentsInfo.map((info, index) => (
        <JourneySegment
          key={index}
          segmentInfo={info}
          progress={progress}
          segmentIndex={index}
          segmentCount={segments.length}
          graphScale={graphScale}
          isLowPerformanceMode={isLowPerformanceMode}
          cameraRotation={cameraRotation}
        />
      ))}
    </>
  );
};

type JourneySegmentProps = {
  segmentInfo: TimlineSegmentInfo;
  progress: MotionValue<number>;
  segmentIndex: number;
  segmentCount: number;
  graphScale: number;
  isLowPerformanceMode: boolean;
  cameraRotation: number;
};

const JourneySegment = ({
  segmentInfo,
  progress,
  segmentIndex,
  segmentCount,
  graphScale,
  isLowPerformanceMode,
  cameraRotation,
}: JourneySegmentProps) => {
  const { head, tail, length } = segmentInfo;

  const [shouldRenderGlow, setShouldRenderGlow] = useState(false);
  const [shouldRenderSegment, setShouldRenderSegement] = useState(false);

  const segmentBeginProgress = segmentIndex / segmentCount;
  const segmentEndProgress = (segmentIndex + 1) / segmentCount;
  const segmentProgress = useTransform(
    progress,
    [segmentBeginProgress, segmentEndProgress],
    [1, 0],
    { clamp: false },
  );
  useMotionValueEvent(segmentProgress, "change", (latest) => {
    if (latest < 8 && (latest > -8 || (isLowPerformanceMode && latest > -4))) {
      setShouldRenderSegement(true);
    } else {
      setShouldRenderSegement(false);
    }

    if (latest < 2 && latest > -3 && !isLowPerformanceMode) {
      setShouldRenderGlow(true);
    } else {
      setShouldRenderGlow(false);
    }
  });

  const strokeDashoffset = useTransform(segmentProgress, [0, 1], [0, length]);

  const segmentWidth = useMemo(
    () => Math.abs(segmentInfo.head.x - segmentInfo.tail.x),
    [segmentInfo],
  );
  const segmentHeight = useMemo(
    () => Math.abs(segmentInfo.head.y - segmentInfo.tail.y),
    [segmentInfo],
  );

  const isLastSegment = segmentIndex === segmentCount - 1;
  const gradientBlack = (
    <linearGradient
      id="linear-gradient-black"
      x1="0%"
      y1="0%"
      x2="100%"
      y2="0%"
    >
      <stop offset="0%" stopColor="#000" />
      <stop offset="100%" stopColor="#FFF" />
    </linearGradient>
  );
  const gradientVermillion = (
    <linearGradient
      id="linear-gradient-vermillion"
      x1="0%"
      y1="0%"
      x2="100%"
      y2="0%"
    >
      <stop offset="0%" stopColor="#000" />
      <stop offset="100%" stopColor="#FE8000" />
    </linearGradient>
  );

  return (
    <>
      <motion.div
        className="absolute left-0 top-0 h-0 w-0"
        style={{
          left: head.x * graphScale,
          top: head.y * graphScale,
          rotateX: -cameraRotation,
          display: shouldRenderSegment ? "block" : "hidden",
        }}
      >
        <div className="relative -z-10 h-[30vw] w-[2px] bg-gradient-to-b from-white to-transparent opacity-30" />
      </motion.div>
      <svg
        viewBox={`0 0 ${segmentWidth} ${segmentHeight}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute overflow-visible"
        style={{
          visibility: shouldRenderSegment ? "visible" : "hidden",
          width: segmentWidth * graphScale,
          height: segmentHeight * graphScale,
          transform: `translate3d(${head.x * graphScale}px,${head.y * graphScale}px,0px)`,
        }}
      >
        {isLastSegment && gradientBlack}
        {isLastSegment && gradientVermillion}
        {/* the white background */}
        <motion.path
          d={segmentInfo.path}
          stroke={isLastSegment ? "url(#linear-gradient-black)" : "#FFF"}
          strokeWidth="5"
          style={{
            x: -segmentInfo.head.x,
            y: -segmentInfo.head.y,
          }}
        />
        <motion.path
          d={segmentInfo.path}
          stroke={
            isLastSegment ? "url(#linear-gradient-vermillion)" : "#FE8000"
          }
          strokeWidth="5"
          style={{
            strokeDasharray: length,
            strokeDashoffset,
            x: -segmentInfo.head.x,
            y: -segmentInfo.head.y,
            // transition: `stroke-dashoffset .2s cubic-bezier(0.16, 1, 0.3, 1)`,
          }}
        />

        {shouldRenderGlow && !isLowPerformanceMode && !isSafari && (
          <motion.path
            d={segmentInfo.path}
            stroke={
              isLastSegment ? "url(#linear-gradient-vermillion)" : "#FE8000"
            }
            filter={"url(#blurMe)"}
            strokeWidth="24"
            style={{
              // visibility: shouldRenderGlow ? "visible" : "hidden",
              filter: `blur(48px)`,
              x: -segmentInfo.head.x,
              y: -segmentInfo.head.y,
              strokeDasharray: length,
              strokeDashoffset,
              // transition: `stroke-dashoffset .2s cubic-bezier(0.16, 1, 0.3, 1)`,
            }}
          />
        )}
      </svg>
    </>
  );
};

const FullJourneyCurve = () => {
  return (
    <path
      d="M541.998 4639C541.998 3994.33 1194.5 4116.5 1194.5 3660.98C1194.5 3059.35 204.498 3003.29 204.498 2290.54C204.498 1518.73 1404 1342.55 1404 790.972C1404 272 713.5 2 0 2"
      stroke="#FFF"
      strokeWidth="5"
    />
  );
};
export default TimelineGraphic;
