import React, { useEffect, useState } from "react";
import SuperpowerLogo from "./SuperpowerLogo";
import CTAButton from "@/components/Button/CTAButton";
import { motion, useTransform } from "framer-motion";
import { AnimationConfig } from "@/components/AnimationConfig";
import { useProgress } from "@/components/ProgressProvider/ProgressProvider";
import { useMotionValueSwitch } from "@/hooks/useMotionValueSwitch";
import FadingText from "@/components/FadingText/FadingText";
import LineElement from "@/components/LineElement/LineElement";
import FadeVertical from "@/components/FadingText/FadeVertical";
import { ViralLoopsDialog } from "@/components/ViralLoopsDialog/ViralLoopsDialog";

type Props = {
  shouldShowContent: boolean;
};

const HeroDesktopLayout = ({ shouldShowContent }: Props) => {
  const progress = useProgress();

  const isSectionVisible = useMotionValueSwitch(
    progress,
    (latest) => latest > 0.001 && latest < 1,
  );
  const isCTAVisible = useMotionValueSwitch(
    progress,
    (latest) => latest > 0.18 && latest < 0.52,
  );
  const fadingAnimProgress = useTransform(
    progress,
    [0.05, 0.2, 0.4, 0.5],
    [0, 0.6, 0.6, 1],
  );

  const fadeDelay = 0.05;
  const fadingAnimDelayed = useTransform(
    progress,
    [0.05 + fadeDelay, 0.2 + fadeDelay, 0.43 + fadeDelay, 0.53],
    [0, 0.6, 0.6, 1],
  );

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-10 h-screen w-full pl-60"
      style={{
        display: isSectionVisible ? "block" : "none",
      }}
    >
      {/* <motion.div
        className="absolute z-10 flex w-full justify-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: isSectionVisible ? 1 : 0,
          y: isSectionVisible ? 0 : -10,
          transition: {
            duration: AnimationConfig.VERY_SLOW,
            ease: AnimationConfig.EASING,
            delay: 0,
          },
        }}
      >
        <SuperpowerLogo />
      </motion.div> */}
      <div className="mt-[30vh] flex w-full lg:flex-row">
        <h1 className="font-sans-2xl max-w-[12ch] space-y-4">
          <FadingText progress={fadingAnimProgress}>
            <span className="block">A new era of personal health</span>
          </FadingText>

          <div className="flex w-full max-w-[500px] flex-row">
            <div className="pointer-events-auto z-50 flex h-full max-w-[500px] flex-col">
              <FadingText progress={fadingAnimDelayed}>
                <p className="font-sans-xl mb-8 leading-tight text-white/70">
                  The world’s most advanced digital clinic to help you live
                  longer, prevent disease, and feel your best
                </p>
                {/* <p className="font-sans-md mb-auto opacity-70">
                Test your whole body right from home, get personalized products
                and tailored protocols you need.
              </p> */}
              </FadingText>
              <motion.div
                className="-mt-2"
                initial={{ opacity: 0 }}
                animate={{
                  // x: isCTAVisible ? 0 : -10,
                  opacity: isCTAVisible ? 1 : 0,
                  transition: {
                    duration: isCTAVisible
                      ? AnimationConfig.VERY_SLOW
                      : AnimationConfig.FAST,
                    ease: "linear",
                    delay: 0,
                  },
                }}
              >
                {/* <form-widget
                  mode="popup"
                  ucid="2X8NEjvQ9c5KJYR7178Sizt9pxM"
                ></form-widget> */}
                <ViralLoopsDialog>
                  <CTAButton>Join waitlist</CTAButton>
                </ViralLoopsDialog>
              </motion.div>
            </div>
          </div>
        </h1>
      </div>
    </motion.div>
  );
};

export default HeroDesktopLayout;
