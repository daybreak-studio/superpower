import { MotionValue, motion, useSpring, useTransform } from "framer-motion";
import React, { useMemo } from "react";
import { breakpoints, useBreakpoint } from "@/hooks/useBreakpoints";
import Image from "next-image-export-optimizer";

type EcosystemItem = {
  desktopAngle: { x: number; y: number };
  mobileAngle: { x: number; y: number };
  image: string;
  desktopWidth: number;
  mobileWidth: number;
  name: string;
};

type Props = {
  isMouseInSection: boolean;
  isSectionInView: boolean;
  pointerOffsetPercent: { x: MotionValue<number>; y: MotionValue<number> };
  item: EcosystemItem;
};

const EcosystemPanels = ({
  isMouseInSection,
  isSectionInView,
  pointerOffsetPercent,
  item,
}: Props) => {
  const isDesktop = useBreakpoint(breakpoints.md);
  const perspectiveFrom = "10000px";
  const perspectiveTo = "1600px";

  const max = 400;
  const min = 200;
  const stiffness = useMemo(() => Math.random() * (max - min) + min, []);

  const offsetY = useTransform(pointerOffsetPercent.x, (latest: number) =>
    isDesktop
      ? isMouseInSection
        ? item.desktopAngle.y + latest * 30
        : item.desktopAngle.y
      : item.mobileAngle.y,
  );
  const offsetX = useTransform(pointerOffsetPercent.y, (latest: number) =>
    isDesktop
      ? isMouseInSection
        ? item.desktopAngle.x + latest * -15
        : item.desktopAngle.x
      : item.mobileAngle.x,
  );
  const opacity = useTransform(pointerOffsetPercent.x, (latest: number) =>
    isMouseInSection
      ? ((item.desktopAngle.y + 70) / 140) * (latest + 0.5) + 0.5
      : 1,
  );
  const easedY = useSpring(offsetY, {
    // stiffness: stiffness,
    stiffness: 400,
    damping: 100,
    // mass: item.desktopWidth * 0.05,
  });
  const easedX = useSpring(offsetX, {
    // stiffness: stiffness,
    stiffness: 400,
    damping: 100,
    // mass: item.desktopWidth * 0.05,
  });

  return (
    <motion.div
      className="relative"
      initial={{
        perspective: perspectiveFrom,
      }}
      animate={{
        perspective: isSectionInView ? perspectiveTo : perspectiveFrom,
        transition: {
          duration: 2,
          ease: [0, 1, 0, 1],
        },
      }}
      style={{
        transformStyle: `preserve-3d`,
        perspectiveOrigin: "50% 50%",
        rotateY: easedY,
      }}
    >
      <motion.div
        style={{
          transformStyle: `preserve-3d`,
          perspectiveOrigin: "50% 50%",
          rotateX: easedX,
        }}
      >
        <motion.div
          style={{
            z: isDesktop ? "-80vw" : "-110vw",
          }}
        >
          <div className="absolute flex translate-x-[-50%] translate-y-[-50%] flex-col items-center gap-4 duration-300 hover:opacity-80">
            <Image
              src={item.image}
              alt={item.name}
              style={{
                minWidth: isDesktop
                  ? `${item.desktopWidth / 10}vw`
                  : `${item.mobileWidth / 10}vw`,
                // opacity: opacity,
              }}
              className="rounded-3xl"
              width={500}
              height={500}
            />
            <div className="font-sans-lg text-center text-black 2xl:text-[2vw]">
              {item.name}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default EcosystemPanels;
