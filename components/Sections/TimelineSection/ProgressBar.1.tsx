import React, { useState } from "react";
import { motion, useMotionValueEvent } from "framer-motion";
import { Props } from "./ProgressBar";

export const ProgressBar = ({ progress }: Props) => {
  const [age, setAge] = useState("0");

  useMotionValueEvent(progress, () => {
    setAge();
  });

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
