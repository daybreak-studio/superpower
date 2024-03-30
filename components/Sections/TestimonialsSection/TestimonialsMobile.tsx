import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LineElement from "@/components/LineElement/LineElement";
import TestimonialsSelector from "./TestimonialsSelector";
import Corner from "@/components/Button/Corner";

type props = {
  quoteInfo: { quote: string; author: string }[];
  quoteInfoIndex: number;
};

const TestimonialsMobile = ({ quoteInfo, quoteInfoIndex }: props) => {
  return (
    <div>
      <AnimatePresence>
        <motion.div
          className="relative flex w-full items-center justify-center overflow-hidden"
          initial={{
            height: 250,
          }}
          animate={{
            height: [250, 0, 250],
          }}
          exit={{
            height: 250,
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
          <div className="flex min-h-[250px] min-w-96 flex-col flex-wrap items-center justify-between p-4 text-center">
            <div className="flex gap-3">
              {quoteInfo.map((quote, index) => (
                <TestimonialsSelector
                  key={index}
                  active={index === quoteInfoIndex}
                />
              ))}
            </div>
            <p className="font-sans-4xl mx-4 mb-6 max-w-[20ch] text-center">
              {quoteInfo[quoteInfoIndex].quote}
            </p>
            <p className="font-mono-sm text-center">
              {quoteInfo[quoteInfoIndex].author}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TestimonialsMobile;
