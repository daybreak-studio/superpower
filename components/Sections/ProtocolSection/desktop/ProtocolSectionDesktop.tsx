import LineElement from "@/components/LineElement/LineElement";
import React from "react";
import ProtocolGrid from "./ProtocolGrid";
import { Protocol } from "../Protocols";

type Props = {
  protocols: Protocol[];
};

const ProtocolSectionDesktop = ({ protocols }: Props) => {
  return (
    <div className="mb-12">
      <LineElement length={48} color={"#BBBBBB"} vertical />
      <ProtocolGrid protocols={protocols} />
    </div>
  );
};

export default ProtocolSectionDesktop;
