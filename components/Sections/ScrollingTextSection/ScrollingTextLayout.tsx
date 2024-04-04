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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.clientHeight;

      const totalScroll = documentHeight - windowHeight;
      //const sectionLocation = ScrollingTextLayout.getBoundingClientRect();
      const currentScrollProgress =
        (scrollPosition - totalScroll / documentHeight) * 100;

      console.log(currentScrollProgress);

      setScrollProgress(currentScrollProgress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="relative h-svh"
      style={{ height: `${sectionHeight}px` }}
    >
      <div className="max-w-[1011px] py-[200px]">
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
                  //opacity: scrollProgress > 10 * index ? 1 : 0.1,
                  opacity:
                    scrollProgress >
                    (sectionHeight / sentenceArray.length) * index
                      ? 1
                      : 0.1,
                }}
                transition={{ duration: 0.2 }}
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
