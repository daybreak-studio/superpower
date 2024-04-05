import React, { useState, useEffect, MutableRefObject, useRef } from "react";
import { motion, useInView } from "framer-motion";
import CTAButton from "@/components/Button/CTAButton";

type Props = {};
const sentence = // sentence to be displayed, use < to indicate a line break
  "As the world demands more of us, we must command more for ourselves. Protect and prioritize health. < Existing institutions aren’t working and don’t have our backs.";
const sentenceArray = sentence.split("");

const ScrollingTextLayout = (props: Props) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const buttonContainerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const isButtonInView = useInView(buttonContainerRef);

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
          (sectionHeight - windowHeight + viewportCenter)) *
        100;
      console.log(scrollProgress);
      setScrollProgress(scrollProgress);
    } else if (scrollPosition < sectionTop - viewportCenter) {
      setScrollProgress(0);
    } else if (scrollPosition > sectionBottom - viewportCenter) {
      setScrollProgress(100);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-svh">
      <div className="align-center flex justify-center px-6">
        <div className="flex w-full max-w-[600px] flex-col items-center justify-center gap-[30px] py-[200px] lg:max-w-[1011px] lg:py-[500px] ">
          <p className="font-mono-sm text-center text-[#7B7B7C]">
            What we believe
          </p>
          <h2 className="font-sans-2xl text-center">
            {sentenceArray.map((word, index) =>
              word === "<" ? (
                <div key={index}>
                  <br />
                </div>
              ) : word === " " ? (
                " "
              ) : (
                <motion.span
                  key={index}
                  initial={{ opacity: 0.1, filter: "blur(10px)" }}
                  animate={{
                    opacity:
                      scrollProgress > (100 / sentenceArray.length) * index
                        ? 1
                        : 0.1,
                    filter:
                      scrollProgress > (100 / sentenceArray.length) * index
                        ? "blur(0px)"
                        : "blur(10px)",
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {word}
                  {""}
                </motion.span>
              ),
            )}
          </h2>
          <div className="pt-8" ref={buttonContainerRef}>
            <CTAButton outline isVisible={isButtonInView}>
              Get Started
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollingTextLayout;
