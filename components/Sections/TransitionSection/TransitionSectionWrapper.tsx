import React, { useState, useEffect, MutableRefObject, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { breakpoints, useBreakpoint } from "@/hooks/useBreakpoints";

type Props = {};

const TransitionSectionWrapper = (props: Props) => {
  const isDesktop = useBreakpoint(breakpoints.lg);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const section = document.querySelector(
      ".relative.h-screen.w-screen.pointer-events-none",
    ) as HTMLElement;
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionBottom = sectionTop + sectionHeight;

    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const viewportCenter = windowHeight / 4;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition <= sectionBottom - viewportCenter
    ) {
      const scrollProgress =
        ((scrollPosition - sectionTop) /
          (sectionHeight - windowHeight + viewportCenter)) *
        100;
      setScrollProgress(scrollProgress);
    } else if (scrollPosition < sectionTop - viewportCenter) {
      setScrollProgress(0);
    } else if (scrollPosition > sectionBottom - viewportCenter) {
      // setScrollProgress(200);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const easedScrollProgress = ease(scrollProgress);

  function ease(t: number) {
    return t * t;
  }

  return (
    <section className="flex h-0 w-full items-end">
      <div className="pointer-events-none relative h-screen w-screen">
        <div className="absolute bottom-0 left-0 h-auto w-full">
          <Image
            src="/transition-section/top.png"
            width="0"
            height="0"
            sizes="100vw"
            className="absolute bottom-0 left-0 w-full mix-blend-hard-light"
            style={{
              height: `${(scrollProgress * window.innerHeight) / 200}px`,
            }} // Adjust the height based on scrollProgress
            alt="transition-bg"
          />
          <Image
            src="/transition-section/mid.png"
            width="0"
            height="0"
            sizes="100vw"
            className="absolute bottom-0 left-0 w-full mix-blend-hard-light"
            style={{
              height: `${(scrollProgress * window.innerHeight) / 200}px`,
            }} // Adjust the height based on scrollProgress
            alt="transition-bg"
          />
          <Image
            src="/transition-section/bot.png"
            width="0"
            height="0"
            sizes="100vw"
            className="absolute bottom-0 left-0 w-full mix-blend-soft-light"
            style={{
              height: `${(scrollProgress * window.innerHeight) / 200}px`,
            }} // Adjust the height based on scrollProgress
            alt="transition-bg"
          />
        </div>
      </div>
    </section>
  );
};

export default TransitionSectionWrapper;
