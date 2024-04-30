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
});

const FloatingPageSelector = ({ children }: Props) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [containerRef, containerBounds] = useBounds<HTMLDivElement>([]);
  const [currentBottonBounds, setCurrentButtonBounds] = useState({
    offsetX: 0,
    offsetY: 0,
    width: 0,
    height: 0,
  });

  const xOffset = useSpring(0, { stiffness: 1500, damping: 100 });
  const xOffsetRound = useTransform(xOffset, (latest) => Math.round(latest));

  const highlightAnim = useAnimation();
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
  }, [containerBounds, currentBottonBounds, highlightAnim, xOffset]);

  // const x = useTransform((highlightAnim) => Math.round);

  return (
    <PageSelectorContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        currentBottonBounds,
        setCurrentButtonBounds,
      }}
    >
      <div
        className="relative w-fit rounded-full border border-[rgba(0,0,0,.05)] bg-[#F9F8F8] px-1 py-1"
        ref={containerRef}
      >
        <motion.div className="absolute left-0 top-6 -z-20 h-full w-full rounded-full bg-zinc-500 opacity-10 blur-xl" />
        <motion.div
          className="mix-blend-invert absolute left-0 top-2 -z-10 h-full rounded-full bg-vermilion-900 opacity-30 blur-lg"
          animate={highlightAnim}
          style={{
            x: xOffsetRound,
          }}
        />
        <motion.div
          className="absolute bottom-1 left-0 top-1 z-0 rounded-full bg-vermilion-900"
          animate={highlightAnim}
          style={{
            x: xOffsetRound,
          }}
        />
        <div className="flex">
          <motion.div
            className="bg-zinc-0 absolute left-0 top-0 z-0 h-full backdrop-invert"
            animate={highlightAnim}
            style={{
              x: xOffsetRound,
            }}
          />
          {children}
          <motion.div
            className="bg-zinc-0 absolute left-0 top-0 z-0 h-full backdrop-invert"
            animate={highlightAnim}
            style={{
              x: xOffsetRound,
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
};

const FloatingPageSelectorItem = ({
  children,
  pageIndex,
}: FloatingPageSelectorItemProps) => {
  const { currentPage, setCurrentPage, setCurrentButtonBounds } =
    useContext(PageSelectorContext);
  const [buttonRef, bounds] = useBounds<HTMLButtonElement>([]);
  const isCurrent = currentPage === pageIndex;

  useEffect(() => {
    if (pageIndex === 1) {
      setCurrentPage(1);
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
  ]);

  return (
    <motion.button
      ref={buttonRef}
      className="font-sans-sm relative flex flex-row items-center gap-2 rounded-full px-4 py-3 leading-none text-zinc-900"
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
