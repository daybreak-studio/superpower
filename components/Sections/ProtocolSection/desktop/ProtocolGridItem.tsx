import { useMemo } from "react";
import { AnimationConfig } from "@/components/AnimationConfig";
import { motion } from "framer-motion";
import Image from "next/image";
import { HealthArea } from "./HealthArea";
import { Protocol } from "../Protocols";

type ProtocolGridItmeProps = Protocol & {
  isExpanded: boolean;
  isCollapsed: boolean;
  onUnexpand: () => void;
  onExpand: () => void;
  itemWidth: number;
  collapseWidth: number;
  expandWidth: number;
};

export const ProtocolGridItem = ({
  name,
  image,
  icon,
  areas,
  onExpand,
  onUnexpand,
  isCollapsed,
  isExpanded,
  itemWidth,
  expandWidth,
  collapseWidth,
}: ProtocolGridItmeProps) => {
  const currentWidth = useMemo(() => {
    if (isExpanded) return expandWidth;
    if (isCollapsed) return collapseWidth;
    return itemWidth;
  }, [isExpanded, expandWidth, isCollapsed, collapseWidth, itemWidth]);

  const [healthAreaCopyL, healthAreaCopyR] = useMemo(() => {
    // TODO: refine logic of spacing out the content
    return [[areas[0], areas[1]], [areas[2]]];
  }, [areas]);

  return (
    <motion.button
      animate={{
        //@ts-ignore
        "--greyscale-progress": isExpanded ? 0 : 1,
        cursor: isExpanded ? "default" : "pointer",
        width: currentWidth,
        transition: {
          duration: AnimationConfig.VERY_SLOW,
          ease: AnimationConfig.EASING,
        },
      }}
      className={`relative flex h-full w-screen grow items-center justify-center overflow-hidden`}
      onClick={() => onExpand()}
      // onPointerLeave={() => onUnexpand()}
      onFocus={() => onExpand()}
      onBlur={() => onUnexpand()}
      initial={{}}
      whileHover={{
        //@ts-ignore
        "--greyscale-progress": 0,
      }}
    >
      {/* left side */}
      <HealthArea
        left
        healthArea={healthAreaCopyL}
        width={itemWidth / 2}
        isExpanded={isExpanded}
      />
      {/* middle image */}
      <motion.div
        style={{
          filter: "grayscale(var(--greyscale-progress))",
        }}
        className="h-full"
        animate={{
          width: isExpanded ? itemWidth * 1.2 : itemWidth,
          transition: {
            duration: AnimationConfig.VERY_SLOW,
            ease: AnimationConfig.EASING,
          },
        }}
      >
        <Image
          className="h-full w-full rounded-2xl object-cover"
          src={image}
          alt={""}
          width={256}
          height={256}
        />
      </motion.div>
      {/* right side */}
      <HealthArea
        right
        healthArea={healthAreaCopyR}
        width={itemWidth / 2}
        isExpanded={isExpanded}
      />

      {/* overlay label text */}
      <div className="absolute inset-0 flex flex-col items-center justify-between p-3 text-white">
        <motion.div
          animate={{
            scale: isCollapsed ? 0.6 : 1,
            transition: {
              duration: AnimationConfig.FAST,
              ease: AnimationConfig.EASING,
            },
          }}
        >
          {/* the icon of the item */}
          <Image src={icon} width={20} height={20} alt={""} />
        </motion.div>
        <motion.div
          className="flex flex-col leading-tight"
          animate={{
            scale: isCollapsed ? 0.8 : 1,
            transition: {
              duration: AnimationConfig.FAST,
              ease: AnimationConfig.EASING,
            },
          }}
        >
          {/* make the header multi-line */}
          {name.split(" ").map((text, index) => (
            <span key={index}>{text}</span>
          ))}
        </motion.div>
      </div>
    </motion.button>
  );
};
