"use client";

import React, { MutableRefObject, useMemo, useRef } from "react";
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
import { useRandom } from "@/hooks/useRandom";
import { SimplexNoise } from "three/examples/jsm/math/SimplexNoise.js";

type Props = {
  isVisible?: boolean;
};

const colors = ["#F7791E", "#6268EB", "#35BE95", "#F71E1E"];

const BiomarkerBanner = ({ isVisible = true }: Props) => {
  const random = useRandom([isVisible]);
  const shuffledList = useMemo(
    () => (random == 0 ? BIOMARKERS : BIOMARKERS.sort(() => random - 0.5)),
    [random],
  );
  const list1 = useMemo(() => shuffledList.slice(0, 6), [shuffledList]);
  const list2 = useMemo(
    () => shuffledList.slice(6, shuffledList.length),
    [shuffledList],
  );
  const listCombined = [list1, list2];
  const inViewDelay = 0.6;

  const simplex = useMemo(() => new SimplexNoise(), []);

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
                duration: 1,
                ease: AnimationConfig.EASING_IN_OUT,
                delay: isVisible ? inViewDelay : 0,
              },
            }}
          >
            {list.map((item, innerIndex) => {
              const randomValue = Math.floor(
                Math.abs(
                  simplex.noise(random * index * innerIndex, 0) * colors.length,
                ),
              );

              const randomColor =
                innerIndex % 2 === 0 ? colors[randomValue] : "#000000";

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
