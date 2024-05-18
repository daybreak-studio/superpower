import { motion } from "framer-motion";
import React from "react";

interface Props {}

const FadeIn: React.FC<Props> = () => {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[9999999999] flex items-center justify-center bg-black"
      initial={{
        opacity: 1,
      }}
      animate={{
        opacity: 0,
        transition: {
          delay: 0.5,
        },
      }}
    />
  );
};

export default FadeIn;
