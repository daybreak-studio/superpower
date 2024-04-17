import { MotionValue, motion, useSpring, useTransform } from "framer-motion";
import React, { useMemo } from "react";

type EcosystemItem = {
  angle: { x: number; y: number };
  image: string;
  width: number;
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
  const perspectiveFrom = "10000px";
  const perspectiveTo = "1600px";

  const max = 400;
  const min = 200;
  const stiffness = useMemo(() => Math.random() * (max - min) + min, []);

  const offsetY = useTransform(pointerOffsetPercent.x, (latest) =>
    isMouseInSection ? item.angle.y + latest * 20 : item.angle.y,
  );
  const offsetX = useTransform(pointerOffsetPercent.y, (latest) =>
    isMouseInSection ? item.angle.x - latest * 7 : item.angle.x,
  );
  const opacity = useTransform(pointerOffsetPercent.x, (latest) =>
    isMouseInSection ? ((item.angle.y + 70) / 140) * (latest + 0.5) + 0.5 : 1,
  );
  const easedY = useSpring(offsetY, {
    // stiffness: stiffness,
    stiffness: 400,
    damping: 100,
    // mass: item.width * 0.05,
  });
  const easedX = useSpring(offsetX, {
    // stiffness: stiffness,
    stiffness: 400,
    damping: 100,
    // mass: item.width * 0.05,
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
            z: "-60vw",
          }}
        >
          <div className="absolute flex translate-x-[-50%] translate-y-[-50%] flex-col items-center gap-4">
            <motion.img
              src={item.image}
              alt={item.name}
              style={{
                minWidth: `${item.width / 10}vw`,
                // opacity: opacity,
              }}
            ></motion.img>
            <div className="font-sans-lg text-black">{item.name}</div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default EcosystemPanels;
