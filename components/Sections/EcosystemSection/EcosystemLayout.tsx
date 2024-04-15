import React, {
  useState,
  useEffect,
  MutableRefObject,
  useRef,
  RefObject,
} from "react";
import {
  cubicBezier,
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  usePointerOffset,
  usePointerOffsetNormalized,
} from "@/hooks/usePointerInfo";
import { EcosystemItems } from "./EcosystemItems";
import { AnimationConfig } from "@/components/AnimationConfig";
import { easing } from "@/components/AnimationConfig";

type Props = {};

const EcosystemSection = (props: Props) => {
  const containerRef = useRef() as MutableRefObject<HTMLAnchorElement>;
  const perspectiveFrom = "10000px";
  const perspectiveTo = "1600px";
  const isVisible = useInView(containerRef);

  const [isHovering, setIsHovering] = useState(false);

  const pointerOffset = usePointerOffset(isHovering, containerRef, "center");
  const pointerOffsetPercent = usePointerOffsetNormalized(pointerOffset);

  return (
    <section
      className="relative h-screen w-screen"
      onPointerEnter={() => setIsHovering(true)}
      onPointerLeave={() => setIsHovering(false)}
      ref={containerRef as unknown as MutableRefObject<HTMLDivElement>}
    >
      <motion.div
        className="absolute left-[50%] top-[50%]"
        initial={{
          opacity: 0,
          perspective: perspectiveFrom,
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          perspective: isVisible ? perspectiveTo : perspectiveFrom,
          transition: {
            duration: 2,
            ease: [0, 0.7, 0, 1],
          },
        }}
      >
        {EcosystemItems.map((item, index) => {
          const offsetY = useTransform(pointerOffsetPercent.x, (latest) =>
            isHovering ? item.angle.y + latest * 20 : item.angle.y,
          );
          const offsetX = useTransform(pointerOffsetPercent.y, (latest) =>
            isHovering ? item.angle.x - latest * 7 : item.angle.x,
          );
          const opacity = useTransform(pointerOffsetPercent.x, (latest) =>
            isHovering ? ((item.angle.y + 70) / 140) * (latest + 0.5) + 0.5 : 1,
          );
          const easedY = useSpring(offsetY, { stiffness: 400, damping: 100 });
          const easedX = useSpring(offsetX, { stiffness: 400, damping: 100 });

          return (
            <React.Fragment key={index}>
              <motion.div
                className="relative"
                initial={{
                  perspective: perspectiveFrom,
                }}
                animate={{
                  perspective: isVisible ? perspectiveTo : perspectiveFrom,
                  transition: {
                    duration: 2,
                    ease: [0, 1, 0, 1],
                  },
                }}
                style={{
                  transformStyle: `preserve-3d`,
                  perspectiveOrigin: "50% 50%",
                  rotateY: easedY,
                  // transform: `rotateY(${offsetY.get()}deg) rotateX(${offsetX.get()}deg) translateZ(-50vw)`,
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
            </React.Fragment>
          );
        })}
      </motion.div>
      <div className="z-1 absolute flex h-full w-full flex-col items-center justify-center">
        <div className="flex w-full max-w-[585px] flex-col items-center gap-6">
          <div className="font-sans-2xl text-center text-black">
            <h1>Get Exclusive Access to Our Ecosystem</h1>
          </div>
          <div className="w-full max-w-[533px]">
            <p className="font-sans-lg text-center text-black opacity-50">
              Your superpower membership comes with an ecosystem to access
              anytime. Unlimited tools to change the way you engage w/ your
              health, for life.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
