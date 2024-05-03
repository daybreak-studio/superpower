"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";

type Props = {
  isLoaded: boolean;
};

const LoadingScreen = ({ isLoaded = false }: Props) => {
  return (
    <motion.div
      className="fixed inset-0 z-[9999999] bg-zinc-900"
      initial={{
        opacity: 1,
      }}
      animate={{
        opacity: isLoaded ? 0 : 1,
      }}
    ></motion.div>
  );
};

export default LoadingScreen;
