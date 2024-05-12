import { motion } from "framer-motion";
import React from "react";
import { Waypoint } from "./Segments";
import { AnimationConfig } from "@/components/AnimationConfig";
import { ArrowMarkerSVG } from "./Waypoint";

type Props = {
  isActive: boolean;
  waypoint: Waypoint;
};

const AgeInfoMobile = ({ isActive, waypoint }: Props) => {
  return (
    <motion.div
      className="gap-auto absolute bottom-0 px-8 py-8"
      style={{
        opacity: isActive ? 1 : 0,
      }}
    >
      <div className="flex flex-col">
        <span className="font-mono-xs text-vermilion-700">{waypoint.age}</span>
        <span className="mb-1">{waypoint.action}</span>
      </div>
      <div className="flex flex-col gap-1">
        {waypoint.details.map((detail, index) => (
          <motion.div
            animate={{
              opacity: isActive ? 1 : 0,
              x: isActive ? 0 : -10,
              transition: {
                duration: isActive
                  ? AnimationConfig.SLOW
                  : AnimationConfig.FAST,
                ease: AnimationConfig.EASING,
                delay: isActive ? 0.1 + AnimationConfig.VERY_FAST * index : 0,
              },
            }}
            key={index}
            className="font-sans-md flex items-center gap-5 leading-none"
          >
            <ArrowMarkerSVG />
            {detail}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AgeInfoMobile;
