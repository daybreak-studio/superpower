import React, { useMemo } from "react";
import { useScrollVideoInfo } from "./ScrollVideo";
import { timeStringToMilliseconds } from "./timeStringToMilliseconds";
import { useTransform } from "framer-motion";
import ProgressProvider from "../ProgressProvider/ProgressProvider";

type TimecodeOrProgressUnit = string | number;

type Props = {
  children: React.ReactNode;
  enter: TimecodeOrProgressUnit;
  exit: TimecodeOrProgressUnit;
};

const parseMillisec = (t: TimecodeOrProgressUnit, duration: number) => {
  if (typeof t === "string") {
    const result = timeStringToMilliseconds(t);
    if (!result) throw "Cannot convert to milliseconds from time string";
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
    () => parseMillisec(enter, duration),
    [enter, duration],
  );
  const endAtMillisec = useMemo(
    () => parseMillisec(exit, duration),
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
