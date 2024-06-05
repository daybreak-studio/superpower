"use client";

import FeatureScrollVideo from "@/components/Sections/FeatureOverviewSection/FeatureScrollVideo";
import React, { MutableRefObject, useRef, useState } from "react";
import FeatureOverviewNav from "./FeatureOverviewNav";

type Props = {};

const FeatureOverviewSection = (props: Props) => {
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);

  return (
    <section className="relative z-10 flex w-full">
      {!isLowPowerMode && (
        <FeatureScrollVideo
          playbackConst={1300}
          onLowPowerModeDetected={() => setIsLowPowerMode(true)}
          headline={"The most complete picture of your health you’ve ever had"}
        />
      )}

      {isLowPowerMode && <div></div>}
    </section>
  );
};

export default FeatureOverviewSection;
