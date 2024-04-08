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
import { Command, parseSVG } from "svg-path-parser";
import { segments } from "./TimelineData";
import { TimlineSegment, TimlineSegmentInfo, getSegmentInfo } from "./Segments";

type Props = {
  progress: MotionValue<number>;
  segmentsInfo: TimlineSegmentInfo[];
  graphScale: number;
};

const TimelineGraphic = ({ progress, segmentsInfo, graphScale }: Props) => {
  return (
    // the whole graphic is 1406x4639
    <div className={"overflow-visible"}>
      {/* <FullJourneyCurve /> */}
      {segmentsInfo.map((info, index) => (
        <JourneySegment
          key={index}
          segmentInfo={info}
          progress={progress}
          segmentIndex={index}
          segmentCount={segments.length}
          graphScale={graphScale}
        />
      ))}
    </div>
  );
};

type JourneySegmentProps = {
  segmentInfo: TimlineSegmentInfo;
  progress: MotionValue<number>;
  segmentIndex: number;
  segmentCount: number;
  graphScale: number;
};

const JourneySegment = ({
  segmentInfo,
  progress,
  segmentIndex,
  segmentCount,
  graphScale,
}: JourneySegmentProps) => {
  const { head, tail, length } = segmentInfo;

  const [shouldRenderGlow, setShouldRenderGlow] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  const segmentBeginProgress = segmentIndex / segmentCount;
  const segmentEndProgress = (segmentIndex + 1) / segmentCount;
  const segmentProgress = useTransform(
    progress,
    [segmentBeginProgress, segmentEndProgress],
    [1, 0],
    { clamp: false },
  );
  useMotionValueEvent(segmentProgress, "change", (latest) => {
    if (latest < 3 && latest > -4) {
      setShouldRender(true);
    } else {
      setShouldRender(false);
    }

    if (latest < 1 && latest > -2) {
      setShouldRenderGlow(true);
      return;
    }
    setShouldRenderGlow(false);
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

  return (
    <svg
      viewBox={`0 0 ${segmentWidth} ${segmentHeight}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute overflow-visible"
      style={{
        visibility: shouldRender ? "visible" : "hidden",
        width: segmentWidth * graphScale,
        height: segmentHeight * graphScale,
        left: head.x * graphScale,
        top: head.y * graphScale,
      }}
    >
      {/* the white background */}
      <motion.path
        d={segmentInfo.path}
        stroke="#FFF"
        strokeWidth="5"
        style={{
          x: -segmentInfo.head.x,
          y: -segmentInfo.head.y,
        }}
      />
      <motion.path
        d={segmentInfo.path}
        stroke="#FE8000"
        strokeWidth="5"
        style={{
          strokeDasharray: length,
          strokeDashoffset,
          x: -segmentInfo.head.x,
          y: -segmentInfo.head.y,
          transition: `stroke-dashoffset .2s cubic-bezier(0.16, 1, 0.3, 1)`,
        }}
      />

      <motion.path
        d={segmentInfo.path}
        stroke="#FE8000"
        strokeWidth="16"
        style={{
          visibility: shouldRenderGlow ? "visible" : "hidden",
          filter: `blur(64px)`,
          strokeDasharray: length,
          strokeDashoffset,
          transition: `stroke-dashoffset .2s cubic-bezier(0.16, 1, 0.3, 1)`,
        }}
      />
    </svg>
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
