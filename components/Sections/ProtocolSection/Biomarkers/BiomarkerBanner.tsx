import React, { MutableRefObject, useRef } from "react";
import ProtocolSectionDesktop from "../desktop/ProtocolSectionDesktop";
import { PROTOCOLS } from "../Protocols";
import { breakpoints, useBreakpoint } from "@/hooks/useBreakpoints";
import ProtocolSectionMobile from "../mobile/ProtocolSectionMobile";
import Scrim from "@/components/Scrim/Scrim";
import LineElement from "@/components/LineElement/LineElement";
import CTAButton from "@/components/Button/CTAButton";
import { motion, useInView } from "framer-motion";
import { BIOMARKERS } from "./Biomarkers";
import { list } from "postcss";
import { AnimationConfig } from "@/components/AnimationConfig";

type Props = {
  isVisible?: boolean;
};

const colors = [
  "#FFD6A5",
  "#26936B",
  "#A36200",
  "#B90090",
  "#FC5F2B",
  "#3F3F46",
  "#FF68DE",
  "#F7861E",
];

const BiomarkerBanner = ({ isVisible = true }: Props) => {
  const shuffledList = BIOMARKERS.sort(() => Math.random() - 0.5);
  const list1 = shuffledList.slice(0, 6);
  const list2 = shuffledList.slice(6, shuffledList.length);
  const listCombined = [list1, list2];
  const inViewDelay = 0.6;

  return (
    <div className="flex-column relative flex flex-col gap-2 py-16">
      {listCombined.map((list, index) => {
        return (
          <motion.div
            key={index}
            className="relative flex flex-row justify-center gap-6"
            initial={{
              x: index === 0 ? "200%" : "-200%", // Modify the initial x value based on the index
            }}
            animate={{
              x: isVisible ? "0%" : index === 0 ? "200%" : "-200%", // Modify the animate x value based on the index
              transition: {
                duration: AnimationConfig.VERY_SLOW,
                ease: AnimationConfig.EASING_IN_OUT,
                delay: isVisible ? inViewDelay : 0,
              },
            }}
          >
            {list.map((item, innerIndex) => {
              const randomColor =
                innerIndex % 2 === 0
                  ? colors[Math.floor(Math.random() * colors.length)]
                  : "#000000";
              return (
                <div
                  key={innerIndex}
                  className="font-mono-xl relative left-0 top-0 h-full w-full whitespace-nowrap bg-gradient-conic"
                  style={{
                    color: randomColor,
                  }}
                >
                  {item}
                </div>
              );
            })}
          </motion.div>
        );
      })}
    </div>
  );
};

export default BiomarkerBanner;
