import {
  ButtonHTMLAttributes,
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { AnimationConfig } from "@/components/AnimationConfig";
import { motion } from "framer-motion";
import Image from "next-image-export-optimizer";
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
  const buttonRef = useRef() as MutableRefObject<HTMLButtonElement>;
  const currentWidth = useMemo(() => {
    if (isExpanded) return expandWidth;
    if (isCollapsed) return collapseWidth;
    return itemWidth;
  }, [isExpanded, expandWidth, isCollapsed, collapseWidth, itemWidth]);

  const [healthAreaCopyL, healthAreaCopyR] = useMemo(() => {
    // TODO: refine logic of spacing out the content
    return [[areas[0], areas[1]], [areas[2]]];
  }, [areas]);

  useEffect(() => {
    if (isExpanded) {
      buttonRef.current.focus();
    }
  }, [isExpanded]);

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
      ref={buttonRef}
      className={`relative flex h-full w-screen grow items-center justify-center overflow-hidden outline-none`}
      // onClick={() => onExpand()}
      // // onPointerLeave={() => onUnexpand()}
      // onFocus={() => onExpand()}
      // onBlur={() => onUnexpand()}
      initial={{}}
      onMouseEnter={() => onExpand()}
      onMouseLeave={() => onUnexpand()}
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
        className="relative z-10 h-full overflow-hidden rounded-2xl"
        animate={{
          width: isExpanded ? itemWidth * 1.2 : itemWidth,
          transition: {
            duration: AnimationConfig.VERY_SLOW,
            ease: AnimationConfig.EASING,
          },
        }}
      >
        <div
          className="absolute bottom-0 left-0 h-full w-full overflow-hidden rounded-bl-2xl rounded-br-2xl"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 67%, rgba(0, 0, 0, 0.587121) 80.5%, rgba(0, 0, 0, 0.757576) 87%, #000000 100%)",
            opacity: "0.5",
          }}
        />
        <Image
          className="h-full w-full object-cover"
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
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-between p-3 text-white">
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
