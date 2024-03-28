import React, { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useBounds } from "@/hooks/useBounds";
import LineElement from "@/components/LineElement/LineElement";
import { AnimationConfig } from "@/components/AnimationConfig";
import { ProtocolGridRow } from "./ProtocolGridRow";
import { Protocol } from "../Protocols";

export type ProtocolProps = {
  protocols: Protocol[];
};

export type ExpandHandler = (itemIndex: number | null) => void;

const ProtocolGrid = ({ protocols }: ProtocolProps) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  return (
    <div className="my-8 flex w-screen max-w-[1550px] flex-col gap-[14px] px-8">
      <ProtocolGridRow
        protocols={protocols.slice(protocols.length / 2, protocols.length)}
        onExpand={setExpandedRow}
        row={0}
        expandedRow={expandedRow}
      />
      <ProtocolGridRow
        row={1}
        protocols={protocols.slice(0, protocols.length / 2)}
        onExpand={setExpandedRow}
        expandedRow={expandedRow}
      />
    </div>
  );
};

export default ProtocolGrid;
