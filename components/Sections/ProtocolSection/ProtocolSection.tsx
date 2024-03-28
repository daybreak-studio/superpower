import React from "react";
import ProtocolSectionDesktop from "./desktop/ProtocolSectionDesktop";
import { PROTOCOLS } from "./Protocols";
import { breakpoints, useBreakpoint } from "@/hooks/useBreakpoints";
import ProtocolSectionMobile from "./mobile/ProtocolSectionMobile";
import Scrim from "@/components/Scrim/Scrim";

type Props = {};

const ProtocolSection = (props: Props) => {
  const isDesktop = useBreakpoint(breakpoints.md);

  return (
    <section>
      <div
        className="flex flex-col items-center bg-white pt-16"
        style={{
          position: isDesktop ? "relative" : "sticky",
          top: 0,
          height: "fit-content",
        }}
      >
        <div className="font-mono-sm mx-4 mb-4 text-center">
          Unleashing the Superpower
        </div>
        <h2 className="font-sans-4xl mx-4 mb-6 max-w-[16ch] text-center">
          Finally, healthcare that looks at the whole you
        </h2>
        <p className="font-sans-lg mx-4 mb-6 max-w-[40ch] text-center opacity-50">
          A revolutionary approach to health, starting with over 60 advanced lab
          tests and a custom action plan.
        </p>
        <Scrim height={"64px"} />
      </div>

      {isDesktop && <ProtocolSectionDesktop protocols={PROTOCOLS} />}
      {!isDesktop && <ProtocolSectionMobile protocols={PROTOCOLS} />}
    </section>
  );
};

export default ProtocolSection;
