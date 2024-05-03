import React, { useState, MutableRefObject, useRef } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import CTAButton from "@/components/Button/CTAButton";
import { useMotionValueSwitch } from "@/hooks/useMotionValueSwitch";

type Props = {};
const sentence = // sentence to be displayed, use < to indicate a line break
  "As the world demands more of us, we must command more for ourselves. Protect and prioritize health. < Existing institutions aren’t working and don’t have our backs.";
const sentenceArray = sentence.split(" ");

const ScrollingTextLayout = (props: Props) => {
  const buttonContainerRef = useRef() as MutableRefObject<HTMLDivElement>;

  const paragraphRef = useRef() as MutableRefObject<HTMLHeadingElement>;
  const { scrollYProgress } = useScroll({
    target: paragraphRef,

    // Begin: the start(top) of TARGET touches end(bottom) of CONTAINER
    // End: the near-middle(40%) of TARGET touches middle(50%) of CONTAINER
    offset: ["start end", "40% 50%"],
  });

  const wordCount = sentenceArray.length;
  const [currentWord, setCurrentWord] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setCurrentWord(Math.round(latest * wordCount));
  });

  const shouldShowButton = useMotionValueSwitch(
    scrollYProgress,
    (latest) => latest >= 1,
  );

  return (
    <section className="relative">
      <div className="align-center flex justify-center px-6">
        <div className="flex w-full max-w-[600px] flex-col items-center justify-center gap-[30px] py-[200px] lg:max-w-[1011px] lg:py-[300px] ">
          <p className="font-mono-sm text-center text-[#7B7B7C]">
            What we believe
          </p>
          <h2 className="font-sans-2xl text-center" ref={paragraphRef}>
            {sentenceArray.map((word, index) =>
              word === "<" ? (
                <div key={index}>
                  <br />
                </div>
              ) : (
                <FadingText
                  word={`${word} `}
                  isVisible={currentWord > index}
                  key={index}
                />
              ),
            )}
          </h2>
          <div className="pt-8" ref={buttonContainerRef}>
            <CTAButton outline isVisible={shouldShowButton}>
              Read Our Why
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
};

const FadingText = ({
  word,
  isVisible,
}: {
  word: string;
  isVisible: boolean;
}) => (
  <motion.span
    initial={{ opacity: 0.1, filter: "blur(10px)" }}
    animate={{
      opacity: isVisible ? 1 : 0,
      filter: isVisible ? `blur(0px)` : `blur(10px)`,
    }}
    transition={{ duration: 0.4 }}
  >
    {word}
    {""}
  </motion.span>
);

export default ScrollingTextLayout;
