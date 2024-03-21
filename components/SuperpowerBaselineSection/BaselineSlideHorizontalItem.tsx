import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AnimationConfig } from "../AnimationConfig";

type Props = {
  previewSrc: string;
  expandedSrc: string;
  index: string;
  header: string;
  description: string;
  isCurrent: boolean;
  onSelect: () => void;
};

const BaselineSlideHorizontalItem = ({
  previewSrc,
  expandedSrc,
  isCurrent,
}: Props) => {
  return (
    <motion.div
      className="h-[100vw] max-h-[60vh] w-[60vw]  overflow-hidden rounded-3xl"
      animate={{
        scale: isCurrent ? 1 : 0.7,
        transition: {
          duration: AnimationConfig.SLOW,
          ease: AnimationConfig.EASING,
        },
      }}
    >
      <Image
        className="h-full w-full object-cover"
        src={previewSrc}
        width={282}
        height={122}
        alt={""}
      />
    </motion.div>
  );
};

export default BaselineSlideHorizontalItem;
