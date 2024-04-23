"use client";

import React, { useLayoutEffect } from "react";
import { createContext, useContext, useEffect, useState } from "react";

const WindowDimensionContext = createContext({ width: 0, height: 0 });

type Props = { children: React.ReactNode };

export const WindowDimensionContextProvider = ({ children }: Props) => {
  const [dim, setDim] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDim = () => {
      setDim({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    updateDim();
    window.addEventListener("resize", updateDim);
    return () => window.removeEventListener("resize", updateDim);
  }, []);

  return (
    <WindowDimensionContext.Provider value={dim}>
      {children}
    </WindowDimensionContext.Provider>
  );
};

/**
 *
 * A state the captures the window size (width, height)
 *
 * Usage:
 * const {width, height} = useWindowDimension();
 *
 * @returns
 * {width, height}
 * 
 */
export const useWindowDimension = () => useContext(WindowDimensionContext);
