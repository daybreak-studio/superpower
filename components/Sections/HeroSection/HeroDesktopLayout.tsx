import React from "react";
import SuperpowerLogo from "./SuperpowerLogo";
import CTAButton from "@/components/Button/CTAButton";
import { motion } from "framer-motion";
import { AnimationConfig } from "@/components/AnimationConfig";

type Props = {};

const HeroDesktopLayout = (props: Props) => {
  return (
    <div className="absolute left-0 right-0 top-0 z-10 h-screen w-full p-10">
      <motion.div
        className="absolute z-10 flex w-full justify-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            duration: AnimationConfig.VERY_SLOW,
            ease: AnimationConfig.EASING,
            delay: 1,
          },
        }}
      >
        <SuperpowerLogo />
      </motion.div>
      <div className="mt-[30vh] flex w-full lg:flex-row">
        <motion.h1
          className="font-sans-3xl max-w-[8ch]"
          initial={{ opacity: 0, x: -50 }}
          animate={{
            opacity: 1,
            x: 0,
            transition: {
              duration: AnimationConfig.VERY_SLOW,
              ease: AnimationConfig.EASING,
              delay: 5,
            },
          }}
        >
          A new era of personal health
        </motion.h1>
        <div className="ml-auto w-full max-w-[372px]">
          <div className="flex h-full max-w-[372px] flex-col border-l-white px-4">
            <motion.p
              className="font-sans-xl mb-3 leading-tight"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  duration: AnimationConfig.VERY_SLOW,
                  ease: AnimationConfig.EASING,
                  delay: 5,
                },
              }}
            >
              The world&apos;s most advanced digital clinic for prevention,
              performance and longevity.
            </motion.p>
            <motion.p
              className="font-sans-md mb-auto opacity-70"
              initial={{ opacity: 0, x: 50 }}
              animate={{
                x: 0,
                opacity: 1,
                transition: {
                  duration: AnimationConfig.VERY_SLOW,
                  ease: AnimationConfig.EASING,
                  delay: 5,
                },
              }}
            >
              Test your whole body right from home, get personalized products
              and tailored protocols you need.
            </motion.p>
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, x: 50 }}
              animate={{
                x: 0,
                opacity: 1,
                transition: {
                  duration: AnimationConfig.SLOW,
                  ease: AnimationConfig.EASING,
                  delay: 5,
                },
              }}
            >
              <CTAButton href={"https://www.google.com"}>Get started</CTAButton>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroDesktopLayout;
