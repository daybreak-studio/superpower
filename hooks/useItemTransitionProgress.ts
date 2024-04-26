import { MotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { useState } from "react";

export interface ItemTransitionProgressInfo {
  index: number;
  total: number;
  progress: MotionValue<number>; // the global progress
  durationProgress?: number;
  clamp?: boolean;
}

/**
 * Extract transition progress(MotionValue) of an item from a collection,
 * with reference to an overall motion value that depicts the overall progress.
 * Particularly useful for scroll interaction.
 *
 * @param param0
 * @returns
 */
export function useItemTransitionProgress({
  index,
  total,
  progress,
  clamp = false,
  durationProgress = 1 / total,
}: ItemTransitionProgressInfo) {
  const progressPosition = index / total;
  const itemProgress = useTransform(
    progress,
    [
      progressPosition - durationProgress,
      progressPosition - 0.05,
      progressPosition + 0.06,
      progressPosition + durationProgress,
    ],
    [-1, 0, 0, 1],
    { clamp: clamp },
  );

  return itemProgress;
}
