"use client";

import { useBounds } from "@/hooks/useBounds";
import {
  motion,
  useAnimate,
  useAnimation,
  useSpring,
  useTransform,
} from "framer-motion";
import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { AnimationConfig } from "../AnimationConfig";

type Props = {
  children: React.ReactNode;
  onChange?: (currentPage: number) => void;
  currentPage: number;
};

const PageSelectorContext = createContext({
  currentPage: 0,
  setCurrentPage: (page: number) => {},
  currentBottonBounds: { offsetX: 0, offsetY: 0, width: 0, height: 0 },
  setCurrentButtonBounds: (bounds: {
    offsetX: number;
    offsetY: number;
    width: number;
    height: number;
  }) => {},
  setCurrentColor: (color: string) => {},
});

const FloatingPageSelector = ({
  children,
  onChange,
  currentPage: suggestedCurrentPage = 0,
}: Props) => {
  const [currentPage, setCurrentPage] = useState(suggestedCurrentPage);
  const [containerRef, containerBounds] = useBounds<HTMLDivElement>([]);
  const [currentBottonBounds, setCurrentButtonBounds] = useState({
    offsetX: 0,
    offsetY: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setCurrentPage(suggestedCurrentPage);
  }, [suggestedCurrentPage]);

  const [currentColor, setCurrentColor] = useState("#000");

  const xOffset = useSpring(0, { stiffness: 1500, damping: 100 });
  const xOffsetRound = useTransform(xOffset, (latest) => Math.round(latest));

  const highlightAnim = useAnimation();
  const highlightAnimWithColor = useAnimation();
  useEffect(() => {
    const anim = {
      width: Math.round(currentBottonBounds.width),
      x: Math.round(currentBottonBounds.offsetX - containerBounds.left),
    };

    xOffset.set(anim.x);

    highlightAnim.start({
      width: anim.width,
      transition: {
        duration: AnimationConfig.NORMAL,
        ease: AnimationConfig.EASING,
      },
    });

    highlightAnimWithColor.start({
      width: anim.width,
      backgroundColor: currentColor,
      transition: {
        duration: AnimationConfig.NORMAL,
        ease: AnimationConfig.EASING,
      },
    });
  }, [
    highlightAnimWithColor,
    containerBounds,
    currentBottonBounds,
    highlightAnim,
    xOffset,
    currentColor,
  ]);

  useEffect(() => {
    onChange?.(currentPage);
  }, [currentPage, onChange]);

  // const x = useTransform((highlightAnim) => Math.round);

  return (
    <PageSelectorContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        currentBottonBounds,
        setCurrentButtonBounds,
        setCurrentColor,
      }}
    >
      <div
        className="relative w-fit rounded-full border border-[rgba(0,0,0,.05)] bg-[#fff] px-1 py-1"
        ref={containerRef}
      >
        <motion.div className="absolute left-0 top-6 -z-20 h-full w-full rounded-full bg-zinc-700 opacity-10 blur-lg" />
        <motion.div
          className="mix-blend-invert absolute left-0 top-2 -z-10 h-full rounded-full bg-vermilion-900 opacity-50 blur-xl"
          animate={highlightAnimWithColor}
          style={{
            x: xOffsetRound,
          }}
        />
        <motion.div
          className="absolute bottom-1 left-0 top-1 z-0 rounded-full bg-vermilion-900"
          animate={highlightAnimWithColor}
          style={{
            x: xOffsetRound,
          }}
        />
        <div className="relative flex">
          <motion.div
            className="absolute inset-0  h-full backdrop-invert"
            animate={highlightAnim}
            style={{
              x: xOffsetRound,
              zIndex: 0,
            }}
          />
          <div
            className="flex"
            style={{
              zIndex: 1,
            }}
          >
            {children}
          </div>
          <motion.div
            className="absolute inset-0 h-full backdrop-invert"
            animate={highlightAnim}
            style={{
              x: xOffsetRound,
              zIndex: 3,
            }}
          />
        </div>
      </div>
    </PageSelectorContext.Provider>
  );
};

type FloatingPageSelectorItemProps = {
  children: React.ReactNode;
  pageIndex: number;
  color: string;
};

const FloatingPageSelectorItem = ({
  children,
  pageIndex,
  color = "#000",
}: FloatingPageSelectorItemProps) => {
  const {
    currentPage,
    setCurrentPage,
    setCurrentColor,
    setCurrentButtonBounds,
  } = useContext(PageSelectorContext);
  const [buttonRef, bounds] = useBounds<HTMLButtonElement>([]);
  const isCurrent = currentPage === pageIndex;

  useEffect(() => {
    if (pageIndex === 0) {
      setCurrentPage(0);
      setCurrentColor(color);
      setCurrentButtonBounds({
        offsetX: bounds.x,
        offsetY: bounds.y,
        width: bounds.width,
        height: bounds.height,
      });
    }
  }, []);

  useEffect(() => {
    if (isCurrent) {
      setCurrentColor(color);
      setCurrentButtonBounds({
        offsetX: bounds.x,
        offsetY: bounds.y,
        width: bounds.width,
        height: bounds.height,
      });
    }
  }, [
    bounds.height,
    bounds.width,
    bounds.x,
    bounds.y,
    isCurrent,
    setCurrentButtonBounds,
    color,
    setCurrentColor,
  ]);

  return (
    <motion.button
      ref={buttonRef}
      className="font-sans-sm relative flex flex-row items-center gap-2 rounded-full px-4 py-3 leading-none text-zinc-900 duration-300 hover:opacity-30"
      animate={{
        color: isCurrent ? "black" : "",
        //@ts-ignore
        "--invert-color": isCurrent ? 1 : 0,
      }}
      whileTap={{
        scale: 0.95,
      }}
      onClick={() => {
        setCurrentPage(pageIndex);
      }}
    >
      {children}
    </motion.button>
  );
};

export { FloatingPageSelector, FloatingPageSelectorItem };
