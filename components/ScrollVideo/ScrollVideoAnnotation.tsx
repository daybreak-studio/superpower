import React, { useMemo } from "react";
import { useScrollVideoInfo } from "./ScrollVideo";
import { timeStringToSeconds } from "./timeStringToSeconds";
import { useTransform } from "framer-motion";
import ProgressProvider from "../ProgressProvider/ProgressProvider";

type TimecodeOrProgressUnit = string | number;

type Props = {
  children: React.ReactNode;
  enter: TimecodeOrProgressUnit;
  exit: TimecodeOrProgressUnit;
};

const parseSeconds = (t: TimecodeOrProgressUnit, duration: number) => {
  if (typeof t === "string") {
    const result = timeStringToSeconds(t);
    if (result === undefined || result === null)
      throw "Cannot convert to seconds from time string";

    return result;
  }
  if (typeof t === "number") {
    return t * duration;
  }
  throw "Time format does not match either timestring(hh:mm:ss) or progress value(0-1)";
};

const ScrollVideoAnnotation = ({ children, enter, exit }: Props) => {
  const { currentTime, duration } = useScrollVideoInfo();
  const beginAtMillisec = useMemo(
    () => parseSeconds(enter, duration),
    [enter, duration],
  );

  const endAtMillisec = useMemo(
    () => parseSeconds(exit, duration),
    [exit, duration],
  );

  const progress = useTransform(
    currentTime,
    [beginAtMillisec, endAtMillisec],
    [0, 1],
  );

  return (
    <div className="fixed inset-0 cursor-none">
      <ProgressProvider progress={progress}>{children}</ProgressProvider>
    </div>
  );
};

export default ScrollVideoAnnotation;
