import React from "react";
import SuperpowerLogo from "./SuperpowerLogo";
import CTAButton from "@/components/Button/CTAButton";
import LineElement from "@/components/LineElement/LineElement";
import { motion, useScroll, useTransform } from "framer-motion";
import { useBounds } from "@/hooks/useBounds";
import { useWindowDimension } from "@/hooks/useWindowDimension";

type Props = {};

const HeroMobileLayout = (props: Props) => {
  const { scrollY } = useScroll();
  const [containerRef, bounds] = useBounds<HTMLDivElement>([]);

  const windowDim = useWindowDimension();
  const fadeOutDistance = windowDim.height * 1.2;

  const sectionOpacity = useTransform(
    scrollY,
    [bounds.height - fadeOutDistance, bounds.height],
    [1, 0],
  );

  return (
    <motion.div
      initial={{
        opacity: 1,
      }}
      style={{
        opacity: sectionOpacity,
      }}
      ref={containerRef}
      className="absolute left-0 right-0 top-0 z-10 flex min-h-screen w-full flex-col items-center px-4"
    >
      <div className="absolute mt-12 flex h-4">
        <SuperpowerLogo />
      </div>
      <div className="mb-12 mt-[70vh] flex flex-col items-center text-center">
        <h1 className="font-sans-3xl mb-6 max-w-[13ch]">
          A new era of personal health
        </h1>
        <CTAButton href={"https://www.google.com"}>Get started</CTAButton>
      </div>

      <div className="flex min-h-[120vh]  basis-1 flex-col items-center justify-stretch">
        <LineElement length="auto" color={"rgba(255,255,255,.5)"} vertical />

        <div className="my-24 max-w-[24ch] text-center">
          <p className="font-sans-xl mb-3 leading-tight">
            The world's most advanced digital clinic for prevention, performance
            and longevity.
          </p>
          <p className="font-sans-sm mb-auto opacity-70">
            Leading doctors, whole-body testing, and the latest technology, like
            you’ve never experienced before.
          </p>
        </div>

        <LineElement
          length="auto"
          color={"rgba(255,255,255,.5)"}
          vertical
          tail={32}
        />
      </div>
    </motion.div>
  );
};

export default HeroMobileLayout;
