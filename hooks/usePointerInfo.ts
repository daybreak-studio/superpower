import { useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import { BoundingBoxInfo } from "./useBounds";

/**
 * Returns MotionValues that tracks the clientX, and clientY of the mouse position.
 *
 * @param shouldTrack
 * @param boundingBox
 * @returns
 */
export function usePointerOffset(
  shouldTrack: boolean,
  boundingBox: BoundingBoxInfo,
) {
  const pointer = usePointerPosition(shouldTrack);

  const x = useTransform(pointer.x, (latest) => {
    return latest - boundingBox.left;
  });
  const y = useTransform(pointer.y, (latest) => {
    return latest - boundingBox.top;
  });

  return { x, y };
}

/**
 * Just like usePointerPosition, but you feed in the pointer bounding box.
 * @param containerRef
 * @param dependency
 * @returns
 */
export function usePointerPosition(shouldTrack: boolean) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [x, y, shouldTrack]);

  return { x, y };
}
