import React, { MutableRefObject, useRef, useState } from "react";
import Corner from "./Corner";
import {
  motion,
  useInView,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "framer-motion";
import { AnimationConfig } from "../AnimationConfig";
import {
  usePointerOffset,
  usePointerOffsetNormalized,
} from "@/hooks/usePointerInfo";
import { useViewportBounds } from "@/hooks/useBounds";

type Props = {
  href?: string;
  children: string;
  outline?: boolean;
  isVisible?: boolean;
};

const DEFAULT_CTA_LINK = "https://www.google.com";

const CTAButton = ({ outline, ...props }: Props) => {
  return (
    <>
      {outline && <CTAButtonOutline {...props} />}
      {!outline && <CTAButtonGlow {...props} />}
    </>
  );
};

const CTAButtonOutline = ({ href, children, isVisible = true }: Props) => {
  const containerRef = useRef() as MutableRefObject<HTMLAnchorElement>;

  const inViewDelay = 0.3;
  const [isHovering, setIsHovering] = useState(false);

  const bounds = useViewportBounds(containerRef);
  const pointerOffset = usePointerOffset(isHovering, containerRef, "center");
  const pointerOffsetPercent = usePointerOffsetNormalized(pointerOffset);

  const offsetX = useTransform(pointerOffsetPercent.x, (latest) =>
    isHovering ? latest * 15 : 0,
  );
  const offsetY = useTransform(pointerOffsetPercent.y, (latest) =>
    isHovering ? latest * 4 : 0,
  );

  const textX = useSpring(offsetX, { stiffness: 300, damping: 50 });
  const textY = useSpring(offsetY, { stiffness: 300, damping: 50 });

  // for the glow effect
  const clampedX = useTransform(
    pointerOffset.x,
    [-bounds.width / 2, bounds.width / 2],
    [-bounds.width / 4, bounds.width / 4],
  );
  const clampedY = useTransform(
    pointerOffset.y,
    [-bounds.height / 2, bounds.height / 2],
    [-bounds.height / 4, bounds.height / 4],
  );
  const glowX = useSpring(clampedX, { stiffness: 200, damping: 100 });
  const glowY = useSpring(clampedY, { stiffness: 200, damping: 100 });

  // useMotionValueEvent(glowX, "change", (latest) => console.log(latest));

  return (
    <motion.a
      onPointerEnter={() => setIsHovering(true)}
      onPointerLeave={() => setIsHovering(false)}
      initial={{
        opacity: 1,
        scale: 1,
      }}
      whileHover={{
        // opacity: [0, 1, 0, 1],
        scale: 1.05,
        transition: {
          duration: AnimationConfig.NORMAL,
        },
      }}
      whileTap={{
        scale: 0.98,
      }}
      ref={containerRef}
      href={href || DEFAULT_CTA_LINK}
      target="blank"
      className={`
    font-mono-sm
      relative inline-flex
      items-center
      justify-center
      px-8
      py-4
      text-zinc-900
      `}
      style={{
        //@ts-ignore
        "--border-color": "#18181b",
      }}
    >
      <div className="absolute left-0 right-0 top-0 flex justify-center">
        <motion.div
          className="flex justify-between"
          initial={{
            width: 0,
          }}
          animate={{
            width: isVisible ? "100%" : 0,
            opacity: isVisible ? 1 : 0,
            y: isVisible ? 0 : 20,
            transition: {
              duration: AnimationConfig.SLOW,
              ease: AnimationConfig.EASING,
              delay: isVisible ? inViewDelay : 0,
            },
          }}
        >
          <Corner topLeft color={isHovering ? "#F7791E" : "#000"} />
          <Corner topRight color={isHovering ? "#F7791E" : "#000"} />
        </motion.div>
      </div>
      <motion.div
        initial={{
          opacity: 0,
          scale: 1.0,
        }}
        animate={{
          opacity: isVisible ? [0, 1, 0, 1] : 0,
          transition: {
            duration: AnimationConfig.NORMAL,
            ease: "linear",
            delay: isVisible ? AnimationConfig.FAST + inViewDelay : 0,
          },
        }}
      >
        <motion.div
          animate={{
            color: isHovering ? "#F7791E" : "#18181b",
            scale: isHovering ? 0.95 : 1,
            transition: {
              duration: AnimationConfig.NORMAL,
            },
          }}
          style={{
            x: textX,
            y: textY,
          }}
        >
          {children}
        </motion.div>
      </motion.div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center">
        <motion.div
          initial={{
            width: 0,
          }}
          animate={{
            width: isVisible ? "100%" : 0,
            y: isVisible ? 0 : -20,
            opacity: isVisible ? 1 : 0,
            transition: {
              duration: AnimationConfig.SLOW,
              ease: AnimationConfig.EASING,
              delay: isVisible ? inViewDelay : 0,
            },
          }}
          className="flex justify-between"
        >
          <Corner bottomLeft color={isHovering ? "#F7791E" : "#000"} />
          <Corner bottomRight color={isHovering ? "#F7791E" : "#000"} />
        </motion.div>
      </div>
      <motion.div
        style={{
          x: glowX,
          y: glowY,
        }}
        animate={{
          scale: isHovering ? 1 : 0.8,
          opacity: isHovering ? 0.5 : 0,
          transition: {
            duration: AnimationConfig.SLOW,
            ease: "linear",
          },
        }}
        className="pointer-events-none absolute inset-0 z-0 bg-[#F7791E] blur-2xl"
      ></motion.div>
    </motion.a>
  );
};

const CTAButtonGlow = ({ href, children, outline }: Props) => (
  <a
    href={href || DEFAULT_CTA_LINK}
    target="blank"
    className={`
      font-mono-sm 
      relative inline-block 
      bg-white px-8 py-4 
      text-zinc-900
    `}
  >
    {children}
    <div className="absolute inset-0 bg-white blur-2xl"></div>
  </a>
);

export default CTAButton;
