import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LineElement from "@/components/LineElement/LineElement";
import TestimonialsSelector from "./TestimonialsSelector";
import Corner from "@/components/Button/Corner";

const quotes = [
  {
    quote: "Changed my life forever.",
    author: "Vinay hiremath, Co-founder of loom",
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

const TestimonialsWrapper = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

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
              className="relative flex h-full w-full items-center justify-center overflow-hidden"
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
              <div className="absolute left-0 top-0">
                <Corner topLeft size={20} />
              </div>
              <div className="absolute right-0 top-0">
                <Corner topRight size={20} />
              </div>
              <div className="absolute bottom-0 left-0">
                <Corner bottomLeft size={20} />
              </div>
              <div className="absolute bottom-0 right-0">
                <Corner bottomRight size={20} />
              </div>
              <div className="flex min-h-[250px] min-w-96 flex-col flex-wrap items-center justify-between p-4 text-center lg:min-h-[500px] lg:min-w-[624px]">
                <div className="flex gap-3">
                  {quotes.map((quote, index) => (
                    <TestimonialsSelector
                      key={index}
                      active={index === quoteIndex}
                    />
                  ))}
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
