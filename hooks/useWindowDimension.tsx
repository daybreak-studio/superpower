"use client";

import React, { useLayoutEffect, useRef } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";

const WindowDimensionContext = createContext({
  width: 0,
  height: 0,
  isResizing: false,
});

type Props = { children: React.ReactNode };

export const WindowDimensionContextProvider = ({ children }: Props) => {
  const [dim, setDim] = useState({ width: 0, height: 0 });
  const [debouncedDim, setDebouncedDim] = useDebounceValue(
    { width: 0, height: 0 },
    500,
  );
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    setIsResizing(false);
  }, [debouncedDim]);

  useEffect(() => {
    const updateDim = () => {
      setDim({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      setDebouncedDim({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      setIsResizing(true);
    };
    updateDim();
    window.addEventListener("resize", updateDim);
    return () => window.removeEventListener("resize", updateDim);
  }, [setDebouncedDim]);

  return (
    <WindowDimensionContext.Provider value={{ ...dim, isResizing }}>
      {children}
    </WindowDimensionContext.Provider>
  );
};

/**
 *
 * A state the capture the window size (width, height)
 *
 * Usage:
 * const {width, height} = useWindowDimension();
 *
 * @returns
 */
export const useWindowDimension = () => useContext(WindowDimensionContext);
