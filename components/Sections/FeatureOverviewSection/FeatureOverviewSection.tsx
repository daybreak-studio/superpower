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
          playbackConst={400}
          onLowPowerModeDetected={() => setIsLowPowerMode(true)}
          headline={"Meet the world's most comprehensive digital clinic."}
        >
          <source
            type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
            src="/ipad-section/transition.mp4"
          />
        </FeatureScrollVideo>
      )}

      {isLowPowerMode && <div></div>}
    </section>
  );
};

export default FeatureOverviewSection;
