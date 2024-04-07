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
};

const TimelineGraphic = ({ progress, segmentsInfo }: Props) => {
  return (
    <motion.svg
      viewBox="0 0 1406 4639"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={"overflow-visible"}
    >
      <FullJourneyCurve />
      {segmentsInfo.map((info, index) => (
        <JourneySegment
          key={index}
          segmentInfo={info}
          progress={progress}
          segmentIndex={index}
          segmentCount={segments.length}
        />
      ))}
    </motion.svg>
  );
};

type JourneySegmentProps = {
  segmentInfo: TimlineSegmentInfo;
  progress: MotionValue<number>;
  segmentIndex: number;
  segmentCount: number;
};

const JourneySegment = ({
  segmentInfo,
  progress,
  segmentIndex,
  segmentCount,
}: JourneySegmentProps) => {
  const { head, tail, length } = segmentInfo;

  const [shouldRenderGlow, setShouldRenderGlow] = useState(false);

  const segmentBeginProgress = segmentIndex / segmentCount;
  const segmentEndProgress = (segmentIndex + 1) / segmentCount;
  const segmentProgress = useTransform(
    progress,
    [segmentBeginProgress, segmentEndProgress],
    [1, 0],
    { clamp: false },
  );
  useMotionValueEvent(segmentProgress, "change", (latest) => {
    if (latest < 1 && latest > -3) {
      setShouldRenderGlow(true);
      return;
    }
    setShouldRenderGlow(false);
  });

  const strokeDashoffset = useTransform(segmentProgress, [0, 1], [0, length]);

  return (
    <>
      <motion.path
        d={segmentInfo.path}
        stroke="#FE8000"
        strokeWidth="5"
        style={{
          strokeDasharray: length,
          strokeDashoffset,
          transition: `stroke-dashoffset .2s cubic-bezier(0.16, 1, 0.3, 1)`,
        }}
      />
      {shouldRenderGlow && (
        <motion.path
          d={segmentInfo.path}
          stroke="#FE8000"
          strokeWidth="16"
          style={{
            filter: `blur(64px)`,
            strokeDasharray: length,
            strokeDashoffset,
            transition: `stroke-dashoffset .2s cubic-bezier(0.16, 1, 0.3, 1)`,
          }}
        />
      )}
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
