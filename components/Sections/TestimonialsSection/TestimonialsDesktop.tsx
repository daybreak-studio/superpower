import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TestimonialsSelector from "./TestimonialsSelector";
import CornerBox from "@/components/Button/CornerBox";

type props = {
  quotesList: { quote: string; name: string; title: string }[];
  intervalTime: number;
  clapTime: number;
};

const TestimonialsDesktop = ({ quotesList, intervalTime, clapTime }: props) => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotesList.length);
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <AnimatePresence>
        <motion.div
          className="relative flex items-center justify-center overflow-hidden"
          initial={{
            maxWidth: 624,
            height: 500,
          }}
          animate={{
            maxWidth: [624, 0, 0, 624],
            height: [500, 0, 0, 500],
          }}
          exit={{
            maxWidth: 624,
            height: 500,
          }}
          transition={{
            duration: clapTime / 1000,
            repeat: Infinity,
            repeatDelay: intervalTime / 1000 - clapTime / 1000,
            delay: intervalTime / 1000 - clapTime / 1000 / 2,
            times: [0, 0.4, 0.6, 1],
          }}
        >
          <CornerBox cornerSize={20} cornerColor={"#000"} />
          <div className="flex min-h-[500px] min-w-[624px] flex-col flex-wrap items-center justify-between p-4 text-center">
            <div className="flex gap-3">
              {quotesList.map((quote, index) => (
                <TestimonialsSelector
                  key={index}
                  active={index === quoteIndex}
                />
              ))}
            </div>
            <p className="font-sans-4xl mx-4 mb-6 max-w-[20ch] text-center">
              {quotesList[quoteIndex].quote}
            </p>
            <p className="font-mono-sm text-center">
              {quotesList[quoteIndex].name}, {quotesList[quoteIndex].title}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TestimonialsDesktop;
