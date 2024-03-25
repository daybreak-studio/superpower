import React, { createContext, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { MotionValue, motion, useMotionValue, useScroll } from "framer-motion";
import { useBounds } from "@/hooks/useBounds";
import { AnimationConfig } from "../AnimationConfig";

type ItemProps = {
  children: React.ReactNode;
  scrollHeight: number;
};

const StickySlideItemContext = createContext({
  progress: new MotionValue<number>(),
});

/**
 * Sub components inside a StickySlideItem could use this
 * hook to access the scroll progress of the slide.
 * @returns
 */
export const useSlideProgress = () =>
  useContext(StickySlideItemContext).progress;

export const StickySlideItem = ({ children, scrollHeight }: ItemProps) => {
  const { scrollY } = useScroll();
  const progress = useMotionValue(0);

  const [containerBounds, bounds] = useBounds<HTMLDivElement>([scrollHeight]);
  const [isScrollPlaceholderInView, setIsIsScrollPlaceholderInView] =
    useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isScrollPlaceholderInView) return;

    const updateActiveState = () => {
      const y = scrollY.get();
      if (y >= bounds.top && y <= bounds.bottom) {
        progress.set((y - bounds.top) / bounds.height);
        setIsActive(true);
        return;
      }
      setIsActive(false);
    };

    updateActiveState();

    const cleanup = scrollY.on("change", updateActiveState);
    return () => {
      cleanup();
    };
  }, [isScrollPlaceholderInView, bounds]);

  return (
    <motion.div
      className="-z-10"
      ref={containerBounds}
      style={{ height: scrollHeight }}
      onViewportEnter={() => setIsIsScrollPlaceholderInView(true)}
      onViewportLeave={() => setIsIsScrollPlaceholderInView(false)}
    >
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{
          opacity: isActive ? 1 : 0,
          transition: {
            duration: AnimationConfig.NORMAL,
            ease: "linear",
          },
        }}
      >
        <StickySlideItemContext.Provider value={{ progress }}>
          {/* <Image
            className="fixed inset-0 h-screen w-full object-cover"
            src={src}
            alt={alt}
            width={width}
            height={height}
          /> */}
          {children}
        </StickySlideItemContext.Provider>
      </motion.div>
    </motion.div>
  );
};

type ContainerProps = {
  children: React.ReactNode;
};
export const StickySlide = ({ children }: ContainerProps) => {
  // a extra screen height padding for the last item
  return <div className="min-h-screen pb-[100vh]">{children}</div>;
};
