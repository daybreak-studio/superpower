import React, { MutableRefObject, useRef } from "react";
import ProtocolSectionDesktop from "./desktop/ProtocolSectionDesktop";
import { PROTOCOLS } from "./Protocols";
import { breakpoints, useBreakpoint } from "@/hooks/useBreakpoints";
import ProtocolSectionMobile from "./mobile/ProtocolSectionMobile";
import Scrim from "@/components/Scrim/Scrim";
import LineElement from "@/components/LineElement/LineElement";
import CTAButton from "@/components/Button/CTAButton";
import { motion, useInView } from "framer-motion";
import BiomarkerBanner from "./Biomarkers/BiomarkerBanner";

type Props = {};

const ProtocolSection = (props: Props) => {
  const isDesktop = useBreakpoint(breakpoints.md);

  const buttonContainerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const isButtonInView = useInView(buttonContainerRef);

  const biomarkerContainerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const isBiomarkerInView = useInView(biomarkerContainerRef);

  return (
    <section className="relative z-10 bg-white">
      <motion.div
        className="z-10 mb-16 flex h-fit flex-col items-center bg-white pt-[72px]"
        style={{
          position: isDesktop ? "relative" : "sticky",
          marginTop: isDesktop ? 0 : 100,
          top: 0,
        }}
      >
        <div
          className="mb-16 flex flex-col items-center"
          style={{ display: isDesktop ? "block" : "none" }}
        >
          <LineElement length={0} color={"#bbb"} vertical head={40} />
          <LineElement length={170} color={"#bbb"} vertical tail={600} />
        </div>
        <div className="font-mono-sm mx-4 mb-4 text-center">
          Unleashing the Superpower
        </div>
        <h2 className="font-sans-2xl mx-4 mb-6 max-w-[16ch] text-center">
          Finally, healthcare that looks at the whole you
        </h2>
        <p className="font-sans-lg mx-4 mb-6 max-w-[24ch] text-center opacity-50">
          Personalized programs to improve every aspect of your health.
        </p>
        <Scrim height={"64px"} />
      </motion.div>

      {isDesktop && <ProtocolSectionDesktop protocols={PROTOCOLS} />}
      {!isDesktop && <ProtocolSectionMobile protocols={PROTOCOLS} />}

      <div className="-mt-4 flex flex-col items-center justify-center gap-8">
        <LineElement length={48} color={"#BBBBBB"} vertical />
        <div ref={buttonContainerRef}>
          <CTAButton outline isVisible={isButtonInView}>
            Start Now
          </CTAButton>
        </div>
      </div>

      <div ref={biomarkerContainerRef} className="w-full overflow-x-hidden">
        <BiomarkerBanner isVisible={isBiomarkerInView} />
      </div>
      <div className="mx-auto w-[80%]">
        <LineElement length={"auto"} color={"#BBBBBB"} horizontal />
      </div>
    </section>
  );
};

export default ProtocolSection;
