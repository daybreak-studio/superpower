"use client";

import React from "react";
import { motion } from "framer-motion";
import { AnimationConfig } from "../../AnimationConfig";
import LineElement from "@/components/LineElement/LineElement";
import Image from "next-image-export-optimizer";

type Props = {
  mobileSrc: string;
  desktopSrc: string;
  index: string;
  header: string;
  description: string;
  isExpanded: boolean;
  onSelect: () => void;
};

const BaselineSlideVerticalItem = ({
  mobileSrc,
  desktopSrc,
  isExpanded,
  onSelect,
  header,
  description,
  index,
}: Props) => {
  return (
    <>
      <motion.div
        className="relative"
        animate={{ height: isExpanded ? (index == "4" ? 112 : 92) : 40 }}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <motion.div
            className="font-sans-xs h-0 text-nowrap xl:font-sans-sm xl:min-w-56"
            animate={{
              fontSize: isExpanded ? "32px" : "18px",
              color: isExpanded ? "#18181B" : "#696969",
              transition: {
                ease: AnimationConfig.EASING,
                duration: AnimationConfig.SLOW,
              },
            }}
          >
            {header}
          </motion.div>
          <motion.div
            className="font-sans-sm mt-12 h-0 max-w-[700px] text-[#696969] xl:font-sans-sm xl:min-w-56"
            animate={{
              opacity: isExpanded ? 1 : 0,
              y: isExpanded ? 0 : -10,
              transition: {
                delay: isExpanded ? AnimationConfig.FAST : 0,
                duration: isExpanded
                  ? AnimationConfig.SLOW
                  : AnimationConfig.FAST,
                ease: AnimationConfig.EASING,
              },
            }}
          >
            {description}
          </motion.div>
        </div>
      </motion.div>
      <button
        onPointerEnter={() => onSelect()}
        className="relative mt-2 flex flex-col items-center gap-6"
      >
        {/* top text */}
        <div className="max-w-[600px]">
          <div className="flex flex-row items-center">
            {/* main expanding image */}
            <motion.div
              className="relative z-0 flex flex-col items-center justify-center overflow-hidden rounded-[20px]"
              initial={{
                width: 340,
                height: 160,
              }}
              animate={{
                width: isExpanded ? "auto" : 340,
                height: isExpanded ? "auto" : 160,
                transition: {
                  ease: AnimationConfig.EASING,
                  duration: AnimationConfig.SLOW,
                },
              }}
            >
              <motion.div className="h-full w-full">
                <Image
                  className="absolute left-0 top-0 -z-10 h-full w-full object-cover"
                  src={desktopSrc}
                  width={1833}
                  height={905}
                  alt={""}
                />
              </motion.div>
              <motion.div
                className="h-full max-w-[40vw]"
                animate={{
                  opacity: isExpanded ? 1 : 0,
                }}
              >
                <Image src={desktopSrc} width={830} height={362} alt={""} />
              </motion.div>
            </motion.div>
            {/* left decorative element */}
            <motion.div
              className="absolute flex flex-row items-center gap-2 px-4"
              animate={{
                left: isExpanded ? -100 : -100,
                transition: {
                  ease: AnimationConfig.EASING,
                  duration: AnimationConfig.SLOW,
                },
              }}
            >
              <div
                className="font-mono-xs flex h-[26px] items-center justify-center rounded-lg border border-zinc-900 p-2"
                style={{
                  borderColor: isExpanded ? "#FC5F2B" : "#18181B",
                  color: isExpanded ? "#FC5F2B" : "#18181B",
                }}
              >
                {index}
              </div>
              <div
                className="w-6 border-t border-zinc-500"
                style={{ borderColor: isExpanded ? "#FC5F2B" : "#18181B" }}
              />
            </motion.div>
            {/* right decorative element */}
            <motion.div
              className="absolute flex flex-row items-center gap-2 px-4"
              animate={{
                right: isExpanded ? -100 : -100,
                transition: {
                  ease: AnimationConfig.EASING,
                  duration: AnimationConfig.SLOW,
                },
              }}
            >
              <div
                className="w-6 border-t border-zinc-500"
                style={{ borderColor: isExpanded ? "#FC5F2B" : "#18181B" }}
              />
              <div
                className="font-mono-xs flex h-[26px] items-center justify-center rounded-lg border border-zinc-900 p-2"
                style={{
                  borderColor: isExpanded ? "#FC5F2B" : "#18181B",
                  color: isExpanded ? "#FC5F2B" : "#18181B",
                }}
              >
                {index}
              </div>
            </motion.div>
          </div>
          <div style={{ display: index == "4" ? "none" : "block" }}>
            <LineElement length={16} color={"#bbb"} vertical />
          </div>
        </div>
      </button>
    </>
  );
};

export default BaselineSlideVerticalItem;
