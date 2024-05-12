import React, { useState } from "react";
import { MotionValue, motion } from "framer-motion";

type Props = {
  progress: MotionValue<number>;
};

const ProgressBar = ({ progress }: Props) => {
  return (
    <div className="h-full max-h-[200px] w-0.5 bg-[rgba(255,255,255,.2)]">
      <motion.div
        className="bg-primary h-full origin-top bg-[rgba(255,255,255,.4)]"
        style={{
          scaleY: progress,
        }}
      />
    </div>
  );
};

export default ProgressBar;
