import React from "react";
import SuperpowerLogo from "./SuperpowerLogo";
import CTAButton from "@/components/Button/CTAButton";
import LineElement from "@/components/LineElement/LineElement";

type Props = {};

const HeroMobileLayout = (props: Props) => {
  return (
    <div className="absolute left-0 right-0 top-0 z-10 flex min-h-screen w-full flex-col items-center px-4">
      <div className="absolute mt-12 flex h-4">
        <SuperpowerLogo />
      </div>
      <div className="mb-12 mt-[70vh] flex flex-col items-center text-center">
        <h1 className="font-sans-3xl mb-6 max-w-[13ch]">
          A new era of personal health
        </h1>
        <CTAButton href={"https://www.google.com"}>Get started</CTAButton>
      </div>

      <div className="flex min-h-[120vh] basis-1 flex-col items-center justify-stretch">
        <LineElement length="auto" color={"rgba(255,255,255,.5)"} vertical />

        <div className="my-24 text-center">
          <p className="font-sans-xl mb-3 leading-tight">
            The world's most advanced digital clinic for prevention, performance
            and longevity.
          </p>
          <p className="font-sans-md mb-auto opacity-70">
            Test your whole body right from home, get personalized products and
            tailored protocols you need.
          </p>
        </div>

        <LineElement length="auto" color={"rgba(255,255,255,.5)"} vertical />
      </div>
    </div>
  );
};

export default HeroMobileLayout;
