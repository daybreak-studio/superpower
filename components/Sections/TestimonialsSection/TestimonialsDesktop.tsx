import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TestimonialsSelector from "./TestimonialsSelector";
import Corner from "@/components/Button/Corner";

type props = {
  quoteInfo: { quote: string; author: string }[];
  quoteInfoIndex: number;
};

const TestimonialsDesktop = ({ quoteInfo, quoteInfoIndex }: props) => {
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
            maxWidth: [624, 0, 624],
            height: [500, 0, 500],
          }}
          exit={{
            maxWidth: 624,
            height: 500,
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
          <div className="flex min-h-[500px] min-w-[624px] flex-col flex-wrap items-center justify-between p-4 text-center">
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

export default TestimonialsDesktop;
