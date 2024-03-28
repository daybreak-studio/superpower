import React from "react";
import { Protocol } from "../Protocols";
import Image from "next/image";
import { motion } from "framer-motion";
import LineElement from "@/components/LineElement/LineElement";
import { AnimationConfig } from "@/components/AnimationConfig";

type Props = {
  protocol: Protocol;
  isCurrent: boolean;
};

const ProtocolListItem = ({ protocol, isCurrent }: Props) => {
  return (
    <motion.div
      className="relative flex w-full flex-row"
      animate={{
        //@ts-ignore
        "--greyscale-progress": isCurrent ? 0 : 1,
      }}
    >
      <motion.div
        className="font-sans-xl absolute right-20 -mt-1 flex h-full flex-row items-center gap-4 text-right leading-tight"
        animate={{
          opacity: isCurrent ? 1 : 0,
          x: isCurrent ? 0 : 40,
          transition: {
            duration: AnimationConfig.SLOW,
            ease: AnimationConfig.EASING,
            // delay: isCurrent ? AnimationConfig.FAST : 0,
          },
        }}
      >
        <motion.div
          animate={{
            opacity: isCurrent ? 1 : 0,
            x: isCurrent ? 0 : 10,
            transition: {
              duration: AnimationConfig.VERY_SLOW,
              ease: AnimationConfig.EASING,
              delay: isCurrent ? 0 : 0,
            },
          }}
        >
          {protocol.name}
        </motion.div>
        <LineElement length={12} color={"#BBBBBB"} />
      </motion.div>
      <motion.div
        animate={{
          scale: isCurrent ? 1 : 0.6,
          transition: {
            duration: AnimationConfig.NORMAL,
            ease: AnimationConfig.EASING,
          },
        }}
      >
        <Image
          style={{
            filter: "grayscale(var(--greyscale-progress))",
          }}
          className="mb-2 rounded-xl"
          src={protocol.image}
          alt={""}
          width={64}
          height={64}
        />
      </motion.div>
      <motion.div
        className="font-sans-sm absolute left-20 -mt-1 flex h-full flex-row items-center text-left leading-none"
        animate={{
          opacity: isCurrent ? 1 : 0,
          x: isCurrent ? 0 : -40,
          transition: {
            duration: AnimationConfig.SLOW,
            ease: AnimationConfig.EASING,
            delay: isCurrent ? 0.2 : 0,
          },
        }}
      >
        <LineElement length={12} color={"#BBBBBB"} />
        <div className="flex w-[30vw] flex-col gap-4 text-wrap border-l  border-l-[#BBB] pl-4">
          {protocol.areas.map((area, index) => (
            <motion.div
              animate={{
                opacity: isCurrent ? 1 : 0,
                x: isCurrent ? 0 : -10,
                transition: {
                  duration: AnimationConfig.SLOW,
                  ease: AnimationConfig.EASING,
                  delay: isCurrent
                    ? AnimationConfig.FAST * index * 0.4 + 0.2
                    : 0,
                },
              }}
              key={index}
            >
              {area}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProtocolListItem;
