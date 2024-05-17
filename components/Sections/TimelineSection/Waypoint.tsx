import React, { useState } from "react";
import { Waypoint } from "./Segments";
import {
  MotionValue,
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { AnimationConfig } from "@/components/AnimationConfig";

type Props = {
  waypoint: Waypoint;
  isActive: boolean;
  withDetails: boolean;
  index: number;
  totalWaypointsCount: number;
  progress: MotionValue<number>;
  isLowPerformanceMode: boolean;
  offsetHeight: number;
};

const WaypointTag = ({
  waypoint,
  isActive,
  progress,
  totalWaypointsCount,
  index,
  isLowPerformanceMode,
  withDetails,
  offsetHeight,
}: Props) => {
  const progressPosition = index / totalWaypointsCount;
  const [isVisible, setIsVisible] = useState(true);

  const waypointProgress = useTransform(
    progress,
    [
      progressPosition - 0.1,
      progressPosition - 0.05,
      progressPosition + 0.06,
      progressPosition + 0.1,
    ],
    [-1, 0, 0, 1],
    { clamp: false },
  );
  useMotionValueEvent(waypointProgress, "change", (latest) => {
    if (latest < 3 && latest > -2) {
      setIsVisible(true);
      return;
    }
    setIsVisible(false);
  });

  const dofBlur = useTransform(waypointProgress, [-1, 0, 1], [1.5, 0, 1.5]);
  const blurStr = useTransform(dofBlur, (latest) => {
    if (isVisible && !isLowPerformanceMode) return `blur(${latest}px)`;
    return "none";
  });

  const elevatedHeight = offsetHeight - 50;

  return (
    <motion.div
      className="relative flex  w-0 text-white"
      style={{
        // filter: blurStr,
        // visibility: isVisible ? "visible" : "hidden",
        height: elevatedHeight + 50,
      }}
      animate={{
        opacity: isVisible ? 1 : 0.4,
      }}
    >
      <div
        className={`absolute ${waypoint.direction == "left" ? "right-0 flex-col text-right" : "flex-col"} -mt-1 flex w-fit justify-between gap-4 text-nowrap sm:-mt-2`}
      >
        <motion.div className={waypoint.direction == "left" ? "mr-6" : "ml-6"}>
          <motion.div
            animate={{
              y: isActive ? 0 : elevatedHeight,
              color: isActive ? "#FE8000" : "#FFF",
              transition: {
                duration: isActive
                  ? AnimationConfig.SLOW
                  : AnimationConfig.FAST,
                ease: AnimationConfig.EASING,
              },
            }}
            className="font-mono-md mb-2 "
          >
            {waypoint.age}
          </motion.div>
          {withDetails && (
            <motion.div
              animate={{
                opacity: isActive ? 1 : 0,
                y: isActive ? 0 : 10,
                transition: {
                  duration: isActive
                    ? AnimationConfig.SLOW
                    : AnimationConfig.FAST,
                  ease: AnimationConfig.EASING,
                  delay: isActive ? AnimationConfig.VERY_FAST : 0,
                },
              }}
              className="font-sans-xl"
            >
              {waypoint.action}
            </motion.div>
          )}
        </motion.div>

        <motion.div
          animate={{
            opacity: isActive ? 1 : 0,
            y: isActive ? 0 : 10,
            transition: {
              duration: AnimationConfig.SLOW,
              ease: AnimationConfig.EASING,
            },
          }}
          className={`flex h-fit flex-col gap-2 ${waypoint.direction == "left" ? "border-r pr-4" : "border-l pl-4"} border-[rgba(255,255,255,.2)] `}
        >
          {withDetails &&
            waypoint.details.map((detail, index) => (
              <motion.div
                animate={{
                  opacity: isActive ? 1 : 0,
                  x: isActive ? 0 : -10,
                  transition: {
                    duration: isActive
                      ? AnimationConfig.SLOW
                      : AnimationConfig.FAST,
                    ease: AnimationConfig.EASING,
                    delay: isActive
                      ? 0.1 + AnimationConfig.VERY_FAST * index
                      : 0,
                  },
                }}
                key={index}
                className="font-sans-md flex items-center gap-2 leading-none"
              >
                <ArrowMarkerSVG />
                {detail}
              </motion.div>
            ))}
        </motion.div>
      </div>

      {/* marker */}
      <motion.div
        animate={{
          // opacity: isActive ? 1 : 0,
          // scale: isActive ? 1 : 0.8,
          y: isActive ? 0 : elevatedHeight,
          transition: {
            duration: AnimationConfig.NORMAL,
            ease: AnimationConfig.EASING,
          },
        }}
        className="absolute top-1 -ml-3 -mt-3"
      >
        <MarkerSVG isActive={isActive} />
      </motion.div>

      {/* left line */}
      <motion.div
        animate={{
          opacity: isActive ? 1 : 0,
          scaleY: isActive ? 1 : 0,
          transformOrigin: "center bottom",
          transition: {
            duration: AnimationConfig.NORMAL,
            ease: AnimationConfig.EASING,
          },
        }}
        className="absolute bottom-0 left-0 top-6 w-[2px] bg-gradient-to-b from-vermilion-700 to-transparent"
      />

      {/* anchor */}
      <motion.div
        animate={{
          scale: isActive ? 1 : 0,
          transition: {
            duration: AnimationConfig.NORMAL,
            ease: AnimationConfig.EASING,
          },
        }}
        style={{ x: -6, y: 6 }}
        className="absolute bottom-0 h-3 w-3 rounded-full bg-vermilion-700"
      />
    </motion.div>
  );
};

// ==========================================
//
// GRAPHIC ELEMENTS
//
// ==========================================

export const ArrowMarkerSVG = () => (
  <svg
    width="7"
    height="10"
    viewBox="0 0 7 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1.5 1L5.5 5L1.5 9" stroke="#FE8000" strokeWidth="2" />
  </svg>
);
const MarkerSVG = ({ isActive }: { isActive: boolean }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.path
      d="M4 14.5C4.39782 14.5 4.77936 14.658 5.06066 14.9393C5.34196 15.2206 5.5 15.6022 5.5 16V18.5H9C9.39782 18.5 9.77936 18.658 10.0607 18.9393C10.342 19.2206 10.5 19.6022 10.5 20C10.5 20.3978 10.342 20.7794 10.0607 21.0607C9.77936 21.342 9.39782 21.5 9 21.5H5C4.33696 21.5 3.70107 21.2366 3.23223 20.7678C2.76339 20.2989 2.5 19.663 2.5 19V16C2.5 15.6022 2.65804 15.2206 2.93934 14.9393C3.22064 14.658 3.60218 14.5 4 14.5ZM20 14.5C20.3729 14.5 20.7324 14.6389 21.0084 14.8896C21.2844 15.1403 21.4572 15.4848 21.493 15.856L21.5 16V19C21.5001 19.6347 21.2588 20.2457 20.825 20.709C20.3912 21.1724 19.7973 21.4534 19.164 21.495L19 21.5H15C14.6148 21.4998 14.2444 21.3514 13.9656 21.0856C13.6868 20.8198 13.521 20.4569 13.5025 20.0721C13.484 19.6873 13.6142 19.3102 13.8662 19.0188C14.1182 18.7274 14.4726 18.5442 14.856 18.507L15 18.5H18.5V16C18.5 15.6022 18.658 15.2206 18.9393 14.9393C19.2206 14.658 19.6022 14.5 20 14.5ZM20 10.5C20.3852 10.5002 20.7556 10.6486 21.0344 10.9144C21.3132 11.1802 21.479 11.5431 21.4975 11.9279C21.516 12.3127 21.3858 12.6898 21.1338 12.9812C20.8818 13.2726 20.5274 13.4558 20.144 13.493L20 13.5H4C3.61478 13.4998 3.24441 13.3514 2.96561 13.0856C2.68682 12.8198 2.52099 12.4569 2.50248 12.0721C2.48396 11.6873 2.61419 11.3102 2.86618 11.0188C3.11816 10.7274 3.47258 10.5442 3.856 10.507L4 10.5H20ZM9 2.5C9.38522 2.50019 9.75559 2.64858 10.0344 2.91441C10.3132 3.18024 10.479 3.54314 10.4975 3.92791C10.516 4.31269 10.3858 4.68983 10.1338 4.9812C9.88184 5.27257 9.52742 5.45583 9.144 5.493L9 5.5H5.5V8C5.49981 8.38522 5.35142 8.75559 5.08559 9.03439C4.81976 9.31318 4.45686 9.47901 4.07209 9.49752C3.68731 9.51604 3.31017 9.38581 3.0188 9.13382C2.72743 8.88184 2.54417 8.52742 2.507 8.144L2.5 8V5C2.4999 4.36528 2.74123 3.75429 3.17504 3.29095C3.60885 2.82762 4.20265 2.54664 4.836 2.505L5 2.5H9ZM19 2.5C19.6347 2.4999 20.2457 2.74123 20.709 3.17504C21.1724 3.60885 21.4534 4.20265 21.495 4.836L21.5 5V8C21.4998 8.38522 21.3514 8.75559 21.0856 9.03439C20.8198 9.31318 20.4569 9.47901 20.0721 9.49752C19.6873 9.51604 19.3102 9.38581 19.0188 9.13382C18.7274 8.88184 18.5442 8.52742 18.507 8.144L18.5 8V5.5H15C14.6148 5.49981 14.2444 5.35142 13.9656 5.08559C13.6868 4.81976 13.521 4.45686 13.5025 4.07209C13.484 3.68731 13.6142 3.31017 13.8662 3.0188C14.1182 2.72743 14.4726 2.54417 14.856 2.507L15 2.5H19Z"
      // fill="#FE8000"
      animate={{ fill: isActive ? "#FE8000" : "#FFF" }}
    />
  </svg>
);

export default WaypointTag;
