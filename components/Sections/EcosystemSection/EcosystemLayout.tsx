import React, {
  useState,
  useEffect,
  MutableRefObject,
  useRef,
  RefObject,
  useMemo,
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
import EcosystemPanels from "./EcosystemPanels";
import LineElement from "@/components/LineElement/LineElement";

type Props = {};

const EcosystemSection = (props: Props) => {
  const containerRef = useRef() as MutableRefObject<HTMLAnchorElement>;
  const perspectiveFrom = "0px";
  const perspectiveTo = "1600px";
  const isVisible = useInView(containerRef);

  const [isHovering, setIsHovering] = useState(false);

  const pointerOffset = usePointerOffset(isHovering, containerRef, "center");
  const pointerOffsetPercent = usePointerOffsetNormalized(pointerOffset);

  return (
    <section
      className="relative mb-[5vh] mt-[10vh] h-screen w-screen bg-white"
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
            delay: 0,
            ease: [0, 0.7, 0.5, 1],
          },
        }}
      >
        {EcosystemItems.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <EcosystemPanels
                isMouseInSection={isHovering}
                isSectionInView={isVisible}
                pointerOffsetPercent={pointerOffsetPercent}
                item={item}
              />
            </React.Fragment>
          );
        })}
      </motion.div>
      <div className="z-1 pointer-events-none absolute flex h-full w-full flex-col items-center justify-center">
        <div className="flex w-full max-w-[585px] flex-col items-center gap-6 px-4">
          <div className="font-sans-3xl text-center text-black lg:font-sans-2xl">
            <h1>Get exclusive access to our marketplace</h1>
          </div>
          <div className="w-full max-w-[533px]">
            <p className="font-sans-lg text-center text-black opacity-50">
              Unlimited tools to transform your health and change your life.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
