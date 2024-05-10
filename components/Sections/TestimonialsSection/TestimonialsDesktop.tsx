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
import Image from "next/image";

type Props = {
  clapTime: number;
  intervalTime: number;
  isVisible?: boolean;
  quotesList: { quote: string; name: string; title: string; photo: string }[];
};

const TestimonialsDesktop = ({
  clapTime,
  intervalTime,
  isVisible = true,
  quotesList,
}: Props) => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const inViewDelayBox = 0.4;
  const inViewDelayContent = 0.6;

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotesList.length);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [intervalTime, quotesList.length]);

  return (
    <motion.div
      className="flex items-center justify-center overflow-hidden"
      // initial={{
      //   width: 0,
      //   height: 0,
      // }}
      // animate={{
      //   width: isVisible ? "auto" : 0,
      //   height: isVisible ? "auto" : 0,
      //   transition: {
      //     duration: AnimationConfig.VERY_SLOW,
      //     ease: AnimationConfig.EASING_IN_OUT,
      //     delay: isVisible ? inViewDelayBox : 0,
      //   },
      // }}
    >
      <AnimatePresence>
        <motion.div
          className="relative flex items-center justify-center overflow-hidden"
          initial={{
            width: 624,
            // height: 500,
          }}
          animate={{
            width: [624, 0, 0, 624],
            // height: [500, 0, 0, 500],
          }}
          exit={{
            width: 624,
            // height: 500,
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
          <CornerBox cornerSize={20} cornerColor={"#000"} />
          <motion.div
            className="flex min-h-[500px] min-w-[700px] flex-col flex-wrap items-center justify-between p-4 text-center"
            // initial={{
            //   opacity: 0,
            // }}
            // animate={{
            //   opacity: isVisible ? [0, 1, 0, 1] : 0,
            //   transition: {
            //     duration: AnimationConfig.NORMAL,
            //     ease: "linear",
            //     delay: isVisible
            //       ? AnimationConfig.FAST + inViewDelayContent
            //       : 0,
            //   },
            // }}
          >
            <div className="flex gap-3">
              {quotesList.map((quote, index) => (
                <TestimonialsSelector
                  key={index}
                  active={index === quoteIndex}
                  size={12}
                />
              ))}
            </div>
            <p className="font-sans-2xl mx-4 mb-6 max-w-[20ch] text-center">
              {quotesList[quoteIndex].quote}
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="relative h-8 w-8 overflow-hidden rounded-full">
                <Image
                  src={quotesList[quoteIndex].photo}
                  alt={quotesList[quoteIndex].name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <p className="font-mono-sm text-center">
                {quotesList[quoteIndex].name}, {quotesList[quoteIndex].title}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default TestimonialsDesktop;
