"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AnimationConfig } from "../../AnimationConfig";

type Props = {
  previewSrc: string;
  expandedSrc: string;
  index: string;
  header: string;
  description: string;
  isExpanded: boolean;
  onSelect: () => void;
};

const BaselineSlideVerticalItem = ({
  previewSrc,
  expandedSrc,
  isExpanded,
  onSelect,
  header,
  description,
  index,
}: Props) => {
  return (
    <button
      onPointerEnter={() => onSelect()}
      className="relative flex flex-row items-center"
    >
      {/* main expanding image */}
      <motion.div
        className="relative z-0 flex flex-col items-center justify-center overflow-hidden rounded-[20px]"
        initial={{
          width: 282,
          height: 122,
        }}
        animate={{
          width: isExpanded ? "auto" : 282,
          height: isExpanded ? "auto" : 122,
          transition: {
            ease: AnimationConfig.EASING,
            duration: AnimationConfig.SLOW,
          },
        }}
      >
        <motion.div className="h-full w-full">
          <Image
            className="absolute left-0 top-0 -z-10 h-full w-full"
            src={previewSrc}
            width={282}
            height={122}
            alt={""}
          />
        </motion.div>
        <motion.div
          className="h-full max-w-[40vw]"
          animate={{
            opacity: isExpanded ? 1 : 0,
          }}
        >
          <Image src={expandedSrc} width={830} height={362} alt={""} />
        </motion.div>
      </motion.div>
      {/* left decorative elemnt */}
      <div className="z-100 absolute -left-20 flex flex-row items-center px-4">
        <div className="mr-2 h-4 w-0.5 bg-zinc-900"></div>
        <div className="w-10 border-t border-zinc-500" />
      </div>
      {/* right decorative elemnt */}
      <div className="absolute left-[100%] flex flex-row items-center gap-2 px-4">
        <div className="w-10 border-t border-zinc-500" />
        <div className="font-mono-xs rounded-lg border border-zinc-900 p-2">
          {index}
        </div>
        <div className="text-left">
          <div className="font-mono-xs my-4 text-nowrap">{header}</div>
          <motion.div
            className="font-sans-xs h-0 xl:font-sans-sm xl:min-w-56"
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
      </div>
    </button>
  );
};

export default BaselineSlideVerticalItem;
