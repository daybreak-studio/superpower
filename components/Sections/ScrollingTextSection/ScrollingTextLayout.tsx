import React, { useState, useEffect, MutableRefObject, useRef } from "react";
import { breakpoints, useBreakpoint } from "@/hooks/useBreakpoints";
import LineElement from "@/components/LineElement/LineElement";
import { motion, useInView } from "framer-motion";

type Props = {};
const sectionHeight = window.innerHeight * 1.3;
const sentence =
  "As the world demands more of us, we must command more for ourselves. Protect and prioritize health. <br> Existing institutions aren’t working and don’t have our backs";
const sentenceArray = sentence.split(" ");

const ScrollingTextLayout = (props: Props) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const section = document.querySelector(".relative.h-svh") as HTMLElement;
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionBottom = sectionTop + sectionHeight;

    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const viewportCenter = windowHeight / 2;

    if (
      scrollPosition >= sectionTop - viewportCenter &&
      scrollPosition <= sectionBottom - viewportCenter
    ) {
      const scrollProgress =
        ((scrollPosition - (sectionTop - viewportCenter)) /
          (sectionHeight - windowHeight)) *
        100;
      console.log(scrollProgress);
      setScrollProgress(scrollProgress);
    } else if (scrollPosition < sectionTop - viewportCenter) {
      setScrollProgress(0);
    } else if (scrollPosition > sectionBottom - windowHeight - viewportCenter) {
      setScrollProgress(100);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="relative h-svh"
      style={{ height: `${sectionHeight}px` }}
    >
      <div className="max-w-[1011px] py-[300px]">
        <h2 className="font-sans-2xl text-center">
          {sentenceArray.map((word, index) =>
            word === "<br>" ? (
              <div key={index}>
                <br />
              </div>
            ) : (
              <motion.span
                key={index}
                initial={{ opacity: 0.1 }}
                animate={{
                  opacity:
                    scrollProgress > (100 / sentenceArray.length) * index
                      ? 1
                      : 0.1,
                }}
                transition={{ duration: 0.1 }}
              >
                {word}{" "}
              </motion.span>
            ),
          )}
        </h2>
      </div>
    </section>
  );
};

export default ScrollingTextLayout;
