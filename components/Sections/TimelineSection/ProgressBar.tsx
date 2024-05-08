import React from "react";
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

type Props = {
  progress: MotionValue<number>;
};

const ProgressBar = ({ progress }: Props) => {
  return (
    <div className="h-0.5 w-full max-w-[300px] bg-slate-500">
      <motion.div
        className="bg-primary h-full origin-left bg-white"
        style={{
          scaleX: progress,
        }}
      />
    </div>
  );
};

export default ProgressBar;
