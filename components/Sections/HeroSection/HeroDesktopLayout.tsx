import React from "react";
import SuperpowerLogo from "./SuperpowerLogo";
import CTAButton from "@/components/Button/CTAButton";
import { motion, useTransform } from "framer-motion";
import { AnimationConfig } from "@/components/AnimationConfig";
import { useProgress } from "@/components/ProgressProvider/ProgressProvider";
import { useMotionValueSwitch } from "@/hooks/useMotionValueSwitch";
import FadingText from "@/components/FadingText/FadingText";
import LineElement from "@/components/LineElement/LineElement";
import FadeVertical from "@/components/FadingText/FadeVertical";

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
    <motion.div className="fixed left-0 right-0 top-0 z-10 h-screen w-full p-10">
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
        <h1 className="font-sans-3xl max-w-[8ch]">
          <FadingText progress={fadingAnimProgress}>
            <span className="block">A New Era of Personal Health</span>
          </FadingText>
        </h1>
        <div className="ml-auto flex w-full max-w-[380px] flex-row">
          <FadeVertical progress={fadingAnimDelayed}>
            <LineElement
              length={"auto"}
              vertical
              color={"rgba(255,255,255,.5)"}
            />
          </FadeVertical>
          <div className="pointer-events-auto z-50 flex h-full max-w-[380px] flex-col px-4">
            <FadingText progress={fadingAnimDelayed}>
              <p className="font-sans-xl mb-3 leading-tight">
                Superpower is the world&apos;s most advanced digital clinic
                designed to help you prevent disease, look & feel better, and
                live longer.
              </p>
              {/* <p className="font-sans-md mb-auto opacity-70">
                Test your whole body right from home, get personalized products
                and tailored protocols you need.
              </p> */}
            </FadingText>
            <motion.div
              className="mt-12"
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
              <CTAButton href={"https://app.superpower.com/signin"}>
                Join The Waitlist
              </CTAButton>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroDesktopLayout;
