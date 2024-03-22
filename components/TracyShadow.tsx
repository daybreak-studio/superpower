import { motion } from "framer-motion";
import React from "react";
import { AnimationConfig } from "./AnimationConfig";

type Props = {
  children: React.ReactNode;
  color: string;
  elevation?: number;
};

const TracyShadow = ({ children, color, elevation = 0 }: Props) => {
  return (
    <div className="relative">
      {children}
      <div className="absolute -bottom-0 flex w-full">
        <motion.div
          className="-z-10 mx-auto h-16 w-[75%] blur-3xl"
          style={{ backgroundColor: color }}
          animate={{
            y: 100 * (elevation / 1) - 100,
            scale: elevation,
            transition: {
              ease: AnimationConfig.EASING,
              duration: AnimationConfig.SLOW,
            },
          }}
        />
      </div>
    </div>
  );
};

export default TracyShadow;
