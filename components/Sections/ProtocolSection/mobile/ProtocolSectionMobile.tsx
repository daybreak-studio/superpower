import React, { useState } from "react";
import { Protocol } from "../Protocols";
import Image from "next/image";
import LineElement from "@/components/LineElement/LineElement";
import { useBounds } from "@/hooks/useBounds";
import { useElementScrollProgress } from "@/hooks/useElementScrollProgress";
import ProtocolListItem from "./ProtocolListItem";
import { useMotionValueEvent } from "framer-motion";

type Props = {
  protocols: Protocol[];
};

const ProtocolSectionMobile = ({ protocols }: Props) => {
  const [containerRef, progress] = useElementScrollProgress<HTMLDivElement>();
  const [currentProtocol, setCurrentProtocol] = useState(0);

  useMotionValueEvent(progress, "change", (latest) => {
    const withOffset = latest + 0.5;
    const currentItem = Math.round(withOffset * protocols.length);
    setCurrentProtocol(currentItem);
  });

  return (
    <div className="mt-32 h-[200vh]">
      <div className="flex flex-col items-center" ref={containerRef}>
        {protocols.map((protocol, index) => {
          const isLastItem = index === protocols.length - 1;

          return (
            <div key={index} className="-z-10 mb-2">
              <ProtocolListItem
                protocol={protocol}
                isCurrent={currentProtocol === index}
              />
              <LineElement
                length={8}
                color={isLastItem ? "" : "#BBBBBB"}
                vertical
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProtocolSectionMobile;
