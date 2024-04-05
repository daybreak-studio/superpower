import React, { MutableRefObject, useRef } from "react";
import ProtocolSectionDesktop from "../desktop/ProtocolSectionDesktop";
import { PROTOCOLS } from "../Protocols";
import { breakpoints, useBreakpoint } from "@/hooks/useBreakpoints";
import ProtocolSectionMobile from "../mobile/ProtocolSectionMobile";
import Scrim from "@/components/Scrim/Scrim";
import LineElement from "@/components/LineElement/LineElement";
import CTAButton from "@/components/Button/CTAButton";
import { useInView } from "framer-motion";
import { PROTOCOLBANNERLIST } from "./ProtocolBannerList";

type Props = {};

const colors = [
  "#FFD6A5",
  "#26936B",
  "#A36200",
  "#B90090",
  "#FC5F2B",
  "#3F3F46",
  "#FF68DE",
  "#F7861E",
];

const ProtocolBanner = (props: Props) => {
  const shuffledList = PROTOCOLBANNERLIST.sort(() => Math.random() - 0.5);

  return (
    <div className="relative flex flex-row">
      {shuffledList.map((item, index) => {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        return (
          <div
            key={index}
            className="relative left-0 top-0 h-full w-full bg-gradient-conic"
            style={{
              color: randomColor,
            }}
          >
            {item}
          </div>
        );
      })}
      <h1>Hi!</h1>
    </div>
  );
};

export default ProtocolBanner;
