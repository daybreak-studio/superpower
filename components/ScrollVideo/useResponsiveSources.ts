import { useAllBreakpoints, useBreakpointValues } from "@/hooks/useBreakpoints";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import React, { useMemo } from "react";

export interface VideoSource {
  type: "video/mp4" | "video/webm";
  src: string;
  width: number;
  height: number;
}

export default function useResponsiveSources(sources: VideoSource[]) {
  const { width: windowWidth } = useWindowDimension();

  const sourcesSortedByWidth = useMemo(
    () => sources.sort((srcA, srcB) => srcA.width - srcB.width),
    [sources],
  );

  const currentSource = useMemo(() => {
    if (sourcesSortedByWidth.length === 0) {
      throw "No source provided";
    }

    let bestSrc: VideoSource = sourcesSortedByWidth[0];

    for (let i = 0; i < sourcesSortedByWidth.length; i++) {
      const currSrc = sourcesSortedByWidth[i];
      if (
        // progressively see if the better source apply
        currSrc.width < windowWidth &&
        currSrc.width > bestSrc.width
      ) {
        bestSrc = currSrc;
      }
    }
    return bestSrc;
  }, [sourcesSortedByWidth, windowWidth]);

  return currentSource;
}
