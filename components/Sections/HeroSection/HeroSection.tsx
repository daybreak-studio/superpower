import ScrollVideo from "@/components/ScrollVideo/ScrollVideo";
import React from "react";
import SuperpowerLogo from "./SuperpowerLogo";
import CTAButton from "@/components/Button/CTAButton";

type Props = {};

const HeroSection = (props: Props) => {
  return (
    <section className="relative min-h-screen bg-zinc-900 text-white">
      <div className="absolute left-0 right-0 top-0 z-10 h-screen w-full p-4 md:p-10">
        <div className="absolute z-10 flex w-full justify-center">
          <SuperpowerLogo />
        </div>
        <div className="mt-[30vh] flex w-full lg:flex-row">
          <h1 className="font-sans-3xl max-w-[8ch]">
            A new era of personal health
          </h1>
          <div className="ml-auto w-full max-w-[372px]">
            <div className="flex h-full max-w-[372px] flex-col border-l border-l-white px-4">
              <p className="font-sans-xl mb-3 leading-tight">
                The world's most advanced digital clinic for prevention,
                performance and longevity.
              </p>
              <p className="font-sans-md mb-auto opacity-70">
                Test your whole body right from home, get personalized products
                and tailored protocols you need.
              </p>
              <div className="mt-12">
                <CTAButton href={"https://www.google.com"}>
                  Get started
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* playbackConst: higher it is, the slower it plays */}
      <ScrollVideo playbackConst={400}>
        <source
          type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
          src="https://www.apple.com/media/us/mac-pro/2013/16C1b6b5-1d91-4fef-891e-ff2fc1c1bb58/videos/macpro_main_desktop.mp4"
        />
      </ScrollVideo>
    </section>
  );
};

export default HeroSection;
