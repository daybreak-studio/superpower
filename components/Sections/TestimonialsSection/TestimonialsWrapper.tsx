import React from "react";
import LineElement from "@/components/LineElement/LineElement";
import TestimonialsSelector from "./TestimonialsSelector";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {};
const quotes = [
  {
    quote: "Changed my life forever.",
    author: "Vinay hiremath, Co-counder of loom",
  },
  {
    quote: "The best thing since sliced bread",
    author: "Kiran Patel",
  },
  {
    quote: "Hello there! This is a longer quote",
    author: "discwdicnwis",
  },
];

const TestimonialsWrapper = (props: Props) => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const interval = 2000;

  setTimeout(() => {
    setQuoteIndex((quoteIndex + 1) % quotes.length);
  }, interval);

  return (
    <div>
      <div className="absolute flex h-full w-full flex-col items-center justify-center gap-6">
        <div className="flex h-full">
          <LineElement length={"auto"} color={"#bbb"} vertical tail={16} />
        </div>

        <div className="flex w-full flex-row items-center justify-center gap-12">
          <div className="flex w-full flex-row">
            <LineElement length={"auto"} color={"#bbb"} horizontal tail={16} />
          </div>
          <AnimatePresence>
            <motion.div
              className="flex h-full w-full items-center justify-center overflow-hidden"
              initial={{
                maxWidth: 624,
                maxHeight: 500,
              }}
              animate={{
                maxWidth: [624, 0, 624],
                maxHeight: [500, 0, 500],
              }}
              exit={{
                maxWidth: 624,
                maxHeight: 500,
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatDelay: 1.4,
                delay: 1.7,
              }}
            >
              <div className="flex min-h-[250px] min-w-96 flex-col flex-wrap items-center justify-between p-4 text-center lg:min-h-[500px] lg:min-w-[624px]">
                <div className="flex gap-3">
                  {quotes.map((quote, index) =>
                    index === quoteIndex ? (
                      <TestimonialsSelector key={index} active={true} />
                    ) : (
                      <TestimonialsSelector key={index} />
                    ),
                  )}
                </div>
                <p className="font-sans-4xl mx-4 mb-6 max-w-[20ch] text-center">
                  {quotes[quoteIndex].quote}
                </p>
                <p className="font-mono-sm text-center">
                  {quotes[quoteIndex].author}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex w-full flex-row">
            <LineElement length={"auto"} color={"#bbb"} horizontal head={16} />
          </div>
        </div>

        <div className="flex h-full">
          <LineElement length={"auto"} color={"#bbb"} vertical head={16} />
        </div>
      </div>
    </div>
  );
};

export default TestimonialsWrapper;
