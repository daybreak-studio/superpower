import React, { useState, MutableRefObject, useRef } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import CTAButton from "@/components/Button/CTAButton";
import { useMotionValueSwitch } from "@/hooks/useMotionValueSwitch";

type Props = {};
const sentence = // sentence to be displayed, use < to indicate a line break
  "We believe that if you improve your health, you can improve every other aspect of your life. < But mainstream medicine hasn’t helped many of us do that. It ignores red flags, reacts too late, and misses the full picture. < Our vision of the future is a completely different way of looking at health. A system where proactive health is the norm. Where it’s easy to slow aging and prevent disease. Where our food and environments are default healthy and toxin free. Where everyone is able to reach their peak potential. < It’s time to unleash your inner Superpower.";
const ogSentenceArray = sentence.split(" ");
const sentenceArray = ogSentenceArray.concat("Read our manifesto.");

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
        <div className="flex w-full max-w-[600px] flex-col items-center justify-center gap-[30px] py-[200px] lg:max-w-[670px] lg:py-[300px] ">
          <h2 className="font-sans-2xl mx-4 mb-6 max-w-[10ch] text-center">
            For people who want more
          </h2>
          <h2
            className="font-sans-xl text-center text-[#5a5a5a]"
            ref={paragraphRef}
          >
            {sentenceArray.map((word, index) =>
              word === "<" ? (
                <div key={index}>
                  <br />
                </div>
              ) : index === sentenceArray.length - 1 ? (
                <div key={index}>
                  <a
                    className="cursor-pointer underline duration-300 hover:text-[#FC5F2B]"
                    href="https://www.superpower.com/manifesto"
                    target="_blank"
                  >
                    <FadingText
                      word={`${word} `}
                      isVisible={currentWord > index}
                      key={index}
                    />
                  </a>
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
              Join the waitlist
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
