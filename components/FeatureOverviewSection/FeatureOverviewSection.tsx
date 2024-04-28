"use client";

import FeatureScrollVideo from "@/components/ScrollVideo/FeatureScrollVideo";
import React, { MutableRefObject, useRef, useState } from "react";

type Props = {};

const FeatureOverviewSection = (props: Props) => {
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);

  return (
    <section className="relative flex min-h-screen w-full">
      {!isLowPowerMode && (
        <FeatureScrollVideo
          playbackConst={400}
          onLowPowerModeDetected={() => setIsLowPowerMode(true)}
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
