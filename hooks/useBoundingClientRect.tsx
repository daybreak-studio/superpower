import {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

type BoundingBoxInfo = {
  x: number;
  y: number;
  width: number;
  height: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
};

/**
 *
 * A state that measures the size of an HTML element
 *
 * Example:
 *
 * const [elmRef, elmBounds] = useBoundingClientRect<HTMLDivElement>([]);
 * return <div ref={elmRef}></div>;
 *
 * @param dependency
 * @returns [containerRef, bounds]
 */
export function useBoundingClientRect<T extends HTMLElement>(
  dependency?: any[],
): [MutableRefObject<T>, BoundingBoxInfo] {
  const containerRef = useRef<T>() as MutableRefObject<T>;
  const [bounds, setBounds] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  });

  useLayoutEffect(() => {
    const handleResize = () => {
      const bounds = containerRef.current.getBoundingClientRect();
      setBounds(bounds);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, dependency);

  return [containerRef, bounds];
}
