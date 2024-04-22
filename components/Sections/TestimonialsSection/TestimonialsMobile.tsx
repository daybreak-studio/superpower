import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValueEvent,
  useSpring,
  useTransform,
  easeIn,
  easeOut,
} from "framer-motion";
import TestimonialsSelector from "./TestimonialsSelector";
import CornerBox from "@/components/Button/CornerBox";
import { AnimationConfig } from "@/components/AnimationConfig";

type Props = {
  clapTime: number;
  intervalTime: number;
  isVisible?: boolean;
  quotesList: { quote: string; name: string; title: string }[];
};

const TestimonialsMobile = ({
  clapTime,
  intervalTime,
  isVisible = true,
  quotesList,
}: Props) => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const inViewDelayBox = 1;
  const inViewDelayContent = 1.2;

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotesList.length);
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="flex items-center justify-center overflow-hidden"
      initial={{
        height: 0,
      }}
      animate={{
        height: isVisible ? "auto" : 0,
        transition: {
          duration: AnimationConfig.VERY_SLOW,
          ease: AnimationConfig.EASING_IN_OUT,
          delay: isVisible ? inViewDelayBox : 0,
        },
      }}
    >
      <div>
        <AnimatePresence>
          <motion.div
            className="relative flex w-full items-center justify-center overflow-hidden"
            initial={{
              height: 380,
            }}
            animate={{
              height: [380, 0, 0, 380],
            }}
            exit={{
              height: 380,
            }}
            transition={{
              duration: clapTime / 1000,
              repeat: Infinity,
              repeatDelay: intervalTime / 1000 - clapTime / 1000,
              delay: intervalTime / 1000 - clapTime / 1000 / 2,
              times: [0, 0.4, 0.6, 1],
              ease: [easeIn, easeIn, easeOut, easeOut],
            }}
          >
            <CornerBox cornerSize={12} cornerColor={"#000"} />
            <motion.div
              className="flex min-h-[380px] min-w-[330px] flex-col flex-wrap items-center justify-evenly p-4 text-center"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: isVisible ? [0, 1, 0, 1] : 0,
                transition: {
                  duration: AnimationConfig.NORMAL,
                  ease: "linear",
                  delay: isVisible
                    ? AnimationConfig.FAST + inViewDelayContent
                    : 0,
                },
              }}
            >
              <div className="flex gap-2">
                {quotesList.map((quote, index) => (
                  <TestimonialsSelector
                    key={index}
                    active={index === quoteIndex}
                    size={8}
                  />
                ))}
              </div>
              <p className="font-sans-4xl mx-4 mb-6 max-w-[20ch] text-center">
                {quotesList[quoteIndex].quote}
              </p>
              <p className="font-mono-sm text-center">
                {quotesList[quoteIndex].name},
                <br />
                {quotesList[quoteIndex].title}
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TestimonialsMobile;
