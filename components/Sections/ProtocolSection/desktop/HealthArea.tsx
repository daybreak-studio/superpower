import { AnimationConfig } from "@/components/AnimationConfig";
import LineElement from "@/components/LineElement/LineElement";
import { motion } from "framer-motion";

export const HealthArea = ({
  width,
  healthArea,
  left,
  isExpanded,
}: {
  healthArea: string[];
  width: number;
  left?: boolean;
  right?: boolean;
  isExpanded: boolean;
}) => (
  <motion.div
    className={`font-sans-sm pointer-events-none 
    absolute
      flex flex-row
      ${left ? "left-0" : "right-0"} 
       h-full w-full
      ${left ? "border-l border-l-zinc-300" : "border-r border-r-zinc-300"}`}
    style={{
      width: width * 1.2,
    }}
    animate={{
      opacity: isExpanded ? 1 : 0,
      transition: {
        duration: AnimationConfig.SLOW,
        ease: "linear",
      },
    }}
  >
    <div className="flex w-full flex-col items-center justify-center">
      {healthArea.length === 1 &&
        healthArea.map((healthArea, index) => (
          <div
            className="flex h-full w-full items-center justify-center"
            key={index}
          >
            <LineElement length={"auto"} color={"#d4d4d8"} />
            <motion.div
              className="mx-4 leading-tight"
              animate={{
                opacity: isExpanded ? 1 : 0,
                transition: {
                  duration: AnimationConfig.FAST,
                  delay: AnimationConfig.VERY_FAST,
                  ease: "linear",
                },
              }}
            >
              {healthArea}
            </motion.div>
            <LineElement length={"auto"} color={"#d4d4d8"} />
          </div>
        ))}
      {healthArea.length > 1 &&
        healthArea.map((healthArea, index) => (
          <motion.div
            animate={{
              opacity: isExpanded ? 1 : 0,
              transition: {
                duration: AnimationConfig.FAST,
                delay: AnimationConfig.VERY_FAST,
                ease: "linear",
              },
            }}
            className="flex h-full w-full items-center justify-center border-b border-b-zinc-300 px-2 leading-tight last:border-b-transparent"
            key={index}
          >
            {healthArea}
          </motion.div>
        ))}
    </div>
  </motion.div>
);
